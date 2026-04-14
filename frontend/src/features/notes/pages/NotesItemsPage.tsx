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

const NotesItemsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { groupId } = useParams();

  const {
    isOpen: isOpennotesAdd,
    openModal: openModalnotesAdd,
    closeModal: closeModalnotesAdd,
  } = useModal();
  const {
    isOpen: isOpennotesEdit,
    openModal: openModalnotesEdit,
    closeModal: closeModalnotesEdit,
  } = useModal();

  const { language } = useLanguageContext();

  const [chosenNote, setChosenNote] = useState<NoteType | null>(null);

  const {
    group,
    notes: notesFetched,
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
      <div className="gap-base-sm flex flex-col items-center">
        <Button
          text={t("notes.addNote")}
          size="large"
          onClick={openModalnotesAdd}
        />
        {group && (
          <Button
            type="text"
            size="large"
            text={group.name}
            iconBack={<Icon name="close" className="size-5 stroke-2" />}
            onClick={() => navigate("/notes")}
          />
        )}

        {group && (
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
            className="gap-base-sm flex flex-col items-center"
          >
            {notes?.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onClickSettings={() => {
                  setChosenNote(note);
                  openModalnotesEdit();
                }}
              />
            ))}
          </Reorder.Group>
        )}

        <Tooltip id="note-tooltip" className="z-50 max-w-92 break-all" />

        {/* modals */}
        <ModalAddNote
          isOpen={isOpennotesAdd}
          closeModal={closeModalnotesAdd}
          addNote={(name: string) => addNote.mutate({ name })}
        />
        <ModalEditNote
          groups={groups!}
          group={group!}
          note={chosenNote!}
          isOpen={isOpennotesEdit}
          closeModal={closeModalnotesEdit}
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
