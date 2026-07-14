import api from "../../lib/api";
import type { DictionaryEntryType, DictionaryGroupType } from "./types";

const PATH = "/dictionary";

export const fetchEntries = async (language: number) => {
  const result = await api.get<DictionaryEntryType[]>(`${PATH}/entries`, {
    params: { language },
  });
  return result.data;
};

export const fetchGroups = async (language: number) => {
  const result = await api.get<DictionaryGroupType[]>(`${PATH}/groups`, {
    params: { language },
  });
  return result.data;
};

export const fetchGroupAndEntries = async (id: number) => {
  const result = await api.get<{
    group: DictionaryGroupType;
    entries: DictionaryEntryType[];
  }>(`${PATH}/groups/${id}`);

  return result.data;
};
