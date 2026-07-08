import type { DictionaryEntryType } from "../types";
import ReorderableItem from "../../../components/ReorderableItem";
import Icon from "../../../components/Icon";

type DictionaryEntryProps = {
  entry: DictionaryEntryType;
  onClickSettings: () => void;
};

const DictionaryEntry = ({ entry, onClickSettings }: DictionaryEntryProps) => {
  const content = (
    <>
      <div className="flex-1 truncate">{entry.content}</div>
      <div className="flex-1 truncate">{entry.translation}</div>
    </>
  );

  const buttons = (
    <button className="cursor-pointer" onClick={onClickSettings}>
      <Icon name="settings" className="size-8" />
    </button>
  );

  return (
    <ReorderableItem
      value={entry}
      content={content}
      note={entry.note}
      buttons={buttons}
    />
  );
};

export default DictionaryEntry;
