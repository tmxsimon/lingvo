import type { LanguageType } from "../types";
import { useLanguageContext } from "../contexts/languageProvider";
import Icon from "../../../components/Icon";

type LanguageProps = {
  language: LanguageType;
  onClick: () => void;
  onClickSettings: () => void;
};

const Language = ({ language, onClick, onClickSettings }: LanguageProps) => {
  const languageName = language.name.toLowerCase();
  const { changeLanguage } = useLanguageContext();

  return (
    <div
      className="bg-brand-neutral-100 px-base py-base border-brand-neutral-200 rounded-base-sm gap-base flex size-70 cursor-pointer flex-col justify-between border"
      onClick={() => {
        changeLanguage(languageName);
        onClick();
      }}
    >
      <img
        className="rounded-base-sm border-brand-neutral-200 h-full border object-cover"
        src={`http://localhost:8000/${language.image_url}`}
      />
      <div className="gap-base-sm flex items-center justify-center">
        <div className="text-center text-xl">{language.name}</div>
        <Icon name="settings" className="size-6" onClick={onClickSettings} />
      </div>
    </div>
  );
};

export default Language;
