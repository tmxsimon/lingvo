import { useLanguages } from "./useLanguages";

const useSearchLanguagesPage = () => {
  const { languagesFound, handleSearchLanguages, isLoading, error } =
    useLanguages(null, true, false);

  return {
    languagesFound: languagesFound ?? [],
    error,
    handleSearchLanguages,
    isLoading,
  };
};

export default useSearchLanguagesPage;
