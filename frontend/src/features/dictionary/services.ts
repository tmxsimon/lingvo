import api from "../../lib/api";
import type { DictionaryGroupType, DictionaryEntryType } from "./types";

const PATH = "/dictionary";

export const fetchGroup = async (id: number) => {
  const result = await api.get<DictionaryGroupType>(`${PATH}/groups/${id}`);
  return result.data;
};

export const fetchGroups = async () => {
  const result = await api.get<DictionaryGroupType[]>(`${PATH}/groups`);
  return result.data;
};

export const fetchGroupEntries = async (id: number) => {
  const result = await api.get<DictionaryGroupType>(`${PATH}/groups/${id}`);
  return result.data;
};

export const fetchEntries = async () => {
  const result = await api.get<DictionaryGroupType>(`${PATH}/entries`);
  return result.data;
};
