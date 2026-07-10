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

type ModalChangeGroupProps = {
  group: DictionaryGroupType | null;
  language: number;
  durationSeconds: number;
  setDurationSeconds: Dispatch<SetStateAction<number>>;
  changeGroupId: (id: number | "") => void;
  isOpen: boolean;
  closeModal: () => void;
};

const ModalChangeGroup = ({
  group,
  language,
  durationSeconds,
  setDurationSeconds,
  changeGroupId,
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
    validate,
  } = useModalSettings(group, durationSeconds);

  const { groups, isLoading, error } = useDictionaryGroups(language);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  const handleChangeDuration = (value: number) => {
    localStorage.setItem("cardDurationSeconds", value.toString());
    setDurationSeconds(value);
  };

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
            closeModal();
          }}
        />,
      ]}
    />
  );
};

export default ModalChangeGroup;
