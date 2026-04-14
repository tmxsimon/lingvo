import api from "../../lib/api";
import type { NoteType, NotesGroupType } from "./types";

const PATH = "/notes";

export const fetchNote = async (groupId: number, noteId: number) => {
  const result = await api.get<NoteType>(
    `${PATH}/groups/${groupId}/notes/${noteId}`,
  );
  return result.data;
};

export const fetchGroups = async (language: number) => {
  const result = await api.get<NotesGroupType[]>(`${PATH}/groups`, {
    params: { language },
  });
  return result.data;
};

export const fetchGroupAndNotes = async (id: number) => {
  const result = await api.get<{
    group: NotesGroupType;
    notes: NoteType[];
  }>(`${PATH}/groups/${id}`);

  return result.data;
};
