import Icon from "../../../components/Icon";
import { useTranslation } from "react-i18next";

type AddNoteButtonProps = {
  onClick?: () => void;
};

const AddNoteButton = ({ onClick }: AddNoteButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      className="flex items-center gap-base rounded-2xl px-5 py-base bg-brand-300 text-white shadow-(--shadow-search-bar) hover:brightness-95 active:brightness-90"
      onClick={onClick}
    >
      <div className="fill-white size-5">
        <Icon name="plus" />
      </div>
      <span className="text-base font-medium whitespace-nowrap">{t("notebook.addNote")}</span>
    </button>
  );
};

export default AddNoteButton;