import { Reorder, useDragControls } from "motion/react";
import Icon from "../../../components/Icon";
import type { NoteType } from "../types";
import { Link } from "react-router-dom";

type NoteItemProps = {
  note: NoteType;
  onClickSettings: () => void;
};

const NoteItem = ({ note, onClickSettings }: NoteItemProps) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={note}
      dragListener={false}
      dragControls={controls}
      className="rounded-base px-base py-base-sm bg-brand-neutral-100 border-brand-neutral-200 flex h-14 w-168 items-center justify-between border"
    >
      <Icon
        name="grip"
        className="text-gray-neutral-300 hover:text-gray-neutral-500 size-6 cursor-pointer select-none"
        onPointerDown={(e) => controls.start(e)}
      />
      <div className="flex w-full">
        <div className="flex-1 truncate">{note.name}</div>
      </div>

      <div className="flex">
        <div className="cursor-pointer" onClick={onClickSettings}>
          <Icon name="settings" className="size-8" />
        </div>
        <Link to={`${note.id}`} className="cursor-pointer">
          <Icon name="arrowRight" className="size-8" />
        </Link>
      </div>
    </Reorder.Item>
  );
};

export default NoteItem;
