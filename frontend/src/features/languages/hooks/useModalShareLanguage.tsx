import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { UserRoleType } from "../types";
import type { SelectOptionType } from "../../../types";
import { useLanguages } from "./useLanguages";

const useModalShareLanguage = (
  langaugeId: number,
  isLanguageUsersEnabled: boolean = false,
) => {
  const { t } = useTranslation();

  const {
    languageUsers,
    addUserToLanguage,
    availableUsers,
    changeUserRole,
    removeUserFromLanguage,
  } = useLanguages(langaugeId, false, isLanguageUsersEnabled);

  const users = isLanguageUsersEnabled ? languageUsers : availableUsers;

  const [currentUserOption, setCurrentUserOption] = useState<SelectOptionType>({
    value: users?.find((u) => u.id === users[0].id)?.id,
    text: users?.find((u) => u.id === users[0].id)?.username,
  });

  const rolesOptions: SelectOptionType[] = [
    { value: "viewer", text: t("languages.roles.viewer") },
    { value: "default", text: t("languages.roles.default") },
    { value: "collaborator", text: t("languages.roles.collaborator") },
  ];

  const [currentRoleOption, setCurrentRoleOption] = useState<SelectOptionType>({
    value: rolesOptions[0].value,
    text: rolesOptions[0].text,
  });

  const usersOptions: SelectOptionType[] = useMemo(() => {
    const opts: SelectOptionType[] = [];
    users?.forEach((user) => {
      opts.push({ value: user.id, text: user.username });
    });
    return opts;
  }, [users, languageUsers, availableUsers]);

  useEffect(() => {
    if (users && users.length > 0) {
      setCurrentUserOption({
        value: users[0].id,
        text: users[0].username,
      });
    } else {
      setCurrentUserOption({
        value: "",
        text: "",
      });
    }
  }, [users, languageUsers, availableUsers]);

  const userId = parseInt(currentUserOption.value as string);
  const role = currentRoleOption?.value as UserRoleType;

  return {
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
  };
};

export default useModalShareLanguage;
