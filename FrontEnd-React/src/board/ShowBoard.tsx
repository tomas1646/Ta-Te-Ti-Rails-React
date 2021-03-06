import React, { useRef } from "react";
import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonPanel from "../components/ButtonPanel";
import { showErrorMessage, showSuccessMessage } from "../components/SnackBar";
import { Title, SubTitle } from "../components/Title";
import useInterval from "../components/useInterval";
import { useSessionUser } from "../store/userStore";
import { Board, getBoard, moveBoard } from "./boardService";
import Square from "./Square";
import { BoardStatus } from "./boardTypes";

export default function ShowBoard() {
  const params = useParams();
  const boardToken = params.board_id;
  const user = useSessionUser();
  const navigate = useNavigate();
  const boardState = useRef("");

  const [board, setBoard] = useState<Board>();
  const [player, setPlayer] = useState<"X" | "O" | undefined>();
  const [canMove, setCanMove] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  useInterval(
    () => {
      console.log("Fetching Data");
      fetchBoard();
    },
    gameFinished ? null : canMove ? null : 1000
  );

  useEffect(() => {
    fetchBoard();
    return () => setCanMove(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBoard = () => {
    if (!boardToken) {
      showErrorMessage("Board wasn't loaded correctly. Try Again.");
      return navigate("/boards");
    }

    let canmove = false;
    let isPlayer1 = false;

    getBoard(boardToken)
      .then((response) => {
        const board: Board = response.content;

        // Only re-render when board status changes
        if (boardState.current === board.status) {
          return;
        }

        boardState.current = board.status;
        setBoard(board);

        if (
          board.status === BoardStatus.player_1_win.name ||
          board.status === BoardStatus.player_2_win.name ||
          board.status === BoardStatus.draw.name
        ) {
          console.log("draw");
          console.log(BoardStatus.draw);
          console.log();
          setCanMove(false);
          setGameFinished(true);
          return showSuccessMessage("Game Finished");
        }

        if (
          board.player_1_name === user?.name &&
          board?.status === BoardStatus.player_1_turn.name
        ) {
          canmove = true;
          isPlayer1 = true;
        }
        if (
          board.player_2_name === user?.name &&
          board?.status === BoardStatus.player_2_turn.name
        ) {
          canmove = true;
        }

        setCanMove(canmove);
        canmove && setPlayer(isPlayer1 ? "X" : "O");
      })
      .catch((err) =>
        showErrorMessage(err.response.data.message || "Unexcpected Error")
      );
  };

  const handleButton = () => {
    navigate(-1);
  };

  const makeMove = (position: number) => {
    if (!boardToken) {
      showErrorMessage("Board wasn't loaded correctly. Try Again.");
      return navigate(-1);
    }

    if (!user) {
      showErrorMessage("User isn't logged id");
      return navigate("/login");
    }

    setCanMove(false);

    moveBoard(boardToken, position)
      .then((response) => {
        showSuccessMessage(response.message);
        fetchBoard();
      })
      .catch((err) => {
        setCanMove(true);
        showErrorMessage(err.response.data.message || "Unexcpected Error");
      });
  };

  return (
    <>
      <StatsPanel
        boardToken={boardToken}
        status={board?.status}
        player1Name={board?.player_1_name}
        player2Name={board?.player_2_name}
      />

      <BoardPanel
        board={board?.board}
        makeMove={makeMove}
        player={player}
        canMove={canMove}
        handleButton={handleButton}
      />
    </>
  );
}

interface StatsPanelProps {
  boardToken?: string;
  status?: string;
  player1Name?: string;
  player2Name?: string;
}

function StatsPanel(props: StatsPanelProps) {
  const { boardToken, status, player1Name, player2Name } = props;
  return (
    <>
      <Paper style={{ padding: "10px" }} elevation={12}>
        <Title text="Board" />

        <Grid container>
          <Grid item xs={6}>
            <SubTitle text={"Board Id: " + boardToken} />
            <SubTitle text={"Status: " + status} />
          </Grid>

          <Grid item xs={6}>
            <SubTitle text={"Player 1: " + player1Name} />
            <SubTitle text={"Player 2: " + player2Name} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
interface BoardPanelProps {
  board?: string[];
  makeMove: (position: number) => void;
  player?: string;
  canMove: boolean;
  handleButton: (e?: any) => void;
}

function BoardPanel(props: BoardPanelProps) {
  const { board, makeMove, player, canMove, handleButton } = props;
  return (
    <>
      <Paper style={{ padding: "10px", marginTop: "10px" }} elevation={12}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <table>
            <tbody>
              <tr>
                <th>
                  <Square
                    position={0}
                    value={board && board[0]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
                <th>
                  <Square
                    position={1}
                    value={board && board[1]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
                <th>
                  <Square
                    position={2}
                    value={board && board[2]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
              </tr>
              <tr>
                <th>
                  <Square
                    position={3}
                    value={board && board[3]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
                <th>
                  <Square
                    position={4}
                    value={board && board[4]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
                <th>
                  <Square
                    position={5}
                    value={board && board[5]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
              </tr>
              <tr>
                <th>
                  <Square
                    position={6}
                    value={board && board[6]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
                <th>
                  <Square
                    position={7}
                    value={board && board[7]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
                <th>
                  <Square
                    position={8}
                    value={board && board[8]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        <ButtonPanel button={[{ text: "Go Back", onClick: handleButton }]} />
      </Paper>
    </>
  );
}
