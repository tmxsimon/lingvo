import { useAuth } from "../contexts/authProvider";
import useFriends from "../hooks/useFriends";
import UserItem from "../components/UserItem";
import UserItemButton from "../components/UserItemButton";
import { useTranslation } from "react-i18next";

const useOwnFriendsPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const {
    friends,
    approveFriend,
    removeFriend,
    searchValue,
    setSearchValue,
    isLoading,
    error,
  } = useFriends(user!.id);

  const pendingFriendsFromUserList = friends?.pending_friends_from_user?.map(
    (friend, i) => {
      return (
        <UserItem
          key={i}
          user={friend}
          buttons={[
            <UserItemButton
              text={t("users.friends.cancel")}
              theme="neutral"
              onClick={() => removeFriend(user!.id, friend.id)}
            />,
          ]}
        />
      );
    },
  );

  const pendingFriendsForUserList = friends?.pending_friends_for_user?.map(
    (friend, i) => {
      return (
        <UserItem
          key={i}
          user={friend}
          buttons={[
            <div className="gap-base-sm flex">
              <UserItemButton
                text={t("users.friends.reject")}
                theme="danger"
                onClick={() => removeFriend(user!.id, friend.id)}
              />
              <UserItemButton
                text={t("users.friends.accept")}
                theme="brand"
                onClick={() => approveFriend(user!.id, friend.id)}
              />
            </div>,
          ]}
        />
      );
    },
  );

  const friendsList = friends?.friends?.map((friend, i) => {
    return (
      <UserItem
        key={i}
        user={friend}
        buttons={[
          <UserItemButton
            text={t("users.friends.unfriend")}
            theme="danger"
            confirm
            onClick={() => removeFriend(user!.id, friend.id)}
          />,
        ]}
      />
    );
  });

  return {
    isLoading,
    error,
    searchValue,
    setSearchValue,
    pendingFriendsFromUserList,
    pendingFriendsForUserList,
    friendsList,
  };
};

export default useOwnFriendsPage;
