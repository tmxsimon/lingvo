import api from "../../lib/api";
import type { UserType } from "./types";

const PATH = "/users";

export const fetchMe = async () => {
  const result = await api.get<UserType>(`${PATH}/me`);
  return result.data;
};

export const fetchFriends = async (userId: number) => {
  const result = await api.get<{
    friends: UserType[];
    pending_friends_from_user: UserType[];
    pending_friends_for_user: UserType[];
  }>(`${PATH}/${userId}/friends`);
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
