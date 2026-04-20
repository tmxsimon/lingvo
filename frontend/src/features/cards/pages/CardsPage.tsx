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
import IconButton from "../../../components/IconButton";

const CardsPage = () => {
  const { t } = useTranslation();

  const { language } = useLanguageContext();

  const { groupId } = useParams();
  const navigate = useNavigate();

  const { isOpen, openModal, closeModal } = useModal();

  const {
    group,
    currentEntry,
    isActive,
    setIsActive,
    isReversed,
    setIsReversed,
    handleNext,
    changeTemperature,
    isLoading,
    error,
  } = useCardEntry(
    groupId ? parseInt(groupId) : null,
    parseInt(language),
    isOpen,
  );

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="pb-base-lg h-screen-no-navbar-page flex flex-col items-center">
        <Button
          type="text"
          theme="neutral"
          size="large"
          text={group?.name || t("cards.allEntries")}
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
                content={currentEntry.content}
                translation={currentEntry.translation}
                note={currentEntry.note}
                reversed={isReversed}
              />
            </div>

            <div className="gap-base flex items-center">
              <IconButton
                icon={
                  <Icon
                    name={isReversed ? "arrowUpDown" : "arrowDownUp"}
                    className="size-8"
                  />
                }
                type="text"
                padding={false}
                onClick={() => setIsReversed(!isReversed)}
              />
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
        group={group}
        language={parseInt(language)}
        changeGroupId={async (id: number | "") => navigate(`/cards/${id}`)}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default CardsPage;
