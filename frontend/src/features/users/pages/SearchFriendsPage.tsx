import { useTranslation } from "react-i18next";
import FriendsPageSwitch from "../components/FriendsPageSwitch";
import useSearchFriendsPage from "../hooks/useSearchFriendsPage";
import Search from "../../../components/Search";
import PageTitle from "../../../components/PageTitle";
import IconButton from "../../../components/IconButton";
import Icon from "../../../components/Icon";

const SearchFriendsPage = () => {
  const { t } = useTranslation();

  const {
    error,
    searchError,
    searchInputValue,
    setSearchInputValue,
    searchFriends,
    friendsFoundItems,
  } = useSearchFriendsPage();

  if (error && searchError)
    return <div>{error?.message || searchError?.message}</div>;

  return (
    <>
      <div className="min-h-screen-no-navbar-page flex w-full max-w-192 flex-col items-center">
        <PageTitle title={t("users.friends.searchFriends")} />
        <div className="gap-base-sm my-base flex">
          <Search
            value={searchInputValue}
            placeholder={t("search")}
            onChange={(e) => setSearchInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchFriends(searchInputValue);
              }
            }}
          />
          <IconButton
            icon={<Icon name="search" className="size-6" />}
            onClick={() => searchFriends(searchInputValue!)}
          />
        </div>
        <FriendsPageSwitch />
        <div className="mt-base gap-base flex w-full flex-col items-center justify-between">
          {friendsFoundItems}
        </div>
      </div>
    </>
  );
};

export default SearchFriendsPage;
