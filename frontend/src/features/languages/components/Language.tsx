import type { LanguageType } from "../types";
import Icon from "../../../components/Icon";
import { Reorder, useDragControls } from "framer-motion";

type LanguageProps = {
  language: LanguageType;
  onClick: () => void;
  onClickSettings: () => void;
};

const Language = ({ language, onClick, onClickSettings }: LanguageProps) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={language}
      dragListener={false}
      dragControls={controls}
      onClick={onClick}
      className="bg-brand-neutral-100 px-base py-base border-brand-neutral-200 rounded-base-sm gap-base flex size-80 cursor-pointer flex-col justify-between border"
    >
      <img
        className="rounded-base-sm border-brand-neutral-200 h-full border object-cover"
        src={`http://localhost:8000/${language.image_url}`}
      />
      <div className="gap-base-sm relative flex items-center">
        <div className="w-full text-center text-xl">{language.name}</div>
        <div className="absolute right-0 flex">
          <Icon name="settings" className="size-6" onClick={onClickSettings} />
          <Icon
            name="grip"
            className="text-gray-neutral-300 hover:text-gray-neutral-500 size-6 cursor-pointer select-none"
            onPointerDown={(e) => controls.start(e)}
          />
        </div>
      </div>
    </Reorder.Item>
  );
};

export default Language;
