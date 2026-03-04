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

const DictionaryWordsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const { groupId } = useParams<{
    groupId: string;
  }>();

  const { language } = useLanguageContext();

  const [chosenEntry, setChosenEntry] = useState<DictionaryEntryType | null>(
    null,
  );

  const {
    group,
    addEntry,
    editEntry,
    deleteEntry,
    reorderEntries,
    isLoading,
    error,
  } = useDictionaryEntries(Number.parseInt(groupId!), language!);

  const [entries, setEntries] = useState(group?.entries || []);

  useEffect(() => {
    if (group) {
      setEntries(group.entries);
    }
  }, [group]);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="gap-base-sm flex flex-col items-center">
        <Button
          text={t("dictionary.addEntry")}
          size="large"
          onClick={openModalEntriesAdd}
        />
        {group && (
          <Button
            type="text"
            size="large"
            text={group.name}
            iconBack={<Icon name="close" className="size-5 stroke-2" />}
            onClick={() => navigate("/dictionary")}
          />
        )}

        {group && (
          <Reorder.Group
            axis="y"
            values={entries}
            onReorder={(newEntries) => {
              newEntries.forEach((entry, index) => {
                entry.position = newEntries.length - index;
              });
              setEntries(newEntries);
              const orderedIds = newEntries.map((e) => e.id);

              reorderEntries.mutate(orderedIds);
            }}
            className="gap-base-sm flex flex-col items-center"
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
        )}

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
          entry={chosenEntry!}
          isOpen={isOpenEntriesEdit}
          closeModal={closeModalEntriesEdit}
          editEntry={(
            id: number,
            content: string,
            translation: string,
            note?: string,
          ) => editEntry.mutate({ id, content, translation, note })}
          deleteEntry={() => deleteEntry.mutate(chosenEntry!.id)}
        />
      </div>
    </>
  );
};

export default DictionaryWordsPage;
