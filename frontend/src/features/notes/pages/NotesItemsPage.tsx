import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import Button from "../../../components/Button";
import useModal from "../../../hooks/useModal";
import NoteItem from "../components/NoteItem";
import Icon from "../../../components/Icon";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";
import { useLanguageContext } from "../../languages/contexts/languageProvider";
import { Reorder } from "motion/react";
import type { NoteType } from "../types";
import { useNotes } from "../hooks/useNotes";
import ModalAddNote from "../components/modals/ModalAddNote";
import ModalEditNote from "../components/modals/ModalEditNote";
import { useNotesGroups } from "../hooks/useNotesGroups";
import Input from "../../../components/Input";
import IconButton from "../../../components/IconButton";
import AddSearchPanel from "../../../components/other/AddSearchPanel";

const NotesItemsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { groupId } = useParams();

  const {
    isOpen: isOpenNotesAdd,
    openModal: openModalNotesAdd,
    closeModal: closeModalNotesAdd,
  } = useModal();
  const {
    isOpen: isOpenNotesEdit,
    openModal: openModalNotesEdit,
    closeModal: closeModalNotesEdit,
  } = useModal();

  const { language } = useLanguageContext();

  const [chosenNote, setChosenNote] = useState<NoteType | null>(null);

  const {
    group,
    notes: notesFetched,
    setSearchValue,
    addNote,
    editNote,
    deleteNote,
    reorderNotes,
    isLoading: isLoadingnotes,
    error: errornotes,
  } = useNotes(parseInt(groupId!));

  const [notes, setNotes] = useState(notesFetched || []);

  useEffect(() => {
    if (notesFetched) {
      setNotes(notesFetched);
    }
  }, [notesFetched]);

  const {
    groups,
    isLoading: isLoadingGroups,
    error: errorGroups,
  } = useNotesGroups(parseInt(language));

  if (isLoadingnotes || isLoadingGroups) return <Loading />;
  if (errornotes || errorGroups)
    return <div>{errornotes?.message || errorGroups?.message}</div>;

  return (
    <>
      <div className="flex flex-col items-center">
        <AddSearchPanel
          title={t("notes.notes")}
          groupName={group!.name}
          navigateToUrl="/notes"
          onAddClick={openModalNotesAdd}
          onSearchChange={setSearchValue}
        />
        <Reorder.Group
          axis="y"
          values={notes}
          onReorder={(newNotes) => {
            newNotes.forEach((note, index) => {
              note.position = newNotes.length - index;
            });
            setNotes(newNotes);
            const orderedIds = newNotes.map((e) => e.id);

            reorderNotes.mutate(orderedIds);
          }}
          className="gap-base-sm mt-base flex flex-col items-center"
        >
          {notes?.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onClickSettings={() => {
                setChosenNote(note);
                openModalNotesEdit();
              }}
            />
          ))}
        </Reorder.Group>
        <Tooltip id="note-tooltip" className="z-50 max-w-92 break-all" />
        {/* modals */}
        <ModalAddNote
          isOpen={isOpenNotesAdd}
          closeModal={closeModalNotesAdd}
          addNote={(name: string) => addNote.mutate({ name })}
        />
        <ModalEditNote
          groups={groups!}
          group={group!}
          note={chosenNote!}
          isOpen={isOpenNotesEdit}
          closeModal={closeModalNotesEdit}
          editNote={(id: number, name: string, groupId: number) =>
            editNote.mutate({ id, name, groupId })
          }
          deleteNote={() => deleteNote.mutate(chosenNote!.id)}
        />
      </div>
    </>
  );
};

export default NotesItemsPage;
