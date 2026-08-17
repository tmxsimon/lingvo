import Icon from "../../../components/Icon";
import type { NoteType } from "../types";
import { Link } from "react-router-dom";
import ReorderableItem from "../../../components/ReorderableItem";

type NoteItemProps = {
  note: NoteType;
  onClickSettings: () => void;
};

const NoteItem = ({ note, onClickSettings }: NoteItemProps) => {
  const buttons = (
    <>
      <button className="cursor-pointer" onClick={onClickSettings}>
        <Icon name="settings" className="size-8" />
      </button>
      <Link to={`/notes/${note.group_id}/${note.id}`}>
        <Icon name="arrowRight" className="size-8" />
      </Link>
    </>
  );

  return (
    <ReorderableItem
      value={note}
      content={<div className="truncate">{note.name}</div>}
      buttons={buttons}
    />
  );
};

export default NoteItem;
