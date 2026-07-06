import api from "../../lib/api";
import type {
  DictionaryEntryType,
  DictionaryGroupType,
} from "../dictionary/types";

const PATH = "/cards";

export const fetchCardsEntries = async (
  groupId: number | null,
  language: number,
) => {
  const result = await api.get<{
    entries: DictionaryEntryType[];
    group: DictionaryGroupType | null;
  }>(`${PATH}/entries`, {
    params: { group_id: groupId, language },
  });
  return result.data;
};
