import { useTranslation } from "react-i18next";
import Button from "../Button";
import Icon from "../Icon";
import IconButton from "../IconButton";
import Input from "../Input";
import { useNavigate } from "react-router-dom";

type AddSearchPanelProps = {
  title?: string;
  groupName?: string;
  navigateToUrl?: string;
  onAddClick: () => void;
  onSearchChange: (value: string) => void;
};

const AddSearchPanel = ({
  title,
  groupName,
  navigateToUrl,
  onAddClick,
  onSearchChange,
}: AddSearchPanelProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl">{title}</div>
      {groupName && navigateToUrl && (
        <Button
          type="text"
          theme="neutral"
          size="auto"
          text={groupName}
          iconBack={<Icon name="close" className="size-5 stroke-2" />}
          onClick={() => navigate(navigateToUrl)}
        />
      )}
      <div className="gap-base mt-base-sm flex w-full items-center justify-center">
        <IconButton
          icon={<Icon name="plus" />}
          size="medium"
          onClick={onAddClick}
        />
        <Input
          placeholder={t("search")}
          autoWidth={false}
          className="bg-brand-neutral-100 w-92"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddSearchPanel;
