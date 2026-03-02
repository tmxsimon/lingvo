import api from "../../lib/api";
import type { DictionaryGroupType } from "./types";

const PATH = "/dictionary";

export const fetchGroup = async (id: number, language: string) => {
  const result = await api.get<DictionaryGroupType>(
    `${PATH}/${language}/groups/${id}`,
  );
  return result.data;
};

export const fetchGroups = async (language: string) => {
  const result = await api.get<DictionaryGroupType[]>(
    `${PATH}/${language}/groups`,
  );
  return result.data;
};

export const fetchGroupEntries = async (id: number, language: string) => {
  const result = await api.get<DictionaryGroupType>(
    `${PATH}/${language}/groups/${id}`,
  );

  // Have to do it because of the retarted endpoint implementation
  // TODO: Rewrite this
  const sortedEntries = result.data.entries.sort(
    (a, b) => b.position - a.position,
  );

  return { ...result.data, entries: sortedEntries };
};

export const fetchEntries = async (language: string) => {
  const result = await api.get<DictionaryGroupType>(
    `${PATH}/${language}/entries`,
  );
  return result.data;
};
