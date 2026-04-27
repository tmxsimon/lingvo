import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchGroupAndNotes } from "../services";
import { useState } from "react";

const PATH = "/notes";

export function useNotes(groupId: number) {
  const queryClient = useQueryClient();

  const [searchValue, setSearchValue] = useState<string>("");

  const {
    data: { group, notes } = { group: null, notes: [] },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", groupId],
    queryFn: () => fetchGroupAndNotes(groupId),
  });

  const searchNotes = searchValue
    ? notes?.filter((note) =>
        note.name.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : notes;

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
