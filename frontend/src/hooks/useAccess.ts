import { useQuery } from "@tanstack/react-query";
import { useLanguageContext } from "../features/languages/contexts/languageProvider";
import { fetchLanguage } from "../features/languages/services";
import { useAuth } from "../features/users/contexts/authProvider";
import type { DictionaryEntryType } from "../features/dictionary/types";

const useAccess = () => {
  const { user } = useAuth();

  const { language: _languageId } = useLanguageContext();
  const languageId = parseInt(_languageId);

  const {
    data: language,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["language", languageId],
    queryFn: () => fetchLanguage(languageId),
    enabled: !!languageId,
  });

  const canEditEntry = (entry: DictionaryEntryType) => {
    if (
      language?.user_permissions?.can_write ||
      language?.user_permissions?.can_edit
    ) {
      return true;
    } // entries and notes have to have owner to verify it KURVAAAA
  };

  return { language, isLoading, error };
};

export default useAccess;
