import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import useModal from "../../../hooks/useModal";
import Language from "../components/Language";
import ModalAddLanguage from "../components/modals/ModalAddLanguage";
import { useLanguages } from "../hooks/useLanguage";
import ModalEditLanguage from "../components/modals/ModalEditLanguage";
import type { LanguageType } from "../types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
    languages,
    addLanguage,
    editLanguage,
    deleteLanguage,
    isLoading,
    error,
  } = useLanguages();

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
          <div className="w text-center text-2xl">
            {t("languages.yourLanguages")}
          </div>

          <div className="gap-base flex w-300 flex-wrap justify-center">
            {languages?.map((language) => (
              <Language
                key={language.id}
                language={language}
                onClick={() => setChosenLanguage(language)}
                onClickSettings={openModalEdit}
              />
            ))}
          </div>
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
