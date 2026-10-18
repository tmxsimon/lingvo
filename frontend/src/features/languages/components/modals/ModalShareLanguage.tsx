import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import { useTranslation } from "react-i18next";
import ModalTitle from "../../../../components/ModalTitle";
import Select from "../../../../components/Select";
import useModalShareLanguage from "../../hooks/useModalShareLanguage";
import type { LanguageType } from "../../types";
import ModalPage from "../../../../components/ModalPage";
import { useState } from "react";
import ModalPageIcon from "../../../../components/ModalPageIcon";
import Hint from "../../../../components/Hint";

type ModalShareLanguageProps = {
  isOpen: boolean;
  closeModal: () => void;
  language: LanguageType;
};

const ModalShareLanguage = ({
  isOpen,
  closeModal,
  language,
}: ModalShareLanguageProps) => {
  const { t } = useTranslation();
  const [isLanguageUsersEnabled, setIsLanguageUsersEnabled] =
    useState<boolean>(false);

  const {
    userId,
    role,
    currentUserOption,
    setCurrentUserOption,
    currentRoleOption,
    setCurrentRoleOption,
    usersOptions,
    rolesOptions,
    addUserToLanguage,
    changeUserRole,
    removeUserFromLanguage,
  } = useModalShareLanguage(language?.id, isLanguageUsersEnabled);

  const rolesHint = (
    <Hint id="roles-hint" width="large">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{t("languages.roles.descriptions.viewer")}</span>
        <span>{t("languages.roles.descriptions.default")}</span>
        <span>{t("languages.roles.descriptions.collaborator")}</span>
      </div>
    </Hint>
  );

  const canShare = language?.user_permissions?.can_share;

  const pages = [
    <ModalPage
      onOpen={() => {
        setIsLanguageUsersEnabled(false);
      }}
      title={t("languages.shareLanguage")}
      content={[
        <div>
          <ModalTitle text={t("users.friends.myFriends")} />
          <Select
            value={
              (typeof currentUserOption !== "string" &&
                currentUserOption?.value) ||
              ""
            }
            options={usersOptions}
            onChange={(e) => {
              setCurrentUserOption({
                value: e.target.value,
                text: "",
              });
            }}
          />
        </div>,
        <div>
          <ModalTitle text={t("languages.roles.roles")} noteId="roles-hint" />
          <Select
            value={
              (typeof currentRoleOption !== "string" &&
                currentRoleOption?.value) ||
              ""
            }
            options={rolesOptions}
            onChange={(e) => {
              setCurrentRoleOption({
                value: e.target.value,
                text: "",
              });
            }}
          />
        </div>,
      ]}
      buttons={[
        <Button
          text={t("share")}
          size="large"
          autoWidth
          disabled={!canShare || !currentUserOption.value}
          onClick={() => {
            addUserToLanguage.mutate({
              languageId: language.id,
              userId,
              role,
            });
            closeModal();
          }}
        />,
      ]}
    />,
    <ModalPage
      onOpen={() => {
        setIsLanguageUsersEnabled(true);
      }}
      title={t("languages.manageUsers")}
      content={[
        <div>
          <ModalTitle text={t("languages.languageUsers")} />
          <Select
            value={
              (typeof currentUserOption !== "string" &&
                currentUserOption?.value) ||
              ""
            }
            options={usersOptions}
            onChange={(e) => {
              setCurrentUserOption({
                value: e.target.value,
                text: "",
              });
            }}
          />
        </div>,
        <div>
          <ModalTitle text={t("languages.roles.roles")} noteId="roles-hint" />
          <Select
            value={
              (typeof currentRoleOption !== "string" &&
                currentRoleOption?.value) ||
              ""
            }
            options={rolesOptions}
            onChange={(e) => {
              setCurrentRoleOption({
                value: e.target.value,
                text: "",
              });
            }}
          />
        </div>,
      ]}
      buttons={[
        <Button
          text={t("delete")}
          size="large"
          theme="danger"
          autoWidth
          confirm
          disabled={!canShare || !currentUserOption.value}
          onClick={() => {
            removeUserFromLanguage.mutate({
              languageId: language.id,
              userId: parseInt(currentUserOption.value as string),
            });
            closeModal();
          }}
        />,
        <Button
          text={t("change")}
          size="large"
          autoWidth
          disabled={!canShare || !currentUserOption.value}
          onClick={() => {
            changeUserRole.mutate({
              languageId: language.id,
              userId,
              role,
            });
            closeModal();
          }}
        />,
      ]}
    />,
  ];

  return (
    <>
      <Modal
        pages={pages}
        open={isOpen}
        closeModal={() => {
          closeModal();
        }}
        pagesIcons={[
          <ModalPageIcon
            name="signUp"
            onClick={() => {
              setIsLanguageUsersEnabled(false);
            }}
          />,
          <ModalPageIcon
            name="users"
            onClick={() => {
              setIsLanguageUsersEnabled(true);
            }}
          />,
        ]}
      />

      {rolesHint}
    </>
  );
};

export default ModalShareLanguage;
