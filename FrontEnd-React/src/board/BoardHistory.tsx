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
import { Board, getUserBoards, joinGame } from "./boardService";

export default function BoardHistory() {
  const navigate = useNavigate();
  const user = useSessionUser();
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    if (!user) {
      showErrorMessage("User isn't logged in");
      return navigate("/login");
    }

    async function fetchData() {
      await getUserBoards()
        .then((response) => {
          setBoards(response.content);
        })
        .catch((err) =>
          showErrorMessage(err.response.data.message || "Unexcpected Error")
        );
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnterBoardButton = async (boardId: string) => {
    await joinGame(boardId)
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
      status === "Waiting_Players" ||
      status === "Player_1_Turn" ||
      status === "Player_2_Turn"
    ) {
      return "In Course";
    }

    if (status === "Player_1_Win" || status === "Player_2_Win") {
      return player_1_name === user?.name ? "Won" : "Lost";
    }

    if (status === "Draw") return "Draw";

    return "he";
  };

  return (
    <>
      <Title text="History" />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: "lightgray" }}>
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
                Player 1
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
                      See Board
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
