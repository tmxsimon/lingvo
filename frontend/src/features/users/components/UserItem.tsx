import { useNavigate } from "react-router-dom";
import type { UserType } from "../types";

type UserItemProps = {
  user: UserType;
  button: React.ReactNode;
};

const UserItem = ({ user, button }: UserItemProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-base border-brand-neutral-200 backdrop-blur-base rounded-base-sm gap-base flex h-22 w-full max-w-152 border backdrop-brightness-95 sm:h-32">
      <div className="flex w-full items-center justify-between">
        <img
          className="rounded-base-sm border-brand-neutral-200 aspect-square h-full cursor-pointer border object-cover"
          src={`http://localhost:8000/${user.image_url}`}
          onClick={() => navigate(`/users/${user.id}`)}
        />
        <div
          className="cursor-pointer text-center text-xl break-all sm:text-2xl"
          onClick={() => navigate(`/users/${user.id}`)}
        >
          {user.username}
        </div>
        <div className="flex h-full items-center">{button}</div>
      </div>
    </div>
  );
};

export default UserItem;
