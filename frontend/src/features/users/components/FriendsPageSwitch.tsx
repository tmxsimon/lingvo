import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";

const FriendsPageSwitch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="gap-base flex">
      <Button
        text={t("users.friends.myFriends")}
        style="tertiary"
        size="small"
        onClick={() => navigate("/users/me/friends")}
      />
      <Button
        text={t("users.friends.searchFriends")}
        style="tertiary"
        size="small"
        onClick={() => navigate("/users/search-friends")}
      />
    </div>
  );
};

export default FriendsPageSwitch;
