import { Link } from "react-router-dom";
import Icon from "./Icon";
import { useTheme } from "../contexts/themeProvider";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-8 z-10 flex w-screen justify-center">
      <nav className="bg-brand-neutral-100 px-base-lg flex h-16 w-112 items-center justify-between rounded-4xl">
        <Link className="text-brand-300 text-2xl font-bold" to="/">
          Lingvo
        </Link>
        <div className="gap-base-sm flex items-center">
          <Icon
            className="hover:text-brand-300 size-8 cursor-pointer"
            name={theme === "dark" ? "moon" : "sun"}
            onClick={toggleTheme}
          ></Icon>
          <Link to="/cards">
            <Icon className="hover:text-brand-300 size-8" name="cards" />
          </Link>
          <Link to="/dictionary">
            <Icon className="hover:text-brand-300 size-8" name="dictionary" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
