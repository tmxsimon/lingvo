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
      <Link to={`${note.id}`}>
        <Icon name="arrowRight" className="size-8" />
      </Link>
    </>
  );

  return <ReorderableItem value={note} content={note.name} buttons={buttons} />;
};

export default NoteItem;
