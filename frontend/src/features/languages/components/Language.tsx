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
      className="p-base border-brand-neutral-200 backdrop-blur-base rounded-base-sm gap-base flex h-52 w-152 cursor-pointer border backdrop-brightness-95"
    >
      <img
        className="rounded-base-sm border-brand-neutral-200 aspect-square h-full border object-cover"
        src={`http://localhost:8000/${language.image_url}`}
      />
      <div className="gap-base-sm relative flex w-full items-center justify-between">
        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="text-center text-3xl break-all">{language.name}</div>
          <div className="gap-base absolute top-full flex">
            <div className="text-brand-neutral-300 flex items-center justify-center">
              <Icon name="dictionary" className="size-4" />
              <div>{language.entries_count}</div>
            </div>
            <div className="text-brand-neutral-300 flex items-center">
              <Icon name="notes" className="size-4" />
              <div>{language.notes_count}</div>
            </div>
          </div>
        </div>
        <div className="flex">
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
