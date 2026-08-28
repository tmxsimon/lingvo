import { useState } from "react";
import { useAuth } from "../contexts/authProvider";
import useFriends from "./useFriends";
import type { UserType } from "../types";
import Loading from "../../../components/Loading";
import UserItem from "../components/UserItem";
import UserItemButton from "../components/UserItemButton";
import { useTranslation } from "react-i18next";

const useSearchFriendsPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const {
    friends,
    addFriend,
    approveFriend,
    removeFriend,
    friendsFound,
    isSearching,
    searchError,
    searchFriends,
    isLoading,
    error,
  } = useFriends(user!.id);

  const friendsIds = friends?.friends.map((friend) => friend.id);
  const pendingFriendsFromUserIds = friends?.pending_friends_from_user.map(
    (friend) => friend.id,
  );
  const pendingFriendsForUserIds = friends?.pending_friends_for_user.map(
    (friend) => friend.id,
  );

  const renderButton = (friend: UserType) => {
    return friendsIds?.includes(friend.id) ? (
      <UserItemButton
        text={t("users.friends.unfriend")}
        theme="danger"
        confirm
        onClick={() => removeFriend(user!.id, friend.id)}
      />
    ) : pendingFriendsFromUserIds?.includes(friend.id) ? (
      <UserItemButton
        text={t("users.friends.cancel")}
        theme="neutral"
        onClick={() => removeFriend(user!.id, friend.id)}
      />
    ) : pendingFriendsForUserIds?.includes(friend.id) ? (
      <div className="gap-base flex flex-col">
        <UserItemButton
          text={t("users.friends.accept")}
          theme="brand"
          onClick={() => approveFriend(user!.id, friend.id)}
        />
        <UserItemButton
          text={t("users.friends.reject")}
          theme="danger"
          onClick={() => removeFriend(user!.id, friend.id)}
        />
      </div>
    ) : (
      <UserItemButton
        text={t("users.friends.sendRequest")}
        onClick={() => addFriend(user!.id, friend.id)}
      />
    );
  };

  const friendsFoundItems = isSearching ? (
    <Loading />
  ) : (
    !!friendsFound &&
    friendsFound!
      .filter((friend) => friend.id !== user!.id)
      .map((friend, i) => {
        return (
          <UserItem key={i} user={friend} buttons={[renderButton(friend)]} />
        );
      })
  );

  return {
    isLoading,
    error,
    searchError,
    searchInputValue,
    setSearchInputValue,
    searchFriends,
    friendsFoundItems,
  };
};

export default useSearchFriendsPage;
