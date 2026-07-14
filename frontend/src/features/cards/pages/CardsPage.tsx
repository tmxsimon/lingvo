import ModalChangeGroup from "../components/modals/ModalSettings";
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
import IconButton from "../../../components/IconButton";
import { useState } from "react";
import SentenceModal from "../components/modals/SentenceModal";

const CardsPage = () => {
  const { t } = useTranslation();

  const { language } = useLanguageContext();

  const { groupId } = useParams();
  const navigate = useNavigate();

  const {
    isOpen: isOpenSettings,
    openModal: openModalSettings,
    closeModal: closeModalSettings,
  } = useModal();
  const {
    isOpen: isOpenSentence,
    openModal: openModalSentence,
    closeModal: closeModalSentence,
  } = useModal();

  const [isAuto, setIsAuto] = useState<boolean>(false);
  const [isSentenceMode, setIsSentenceMode] = useState<boolean>(
    localStorage.getItem("isSentenceMode") == "true",
  );
  const [durationSeconds, setDurationSeconds] = useState<number>(
    localStorage.getItem("cardDurationSeconds")
      ? parseInt(localStorage.getItem("cardDurationSeconds")!)
      : 5,
  );

  const {
    group,
    currentEntry,
    isActive,
    setIsActive,
    isReversed,
    setIsReversed,
    handleNext,
    // handleNextState,
    changeTemperature,
    isLoading,
    error,
  } = useCardEntry(
    groupId ? parseInt(groupId) : null,
    parseInt(language),
    isOpenSettings,
    isAuto,
    isSentenceMode,
    openModalSentence,
    isOpenSentence,
    durationSeconds,
  );

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="pb-base-lg h-screen-no-navbar-page flex flex-col items-center">
        <div className="text-xl">{t("cards.cards")}</div>
        <Button
          style="text"
          theme="neutral"
          size="large"
          text={group?.name || t("allEntries")}
          iconBack={<Icon name="settings" className="size-4" />}
          onClick={openModalSettings}
        />
        {currentEntry ? (
          <div className="flex h-full flex-col items-center justify-between">
            <div
              className={`h-full w-screen pt-40 ${!isActive ? "cursor-pointer" : ""}`}
              onClick={() => setIsActive(true)}
            >
              <Card
                isActive={isActive}
                content={currentEntry.content}
                translation={currentEntry.translation}
                note={currentEntry.note}
                reversed={isReversed}
              />
            </div>

            <div className="gap-base flex items-center">
              <div className="flex">
                <IconButton
                  icon={
                    <Icon
                      name={isReversed ? "arrowUpDown" : "arrowDownUp"}
                      className="size-8"
                    />
                  }
                  style="text"
                  padding={false}
                  onClick={() => setIsReversed(!isReversed)}
                />
                <IconButton
                  icon={
                    <Icon name={isAuto ? "pause" : "play"} className="size-8" />
                  }
                  style="text"
                  padding={false}
                  onClick={() => setIsAuto((prev) => !prev)}
                />
              </div>
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
        language={parseInt(language)}
        group={group}
        changeGroupId={async (id: number | "") => navigate(`/cards/${id}`)}
        durationSeconds={durationSeconds}
        setDurationSeconds={setDurationSeconds}
        isSentenceMode={isSentenceMode}
        setIsSentenceMode={setIsSentenceMode}
        isOpen={isOpenSettings}
        closeModal={closeModalSettings}
      />

      <SentenceModal
        entryContent={currentEntry?.content}
        isOpen={isOpenSentence}
        closeModal={closeModalSentence}
        handleNext={handleNext}
      />
    </>
  );
};

export default CardsPage;
