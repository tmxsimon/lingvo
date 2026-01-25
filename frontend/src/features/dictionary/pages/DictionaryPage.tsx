import { useState } from "react";
import Button from "../../../components/Button";
import useModal from "../../../hooks/useModal";
import DictionaryEntry from "../components/DictionaryEntry";
import ModalAddEntry from "../components/modals/ModalAddEntry";
import ModalEditEntry from "../components/modals/ModalEditEntry";
import { useDictionaryEntries } from "../hooks/useDictionaryEntries";
import type { DictionaryEntryType, DictionaryGroupType } from "../types";
import Icon from "../../../components/Icon";
import IconButton from "../../../components/IconButton";
import { useDictionaryGroups } from "../hooks/useDictionaryGroups";
import DictionaryGroup from "../components/DictionaryGroup";
import ModalAddGroup from "../components/modals/ModalAddGroup";
import ModalEditGroup from "../components/modals/ModalEditGroup";

const DictionaryPage = () => {
  const [currentGroup, setCurrentGroup] = useState<
    DictionaryGroupType | undefined
  >(undefined);

  const [chosenEntry, setChosenEntry] = useState<DictionaryEntryType | null>(
    null,
  );
  const [chosenGroup, setChosenGroup] = useState<DictionaryGroupType | null>(
    null,
  );

  const {
    isOpen: isOpenEntriesAdd,
    openModal: openModalEntriesAdd,
    closeModal: closeModalEntriesAdd,
  } = useModal();
  const {
    isOpen: isOpenEntriesEdit,
    openModal: openModalEntriesEdit,
    closeModal: closeModalEntriesEdit,
  } = useModal();
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
    entries,
    addEntry,
    editEntry,
    deleteEntry,
    isLoading: isLoadingEntries,
    error: errorEntries,
  } = useDictionaryEntries(currentGroup?.id);

  const [mode, setMode] = useState<"entries" | "groups">("entries");

  const {
    groups,
    addGroup,
    editGroup,
    deleteGroup,
    isLoading: isLoadingGroups,
    error: errorGroups,
  } = useDictionaryGroups();

  if (isLoadingEntries || isLoadingGroups) return <div>Loading...</div>;
  if (errorEntries) return <div>{errorEntries.message}</div>;
  if (errorGroups) return <div>{errorGroups.message}</div>;

  return (
    <>
      <div className="flex flex-col items-center pt-32">
        <div className="gap-base-sm flex">
          <Button
            text={`Add ${mode === "entries" ? "entry" : "group"}`}
            size="large"
            onClick={
              mode === "entries" ? openModalEntriesAdd : openModalGroupsAdd
            }
          />
          <IconButton
            icon={<Icon name={`${mode === "entries" ? "books" : "list"}`} />}
            type="secondary"
            size="large"
            onClick={() =>
              setMode(`${mode === "entries" ? "groups" : "entries"}`)
            }
          />
        </div>
        <div className="mt-base flex flex-col items-center gap-2">
          {currentGroup && (
            <div
              className="my-base-sm flex cursor-pointer items-center text-xl text-gray-500"
              onClick={() => setCurrentGroup(undefined)}
            >
              {currentGroup.name}
              <Icon name="close" className="size-5 stroke-2" />
            </div>
          )}
          {mode == "entries" &&
            entries?.map((entry) => (
              <DictionaryEntry
                key={entry.id}
                content={entry.content}
                translation={entry.translation}
                onClickSettings={() => {
                  setChosenEntry(entry);
                  openModalEntriesEdit();
                }}
              />
            ))}
          {mode == "groups" && (
            <>
              {groups?.map((group) => (
                <DictionaryGroup
                  key={group.id}
                  name={group.name}
                  onClickSelect={() => {
                    setCurrentGroup(group);
                    setMode("entries");
                  }}
                  onClickSettings={() => {
                    setChosenGroup(group);
                    openModalGroupsEdit();
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* modals */}
      <ModalAddEntry
        isOpen={isOpenEntriesAdd}
        closeModal={closeModalEntriesAdd}
        addEntry={(content: string, translation: string) => {
          addEntry.mutate({ content, translation });
          closeModalEntriesAdd();
        }}
      />
      <ModalEditEntry
        entry={chosenEntry!}
        isOpen={isOpenEntriesEdit}
        closeModal={closeModalEntriesEdit}
        editEntry={(id: number, content: string, translation: string) => {
          editEntry.mutate({ id, content, translation });
          closeModalEntriesEdit();
        }}
        deleteEntry={() => {
          deleteEntry.mutate(chosenEntry!.id);
          closeModalEntriesEdit();
        }}
      />
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
          if (currentGroup?.id === chosenGroup!.id) {
            setCurrentGroup({ ...currentGroup, name });
          }
          closeModalGroupsEdit();
        }}
        deleteGroup={() => {
          deleteGroup.mutate(chosenGroup!.id);
          if (currentGroup?.id === chosenGroup!.id) {
            setCurrentGroup(undefined);
          }
          closeModalGroupsEdit();
        }}
      />
    </>
  );
};

export default DictionaryPage;
