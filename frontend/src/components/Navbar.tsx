import { Link, useParams } from "react-router-dom";
import Icon from "./Icon";
import { useTheme } from "../contexts/themeProvider";
import { switchLanguage } from "../utils/switchLanguage";
import i18n from "../lib/i18n";
import type ICONS from "../constants/icons";
import { useState } from "react";
import { useLanguageContext } from "../features/languages/contexts/languageProvider";

const Navbar = () => {
  const { language } = useLanguageContext();

  const { theme, toggleTheme } = useTheme();
  const [lng, setLng] = useState(i18n.language);

  return (
    <div className="fixed top-8 z-10 flex w-screen justify-center">
      <nav className="bg-brand-neutral-100 px-base-lg flex h-16 w-112 items-center justify-between rounded-4xl">
        <Link className="text-brand-300 text-2xl font-bold" to="/">
          Lingvo
        </Link>
        <div className="gap-base-sm flex items-center">
          <div
            className="size-8 cursor-pointer"
            onClick={() => switchLanguage(setLng)}
          >
            <Icon name={lng as keyof typeof ICONS} />
          </div>
          <Icon
            className="hover:text-brand-300 size-8 cursor-pointer"
            name={theme === "dark" ? "moon" : "sun"}
            onClick={toggleTheme}
          ></Icon>
          {language && (
            <>
              <Link to="/cards">
                <Icon className="hover:text-brand-300 size-8" name="cards" />
              </Link>
              <Link to="/dictionary">
                <Icon
                  className="hover:text-brand-300 size-8"
                  name="dictionary"
                />
              </Link>
            </>
          )}
          <Link to="/languages">
            <Icon className="hover:text-brand-300 size-8" name="languages" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
