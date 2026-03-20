import { Slide, ToastContainer } from "react-toastify";
import { useTheme } from "../contexts/themeProvider";

const ToastNotifications = () => {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="bottom-center"
      transition={Slide}
      pauseOnHover={false}
      closeButton={false}
      autoClose={3000}
      closeOnClick
      theme={theme === "light" ? "light" : "dark"}
    />
  );
};

export default ToastNotifications;
