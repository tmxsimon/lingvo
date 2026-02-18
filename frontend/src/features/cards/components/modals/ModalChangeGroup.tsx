import { useState } from "react";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import type { DictionaryGroupType } from "../../../dictionary/types";
import Select from "../../../../components/Select";
import { useDictionaryGroups } from "../../../dictionary/hooks/useDictionaryGroups";
import type { SelectOptionType } from "../../../../types";
import { useTranslation } from "react-i18next";
import Loading from "../../../../components/Loading";

type ModalChangeGroupProps = {
  group?: DictionaryGroupType;
  language: string;
  changeGroupId: (id: number | "") => void;
  isOpen: boolean;
  closeModal: () => void;
};

const ModalChangeGroup = ({
  group,
  language,
  changeGroupId,
  isOpen,
  closeModal,
}: ModalChangeGroupProps) => {
  const { t } = useTranslation();
  const [currentGroupOption, setCurrentGroupOption] = useState<
    SelectOptionType | ""
  >(group ? { value: group.id, text: group.name } : "");

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
      title={t("cards.changeGroup")}
      content={[
        <div>
          <div className="text-2xl">{t("group")}</div>
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
      ]}
      buttons={[
        <Button
          text={t("change")}
          size="large"
          autoWidth
          onClick={() => {
            changeGroupId(
              (typeof currentGroupOption !== "string" &&
                (currentGroupOption?.value as number)) ||
                "",
            );
            closeModal();
          }}
        />,
      ]}
    />
  );
};

export default ModalChangeGroup;
