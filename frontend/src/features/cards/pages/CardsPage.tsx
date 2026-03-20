import ModalChangeGroup from "../components/modals/ModalChangeGroup";
import useModal from "../../../hooks/useModal";
import Icon from "../../../components/Icon";
import Card from "../components/Card";
import Button from "../../../components/Button";
import useCardEntry from "../hooks/useCardEntry";
import Temperature from "../components/Temperature";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";
import { useLanguageContext } from "../../languages/contexts/languageProvider";
import { useEffect } from "react";

const CardsPage = () => {
  const { t } = useTranslation();

  const { language } = useLanguageContext();

  const { groupId } = useParams();
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal();

  const {
    group: currentGroup,
    isActive,
    setIsActive,
    currentEntry,
    handleNext,
    changeTemperature,
    isLoading,
    error,
  } = useCardEntry(groupId ? Number.parseInt(groupId!) : null, language!);

  // keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!currentEntry || isOpen) return;

      if (event.key === "ArrowUp") {
        event.preventDefault();
        changeTemperature.mutate({ action: "increase" });
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        changeTemperature.mutate({ action: "decrease" });
      } else if (
        event.key === "ArrowRight" ||
        (event.key === " " && isActive) // press space when active to go to next card
      ) {
        event.preventDefault();
        handleNext();
      } else if (event.key === " ") {
        event.preventDefault();
        setIsActive(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentEntry, changeTemperature, handleNext, isOpen, setIsActive]);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="pb-base-lg h-screen-no-navbar-page flex flex-col items-center">
        <Button
          type="text"
          size="large"
          text={currentGroup?.name || t("cards.allEntries")}
          iconBack={<Icon name="change" className="size-4" />}
          onClick={openModal}
        />
        {currentEntry ? (
          <div className="flex h-full flex-col items-center justify-between">
            <div
              className={`h-full w-screen pt-40 ${!isActive ? "cursor-pointer" : ""}`}
              onClick={() => setIsActive(true)}
            >
              <Card
                isActive={isActive}
                content={currentEntry?.content || ""}
                translation={currentEntry?.translation || ""}
                note={currentEntry.note}
              />
            </div>

            <div className="gap-base flex items-center">
              <Temperature
                value={currentEntry.temperature}
                buttonLeftOnClick={() =>
                  changeTemperature.mutate({
                    action: "decrease",
                  })
                }
                buttonRightOnClick={() =>
                  changeTemperature.mutate({
                    action: "increase",
                  })
                }
              />
              <Button text={t("cards.next")} onClick={handleNext} />
            </div>
          </div>
        ) : (
          <div className="text-gray-neutral-300 mt-40 text-4xl">
            {t("cards.entriesNotFound")}
          </div>
        )}
      </div>

      {/* modals */}
      <ModalChangeGroup
        group={currentGroup}
        language={language!}
        changeGroupId={async (id: number | "") => navigate(`/cards/${id}`)}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default CardsPage;
