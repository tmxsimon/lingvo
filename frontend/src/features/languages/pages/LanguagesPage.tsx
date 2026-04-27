import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import useModal from "../../../hooks/useModal";
import Language from "../components/Language";
import ModalAddLanguage from "../components/modals/ModalAddLanguage";
import { useLanguages } from "../hooks/useLanguage";
import ModalEditLanguage from "../components/modals/ModalEditLanguage";
import type { LanguageType } from "../types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Reorder } from "motion/react";
import { useLanguageContext } from "../contexts/languageProvider";
import AddSearchPanel from "../../../components/other/AddSearchPanel";

const LanguagesPage = () => {
  const { t } = useTranslation();

  const {
    isOpen: isOpenAdd,
    openModal: openModalAdd,
    closeModal: closeModalAdd,
  } = useModal();
  const {
    isOpen: isOpenEdit,
    openModal: openModalEdit,
    closeModal: closeModalEdit,
  } = useModal();

  const { changeLanguage } = useLanguageContext();
  const [chosenLanguage, setChosenLanguage] = useState<LanguageType | null>(
    null,
  );

  const {
    languages: languagesFetched,
    setSearchValue,
    addLanguage,
    editLanguage,
    deleteLanguage,
    reorderLanguages,
    isLoading,
    error,
  } = useLanguages();

  const [languages, setLanguages] = useState(languagesFetched || []);

  useEffect(() => {
    if (languagesFetched) {
      setLanguages(languagesFetched);
    }
  }, [languagesFetched]);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="flex flex-col items-center">
        <AddSearchPanel
          title={t("languages.yourLanguages")}
          onAddClick={openModalAdd}
          onSearchChange={setSearchValue}
        />

        <Reorder.Group
          axis="y"
          values={languages}
          onReorder={(newLanguages) => {
            newLanguages.forEach((language, index) => {
              language.position = newLanguages.length - index;
            });
            setLanguages(newLanguages);
            const orderedIds = newLanguages.map((l) => l.id);

            reorderLanguages.mutate(orderedIds);
          }}
          className="gap-base mt-base flex h-full w-300 flex-col items-center"
        >
          {languages?.map((language) => (
            <Language
              key={language.id}
              language={language}
              onClick={() => {
                setChosenLanguage(language);
                changeLanguage(language.id.toString());
              }}
              onClickSettings={openModalEdit}
            />
          ))}
        </Reorder.Group>
      </div>

      {/* modals */}
      <ModalAddLanguage
        addLanguage={(name, image) =>
          addLanguage.mutate({ name: name, image: image })
        }
        isOpen={isOpenAdd}
        closeModal={closeModalAdd}
      />
      <ModalEditLanguage
        language={chosenLanguage}
        isOpen={isOpenEdit}
        closeModal={closeModalEdit}
        editLanguage={(id: number, name: string, image: File) => {
          editLanguage.mutate({ id, name, image });
        }}
        deleteLanguage={() => deleteLanguage.mutate(chosenLanguage!.id)}
      />
    </>
  );
};

export default LanguagesPage;
