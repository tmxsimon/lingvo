import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import Button from "../../../components/Button";
import useModal from "../../../hooks/useModal";
import DictionaryEntry from "../components/DictionaryEntry";
import ModalAddEntry from "../components/modals/ModalAddEntry";
import ModalEditEntry from "../components/modals/ModalEditEntry";
import { useDictionaryEntries } from "../hooks/useDictionaryEntries";
import type { DictionaryEntryType } from "../types";
import Icon from "../../../components/Icon";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";
import { useLanguageContext } from "../../languages/contexts/languageProvider";
import { Reorder } from "motion/react";
import { useDictionaryGroups } from "../hooks/useDictionaryGroups";
import Input from "../../../components/Input";
import IconButton from "../../../components/IconButton";
import AddSearchPanel from "../../../components/other/AddSearchPanel";

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
  } = useDictionaryEntries(parseInt(groupId!));

  const {
    groups,
    isLoading: isLoadingGroups,
    error: errorGroups,
  } = useDictionaryGroups(parseInt(language));

  const [entries, setEntries] = useState(entriesFetched || []);

  useEffect(() => {
    setEntries(entriesFetched || []);
  }, [entriesFetched]);

  if (isLoadingEntries || isLoadingGroups) return <Loading />;
  if (errorEntries || errorGroups)
    return <div>{errorEntries?.message || errorGroups?.message}</div>;

  return (
    <>
      <div className="flex flex-col items-center">
        <AddSearchPanel
          title={t("dictionary.entries")}
          groupName={group!.name}
          navigateToUrl="/dictionary"
          onAddClick={openModalEntriesAdd}
          onSearchChange={setSearchValue}
        />
        <Reorder.Group
          axis="y"
          values={entries}
          onReorder={(newEntries) => {
            newEntries.forEach((entry, index) => {
              entry.position = newEntries.length - index;
            });
            const orderedIds = newEntries.map((e) => e.id);
            setEntries(newEntries);

            reorderEntries.mutate(orderedIds);
          }}
          className="gap-base-sm mt-base flex flex-col items-center"
        >
          {entries?.map((entry) => (
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
        <ModalEditEntry
          groups={groups!}
          group={group!}
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
      </div>
    </>
  );
};

export default DictionaryEntriesPage;
