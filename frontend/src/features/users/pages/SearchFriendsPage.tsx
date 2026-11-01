import { useTranslation } from "react-i18next";
import FriendsPageSwitch from "../components/FriendsPageSwitch";
import useSearchFriendsPage from "../hooks/useSearchFriendsPage";
import PageTitle from "../../../components/PageTitle";
import SearchWithButton from "../../../components/SearchWithButton";

const SearchFriendsPage = () => {
  const { t } = useTranslation();

  const { error, searchError, searchFriends, friendsFoundItems } =
    useSearchFriendsPage();

  if (error && searchError)
    return <div>{error?.message || searchError?.message}</div>;

  return (
    <>
      <div className="min-h-screen-no-navbar-page gap-base flex w-full max-w-192 flex-col items-center">
        <PageTitle title={t("users.friends.searchFriends")} />
        <SearchWithButton onSearch={(value) => searchFriends(value)} />
        <FriendsPageSwitch />
        <div className="mt-base gap-base flex w-full flex-col items-center justify-between">
          {friendsFoundItems}
        </div>
      </div>
    </>
  );
};

export default SearchFriendsPage;
