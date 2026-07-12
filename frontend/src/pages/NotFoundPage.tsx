import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pb-base-lg h-screen-no-navbar-page flex">
      <h1 className="mt-52 text-5xl">{t("pageNotFound")}</h1>
    </div>
  );
};

export default NotFoundPage;
