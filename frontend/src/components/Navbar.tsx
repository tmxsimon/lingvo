import { Link, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { useLanguageContext } from "../features/languages/contexts/languageProvider";
import { useAuth } from "../features/users/contexts/authProvider";

const NavbarButton = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button onClick={onClick} className={`${className} cursor-pointer`}>
      {children}
    </button>
  );
};

const NavbarLink = ({
  children,
  to,
  className,
}: {
  children: React.ReactNode;
  to: string;
  className?: string;
}) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  const navigate = useNavigate();

  const { language, clearLanguage } = useLanguageContext();
  const { user, signOut } = useAuth();

  return (
    <div className="fixed top-8 z-50 flex w-screen justify-center">
      <div className="relative flex">
        <nav className="px-base border-brand-neutral-200 backdrop-blur-base flex h-16 w-168 items-center justify-between rounded-4xl border backdrop-brightness-95">
          <NavbarLink to="/" className="text-brand-300 text-2xl font-bold">
            lingvo
          </NavbarLink>
          <div className="gap-base-sm flex items-center">
            {language && (
              <>
                <NavbarLink to="/flippers">
                  <Icon
                    className="hover:text-brand-300 size-8"
                    name="flippers"
                  />
                </NavbarLink>
                <NavbarLink to="/cards">
                  <Icon className="hover:text-brand-300 size-8" name="cards" />
                </NavbarLink>
                <NavbarLink to="/dictionary">
                  <Icon
                    className="hover:text-brand-300 size-8"
                    name="dictionary"
                  />
                </NavbarLink>
                <NavbarLink to="/notes">
                  <Icon className="hover:text-brand-300 size-8" name="notes" />
                </NavbarLink>
              </>
            )}
            {user && (
              <NavbarLink to="/languages">
                <Icon
                  className="hover:text-brand-300 size-8"
                  name="languages"
                />
              </NavbarLink>
            )}
          </div>
        </nav>
        <div className="px-base ml-base-lg border-brand-neutral-200 backdrop-blur-base absolute left-full flex h-16 items-center justify-between rounded-4xl border backdrop-brightness-95">
          {user ? (
            <>
              <div className="gap-base-sm flex">
                <NavbarButton
                  onClick={() => {
                    clearLanguage();
                    signOut();
                    navigate("/");
                  }}
                >
                  <Icon
                    name="signOut"
                    className="hover:text-brand-300 size-8 rotate-180"
                  />
                </NavbarButton>
                <NavbarLink to="/users/me">
                  {/*to={`/users/${user.id}`} */}
                  <Icon name="user" className="hover:text-brand-300 size-8" />
                </NavbarLink>
              </div>
            </>
          ) : (
            <>
              <div className="gap-base-sm flex">
                <NavbarLink
                  className="text-text-secondary hover:text-brand-300 cursor-pointer text-sm"
                  to="/sign-in"
                >
                  <Icon name="signIn" className="hover:text-brand-300 size-8" />
                </NavbarLink>
                <NavbarLink
                  className="text-text-secondary hover:text-brand-300 cursor-pointer text-sm"
                  to="/sign-up"
                >
                  <Icon name="signUp" className="hover:text-brand-300 size-8" />
                </NavbarLink>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
