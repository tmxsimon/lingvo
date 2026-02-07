import { Link } from "react-router-dom";
import Icon from "../../../components/Icon";

type DictionaryGroupProps = {
  id: number;
  name: string;
  onClickSettings?: () => void;
};

const DictionaryGroup = ({
  id,
  name,
  onClickSettings,
}: DictionaryGroupProps) => {
  return (
    <div className="rounded-base px-base py-base-sm bg-brand-neutral-100 border-brand-neutral-200 gap-base flex h-14 w-168 items-center justify-between border">
      <div className="flex-1 truncate">{name}</div>
      <div className="flex">
        <div className="cursor-pointer" onClick={onClickSettings}>
          <Icon name="settings" className="size-8" />
        </div>
        <Link to={`${id}`} className="cursor-pointer">
          <Icon name="arrowRight" className="size-8" />
        </Link>
      </div>
    </div>
  );
};

export default DictionaryGroup;
