import api from "../../lib/api";
import type { UserType } from "./types";

const PATH = "/users";

export const fetchMe = async () => {
  const result = await api.get<UserType>(`${PATH}/me`);
  return result.data;
};
