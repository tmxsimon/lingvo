import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchAllNotes, fetchGroupAndNotes } from "../services";
import { useMemo, useState } from "react";
import type { NoteType, NotesGroupType } from "../types";

const PATH = "/notes";

export function useNotes(groupId?: number, language?: number) {
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState<string>("");

  const {
    data: { group, notes } = { group: null, notes: [] },
    isLoading,
    error,
  } = useQuery<{
    group: NotesGroupType | null;
    notes: NoteType[];
  }>({
    queryKey: ["notes", groupId, language],
    queryFn: () =>
      groupId !== undefined
        ? fetchGroupAndNotes(groupId)
        : fetchAllNotes(language!),
    enabled: groupId !== undefined || language !== undefined,
  });

  const searchNotes = useMemo(() => {
    return searchValue
      ? notes?.filter((note) =>
          note.name.toLowerCase().includes(searchValue.toLowerCase()),
        )
      : notes;
  }, [searchValue, notes]);

  const addNote = useMutation({
    mutationFn: ({ name }: { name: string }) =>
      api.post(`${PATH}/notes`, null, {
        params: {
          name: name,
          group_id: groupId,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const editNote = useMutation({
    mutationFn: ({
      id,
      name,
      content,
      groupId,
    }: {
      id: number;
      name?: string;
      content?: string;
      groupId?: number;
    }) =>
      api.put(`${PATH}/notes/${id}`, null, {
        params: {
          name: name,
          content: content,
          group_id: groupId,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteNote = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const reorderNotes = useMutation({
    mutationFn: (orderedIds: number[]) =>
      api.put(`${PATH}/notes/reorder`, orderedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return {
    group,
    notes: searchNotes,
    setSearchValue,
    isLoading,
    error,
    addNote,
    editNote,
    deleteNote,
    reorderNotes,
  };
}
