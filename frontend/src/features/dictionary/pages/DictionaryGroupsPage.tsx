import { useState } from "react";
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
import AddSearchPanel from "../../../components/other/AddSearchPanel";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

const DictionaryGroupsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    setSearchValue,
    addGroup,
    editGroup,
    deleteGroup,
    reorderGroups,
    ref,
    isFetchingNextPage,
    isLoading,
    error,
  } = useDictionaryGroups(parseInt(language));

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <AddSearchPanel
          title={t("groups")}
          onAddClick={openModalGroupsAdd}
          onSearchChange={setSearchValue}
        />
        <div className="mt-base">
          <Button
            text={t("allEntries")}
            style="tertiary"
            size="small"
            onClick={() => navigate("entries")}
          />
        </div>
        <Reorder.Group
          axis="y"
          values={groupsFetched || []}
          onReorder={(newGroups) => {
            newGroups.forEach((group, index) => {
              group.position = newGroups.length - index;
            });

            const orderedIds = newGroups.map((g) => g.id);

            reorderGroups.mutate(orderedIds);
          }}
          className="gap-base-sm mt-base flex w-full flex-col items-center"
        >
          {(groupsFetched || []).map((group) => (
            <DictionaryGroup
              key={group.id}
              group={group}
              onClickSettings={() => {
                setChosenGroup(group);
                openModalGroupsEdit();
              }}
            />
          ))}
          <div ref={ref} />
          {isFetchingNextPage && <Loading />}
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
