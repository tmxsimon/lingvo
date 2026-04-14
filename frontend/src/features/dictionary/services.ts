import api from "../../lib/api";
import type { DictionaryEntryType, DictionaryGroupType } from "./types";

const PATH = "/dictionary";

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

export const fetchCardsEntries = async (
  groupId: number | null,
  language: number,
) => {
  const result = await api.get<{
    entries: DictionaryEntryType[];
    group: DictionaryGroupType | null;
  }>(`${PATH}/cards-entries`, {
    params: { group_id: groupId, language },
  });
  return result.data;
};
