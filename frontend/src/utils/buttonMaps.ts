export const buttonColorMap: Record<string, Record<string, string>> = {
  brand: {
    primary: "bg-brand-300 text-white",
    secondary: "bg-brand-100 text-brand-300",
    tertiary: "border border-brand-300 text-brand-300",
  },
  neutral: {
    primary: "bg-neutral-400 text-white",
    secondary: "bg-neutral-100 text-neutral-400",
    tertiary: "border border-neutral-400 text-neutral-400",
  },
  warning: {
    primary: "bg-warning-300 text-white",
    secondary: "bg-warning-100 text-warning-300",
    tertiary: "border border-warning-300 text-warning-300",
  },
  danger: {
    primary: "bg-danger-300 text-white",
    secondary: "bg-danger-100 text-danger-300",
    tertiary: "border border-danger-300 text-danger-300",
  },
};

export const buttonHeightMap: Record<string, string> = {
  small: "h-8",
  medium: "h-10",
  large: "h-12",
};
