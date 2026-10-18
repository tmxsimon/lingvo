import useModal from "../../../hooks/useModal";
import ModalAddLanguage from "../components/modals/ModalAddLanguage";
import ModalEditLanguage from "../components/modals/ModalEditLanguage";
import { useTranslation } from "react-i18next";
import { Reorder } from "motion/react";
import AddSearchPanel from "../../../components/other/AddSearchPanel";
import LanguagesPageSwitch from "../components/LanguagesPageSwitch";
import useLanguagesPage from "../hooks/useLanguagesPage";
import ModalShareLanguage from "../components/modals/ModalShareLanguage";
import Hint from "../../../components/Hint";

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
  const {
    isOpen: isOpenShare,
    currentIndex,
    setCurrentIndex,
    openModal: openModalShare,
    closeModal: closeModalShare,
  } = useModal();

  const {
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
    requestsList,
    sharedLanguagesList,
    chosenLanguage,
  } = useLanguagesPage(openModalEdit, openModalShare);

  return (
    <>
      <div className="gap-base flex w-full flex-col items-center">
        <AddSearchPanel
          title={t(pageTitle)}
          onAddClick={openModalAdd}
          onSearchChange={setSearchValue}
        />
        <LanguagesPageSwitch
          onClickLeftButton={() => setIsMyLanguages(true)}
          onClickRightButton={() => setIsMyLanguages(false)}
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
          className="gap-base flex h-full w-full flex-col items-center"
        >
          {languagesList}
          {requestsList}
          {sharedLanguagesList}
        </Reorder.Group>
      </div>

      <Hint id="note-tooltip" />

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
      <ModalShareLanguage
        isOpen={isOpenShare}
        closeModal={closeModalShare}
        language={chosenLanguage!}
      />
    </>
  );
};

export default LanguagesPage;
