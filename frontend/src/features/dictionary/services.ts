import api from "../../lib/api";
import type { DictionaryEntryType } from "./types";

const PATH = "/dictionary";

export const fetchDictionary = async () => {
  const result = await api.get<DictionaryEntryType[]>(`${PATH}/entries`);
  return result.data;
};
