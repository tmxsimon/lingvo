import { useState } from "react";
import Button from "../../../components/Button";
import useModal from "../../../hooks/useModal";
import { useDictionaryGroups } from "../hooks/useDictionaryGroups";
import DictionaryGroup from "../components/DictionaryGroup";
import ModalAddGroup from "../components/modals/ModalAddGroup";
import ModalEditGroup from "../components/modals/ModalEditGroup";
import type { DictionaryGroupType } from "../types";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";
import { useLanguageContext } from "../../languages/contexts/languageProvider";

const DictionaryGroupsPage = () => {
  const { t } = useTranslation();

  const { language } = useLanguageContext();

  const [chosenGroup, setChosenGroup] = useState<DictionaryGroupType | null>(
    null,
  );

  const {
    isOpen: isOpenGroupsAdd,
    openModal: openModalGroupsAdd,
    closeModal: closeModalGroupsAdd,
  } = useModal();
  const {
    isOpen: isOpenGroupsEdit,
    openModal: openModalGroupsEdit,
    closeModal: closeModalGroupsEdit,
  } = useModal();

  const { groups, addGroup, editGroup, deleteGroup, isLoading, error } =
    useDictionaryGroups(language!);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="flex flex-col items-center">
        <Button
          text={t("dictionary.addGroup")}
          size="large"
          onClick={openModalGroupsAdd}
        />
        <div className="mt-base flex flex-col items-center gap-2">
          {groups?.map((group) => (
            <DictionaryGroup
              key={group.id}
              id={group.id}
              name={group.name}
              onClickSettings={() => {
                setChosenGroup(group);
                openModalGroupsEdit();
              }}
            />
          ))}
        </div>
      </div>

      {/* modals */}
      <ModalAddGroup
        isOpen={isOpenGroupsAdd}
        closeModal={closeModalGroupsAdd}
        addGroup={(name: string) => {
          addGroup.mutate({ name });
          closeModalGroupsAdd();
        }}
      />
      <ModalEditGroup
        group={chosenGroup!}
        isOpen={isOpenGroupsEdit}
        closeModal={closeModalGroupsEdit}
        editGroup={(id: number, name: string) => {
          editGroup.mutate({ id, name });
        }}
        deleteGroup={() => deleteGroup.mutate(chosenGroup!.id)}
      />
    </>
  );
};

export default DictionaryGroupsPage;
