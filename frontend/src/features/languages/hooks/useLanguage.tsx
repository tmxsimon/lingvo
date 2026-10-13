import { useQuery } from "@tanstack/react-query";
import { fetchLanguage } from "../services";
import { useLanguageContext } from "../contexts/languageProvider";

const useLanguage = () => {
  const { language: _languageId } = useLanguageContext();
  const languageId = parseInt(_languageId);

  const { data: language } = useQuery({
    queryKey: ["language", languageId],
    queryFn: () => fetchLanguage(languageId),
    enabled: !!languageId,
  });

  return { language };
};

export default useLanguage;
