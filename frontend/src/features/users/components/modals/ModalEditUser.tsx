import { useEffect } from "react";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { useTranslation } from "react-i18next";
import Title from "../../../../components/Title";
import type { UserType } from "../../types";
import useModalUser from "../../hooks/useModalUser";

type ModalEditUserProps = {
  user: UserType | null;
  isOpen: boolean;
  closeModal: () => void;
  editUser: (
    id: number,
    username: string,
    password: string,
    image: File,
  ) => void;
  deleteUser: (id: number) => void;
};

const ModalEditUser = ({
  user,
  isOpen,
  closeModal,
  editUser,
  deleteUser,
}: ModalEditUserProps) => {
  const { t } = useTranslation();

  const {
    username,
    setUsername,
    password,
    setPassword,
    image,
    setImage,
    validate,
  } = useModalUser();

  useEffect(() => {
    setUsername(user?.username || "");
  }, [user]);

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title={t("users.editUser")}
      content={[
        <div>
          <Title text={t("users.username")} />
          <Input
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            minLength={1}
            maxLength={30}
            required
          />
        </div>,
        <div>
          <Title text={t("users.password")} />
          <Input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            minLength={1}
            maxLength={30}
            required
          />
        </div>,
        <div>
          <Title text={t("users.profilePicture")} />
          <Input
            minLength={1}
            type="file"
            accept="image/*"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0] || null;
              setImage(file);
            }}
            className="cursor-pointer"
          />
        </div>,
      ]}
      buttons={[
        <Button
          text={t("delete")}
          theme="danger"
          size="large"
          autoWidth
          onClick={() => {
            deleteUser(user!.id);
            closeModal();
          }}
        />,
        <Button
          text={t("edit")}
          size="large"
          autoWidth
          onClick={() => {
            if (!validate()) return;
            editUser(user!.id, username || "", password || "", image!);
            closeModal();
          }}
        />,
      ]}
    />
  );
};

export default ModalEditUser;
