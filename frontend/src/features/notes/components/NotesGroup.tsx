import { Link } from "react-router-dom";
import Icon from "../../../components/Icon";
import { Reorder, useDragControls } from "framer-motion";
import type { NotesGroupType } from "../types";

type NotesGroupProps = {
  group: NotesGroupType;
  onClickSettings?: () => void;
};

const NotesGroup = ({ group, onClickSettings }: NotesGroupProps) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={group}
      dragListener={false}
      dragControls={controls}
      className="rounded-base px-base py-base-sm bg-brand-neutral-100 border-brand-neutral-200 flex h-14 w-168 items-center justify-between border"
    >
      <Icon
        name="grip"
        className="text-gray-neutral-300 hover:text-gray-neutral-500 size-6 cursor-pointer select-none"
        onPointerDown={(e) => controls.start(e)}
      />
      <div className="flex-1 truncate">{group.name}</div>
      <div className="flex">
        <div className="cursor-pointer" onClick={onClickSettings}>
          <Icon name="settings" className="size-8" />
        </div>
        <Link to={`${group.id}`} className="cursor-pointer">
          <Icon name="arrowRight" className="size-8" />
        </Link>
      </div>
    </Reorder.Item>
  );
};

export default NotesGroup;
