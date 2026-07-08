import type { NotesGroupType } from "../types";
import ReorderableItem from "../../../components/ReorderableItem";
import { Link } from "react-router-dom";
import Icon from "../../../components/Icon";

type NotesGroupProps = {
  group: NotesGroupType;
  onClickSettings: () => void;
};

const NotesGroup = ({ group, onClickSettings }: NotesGroupProps) => {
  const buttons = (
    <>
      <button className="cursor-pointer" onClick={onClickSettings}>
        <Icon name="settings" className="size-8" />
      </button>
      <Link to={`${group.id}`}>
        <Icon name="arrowRight" className="size-8" />
      </Link>
    </>
  );

  return (
    <ReorderableItem value={group} content={group.name} buttons={buttons} />
  );
};

export default NotesGroup;
