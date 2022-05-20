import axios from "axios";
import backEndUrl from "../environment";
import { updateSessionUser } from "../store/userStore";
import { ApiResponse } from "../utils/utils";

const userUrl = backEndUrl + "/users";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] = "application/json";

export interface User {
  token: string;
  name: string;
  userName: string;
}

export async function login(
  userName: string,
  password: string
): Promise<ApiResponse<User>> {
  const response: ApiResponse<User> = (
    await axios.post(userUrl + "/login", { userName, password })
  ).data;

  updateSessionUser(response.content);
  return response;
}

export async function register(
  userName: string,
  password: string,
  name: string
): Promise<ApiResponse<User>> {
  const response: ApiResponse<User> = (
    await axios.post(userUrl + "/register", { name, userName, password })
  ).data;

  return response;
}
