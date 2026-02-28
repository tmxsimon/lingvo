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

  const [chosenLanguage, setChosenLanguage] = useState<LanguageType | null>(
    null,
  );

  const {
    languages: languagesFetched,
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
        <Button
          text={t("languages.addLanguage")}
          size="large"
          onClick={openModalAdd}
        />
        <div className="space-y-base mt-base">
          <div className="text-center text-2xl">
            {t("languages.yourLanguages")}
          </div>

          <Reorder.Group
            axis="y"
            values={languages}
            onReorder={(newLanguages) => {
              newLanguages.forEach((language, index) => {
                language.position = index + 1;
              });
              setLanguages(newLanguages);
              const orderedIds = newLanguages.map((l) => l.id);

              reorderLanguages.mutate(orderedIds);
            }}
            className="gap-base flex h-full w-300 flex-col items-center"
          >
            {languages?.map((language) => (
              <Language
                key={language.id}
                language={language}
                onClick={() => setChosenLanguage(language)}
                onClickSettings={openModalEdit}
              />
            ))}
          </Reorder.Group>
        </div>
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
