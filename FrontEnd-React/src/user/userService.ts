import axios from "axios";
import { backEndUrl } from "../environment";
import { updateSessionUser } from "../store/userStore";
import { ApiResponse } from "../utils/utils";

const userUrl = backEndUrl + "/users";

export interface User {
  token: string;
  name: string;
  userName: string;
}

export async function login(
  user_name: string,
  password: string
): Promise<ApiResponse<User>> {
  const response: ApiResponse<User> = (
    await axios.post(userUrl + "/login", { user_name, password })
  ).data;

  updateSessionUser(response.content);
  return response;
}

export async function register(
  user_name: string,
  password: string,
  name: string
): Promise<ApiResponse<User>> {
  const response: ApiResponse<User> = (
    await axios.post(userUrl, { name, user_name, password })
  ).data;

  return response;
}
