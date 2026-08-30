import { useTranslation } from "react-i18next";
import Loading from "../../../components/Loading";
import FriendsPageSwitch from "../components/FriendsPageSwitch";
import useOwnFriendsPage from "../hooks/useOwnFriendsPage";
import Search from "../../../components/Search";
import PageTitle from "../../../components/PageTitle";

const OwnFriendsPage = () => {
  const { t } = useTranslation();

  const { isLoading, error, allFriendsList, searchValue, setSearchValue } =
    useOwnFriendsPage();

  if (error) return <div>{error?.message}</div>;

  return (
    <>
      <div className="min-h-screen-no-navbar-page flex w-full max-w-192 flex-col items-center">
        <PageTitle title={t("users.friends.myFriends")} />
        <div className="gap-base-sm my-base flex">
          <Search
            value={searchValue}
            placeholder={t("search")}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <FriendsPageSwitch />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-full">
            <div className="mt-base gap-base flex w-full flex-col items-center justify-between">
              {allFriendsList}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OwnFriendsPage;
