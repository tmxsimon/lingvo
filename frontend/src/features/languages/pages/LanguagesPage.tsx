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
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

const LanguagesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    setLanguages,
    languages,
    languagesList,
    requestsList,
    sharedLanguagesList,
    sharedLanguages,
    requests,
    isLoading,
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
          onClickLeftButton={() => navigate("/languages")}
          onClickRightButton={() => navigate("/languages/search")}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="gap-base flex w-full flex-col items-center">
            {requests.length > 0 && (
              <>
                <Reorder.Group
                  values={requests}
                  onReorder={() => {}}
                  className="gap-base flex w-full flex-col items-center"
                >
                  {requestsList}
                </Reorder.Group>
              </>
            )}
            {sharedLanguages.length > 0 && (
              <>
                <Reorder.Group
                  values={sharedLanguages}
                  onReorder={() => {}}
                  className="gap-base flex w-full flex-col items-center"
                >
                  {sharedLanguagesList}
                </Reorder.Group>
              </>
            )}
            <Reorder.Group
              axis="y"
              values={languages}
              onReorder={(newLanguages) => {
                newLanguages.forEach((language, index) => {
                  language.position = newLanguages.length - index;
                });
                setLanguages(newLanguages);
                reorderLanguages.mutate(
                  newLanguages.map((language) => language.id),
                );
              }}
              className="gap-base flex w-full flex-col items-center"
            >
              {languagesList}
            </Reorder.Group>
          </div>
        )}
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
