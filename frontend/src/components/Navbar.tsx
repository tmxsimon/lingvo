import { Link, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { useTheme } from "../contexts/themeProvider";
import { switchLanguage } from "../utils/switchLanguage";
import i18n from "../lib/i18n";
import type ICONS from "../constants/icons";
import { useState } from "react";
import { useLanguageContext } from "../features/languages/contexts/languageProvider";
import { useAuth } from "../features/users/contexts/authProvider";

const Navbar = () => {
  const navigate = useNavigate();

  const { language, clearLanguage } = useLanguageContext();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [lng, setLng] = useState(i18n.language);

  return (
    <div className="fixed top-8 z-50 flex w-screen justify-center">
      <div className="relative flex">
        <nav className="px-base border-brand-neutral-200 backdrop-blur-base flex h-16 w-168 items-center justify-between rounded-4xl border backdrop-brightness-95">
          <Link className="text-brand-300 text-2xl font-bold" to="/">
            lingvo
          </Link>
          <div className="gap-base-sm flex items-center">
            <button
              onClick={() => switchLanguage(setLng)}
              className="cursor-pointer"
            >
              <Icon name={lng as keyof typeof ICONS} className="size-8" />
            </button>
            <button onClick={toggleTheme} className="cursor-pointer">
              <Icon
                className="hover:text-brand-300 size-8"
                name={theme === "dark" ? "moon" : "sun"}
              />
            </button>

            {language && (
              <>
                <Link to="/flippers">
                  <Icon
                    className="hover:text-brand-300 size-8"
                    name="flippers"
                  />
                </Link>
                <Link to="/cards">
                  <Icon className="hover:text-brand-300 size-8" name="cards" />
                </Link>
                <Link to="/dictionary">
                  <Icon
                    className="hover:text-brand-300 size-8"
                    name="dictionary"
                  />
                </Link>
                <Link to="/notes">
                  <Icon className="hover:text-brand-300 size-8" name="notes" />
                </Link>
              </>
            )}
            {user && (
              <Link to="/languages">
                <Icon
                  className="hover:text-brand-300 size-8"
                  name="languages"
                />
              </Link>
            )}
          </div>
        </nav>
        <div className="px-base ml-base-lg border-brand-neutral-200 backdrop-blur-base absolute left-full flex h-16 items-center justify-between rounded-4xl border backdrop-brightness-95">
          {user ? (
            <>
              <div className="gap-base-sm flex">
                <button
                  onClick={() => {
                    clearLanguage();
                    signOut();
                    navigate("/");
                  }}
                  className="cursor-pointer"
                >
                  <Icon
                    name="signOut"
                    className="hover:text-brand-300 size-8 rotate-180"
                  />
                </button>
                {/* <Link to={`/users/${user.id}`} className="cursor-pointer">
                  <Icon name="user" className="hover:text-brand-300 size-8" />
                </Link> */}
              </div>
            </>
          ) : (
            <>
              <div className="gap-base-sm flex">
                <Link
                  className="text-text-secondary hover:text-brand-300 cursor-pointer text-sm"
                  to="/sign-in"
                >
                  <Icon name="signIn" className="hover:text-brand-300 size-8" />
                </Link>
                <Link
                  className="text-text-secondary hover:text-brand-300 cursor-pointer text-sm"
                  to="/sign-up"
                >
                  <Icon name="signUp" className="hover:text-brand-300 size-8" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
