import { useTranslation } from "react-i18next";
import i18n from "../../../lib/i18n";
import { useAuth } from "../contexts/authProvider";
import Title from "../../../components/Title";
import Icon from "../../../components/Icon";
import { useTheme } from "../../../contexts/themeProvider";
import { useState } from "react";
import { switchLanguage } from "../../../utils/switchLanguage";
import type ICONS from "../../../constants/icons";
import Button from "../../../components/Button";
import useModal from "../../../hooks/useModal";
import ModalEditUser from "../components/modals/ModalEditUser";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [lng, setLng] = useState(i18n.language);

  const { user, signOut } = useAuth();
  const { editUser, deleteUser } = useUser();

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="h-screen-no-navbar-page flex w-full items-center justify-center">
        <div className="border-brand-neutral-200 backdrop-blur-base p-base-lg rounded-base flex h-full max-h-154 w-full max-w-192 flex-col items-center justify-between border backdrop-brightness-95">
          <Title size="large" text={t("users.profile")} />
          <div className="mt-base flex w-full flex-col items-center">
            <img
              className="border-brand-neutral-200 aspect-square w-full max-w-64 rounded-full border object-cover"
              src={`http://localhost:8000/${user?.image_url}`}
            />
            <div className="mt-base text-3xl">{user?.username}</div>
            <Button
              theme="brand"
              style="text"
              size="auto"
              text="Edit user"
              onClick={openModal}
            />
          </div>
          <div className="gap-base-sm flex w-full justify-center">
            <button
              onClick={() => switchLanguage(setLng)}
              className="cursor-pointer"
            >
              <Icon name={lng as keyof typeof ICONS} className="size-8" />
            </button>
            <button onClick={toggleTheme} className="cursor-pointer">
              <Icon
                className="hover:text-brand-300 size-8"
                name={theme === "dark" ? "moon" : "sun"}
              />
            </button>
          </div>
        </div>
      </div>
      <ModalEditUser
        user={user}
        isOpen={isOpen}
        closeModal={closeModal}
        editUser={editUser}
        deleteUser={(id: number) => {
          deleteUser(id);
          signOut();
          navigate("/");
        }}
      />
    </>
  );
};

export default ProfilePage;
