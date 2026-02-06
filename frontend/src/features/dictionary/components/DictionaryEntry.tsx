import Icon from "../../../components/Icon";

type DictionaryEntryProps = {
  content: string;
  translation: string;
  note?: string;
  onClickSettings: () => void;
};

const DictionaryEntry = ({
  content,
  translation,
  note,
  onClickSettings,
}: DictionaryEntryProps) => {
  return (
    <div className="rounded-base px-base py-base-sm bg-brand-neutral-100 border-brand-neutral-200 gap-base flex h-14 w-168 items-center justify-between border">
      <div className="flex-1 truncate">{content}</div>
      <div className="flex-1 truncate">{translation}</div>

      <div className="flex">
        {note && (
          <div
            className="cursor-pointer"
            data-tooltip-id="note-tooltip"
            data-tooltip-content={note}
          >
            <Icon name="info" className="size-8" />
          </div>
        )}
        <div className="cursor-pointer" onClick={onClickSettings}>
          <Icon name="settings" className="size-8" />
        </div>
      </div>
    </div>
  );
};

export default DictionaryEntry;
