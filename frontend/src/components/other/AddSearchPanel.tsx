import { useTranslation } from "react-i18next";
import Icon from "../Icon";
import IconButton from "../IconButton";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import PageTitle from "../PageTitle";
import Button from "../Button";
import PageTitleWithButton from "./PageTitleWithButton";

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
    <div className="flex flex-col items-center">
      <PageTitleWithButton title={title!} button={button} />
      <div className="gap-base mt-base-sm flex w-full items-center justify-center">
        {onAddClick && (
          <IconButton
            icon={<Icon name="plus" />}
            size="medium"
            onClick={onAddClick}
          />
        )}
        <Input
          placeholder={t("search")}
          autoWidth={false}
          className="w-92"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddSearchPanel;
