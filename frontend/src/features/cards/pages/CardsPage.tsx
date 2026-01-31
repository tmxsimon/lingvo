import { useState } from "react";
import { type DictionaryGroupType } from "../../dictionary/types";
import { useDictionaryEntries } from "../../dictionary/hooks/useDictionaryEntries";
import ModalChangeGroup from "../components/modals/ModalChangeGroup";
import useModal from "../../../hooks/useModal";
import Icon from "../../../components/Icon";
import Card from "../components/Card";
import Button from "../../../components/Button";
import useCardEntry from "../hooks/useCardEntry";
import Temperature from "../components/Temperature";

const CardsPage = () => {
  const [currentGroup, setCurrentGroup] = useState<
    DictionaryGroupType | undefined
  >(undefined);

  const { isOpen, openModal, closeModal } = useModal();

  const { entries, changeTemperature, isLoading, error } = useDictionaryEntries(
    currentGroup?.id,
  );

  const {
    isActive,
    setIsActive,
    currentEntry,
    changeGroup,
    handleNext,
    handleChangeTemperature,
  } = useCardEntry(entries, changeTemperature);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="pb-base-lg flex h-screen flex-col items-center pt-38">
        <div
          className="text-gray-neutral-300 gap-base-sm flex h-8 cursor-pointer items-center text-xl"
          onClick={openModal}
        >
          {currentGroup?.name || "No group"}
          <Icon name="change" className="size-5" />
        </div>
        {currentEntry ? (
          <div
            className={`flex h-full flex-col items-center justify-between ${!isActive ? "cursor-pointer" : ""}`}
          >
            <div
              className="h-full w-screen pt-40"
              onClick={() => setIsActive(true)}
            >
              <Card
                isActive={isActive}
                content={currentEntry?.content || ""}
                translation={currentEntry?.translation || ""}
              />
            </div>

            <div className="gap-base-sm flex flex-col items-center">
              <div className="gap-base flex">
                <Button
                  text="Decrease"
                  onClick={() =>
                    handleChangeTemperature({
                      id: currentEntry.id!,
                      action: "decrease",
                    })
                  }
                />

                <Button
                  text="Increase"
                  onClick={() =>
                    handleChangeTemperature({
                      id: currentEntry.id!,
                      action: "increase",
                    })
                  }
                />
              </div>
              <div className="gap-base flex items-center">
                <Temperature value={currentEntry.temperature} />
                <Button text="Next" onClick={handleNext} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-neutral-300 mt-40 text-4xl">
            Entries not found
          </div>
        )}
      </div>

      {/* modals */}
      <ModalChangeGroup
        group={currentGroup}
        changeGroupId={async (id: number | "") => {
          changeGroup(id, setCurrentGroup);
          closeModal();
        }}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default CardsPage;
