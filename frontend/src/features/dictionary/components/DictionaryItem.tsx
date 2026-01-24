import Icon from "../../../components/Icon";

type DictionaryItemProps = {
  content: string;
  translation: string;
  onClickSettings: () => void;
};

const DictionaryItem = ({
  content,
  translation,
  onClickSettings,
}: DictionaryItemProps) => {
  return (
    <div className="rounded-base px-base py-base-sm bg-brand-neutral-100 border-brand-neutral-200 flex h-14 w-168 items-center justify-between border">
      <div className="flex-1">{content}</div>
      <div className="flex-1">{translation}</div>
      <div className="cursor-pointer" onClick={onClickSettings}>
        <Icon name="settings" className="size-8" />
      </div>
    </div>
  );
};

export default DictionaryItem;
