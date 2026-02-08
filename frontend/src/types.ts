export type SelectOptionType = {
  value: string | number | readonly string[] | undefined;
  text: string;
};

export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};
