import { Link } from "react-router-dom";
import Icon from "./Icon";

const Navbar = () => {
  return (
    <div className="fixed top-8 flex w-screen justify-center">
      <nav className="bg-glass flex h-16 w-112 items-center justify-between rounded-4xl border border-white px-6 backdrop-blur-sm">
        <div className="text-2xl">Lingvo</div>
        <div className="gap-base-sm flex">
          <Link to="/languages">
            <Icon name="globe" className="size-8" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
