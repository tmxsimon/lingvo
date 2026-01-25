import { Link } from "react-router-dom";
import Icon from "./Icon";

const Navbar = () => {
  return (
    <div className="fixed top-8 z-10 flex w-screen justify-center">
      <nav className="bg-brand-neutral-100 px-base-lg flex h-16 w-112 items-center justify-between rounded-4xl">
        <Link className="text-2xl text-brand-300 font-bold ml-4" to="/">
          Lingvo
        </Link>
        <div className="gap-4 flex items-center mr-4">
          <Link to="/dictionary">
            <Icon name="bookText" className="size-8 hover:text-brand-300 duration-300" />
          </Link>
          <Link to="/">
            <Icon name="globe" className="size-8 hover:text-brand-300 duration-300" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
