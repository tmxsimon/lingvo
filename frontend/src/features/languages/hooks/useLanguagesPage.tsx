import { useEffect, useState } from "react";
import { useLanguageContext } from "../contexts/languageProvider";
import type { LanguageType } from "../types";
import { useLanguages } from "./useLanguages";
import Language from "../components/Language";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const useLanguagesPage = (
  openModalEdit: () => void,
  openModalShare: () => void,
) => {
  const navigate = useNavigate();
  const { changeLanguage } = useLanguageContext();
  const [chosenLanguage, setChosenLanguage] = useState<LanguageType | null>(
    null,
  );

  const [isMyLanguages, setIsMyLanguages] = useState<boolean>(true);
  const { t } = useTranslation();
  const pageTitle = isMyLanguages
    ? t("languages.myLanguages")
    : t("languages.sharedLanguages");

  const {
    languages: languagesFetched,
    sharedLanguages: sharedLanguagesFetched,
    setSearchValue,
    addLanguage,
    editLanguage,
    deleteLanguage,
    approveLanguageRequest,
    rejectLanguageRequest,
    leaveLanguage,
    reorderLanguages,
    isLoading,
    error,
  } = useLanguages(null, isMyLanguages);

  const [languages, setLanguages] = useState(languagesFetched || []);
  const sharedLanguages = sharedLanguagesFetched?.languages;
  const requests = sharedLanguagesFetched?.requests;

  useEffect(() => {
    if (languagesFetched) {
      setLanguages(languagesFetched);
    }
  }, [languagesFetched]);

  const handleChangeLanguage = (id: number) => {
    const _id = id.toString();
    setChosenLanguage(null);
    changeLanguage(_id);
    navigate(`/dictionary/`);
  };

  const handleRejectLanguage = (permissionsId: number) => {
    setChosenLanguage(null);
    changeLanguage("");
    rejectLanguageRequest.mutate(permissionsId);
  };

  const languagesList =
    isLoading ||
    (!!isMyLanguages &&
      languages?.map((language) => (
        <Language
          key={language.id}
          language={language}
          onClick={() => {
            handleChangeLanguage(language.id);
          }}
          onClickSettings={() => {
            setChosenLanguage(language);
            openModalEdit();
          }}
          onClickShare={() => {
            setChosenLanguage(language);
            openModalShare();
          }}
        />
      )));

  const sharedLanguagesList =
    isLoading ||
    (!isMyLanguages &&
      sharedLanguages?.map((language) => (
        <Language
          key={language.id}
          language={language}
          onClick={() => {
            handleChangeLanguage(language.id);
          }}
          onClickSettings={() => {
            setChosenLanguage(language);
            openModalEdit();
          }}
          onClickShare={() => {
            setChosenLanguage(language);
            openModalShare();
          }}
          onRejectRequest={(permissionsId) =>
            handleRejectLanguage(permissionsId)
          }
          onLeaveClick={(languageId) => {
            setChosenLanguage(null);
            changeLanguage("");
            leaveLanguage.mutate(languageId);
          }}
          isLeavable
        />
      )));

  const requestsList =
    isLoading ||
    (!isMyLanguages &&
      requests?.map((language) => (
        <Language
          key={language.id}
          language={language}
          isRequest
          requestId={language.request_id}
          onApproveRequest={(permissionsId) => {
            approveLanguageRequest.mutate(permissionsId);
          }}
          onClick={() => {
            handleChangeLanguage(language.id);
          }}
          onClickSettings={() => {
            setChosenLanguage(language);
            openModalEdit();
          }}
          onClickShare={() => {
            setChosenLanguage(language);
            openModalShare();
          }}
          onRejectRequest={(permissionsId) =>
            handleRejectLanguage(permissionsId)
          }
        />
      )));

  return {
    pageTitle,
    setSearchValue,
    addLanguage,
    editLanguage,
    deleteLanguage,
    reorderLanguages,
    setIsMyLanguages,
    setLanguages,
    languages,
    languagesList,
    sharedLanguagesList,
    requestsList,
    handleChangeLanguage,
    chosenLanguage,
    setChosenLanguage,
  };
};

export default useLanguagesPage;
