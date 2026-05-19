import api from "../../lib/api";
import type { DictionaryGroupType } from "../dictionary/types";
import type { FlipperType } from "./types";

const PATH = "/flippers";

export const fetchFlippersEntries = async (
  groupId: number | null,
  language: number,
) => {
  const result = await api.get<{
    flippers_pages: [FlipperType[]];
    group: DictionaryGroupType | null;
  }>(`${PATH}`, {
    params: { group_id: groupId, language },
  });
  return result.data;
};
