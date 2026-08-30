import api from "../../lib/api";
import type { UserType } from "./types";

const PATH = "/users";

export const fetchMe = async () => {
  const result = await api.get<UserType>(`${PATH}/me`);
  return result.data;
};

export const fetchUser = async (id: number) => {
  const result = await api.get<UserType>(`${PATH}/${id}`);
  return result.data;
};

export type AllFriendsType = {
  friends: UserType[];
  pending_friends_from_user: UserType[];
  pending_friends_for_user: UserType[];
};

export const fetchFriends = async (userId: number) => {
  const result = await api.get<AllFriendsType>(`${PATH}/${userId}/friends`);
  return result.data;
};

export const searchFriendsQuery = async (searchValue: string) => {
  if (!searchValue) {
    return [];
  }
  const result = await api.get<UserType[]>(
    `${PATH}/friends/search?username=${searchValue}`,
  );
  return result.data;
};
