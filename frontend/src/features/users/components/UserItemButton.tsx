import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import type { AllFriendsType } from "../services";

type UserItemButtonProps = {
  userId: number;
  friendId: number;
  allFriends: AllFriendsType;
  addFriend?: (userId: number, friendId: number) => void;
  approveFriend: (userId: number, friendId: number) => void;
  removeFriend: (userId: number, friendId: number) => void;
};

const UserItemButton = ({
  userId,
  friendId,
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

  if (friendsIds.includes(friendId)) {
    return (
      <Button
        text={t("users.friends.unfriend")}
        theme="danger"
        confirm
        onClick={() => removeFriend(userId, friendId)}
      />
    );
  } else if (pendingFromUserIds.includes(friendId)) {
    return (
      <Button
        text={t("users.friends.cancel")}
        theme="neutral"
        onClick={() => removeFriend(userId, friendId)}
      />
    );
  } else if (pendingForUserIds.includes(friendId)) {
    return (
      <div className="gap-base-sm flex">
        <Button
          text={t("users.friends.reject")}
          theme="danger"
          onClick={() => removeFriend(userId, friendId)}
        />
        <Button
          text={t("users.friends.accept")}
          theme="brand"
          onClick={() => approveFriend(userId, friendId)}
        />
      </div>
    );
  } else {
    return (
      <Button
        text={t("users.friends.sendRequest")}
        onClick={() => addFriend?.(userId, friendId)}
      />
    );
  }
};

export default UserItemButton;
