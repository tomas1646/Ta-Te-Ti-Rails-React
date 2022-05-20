import axios from "axios";
import backEndUrl from "../environment";
import { ApiResponse } from "../utils/utils";

const boardUrl = backEndUrl + "/boards";

export interface Board {
  token: string;
  player_1_name: string;
  player_2_name: string;
  status: string;
  board: string[];
}

export async function createGame(
  user_token: string
): Promise<ApiResponse<Board>> {
  const response: ApiResponse<Board> = (
    await axios.post(boardUrl, { user_token })
  ).data;

  return response;
}

export async function joinGame(
  boardToken: string,
  user_token: string
): Promise<ApiResponse<Board>> {
  const response: ApiResponse<Board> = (
    await axios.post(boardUrl + "/" + boardToken + "/join", { user_token })
  ).data;

  return response;
}

export async function getOpenBoards(): Promise<ApiResponse<Board[]>> {
  const response: ApiResponse<Board[]> = (
    await axios.get(boardUrl + "/find_open_boards")
  ).data;

  return response;
}

export async function getUserBoards(
  userToken: string
): Promise<ApiResponse<Board[]>> {
  const response: ApiResponse<Board[]> = (
    await axios.get(boardUrl + "/find_user_boards/" + userToken)
  ).data;

  return response;
}

export async function getBoard(
  boardToken: string
): Promise<ApiResponse<Board>> {
  const response: ApiResponse<Board> = (
    await axios.get(boardUrl + "/" + boardToken)
  ).data;

  return response;
}

export async function moveBoard(
  boardToken: string,
  user_token: string,
  position: number
): Promise<ApiResponse<Board>> {
  const response: ApiResponse<Board> = (
    await axios.post(boardUrl + "/" + boardToken + "/move", {
      user_token,
      position,
    })
  ).data;

  return response;
}
