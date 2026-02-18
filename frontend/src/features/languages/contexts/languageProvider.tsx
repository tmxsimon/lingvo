import { createContext, useContext, useState } from "react";
import type { LanguageContextType } from "../types";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "",
  );

  const changeLanguage = (language: string) => {
    setLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
