import { Link } from "react-router-dom";
import Icon from "./Icon";

const Navbar = () => {
  return (
    <div className="fixed top-8 z-50 flex w-screen justify-center">
      <nav className="flex h-16 w-112 items-center justify-between rounded-4xl bg-neutral-100 px-6">
        <div className="text-2xl">Lingvo</div>
        <div className="gap-base-sm flex items-center">
          <Link to="/languages">
            <Icon name="globe" className="size-8" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
