import { useState } from "react";
import Button from "../../../components/Button";
import useModal from "../../../hooks/useModal";
import DictionaryItem from "../components/DictionaryItem";
import ModalAddEntry from "../components/modals/ModalAddEntry";
import ModalEditEntry from "../components/modals/ModalEditEntry";
import { useDictionary } from "../hooks/useDictionary";
import type { DictionaryEntryType } from "../types";

const DictionaryPage = () => {
  const [chosenEntry, setChosenEntry] = useState<DictionaryEntryType | null>(
    null,
  );

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

  const { data, addEntry, editEntry, deleteEntry, isLoading, error } =
    useDictionary();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="flex flex-col items-center pt-32">
        <Button text="Add" size="large" onClick={openModalAdd} />
        <div className="mt-base flex flex-col-reverse items-center gap-2">
          {data?.map((entry) => (
            <DictionaryItem
              key={entry.id}
              content={entry.content}
              translation={entry.translation}
              onClickSettings={() => {
                setChosenEntry(entry);
                openModalEdit();
              }}
            />
          ))}
        </div>
      </div>
      <ModalAddEntry
        isOpen={isOpenAdd}
        closeModal={closeModalAdd}
        addEntry={({
          content,
          translation,
        }: {
          content: string;
          translation: string;
        }) => {
          addEntry.mutate({ content, translation });
          closeModalAdd();
        }}
      />
      <ModalEditEntry
        entry={chosenEntry!}
        isOpen={isOpenEdit}
        closeModal={closeModalEdit}
        editEntry={(id: number, content: string, translation: string) => {
          editEntry.mutate({ id, content, translation });
          closeModalEdit();
        }}
        deleteEntry={() => {
          deleteEntry.mutate(chosenEntry!.id);
          closeModalEdit();
        }}
      />
    </>
  );
};

export default DictionaryPage;
