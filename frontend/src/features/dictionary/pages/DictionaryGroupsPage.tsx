import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import useModal from "../../../hooks/useModal";
import { useDictionaryGroups } from "../hooks/useDictionaryGroups";
import DictionaryGroup from "../components/DictionaryGroup";
import ModalAddGroup from "../components/modals/ModalAddGroup";
import ModalEditGroup from "../components/modals/ModalEditGroup";
import type { DictionaryGroupType } from "../types";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";
import { useLanguageContext } from "../../languages/contexts/languageProvider";
import { Reorder } from "motion/react";

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

  const {
    groups: groupsFetched,
    addGroup,
    editGroup,
    deleteGroup,
    reorderGroups,
    isLoading,
    error,
  } = useDictionaryGroups(language!);

  const [groups, setGroups] = useState(groupsFetched || []);

  useEffect(() => {
    setGroups(groupsFetched || []);
  }, [groupsFetched]);

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

        <Reorder.Group
          axis="y"
          values={groups}
          onReorder={(newGroups) => {
            newGroups.forEach((group, index) => {
              group.position = index + 1;
            });
            setGroups(newGroups);

            const orderedIds = newGroups.map((g) => g.id);

            reorderGroups.mutate(orderedIds);
          }}
          className="mt-base gap-base-sm flex flex-col items-center"
        >
          {groups.map((group) => (
            <DictionaryGroup
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
