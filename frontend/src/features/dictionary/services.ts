import api from "../../lib/api";
import type { DictionaryGroupType, DictionaryEntryType } from "./types";

const PATH = "/dictionary";

export const fetchEntries = async () => {
  const result = await api.get<DictionaryEntryType[]>(`${PATH}/entries`);
  return result.data;
};

export const fetchGroups = async () => {
  const result = await api.get<DictionaryGroupType[]>(`${PATH}/groups`);
  return result.data;
};

export const fetchGroupEntries = async (id?: number) => {
  const result = await api.get<DictionaryEntryType[]>(
    `${PATH}/${id ? `groups/${id}/` : ""}entries`, // if there's group id get group entries otherwise entries without group
  );
  return result.data;
};
