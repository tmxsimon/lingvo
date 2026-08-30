import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFriends, searchFriendsQuery } from "../services";
import api from "../../../lib/api";
import type { UserType } from "../types";

const PATH = "/users";

const useFriends = (userId?: number, isEnabled: boolean = true) => {
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState<string>(""); // filter your friends by username

  const [searchFriendsValue, setSearchFriendsValue] = useState<string>(""); // search for new friends

  const {
    data: friends,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["friends", userId],
    queryFn: () => fetchFriends(userId!),
    enabled: isEnabled && !!userId,
  });

  const {
    data: friendsFound,
    isLoading: isSearching,
    error: searchError,
    refetch: searchFriendsRefetch,
  } = useQuery({
    queryKey: ["searchFriends", searchFriendsValue],
    queryFn: () => searchFriendsQuery(searchFriendsValue),
    enabled: !!searchFriendsValue,
  });

  const filterFriends = (friendList: UserType[]) =>
    searchValue
      ? friendList.filter((friend) =>
          friend.username.toLowerCase().includes(searchValue.toLowerCase()),
        )
      : friendList;

  const filteredFriends = friends
    ? {
        friends: filterFriends(friends.friends),
        pending_friends_from_user: filterFriends(
          friends.pending_friends_from_user,
        ),
        pending_friends_for_user: filterFriends(
          friends.pending_friends_for_user,
        ),
      }
    : undefined;

  const addFriendMutation = useMutation({
    mutationFn: async ({
      userId,
      friendId,
    }: {
      userId: number;
      friendId: number;
    }) => api.post(`${PATH}/${userId}/friends/${friendId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const approveFriendMutation = useMutation({
    mutationFn: async ({
      userId,
      friendId,
    }: {
      userId: number;
      friendId: number;
    }) => api.put(`${PATH}/${userId}/friends/${friendId}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const removeFriendMutation = useMutation({
    mutationFn: async ({
      userId,
      friendId,
    }: {
      userId: number;
      friendId: number;
    }) => api.delete(`${PATH}/${userId}/friends/${friendId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const searchFriends = async (username: string) => {
    setSearchFriendsValue(username);
    searchFriendsRefetch();
    await queryClient.invalidateQueries({
      queryKey: ["searchFriends", searchFriendsValue],
    });
  };

  const addFriend = async (userId: number, friendId: number) => {
    await addFriendMutation.mutateAsync({ userId, friendId });
  };

  const approveFriend = async (userId: number, friendId: number) => {
    await approveFriendMutation.mutateAsync({ userId, friendId });
  };

  const removeFriend = async (userId: number, friendId: number) => {
    await removeFriendMutation.mutateAsync({ userId, friendId });
  };

  return {
    friends: filteredFriends,
    isLoading,
    error,
    searchValue,
    setSearchValue,
    friendsFound,
    isSearching,
    searchError,
    searchFriends,
    addFriend,
    approveFriend,
    removeFriend,
  };
};

export default useFriends;
