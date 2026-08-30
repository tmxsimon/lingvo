import { useState } from "react";
import { useAuth } from "../contexts/authProvider";
import useFriends from "./useFriends";
import Loading from "../../../components/Loading";
import UserItem from "../components/UserItem";
import UserItemButton from "../components/UserItemButton";

const useSearchFriendsPage = () => {
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

  const friendsFoundItems = isSearching ? (
    <Loading />
  ) : (
    !!friendsFound &&
    friendsFound!
      .filter((friend) => friend.id !== user!.id)
      .map((friend, i) => {
        return (
          <UserItem
            key={i}
            user={friend}
            button={
              <UserItemButton
                addFriend={addFriend}
                approveFriend={approveFriend}
                removeFriend={removeFriend}
                allFriends={friends!}
                friend={friend}
                user={user!}
              />
            }
          />
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
