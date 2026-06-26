import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";

const PATH = "/users";

export function useUser() {
  const queryClient = useQueryClient();

  const editUserMutation = useMutation({
    mutationFn: async ({
      id,
      username,
      password,
      image,
    }: {
      id: number;
      username?: string;
      password?: string;
      image?: File;
    }) => {
      const formData = new FormData();

      if (username !== undefined) {
        formData.append("username", username);
      }
      if (password) {
        formData.append("password", password);
      }
      if (image) {
        formData.append("image", image);
      }

      return api.put(`${PATH}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      localStorage.removeItem("accessToken");
    },
  });

  const editUser = async (
    id: number,
    username?: string,
    password?: string,
    image?: File,
  ) => {
    await editUserMutation.mutateAsync({ id, username, password, image });
  };

  const deleteUser = async (id: number) => {
    await deleteUserMutation.mutateAsync(id);
  };

  return {
    editUser,
    deleteUser,
  };
}
