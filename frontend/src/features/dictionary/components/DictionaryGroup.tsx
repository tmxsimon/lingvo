import type { DictionaryGroupType } from "../types";
import ReorderableItem from "../../../components/ReorderableItem";
import Icon from "../../../components/Icon";
import { Link } from "react-router-dom";

type DictionaryGroupProps = {
  group: DictionaryGroupType;
  onClickSettings: () => void;
};

const DictionaryGroup = ({ group, onClickSettings }: DictionaryGroupProps) => {
  const buttons = (
    <>
      <button className="cursor-pointer" onClick={onClickSettings}>
        <Icon name="settings" className="size-8" />
      </button>
      <Link to={`${group.id}`} className="cursor-pointer">
        <Icon name="arrowRight" className="size-8" />
      </Link>
    </>
  );

  return (
    <ReorderableItem value={group} content={group.name} buttons={buttons} />
  );
};

export default DictionaryGroup;
