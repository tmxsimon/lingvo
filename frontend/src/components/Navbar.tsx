import { Link, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { useLanguageContext } from "../features/languages/contexts/languageProvider";
import { useAuth } from "../features/users/contexts/authProvider";
import { useEffect, useState } from "react";
import type { iconsType } from "../constants/icons";

const NavbarButton = ({
  children,
  onClick,
  closeMenu,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  closeMenu?: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={() => {
        onClick();
        closeMenu?.();
      }}
      className={`${className} cursor-pointer`}
    >
      {children}
    </button>
  );
};

const NavbarLink = ({
  children,
  to,
  closeMenu,
  className,
}: {
  children: React.ReactNode;
  to: string;
  closeMenu: () => void;
  className?: string;
}) => {
  return (
    <Link to={to} onClick={closeMenu} className={className}>
      {children}
    </Link>
  );
};

// the code is pretty messy
// i promise i'll fix it
const Navbar = () => {
  const navigate = useNavigate();

  const { language, clearLanguage } = useLanguageContext();
  const { user, signOut } = useAuth();

  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const switchMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const closeMenu = () => {
    if (isMenuOpened) setIsMenuOpened(false);
  };

  useEffect(() => {
    if (isMenuOpened) {
      document.documentElement.classList.add("overflow-y-hidden");
    } else {
      document.documentElement.classList.remove("overflow-y-hidden");
    }
  }, [isMenuOpened]);

  const links = {
    withLanguage: [
      {
        link: "/flippers",
        iconName: "flippers",
      },
      { link: "/cards", iconName: "cards" },
      { link: "/dictionary", iconName: "dictionary" },
      { link: "/notes", iconName: "notes" },
    ],
    withUser: [{ link: "/languages", iconName: "languages" }],
  };

  const linksWithLanguage =
    language &&
    user &&
    links.withLanguage.map((link, index) => {
      return (
        <NavbarLink key={index} closeMenu={closeMenu} to={link.link}>
          <Icon
            className="hover:text-brand-300 size-8"
            name={link.iconName as iconsType}
          />
        </NavbarLink>
      );
    });

  const linksWithUser = user && (
    <>
      {links.withUser.map((link, index) => {
        return (
          <NavbarLink key={index} closeMenu={closeMenu} to={link.link}>
            <Icon
              className="hover:text-brand-300 size-8"
              name={link.iconName as iconsType}
            />
          </NavbarLink>
        );
      })}
    </>
  );

  const authButtons = user ? (
    <>
      <NavbarButton
        onClick={() => {
          clearLanguage();
          signOut();
          navigate("/");
        }}
        closeMenu={closeMenu}
      >
        <Icon
          name="signOut"
          className="hover:text-brand-300 size-8 rotate-180"
        />
      </NavbarButton>
      <NavbarLink to="/users/me" closeMenu={closeMenu}>
        <Icon name="user" className="hover:text-brand-300 size-8" />
      </NavbarLink>
    </>
  ) : (
    <>
      <NavbarLink
        to="/sign-in"
        closeMenu={closeMenu}
        className="text-text-secondary hover:text-brand-300 cursor-pointer text-sm"
      >
        <Icon name="signIn" className="hover:text-brand-300 size-8" />
      </NavbarLink>
      <NavbarLink
        to="/sign-up"
        closeMenu={closeMenu}
        className="text-text-secondary hover:text-brand-300 cursor-pointer text-sm"
      >
        <Icon name="signUp" className="hover:text-brand-300 size-8" />
      </NavbarLink>
    </>
  );

  return (
    <>
      <div className="px-base fixed top-8 z-50 flex w-screen items-center justify-center">
        <div className="flex w-full items-center justify-center">
          <nav className="relative flex h-16 w-full max-w-118">
            <div className="border-brand-neutral-200 backdrop-blur-base px-base flex w-full items-center justify-between rounded-4xl border backdrop-brightness-95">
              <NavbarLink
                to="/"
                closeMenu={closeMenu}
                className="text-brand-300 text-2xl font-bold"
              >
                lingvo
              </NavbarLink>
              <div className="flex">
                {/* desktop menu */}
                <div className="gap-base-sm hidden md:flex">
                  {linksWithLanguage}
                  {linksWithUser}
                </div>
              </div>
              <NavbarButton
                onClick={switchMenu}
                className="z-100 hover:cursor-pointer md:hidden"
              >
                <Icon
                  name={isMenuOpened ? "close" : "menu"}
                  className="z-100 size-8"
                />
              </NavbarButton>
            </div>
            <div className="px-base ml-base-lg border-brand-neutral-200 gap-base-sm backdrop-blur-base absolute left-full hidden h-16 items-center justify-between rounded-4xl border backdrop-brightness-95 md:flex">
              {authButtons}
            </div>
          </nav>
        </div>
      </div>

      {/* mobile menu */}
      {/* must be outside of the navbar because of the blur logic */}
      {isMenuOpened && (
        <>
          <NavbarButton
            onClick={switchMenu}
            className="absolute top-5 right-5 z-150 hover:cursor-pointer md:hidden"
          >
            <Icon
              name={isMenuOpened ? "close" : "menu"}
              className="z-100 size-8"
            />
          </NavbarButton>
          <div className="space-y-base backdrop-blur-base absolute inset-0 z-100 flex h-screen w-screen flex-col items-center justify-center backdrop-brightness-10 md:hidden">
            {linksWithLanguage}
            {linksWithUser}
            <div className="mt-base space-y-base">{authButtons}</div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
