import type { LanguageType } from "../types";
import Icon from "../../../components/Icon";
import { Reorder, useDragControls } from "framer-motion";
import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type LanguageProps = {
  isRequest?: boolean;
  language: LanguageType;
  onClick: () => void;
  onClickSettings: () => void;
  onClickShare: () => void;
  requestId?: number;
  onApproveRequest?: (permissionsId: number) => void;
  onRejectRequest?: (permissionsId: number) => void;
  onLeaveClick?: (languageId: number) => void;
  isLeavable?: boolean;
};

const Language = ({
  isRequest = false,
  language,
  onClick,
  onClickSettings,
  onClickShare,
  requestId,
  onApproveRequest,
  onRejectRequest,
  onLeaveClick,
  isLeavable = false,
}: LanguageProps) => {
  const controls = useDragControls();
  const { t } = useTranslation();

  const handleSelectLanguage = () => {
    if (isRequest) return;
    onClick();
    toast.success(
      t("{{languageName}} был выбран", { languageName: language.name }),
    );
  };

  return (
    <Reorder.Item
      value={language}
      dragListener={false}
      dragControls={controls}
      onClick={handleSelectLanguage}
      className={`p-base border-brand-neutral-200 backdrop-blur-base rounded-base-sm gap-base flex h-42 w-full max-w-152 ${!isRequest ? "cursor-pointer" : ""} border backdrop-brightness-95 sm:h-52`}
    >
      <img
        className="rounded-base-sm border-brand-neutral-200 aspect-square h-full border object-cover"
        src={`http://localhost:8000/${language.image_url}`}
      />
      <div className="gap-base-sm relative flex w-full items-center justify-between">
        <div className="relative flex w-full flex-col items-center justify-center">
          <div className="text-center text-2xl break-all">{language.name}</div>
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
        <div className="gap-base-sm flex">
          {isRequest && requestId && (
            <div className="gap-base-sm flex">
              <Button
                text={t("users.friends.reject")}
                theme="danger"
                size="small"
                onClick={() => onRejectRequest?.(requestId)}
              />
              <Button
                text={t("users.friends.accept")}
                theme="brand"
                size="small"
                onClick={() => onApproveRequest?.(requestId)}
              />
            </div>
          )}
          {!isRequest && (
            <div className="flex">
              {isLeavable && (
                <Icon
                  name="signOut"
                  className="size-6"
                  onClick={(e) => {
                    onLeaveClick?.(language.id);
                    e.stopPropagation();
                  }}
                />
              )}
              {!!language.user_permissions?.can_share && (
                <Icon
                  name="users"
                  className="size-6"
                  onClick={(e) => {
                    onClickShare();
                    e.stopPropagation();
                  }}
                />
              )}
              <Icon
                name="settings"
                className="size-6"
                onClick={(e) => {
                  onClickSettings?.();
                  e.stopPropagation();
                }}
              />
              {/* <Icon
              name="grip"
              className="text-gray-neutral-300 hover:text-gray-neutral-500 size-6 cursor-pointer select-none"
              onPointerDown={(e) => controls.start(e)}
              /> */}
            </div>
          )}
        </div>
      </div>
    </Reorder.Item>
  );
};

export default Language;
