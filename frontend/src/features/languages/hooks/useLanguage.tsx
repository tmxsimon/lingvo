import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import { fetchLanguages } from "../services";
import { useLanguageContext } from "../contexts/languageProvider";
import { useState } from "react";

const PATH = "/languages";

export function useLanguages() {
  const queryClient = useQueryClient();
  const { changeLanguage } = useLanguageContext();

  const [searchValue, setSearchValue] = useState<string>("");

  const {
    data: languages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["languages"],
    queryFn: () => fetchLanguages(),
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

  return {
    languages: searchLanguages,
    setSearchValue,
    isLoading,
    error,
    addLanguage,
    editLanguage,
    deleteLanguage,
    reorderLanguages,
    // removeLanguageImage,
  };
}
