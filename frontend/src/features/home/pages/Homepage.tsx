import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../users/contexts/authProvider";

const Homepage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <div className="h-screen-no-navbar-page flex items-center justify-center">
        <div className="mb-after-navbar flex items-center justify-center gap-24">
          <motion.div
            className="flex max-w-260 min-w-100 flex-col items-center text-center md:text-left lg:items-start"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl font-bold">{t("home.title")}</h1>
            <motion.hr
              className="text-brand-300 mt-base-sm w-72 border-3 lg:w-42"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            />
            <motion.div
              className="mt-base-lg w-6/7 text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              {t("home.text")}
            </motion.div>
            <motion.div
              className="gap-base mt-base-lg flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              <Button
                text={t("home.getStarted")}
                style="primary"
                theme="brand"
                size="large"
                onClick={() => navigate(`${user ? "/languages" : "/sign-up"}`)}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden w-full max-w-96 lg:block"
            initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              animation: undefined,
            }}
          >
            <motion.div
              className="bg-brand-300 aspect-square rounded-full"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
