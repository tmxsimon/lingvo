import { type Dispatch, type SetStateAction } from "react";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import type { DictionaryGroupType } from "../../../dictionary/types";
import Select from "../../../../components/Select";
import { useDictionaryGroups } from "../../../dictionary/hooks/useDictionaryGroups";
import type { SelectOptionType } from "../../../../types";
import { useTranslation } from "react-i18next";
import Loading from "../../../../components/Loading";
import Title from "../../../../components/Title";
import Input from "../../../../components/Input";
import useModalSettings from "../../hooks/useModalSettings";
import Checkbox from "../../../../components/Checkbox";

type ModalChangeGroupProps = {
  language: number;
  group: DictionaryGroupType | null;
  changeGroupId: (id: number | "") => void;
  durationSeconds: number;
  setDurationSeconds: Dispatch<SetStateAction<number>>;
  isSentenceMode: boolean;
  setIsSentenceMode: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  closeModal: () => void;
};

const ModalChangeGroup = ({
  language,
  group,
  changeGroupId,
  durationSeconds,
  setDurationSeconds,
  isSentenceMode,
  setIsSentenceMode,
  isOpen,
  closeModal,
}: ModalChangeGroupProps) => {
  const { t } = useTranslation();

  const {
    currentGroupOption,
    setCurrentGroupOption,
    durationSecondsInput,
    setDurationSecondsInput,
    maxDurationSeconds,
    isSentenceModeInput,
    setIsSentenceModeInput,
    validate,
    handleChangeDuration,
    handleChangeSentenceMode,
  } = useModalSettings(
    group,
    durationSeconds,
    setDurationSeconds,
    isSentenceMode,
    setIsSentenceMode,
  );

  const { groups, isLoading, error } = useDictionaryGroups(language);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  const options: SelectOptionType[] = [
    { value: "", text: t("cards.allEntries") },
  ];

  groups?.forEach((group) => {
    options.push({ value: group.id, text: group.name });
  });

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title={t("settings")}
      content={[
        <div>
          <Title text={t("group")} />
          <Select
            value={
              (typeof currentGroupOption !== "string" &&
                currentGroupOption?.value) ||
              ""
            }
            options={options}
            onChange={(e) => {
              setCurrentGroupOption({
                value: e.target.value,
                text: "",
              });
            }}
          />
        </div>,
        <div>
          <Title text={t("cards.duration")} />
          <Input
            type="number"
            min={1}
            max={maxDurationSeconds}
            value={durationSecondsInput}
            onChange={(e) => setDurationSecondsInput(Number(e.target.value))}
          />
        </div>,
        <div className="gap-base flex items-center">
          <Title text={t("cards.sentenceMode")} />
          <Checkbox
            checked={isSentenceModeInput}
            onChange={(e) => setIsSentenceModeInput(e.currentTarget.checked)}
          />
        </div>,
      ]}
      buttons={[
        <Button
          text={t("change")}
          size="large"
          autoWidth
          onClick={() => {
            if (!validate()) return;
            changeGroupId(
              (typeof currentGroupOption !== "string" &&
                (currentGroupOption?.value as number)) ||
                "",
            );
            handleChangeDuration(durationSecondsInput);
            handleChangeSentenceMode(isSentenceModeInput);
            closeModal();
          }}
        />,
      ]}
    />
  );
};

export default ModalChangeGroup;
