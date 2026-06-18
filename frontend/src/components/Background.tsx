import { useTheme } from "../contexts/themeProvider";

const Background = () => {
  const { theme } = useTheme();

  const radialGradient =
    theme == "light"
      ? "radial-gradient(circle, rgba(0, 0, 0, 0.2) 1.5px, transparent 1.5px)"
      : "radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)";

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background: "var(--color-bg)",
        backgroundImage: radialGradient,
        backgroundSize: "30px 30px",
        backgroundPosition: "0 0",
      }}
    />
  );
};

export default Background;
