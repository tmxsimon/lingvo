import { useState } from "react";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import type { DictionaryGroupType } from "../../../dictionary/types";
import Select from "../../../../components/Select";
import { useDictionaryGroups } from "../../../dictionary/hooks/useDictionaryGroups";
import type { SelectOptionType } from "../../../../types";

type ModalChangeGroupProps = {
  group?: DictionaryGroupType;
  changeGroupId: (id: number | "") => void;
  isOpen: boolean;
  closeModal: () => void;
};

const ModalChangeGroup = ({
  group,
  changeGroupId,
  isOpen,
  closeModal,
}: ModalChangeGroupProps) => {
  const [currentGroupOption, setCurrentGroupOption] = useState<
    SelectOptionType | ""
  >(group ? { value: group.id, text: group.name } : "");

  const { groups, isLoading, error } = useDictionaryGroups();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const options: SelectOptionType[] = [{ value: "", text: "All entries" }];

  groups?.forEach((group) => {
    options.push({ value: group.id, text: group.name });
  });

  return (
    <Modal
      open={isOpen}
      closeModal={closeModal}
      title="Change group"
      content={[
        <div>
          <div className="text-2xl">Group</div>
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
          text="Change"
          size="large"
          autoWidth
          onClick={() => {
            changeGroupId(
              (typeof currentGroupOption !== "string" &&
                (currentGroupOption?.value as number)) ||
                "",
            );
          }}
        />,
      ]}
    />
  );
};

export default ModalChangeGroup;
