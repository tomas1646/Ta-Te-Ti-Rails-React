import axios from "axios";
import { backEndUrl } from "../environment";
import { ApiResponse } from "../utils/utils";

const boardUrl = backEndUrl + "/boards";

export interface Board {
  token: string;
  player_1_name: string;
  player_2_name: string;
  status: string;
  board: string[];
}

export async function createGame(): Promise<ApiResponse<Board>> {
  const response: ApiResponse<Board> = (await axios.post(boardUrl, {})).data;

  return response;
}

export async function joinGame(
  boardToken: string
): Promise<ApiResponse<Board>> {
  const response: ApiResponse<Board> = (
    await axios.post(boardUrl + `/${boardToken}/join`, {})
  ).data;

  return response;
}

export async function getBoards(
  searchUser?: boolean,
  status?: number[]
): Promise<ApiResponse<Board[]>> {
  let queryParams = "?";

  if (searchUser) {
    queryParams += "user&";
  }
  status && status.forEach((state) => (queryParams += `status[]=${state}&`));

  const response: ApiResponse<Board[]> = (
    await axios.get(boardUrl + queryParams)
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
  position: number
): Promise<ApiResponse<Board>> {
  const response: ApiResponse<Board> = (
    await axios.post(boardUrl + `/${boardToken}/move`, { position })
  ).data;

  return response;
}
