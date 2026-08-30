import { useAuth } from "../contexts/authProvider";
import useFriends from "../hooks/useFriends";
import UserItem from "../components/UserItem";
import UserItemButton from "../components/UserItemButton";

const useOwnFriendsPage = () => {
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

  const allFriends = Object.values(friends || []).flat();

  const allFriendsList = allFriends
    .map((friend, i) => {
      return (
        <UserItem
          key={i}
          user={friend}
          button={
            <UserItemButton
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
    .reverse();

  return {
    isLoading,
    error,
    searchValue,
    setSearchValue,
    allFriendsList,
  };
};

export default useOwnFriendsPage;
