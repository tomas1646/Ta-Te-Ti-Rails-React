import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonPanel from "../components/ButtonPanel";
import { showErrorMessage, showSuccessMessage } from "../components/SnackBar";
import Title, { SubTitle } from "../components/Title";
import useInterval from "../components/useInterval";
import { useSessionUser } from "../store/userStore";
import { Board, getBoard, moveBoard } from "./boardService";
import Square from "./Square";

export default function ShowBoard() {
  const params = useParams();
  const boardToken = params.board_id;
  const user = useSessionUser();
  const navigate = useNavigate();

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

  const fetchBoard = async () => {
    if (!boardToken) {
      showErrorMessage("Board wasn't loaded correctly. Try Again.");
      return navigate("/boards");
    }

    let canmove = false;
    let isPlayer1 = false;

    await getBoard(boardToken)
      .then((response) => {
        const board: Board = response.content;
        setBoard(board);
        if (
          board.status === "Player_1_Win" ||
          board.status === "Player_2_Win" ||
          board.status === "Draw"
        ) {
          setCanMove(false);
          setGameFinished(true);
          return showSuccessMessage("Game Finished");
        }

        if (
          board.player_1_name === user?.name &&
          board?.status === "Player_1_Turn"
        ) {
          canmove = true;
          isPlayer1 = true;
        }
        if (
          board.player_2_name === user?.name &&
          board?.status === "Player_2_Turn"
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
    navigate("/board");
  };

  const makeMove = async (position: number) => {
    if (!boardToken) {
      showErrorMessage("Board wasn't loaded correctly. Try Again.");
      return navigate("/boards");
    }

    if (!user) {
      showErrorMessage("User isn't logged id");
      return navigate("/login");
    }

    setCanMove(false);
    await moveBoard(boardToken, user?.token, position)
      .then((response) => {
        showSuccessMessage(response.message);
        setCanMove(false);
        fetchBoard();
      })
      .catch((err) =>
        showErrorMessage(err.response.data.message || "Unexcpected Error")
      );
  };

  return (
    <>
      <Paper style={{ padding: "10px" }} elevation={12}>
        <Title text="Board" />

        <Grid container>
          <Grid item xs={6}>
            <SubTitle text={"Board Id: " + board?.token} />
            <SubTitle text={"Status: " + board?.status} />
          </Grid>

          <Grid item xs={6}>
            <SubTitle text={"Player 1: " + board?.player_1_name} />
            <SubTitle text={"Player 2: " + board?.player_2_name} />
          </Grid>
        </Grid>
      </Paper>

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
                    value={board && board.board[0]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
                <th>
                  <Square
                    position={1}
                    value={board && board.board[1]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
                <th>
                  <Square
                    position={2}
                    value={board && board.board[2]}
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
                    value={board && board.board[3]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
                <th>
                  <Square
                    position={4}
                    value={board && board.board[4]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
                <th>
                  <Square
                    position={5}
                    value={board && board.board[5]}
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
                    value={board && board.board[6]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
                <th>
                  <Square
                    position={7}
                    value={board && board.board[7]}
                    makeMove={makeMove}
                    player={player}
                    canMove={canMove}
                  />
                </th>
                <th>
                  <Square
                    position={8}
                    value={board && board.board[8]}
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
