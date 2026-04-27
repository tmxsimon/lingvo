import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import useModal from "../../../hooks/useModal";
import { useNotesGroups } from "../hooks/useNotesGroups";
import NotesGroup from "../components/NotesGroup";
import ModalAddNotesGroup from "../components/modals/ModalAddNotesGroup";
import ModalEditNotesGroup from "../components/modals/ModalEditNotesGroup";
import type { NotesGroupType } from "../types";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";
import { useLanguageContext } from "../../languages/contexts/languageProvider";
import { Reorder } from "motion/react";
import Input from "../../../components/Input";
import IconButton from "../../../components/IconButton";
import Icon from "../../../components/Icon";
import AddSearchPanel from "../../../components/other/AddSearchPanel";

const DictionaryGroupsPage = () => {
  const { t } = useTranslation();
  const { language } = useLanguageContext();
  const [chosenGroup, setChosenGroup] = useState<NotesGroupType | null>(null);

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

  const {
    groups: groupsFetched,
    setSearchValue,
    addGroup,
    editGroup,
    deleteGroup,
    reorderGroups,
    isLoading,
    error,
  } = useNotesGroups(parseInt(language));

  const [groups, setGroups] = useState(groupsFetched || []);

  useEffect(() => {
    setGroups(groupsFetched || []);
  }, [groupsFetched]);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="flex flex-col items-center">
        <AddSearchPanel
          title={t("groups")}
          onAddClick={openModalGroupsAdd}
          onSearchChange={setSearchValue}
        />
        <Reorder.Group
          axis="y"
          values={groups}
          onReorder={(newGroups) => {
            newGroups.forEach((group, index) => {
              group.position = newGroups.length - index;
            });
            setGroups(newGroups);

            const orderedIds = newGroups.map((g) => g.id);

            reorderGroups.mutate(orderedIds);
          }}
          className="gap-base-sm mt-base flex flex-col items-center"
        >
          {groups.map((group) => (
            <NotesGroup
              key={group.id}
              group={group}
              onClickSettings={() => {
                setChosenGroup(group);
                openModalGroupsEdit();
              }}
            />
          ))}
        </Reorder.Group>
      </div>

      {/* modals */}
      <ModalAddNotesGroup
        isOpen={isOpenGroupsAdd}
        closeModal={closeModalGroupsAdd}
        addGroup={(name: string) => {
          addGroup.mutate({ name });
          closeModalGroupsAdd();
        }}
      />
      <ModalEditNotesGroup
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
