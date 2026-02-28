import { Reorder, useDragControls } from "motion/react";
import Icon from "../../../components/Icon";
import type { DictionaryEntryType } from "../types";

type DictionaryEntryProps = {
  // content: string;
  // translation: string;
  // note?: string;
  // position: number;
  entry: DictionaryEntryType;
  onClickSettings: () => void;
};

const DictionaryEntry = ({
  // content,
  // translation,
  // note,
  // position,
  entry,
  onClickSettings,
}: DictionaryEntryProps) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={entry}
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
        <div className="flex-1 truncate">{entry.content}</div>
        <div className="flex-1 truncate">{entry.translation}</div>
      </div>

      <div className="flex">
        {entry.note && (
          <div
            className="cursor-pointer"
            data-tooltip-id="note-tooltip"
            data-tooltip-content={entry.note}
          >
            <Icon name="info" className="size-8" />
          </div>
        )}
        <div className="cursor-pointer" onClick={onClickSettings}>
          <Icon name="settings" className="size-8" />
        </div>
      </div>
    </Reorder.Item>
  );
};

export default DictionaryEntry;
