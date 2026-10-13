import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import {
  fetchUserLanguages,
  fetchSharedLanguages,
  fetchLanguageUsers,
  fetchAvailableUsersForLanguage,
} from "../services";
import { useLanguageContext } from "../contexts/languageProvider";
import { useState } from "react";
import type { UserRoleType } from "../types";

const PATH = "/languages";

export function useLanguages(
  languageId: number | null = null,
  isMyLanguages: boolean = true,
  enabled: boolean = true,
) {
  const queryClient = useQueryClient();
  const { changeLanguage } = useLanguageContext();

  const [searchValue, setSearchValue] = useState<string>("");

  const invalidateLanguageSharingQueries = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["languages-shared"] }),
      queryClient.invalidateQueries({ queryKey: ["language-users"] }),
      queryClient.invalidateQueries({
        queryKey: ["available-language-users"],
      }),
    ]);

  const {
    data: languages,
    isLoading: isLoadingLanguages,
    error: errorLanguages,
  } = useQuery({
    queryKey: ["languages"],
    queryFn: () => fetchUserLanguages(),
    retry: false,
    enabled: !!isMyLanguages && enabled,
  });

  const {
    data: sharedLanguages,
    isLoading: isLoadingShared,
    error: errorShared,
  } = useQuery({
    queryKey: ["languages-shared"],
    queryFn: () => fetchSharedLanguages(),
    retry: false,
    enabled: !isMyLanguages && enabled,
  });

  const {
    data: languageUsers,
    isLoading: isLoadingLanguageUsers,
    error: errorLanguageUsers,
  } = useQuery({
    queryKey: ["language-users", languageId],
    queryFn: () => fetchLanguageUsers(languageId!),
    enabled: !!languageId && enabled,
  });

  const {
    data: availableUsers,
    isLoading: isLoadingAvailableUsers,
    error: errorAvailableUsers,
  } = useQuery({
    queryKey: ["available-language-users", languageId],
    queryFn: () => fetchAvailableUsersForLanguage(languageId!),
    enabled: !!languageId && !enabled,
  });

  const searchLanguages = searchValue
    ? languages?.filter((language) =>
        language.name.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : languages;

  const addLanguage = useMutation({
    mutationFn: ({
      name,
      image = null,
    }: {
      name: string;
      image: File | null;
    }) => {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      return api.post(PATH, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
    },
  });

  const editLanguage = useMutation({
    mutationFn: ({
      id,
      name,
      image,
    }: {
      id: number;
      name?: string;
      image?: File;
    }) => {
      const formData = new FormData();
      formData.append("name", name || "");
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
      queryClient.invalidateQueries({ queryKey: ["languages"] });
    },
  });

  const deleteLanguage = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
      localStorage.removeItem("language");
      changeLanguage("");
    },
  });

  const addUserToLanguage = useMutation({
    mutationFn: ({
      languageId,
      userId,
      role,
    }: {
      languageId: number;
      userId: number;
      role: UserRoleType;
    }) => api.post(`${PATH}/${languageId}/add-user`, { user_id: userId, role }),
    onSuccess: invalidateLanguageSharingQueries,
  });

  const removeUserFromLanguage = useMutation({
    mutationFn: ({
      languageId,
      userId,
    }: {
      languageId: number;
      userId: number;
    }) => api.delete(`${PATH}/${languageId}/remove-user?user_id=${userId}`),
    onSuccess: invalidateLanguageSharingQueries,
  });

  const changeUserRole = useMutation({
    mutationFn: ({
      languageId,
      userId,
      role,
    }: {
      languageId: number;
      userId: number;
      role: UserRoleType;
    }) =>
      api.put(`${PATH}/${languageId}/change-role`, {
        user_id: userId,
        role,
      }),
    onSuccess: invalidateLanguageSharingQueries,
  });

  const approveLanguageRequest = useMutation({
    mutationFn: (permissionsId: number) =>
      api.put(`${PATH}/requests/${permissionsId}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages-shared"] });
    },
  });

  const rejectLanguageRequest = useMutation({
    mutationFn: (permissionsId: number) =>
      api.delete(`${PATH}/requests/${permissionsId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages-shared"] });
    },
  });

  const leaveLanguage = useMutation({
    mutationFn: (languageId: number) =>
      api.delete(`${PATH}/${languageId}/leave`),
    onSuccess: invalidateLanguageSharingQueries,
  });

  const reorderLanguages = useMutation({
    mutationFn: (orderedIds: number[]) =>
      api.put(`${PATH}/reorder`, orderedIds),
  });

  // const removeLanguageImage = useMutation({
  //   mutationFn: (id: number) => api.put(`${PATH}/${id}/remove-image`),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["languages"] });
  //   },
  // });

  const isLoading =
    isLoadingLanguages ||
    isLoadingShared ||
    isLoadingLanguageUsers ||
    isLoadingAvailableUsers;
  const error =
    errorLanguages || errorShared || errorLanguageUsers || errorAvailableUsers;

  return {
    languages: searchLanguages,
    sharedLanguages,
    setSearchValue,
    isLoading,
    error,
    addLanguage,
    editLanguage,
    deleteLanguage,
    languageUsers,
    availableUsers,
    addUserToLanguage,
    removeUserFromLanguage,
    changeUserRole,
    approveLanguageRequest,
    rejectLanguageRequest,
    leaveLanguage,
    reorderLanguages,
    // removeLanguageImage,
  };
}
