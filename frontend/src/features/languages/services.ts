import api from "../../lib/api";
import type { Language } from "./types";

const PATH = "/languages";

export const fetchLanguages = async () => {
  const result = await api.get<Language[]>(`${PATH}`);
  return result.data;
};
