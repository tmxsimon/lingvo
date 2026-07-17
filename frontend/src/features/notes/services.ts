import api from "../../lib/api";
import type { NoteType, NotesGroupType } from "./types";

const PATH = "/notes";

export const fetchNote = async (groupId: number, noteId: number) => {
  const result = await api.get<NoteType>(
    `${PATH}/groups/${groupId}/notes/${noteId}`,
  );
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

export const fetchGroupAndNotes = async (
  language: number,
  groupId?: number,
  limit: number = 50,
  offset: number = 0,
) => {
  const result = await api.get<{
    group: NotesGroupType;
    notes: NoteType[];
  }>(`${PATH}/`, {
    params: { language, limit, offset, group_id: groupId },
  });

  return result.data;
};
