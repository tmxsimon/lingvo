import api from "../../lib/api";
import type { LanguageType } from "./types";

const PATH = "/languages";

export const fetchLanguages = async () => {
  const result = await api.get<LanguageType[]>(`${PATH}`);
  return result.data;
};
