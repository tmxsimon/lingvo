import { Link } from "react-router-dom";
import Icon from "./Icon";

const Navbar = () => {
  return (
    <div className="fixed top-8 z-10 flex w-screen justify-center">
      <nav className="bg-brand-neutral-100 px-base-lg flex h-16 w-112 items-center justify-between rounded-4xl">
        <Link className="text-brand-300 ml-4 text-2xl font-bold" to="/">
          Lingvo
        </Link>
        <div className="gap-base-sm flex items-center">
          <Link to="/cards">
            <Icon name="cards" className="size-8" />
          </Link>
          <Link to="/dictionary">
            <Icon
              name="bookText"
              className="hover:text-brand-300 size-8 duration-300"
            />
          </Link>
          {/*
          <Link to="/">
            <Icon
              name="globe"
              className="hover:text-brand-300 size-8 duration-300"
            />
          </Link>
          */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
