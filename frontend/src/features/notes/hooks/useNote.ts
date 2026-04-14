import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchNote } from "../services";

const PATH = "/notes";

export function useNote(groupId: number, noteId: number) {
  const queryClient = useQueryClient();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNote(groupId, noteId),
  });

  const editNote = useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      api.put(`${PATH}/notes/${id}`, null, {
        params: {
          content: content,
          group_id: groupId,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return {
    note,
    isLoading,
    error,
    editNote,
  };
}
