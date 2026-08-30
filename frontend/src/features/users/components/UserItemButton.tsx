import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import type { AllFriendsType } from "../services";
import type { UserType } from "../types";

type UserItemButtonProps = {
  user: UserType;
  friend: UserType;
  allFriends: AllFriendsType;
  addFriend?: (userId: number, friendId: number) => void;
  approveFriend: (userId: number, friendId: number) => void;
  removeFriend: (userId: number, friendId: number) => void;
};

const UserItemButton = ({
  user,
  friend,
  allFriends,
  addFriend,
  approveFriend,
  removeFriend,
}: UserItemButtonProps) => {
  const { t } = useTranslation();
  const friendsIds = allFriends.friends.map((friend) => friend.id);
  const pendingFromUserIds = allFriends.pending_friends_from_user.map(
    (friend) => friend.id,
  );
  const pendingForUserIds = allFriends.pending_friends_for_user.map(
    (friend) => friend.id,
  );

  if (friendsIds.includes(friend.id)) {
    return (
      <Button
        text={t("users.friends.unfriend")}
        theme="danger"
        confirm
        onClick={() => removeFriend(user.id, friend.id)}
      />
    );
  } else if (pendingFromUserIds.includes(friend.id)) {
    return (
      <Button
        text={t("users.friends.cancel")}
        theme="neutral"
        onClick={() => removeFriend(user.id, friend.id)}
      />
    );
  } else if (pendingForUserIds.includes(friend.id)) {
    return (
      <div className="gap-base-sm flex">
        <Button
          text={t("users.friends.reject")}
          theme="danger"
          onClick={() => removeFriend(user.id, friend.id)}
        />
        <Button
          text={t("users.friends.accept")}
          theme="brand"
          onClick={() => approveFriend(user.id, friend.id)}
        />
      </div>
    );
  } else {
    return (
      <Button
        text={t("users.friends.sendRequest")}
        onClick={() => addFriend?.(user.id, friend.id)}
      />
    );
  }
};

export default UserItemButton;
