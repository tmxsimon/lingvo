import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";

const LanguagesPageSwitch = ({
  onClickLeftButton,
  onClickRightButton,
}: {
  onClickLeftButton: () => void;
  onClickRightButton: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="gap-base flex">
      <Button
        text={t("languages.myLanguages")}
        style="tertiary"
        size="small"
        onClick={onClickLeftButton}
      />
      <Button
        text={t("languages.sharedLanguages")}
        style="tertiary"
        size="small"
        onClick={onClickRightButton}
      />
    </div>
  );
};

export default LanguagesPageSwitch;
