import { useTranslation } from "react-i18next";
import Icon from "../Icon";
import IconButton from "../IconButton";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import PageTitleWithButton from "./PageTitleWithButton";
import Search from "../Search";

type AddSearchPanelProps = {
  title: string;
  groupName?: string;
  navigateToUrl?: string;
  onAddClick?: () => void;
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

  const button = groupName && navigateToUrl && (
    <Button
      style="text"
      theme="neutral"
      size="auto"
      text={groupName}
      iconBack={<Icon name="close" className="size-5 stroke-2" />}
      onClick={() => navigate(navigateToUrl)}
    />
  );

  return (
    <div className="flex w-full flex-col items-center">
      <PageTitleWithButton title={title!} button={button} />
      <div className="gap-base mt-base-sm flex w-full items-center justify-center">
        {onAddClick && (
          <IconButton
            icon={<Icon name="plus" />}
            size="medium"
            onClick={onAddClick}
          />
        )}
        <Search
          placeholder={t("search")}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddSearchPanel;
