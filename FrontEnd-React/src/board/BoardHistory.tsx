import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorMessage, showSuccessMessage } from "../components/SnackBar";
import { Title } from "../components/Title";
import { useSessionUser } from "../store/userStore";
import { Board, getBoards, joinGame } from "./boardService";
import { BoardStatus } from "./boardTypes";

export default function BoardHistory() {
  const navigate = useNavigate();
  const user = useSessionUser();
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    if (!user) {
      showErrorMessage("User isn't logged in");
      return navigate("/login");
    }

    getBoards(true)
      .then((response) => {
        setBoards(response.content);
      })
      .catch((err) =>
        showErrorMessage(err.response.data.message || "Unexcpected Error")
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnterBoardButton = (boardId: string) => {
    joinGame(boardId)
      .then((response) => {
        showSuccessMessage(response.message);
        navigate("/board/" + response.content.token);
      })
      .catch((err) =>
        showErrorMessage(err.response.data.message || "Unexcpected Error")
      );
  };

  const getStatus = (status: string, player_1_name: string): string => {
    if (
      status === BoardStatus.waiting_players.name ||
      status === BoardStatus.player_1_turn.name ||
      status === BoardStatus.player_2_turn.name
    ) {
      return "In Course";
    }

    if (status === BoardStatus.player_1_win.name) {
      return player_1_name === user?.name ? "Won" : "Lost";
    }

    if (status === BoardStatus.player_2_win.name) {
      return player_1_name === user?.name ? "Lost" : "Win";
    }

    return "Draw";
  };

  return (
    <>
      <Title text="History" />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                Board Token
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Player 1
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Player 2
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boards &&
              boards.map((board) => (
                <TableRow
                  key={board.token}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{board.token}</TableCell>
                  <TableCell align="center">
                    {getStatus(board.status, board.player_1_name)}
                  </TableCell>
                  <TableCell align="center">{board.player_1_name}</TableCell>
                  <TableCell align="center">{board.player_2_name}</TableCell>
                  <TableCell align="center">
                    <Button
                      style={{ maxWidth: "100%" }}
                      onClick={() => handleEnterBoardButton(board.token)}
                    >
                      Open Board
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
