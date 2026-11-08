import { useTranslation } from "react-i18next";
import PageTitle from "../../../components/PageTitle";
import SearchWithButton from "../../../components/SearchWithButton";
import LanguagesPageSwitch from "../components/LanguagesPageSwitch";
import { useNavigate } from "react-router-dom";
import useSearchLanguagesPage from "../hooks/useSearchLanguagesPage";
import { Reorder } from "motion/react";
import Language from "../components/Language";
import Loading from "../../../components/Loading";

const SearchLanguagesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { error, handleSearchLanguages, languagesFound, isLoading } =
    useSearchLanguagesPage();

  if (error) return <div>{error?.message}</div>;

  return (
    <>
      <div className="min-h-screen-no-navbar-page gap-base flex w-full max-w-192 flex-col items-center">
        <PageTitle title={t("languages.searchLanguages")} />
        <SearchWithButton onSearch={(value) => handleSearchLanguages(value)} autoFocus />
        <LanguagesPageSwitch
          onClickLeftButton={() => navigate("/languages")}
          onClickRightButton={() => navigate("/languages/search")}
        />
        <div className="mt-base gap-base flex w-full flex-col items-center justify-between">
          {isLoading ? (
            <Loading />
          ) : (
            <Reorder.Group
              values={languagesFound}
              onReorder={() => {}}
              className="gap-base flex w-full flex-col items-center"
            >
              {languagesFound.map((language) => (
                <Language
                  key={language.id}
                  language={language}
                  isSearchResult
                />
              ))}
            </Reorder.Group>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchLanguagesPage;
