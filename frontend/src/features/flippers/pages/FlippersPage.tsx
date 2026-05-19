import useModal from "../../../hooks/useModal";
import Icon from "../../../components/Icon";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";
import { useLanguageContext } from "../../languages/contexts/languageProvider";
import Flippers from "../components/Flippers";
import ModalChangeGroup from "../components/modals/ModalChangeGroup";
import { Tooltip } from "react-tooltip";
import useFetchFlippers from "../hooks/useFetchFlippers";

const FlippersPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { language } = useLanguageContext();
  const { groupId } = useParams();

  const { isOpen, openModal, closeModal } = useModal();

  const { flippersPages, group, isLoading, error } = useFetchFlippers(
    groupId ? parseInt(groupId) : null,
    parseInt(language),
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
        {flippersPages ? (
          <div className="mt-12 flex h-full flex-col items-center justify-between">
            <Flippers flippersPages={flippersPages} />
          </div>
        ) : (
          <div className="text-gray-neutral-300 text-4xl">
            {t("cards.entriesNotFound")}
          </div>
        )}
      </div>

      <Tooltip id="note-tooltip" className="z-50 max-w-92 break-all" />

      {/* modals */}
      <ModalChangeGroup
        group={group}
        language={parseInt(language)}
        changeGroupId={(id) => {
          closeModal();
          navigate(`/flippers/${id}`);
        }}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default FlippersPage;
