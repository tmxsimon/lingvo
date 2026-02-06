import Icon from "../../../components/Icon";

type DictionaryGroupProps = {
  name: string;
  onClickSelect: () => void;
  onClickSettings: () => void;
};

const DictionaryGroup = ({
  name,
  onClickSelect,
  onClickSettings,
}: DictionaryGroupProps) => {
  return (
    <div className="rounded-base px-base py-base-sm bg-brand-neutral-100 border-brand-neutral-200 gap-base flex h-14 w-168 items-center justify-between border">
      <div className="flex-1 truncate">{name}</div>
      <div className="flex">
        <div className="cursor-pointer" onClick={onClickSettings}>
          <Icon name="settings" className="size-8" />
        </div>
        <div className="cursor-pointer" onClick={onClickSelect}>
          <Icon name="arrowRight" className="size-8" />
        </div>
      </div>
    </div>
  );
};

export default DictionaryGroup;
