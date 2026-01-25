import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchGroups } from "../services";

const PATH = "/dictionary";

export function useDictionaryGroups() {
  const queryClient = useQueryClient();

  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: () => fetchGroups(),
  });

  const addGroup = useMutation({
    mutationFn: ({ name }: { name: string }) =>
      api.post(`${PATH}/groups`, null, {
        params: { name: name },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const editGroup = useMutation({
    mutationFn: ({ id, name }: { id: number; name?: string }) =>
      api.put(`${PATH}/groups/${id}`, null, {
        params: { name: name },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const deleteGroup = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/groups/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  return {
    groups,
    isLoading,
    error,
    addGroup,
    editGroup,
    deleteGroup,
  };
}
