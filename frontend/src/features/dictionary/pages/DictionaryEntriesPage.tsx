import { useState } from "react";
import { Tooltip } from "react-tooltip";
import useModal from "../../../hooks/useModal";
import DictionaryEntry from "../components/DictionaryEntry";
import ModalAddEntry from "../components/modals/ModalAddEntry";
import ModalEditEntry from "../components/modals/ModalEditEntry";
import { useDictionaryEntries } from "../hooks/useDictionaryEntries";
import type { DictionaryEntryType } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";
import { useLanguageContext } from "../../languages/contexts/languageProvider";
import { Reorder } from "motion/react";
import { useDictionaryGroups } from "../hooks/useDictionaryGroups";
import AddSearchPanel from "../../../components/other/AddSearchPanel";
import Button from "../../../components/Button";

const DictionaryEntriesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { groupId } = useParams();

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

  const { language } = useLanguageContext();

  const [chosenEntry, setChosenEntry] = useState<DictionaryEntryType | null>(
    null,
  );

  const {
    group,
    entries: entriesFetched,
    setSearchValue,
    addEntry,
    editEntry,
    deleteEntry,
    reorderEntries,
    isLoading: isLoadingEntries,
    error: errorEntries,
  } = useDictionaryEntries(
    groupId ? parseInt(groupId) : undefined,
    parseInt(language),
  );

  const {
    groups,
    isLoading: isLoadingGroups,
    error: errorGroups,
  } = useDictionaryGroups(parseInt(language));

  if (isLoadingEntries || isLoadingGroups) return <Loading />;
  if (errorEntries || errorGroups)
    return <div>{errorEntries?.message || errorGroups?.message}</div>;

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <AddSearchPanel
          title={t("dictionary.entries")}
          groupName={group ? group!.name : t("allEntries")}
          navigateToUrl="/dictionary"
          onAddClick={openModalEntriesAdd}
          onSearchChange={setSearchValue}
        />
        <div className="mt-base space-x-base">
          <Button
            text={t("flippers.flippers")}
            style="tertiary"
            size="small"
            onClick={() => navigate(`/flippers${group ? `/${groupId}` : ""}`)}
          />
          <Button
            text={t("cards.cards")}
            style="tertiary"
            size="small"
            onClick={() => navigate(`/cards${group ? `/${groupId}` : ""}`)}
          />
        </div>
        <Reorder.Group
          axis="y"
          values={entriesFetched || []}
          onReorder={(newEntries) => {
            newEntries.forEach((entry, index) => {
              entry.position = newEntries.length - index;
            });
            const orderedIds = newEntries.map((e) => e.id);

            reorderEntries.mutate(orderedIds);
          }}
          className="gap-base-sm mt-base flex w-full flex-col items-center"
        >
          {(entriesFetched || [])?.map((entry) => (
            <DictionaryEntry
              key={entry.id}
              entry={entry}
              onClickSettings={() => {
                setChosenEntry(entry);
                openModalEntriesEdit();
              }}
            />
          ))}
        </Reorder.Group>

        <Tooltip id="note-tooltip" className="z-50 max-w-92 break-all" />

        {/* modals */}
        <ModalAddEntry
          isOpen={isOpenEntriesAdd}
          closeModal={closeModalEntriesAdd}
          addEntry={(content: string, translation: string, note?: string) =>
            addEntry.mutate({ content, translation, note })
          }
        />
        {/* {group && ( */}
        <ModalEditEntry
          groups={groups!}
          group={group}
          entry={chosenEntry!}
          isOpen={isOpenEntriesEdit}
          closeModal={closeModalEntriesEdit}
          editEntry={(
            id: number,
            groupId: number,
            content: string,
            translation: string,
            note?: string,
          ) => editEntry.mutate({ id, groupId, content, translation, note })}
          deleteEntry={() => deleteEntry.mutate(chosenEntry!.id)}
        />
        {/* )} */}
      </div>
    </>
  );
};

export default DictionaryEntriesPage;
