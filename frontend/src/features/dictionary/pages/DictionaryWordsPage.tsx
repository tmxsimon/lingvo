import { useState } from "react";
import { Tooltip } from "react-tooltip";
import Button from "../../../components/Button";
import useModal from "../../../hooks/useModal";
import DictionaryEntry from "../components/DictionaryEntry";
import ModalAddEntry from "../components/modals/ModalAddEntry";
import ModalEditEntry from "../components/modals/ModalEditEntry";
import { useDictionaryEntries } from "../hooks/useDictionaryEntries";
import type { DictionaryEntryType } from "../types";
import Icon from "../../../components/Icon";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";

const DictionaryWordsPage = () => {
  const { t } = useTranslation();

  const { groupId } = useParams();
  const [chosenEntry, setChosenEntry] = useState<DictionaryEntryType | null>(
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

  const { group, addEntry, editEntry, deleteEntry, isLoading, error } =
    useDictionaryEntries(Number.parseInt(groupId!));

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="flex flex-col items-center">
        <Button
          text={t("dictionary.addEntry")}
          size="large"
          onClick={openModalEntriesAdd}
        />
        <div className="mt-base flex flex-col items-center gap-2">
          {group && (
            <Link
              to={"/dictionary"}
              className="my-base-sm text-gray-neutral-300 flex cursor-pointer items-center gap-1 text-xl"
            >
              {group.name}
              <Icon name="close" className="size-5 stroke-2" />
            </Link>
          )}

          {group &&
            group?.entries.map((entry) => (
              <DictionaryEntry
                key={entry.id}
                content={entry.content}
                translation={entry.translation}
                note={entry.note}
                onClickSettings={() => {
                  setChosenEntry(entry);
                  openModalEntriesEdit();
                }}
              />
            ))}
        </div>
      </div>

      <Tooltip id="note-tooltip" className="z-50 max-w-92 break-all" />

      {/* modals */}
      <ModalAddEntry
        isOpen={isOpenEntriesAdd}
        closeModal={closeModalEntriesAdd}
        addEntry={(content: string, translation: string, note?: string) => {
          addEntry.mutate({ content, translation, note });
          closeModalEntriesAdd();
        }}
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
        ) => {
          editEntry.mutate({ id, content, translation, note });
          closeModalEntriesEdit();
        }}
        deleteEntry={() => {
          deleteEntry.mutate(chosenEntry!.id);
          closeModalEntriesEdit();
        }}
      />
    </>
  );
};

export default DictionaryWordsPage;
