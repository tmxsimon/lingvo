import api from "../../lib/api";
import type { UserType } from "../users/types";
import type { LanguageType } from "./types";

const PATH = "/languages";

export const fetchUserLanguages = async () => {
  const result = await api.get<LanguageType[]>(`${PATH}`);
  return result.data;
};

export type SharedLanguagesResponse = {
  languages: LanguageType[];
  requests: LanguageType[];
};

export const fetchSharedLanguages = async () => {
  const result = await api.get<SharedLanguagesResponse>(`${PATH}/shared`);
  return result.data;
};

export const fetchLanguageUsers = async (languageId: number) => {
  const result = await api.get<UserType[]>(`${PATH}/${languageId}/users`);
  return result.data;
};

export const fetchAvailableUsersForLanguage = async (languageId: number) => {
  const result = await api.get<UserType[]>(
    `${PATH}/${languageId}/available-users`,
  );
  return result.data;
};
