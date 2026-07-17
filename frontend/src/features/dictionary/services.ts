import api from "../../lib/api";
import type { DictionaryEntryType, DictionaryGroupType } from "./types";

const PATH = "/dictionary";

export const fetchEntries = async (
  language: number,
  limit: number = 50,
  offset: number = 0,
) => {
  const result = await api.get<DictionaryEntryType[]>(`${PATH}/entries`, {
    params: { language, limit, offset },
  });
  return result.data;
};

export const fetchGroups = async (
  language: number,
  limit: number = 50,
  offset: number = 0,
) => {
  const result = await api.get(`${PATH}/groups`, {
    params: { language, limit, offset },
  });
  return result.data;
};

export const fetchGroupAndEntries = async (
  language: number,
  groupId?: number,
  limit: number = 50,
  offset: number = 0,
) => {
  const result = await api.get<{
    group: DictionaryGroupType;
    entries: DictionaryEntryType[];
  }>(`${PATH}/entries`, {
    params: { language, limit, offset, group_id: groupId },
  });

  return result.data;
};
