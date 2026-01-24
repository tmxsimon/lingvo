import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchDictionary } from "../services";

const PATH = "/dictionary";

export function useDictionary() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dictionary"],
    queryFn: () => fetchDictionary(),
  });

  const addEntry = useMutation({
    mutationFn: ({
      content,
      translation,
    }: {
      content: string;
      translation: string;
    }) =>
      api.post(`${PATH}/entries`, null, {
        params: { content: content, translation: translation },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dictionary"] });
    },
  });

  const editEntry = useMutation({
    mutationFn: ({
      id,
      content,
      translation,
    }: {
      id: number;
      content?: string;
      translation?: string;
    }) =>
      api.put(`${PATH}/entries/${id}`, null, {
        params: { content: content, translation: translation },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dictionary"] });
    },
  });

  const deleteEntry = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/entries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dictionary"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    addEntry,
    editEntry,
    deleteEntry,
  };
}
