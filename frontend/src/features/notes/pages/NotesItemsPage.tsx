import { useState } from "react";
import { Tooltip } from "react-tooltip";
import useModal from "../../../hooks/useModal";
import NoteItem from "../components/NoteItem";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";
import { useLanguageContext } from "../../languages/contexts/languageProvider";
import { Reorder } from "motion/react";
import type { NoteType } from "../types";
import { useNotes } from "../hooks/useNotes";
import ModalAddNote from "../components/modals/ModalAddNote";
import ModalEditNote from "../components/modals/ModalEditNote";
import { useNotesGroups } from "../hooks/useNotesGroups";
import AddSearchPanel from "../../../components/other/AddSearchPanel";

const NotesItemsPage = () => {
  const { t } = useTranslation();
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

  const parsedGroupId = Number(groupId);
  const resolvedGroupId = Number.isNaN(parsedGroupId)
    ? undefined
    : parsedGroupId;
  const parsedLanguage = Number(language);

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
  } = useNotes(resolvedGroupId, parsedLanguage);

  const {
    groups,
    isLoading: isLoadingGroups,
    error: errorGroups,
  } = useNotesGroups(parsedLanguage);

  const groupTitle = group?.name || t("notes.allNotes");
  const showAddNote = resolvedGroupId !== undefined;

  if (isLoadingnotes || isLoadingGroups) return <Loading />;
  if (errornotes || errorGroups)
    return <div>{errornotes?.message || errorGroups?.message}</div>;

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <AddSearchPanel
          title={t("notes.notes")}
          groupName={groupTitle}
          navigateToUrl={"/notes"}
          onAddClick={showAddNote ? openModalNotesAdd : undefined}
          onSearchChange={setSearchValue}
        />
        <Reorder.Group
          axis="y"
          values={notesFetched || []}
          onReorder={(newNotes) => {
            newNotes.forEach((note, index) => {
              note.position = newNotes.length - index;
            });
            const orderedIds = newNotes.map((e) => e.id);

            reorderNotes.mutate(orderedIds);
          }}
          className="gap-base-sm mt-base flex w-full flex-col items-center"
        >
          {(notesFetched || [])?.map((note) => (
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
          group={group}
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
