import { Reorder, useDragControls } from "motion/react";
import Icon from "./Icon";

type ReorderableItemProps = {
  value: any;
  content: React.ReactNode;
  note?: string;
  buttons: React.ReactNode;
};

const ReorderableItem = ({
  value,
  content,
  note,
  buttons,
}: ReorderableItemProps) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
      className="rounded-base px-base py-base-sm border-brand-neutral-200 backdrop-blur-base flex h-14 w-full max-w-168 items-center justify-between border backdrop-brightness-95"
    >
      <Icon
        name="grip"
        className="text-gray-neutral-300 hover:text-gray-neutral-500 size-6 cursor-pointer select-none"
        onPointerDown={(e) => controls.start(e)}
      />
      <div className="flex w-full">{content}</div>
      <div className="flex min-w-16 justify-end">
        {note && (
          <div
            className="cursor-pointer"
            data-tooltip-id="note-tooltip"
            data-tooltip-content={note}
          >
            <Icon name="info" className="size-8" />
          </div>
        )}
        {buttons}
      </div>
    </Reorder.Item>
  );
};

export default ReorderableItem;
