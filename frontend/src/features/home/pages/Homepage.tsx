import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import Button from "../../../components/Button";
// import Shape from "../../../components/Shape";
import CardText from "../components/CardText";
import FaqItem from "../components/FaqItem";
import { toast } from "react-toastify";

const Homepage = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Main section */}
      <div className="gap-base h-screen-no-navbar flex flex-col items-center justify-center overflow-hidden">
        <div className="mb-after-navbar flex items-center justify-center gap-8">
          {/* Hero text — slide in from left */}
          <motion.div
            className="w-3/7"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl font-bold">{t("home.title")}</h1>
            <motion.hr
              className="text-brand-300 mt-base-sm w-1/5 border-3"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            />
            <motion.p
              className="mt-base-lg w-6/7 text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              {t("home.text")}
            </motion.p>
            <motion.div
              className="gap-base mt-base-lg flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              <Button
                text={t("home.getStarted")}
                type="primary"
                theme="brand"
                size="large"
                onClick={() => toast.success("Get started clicked")}
              />
              <Button
                text={t("home.pricing")}
                type="secondary"
                theme="brand"
                size="large"
                onClick={() => toast.info("Pricing clicked")}
              />
            </motion.div>
          </motion.div>

          {/* Hero circle — scale in + float animation */}
          <motion.div
            className="bg-brand-300 size-108 shrink-0 rounded-full"
            initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              animation: undefined,
            }}
          >
            <motion.div
              className="bg-brand-300 size-108 rounded-full"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Cards section — fade in on scroll */}
      <motion.div
        className="bg-brand-100 flex w-full justify-center px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <CardText />
      </motion.div>

      {/* FAQ section — fade in on scroll */}
      <motion.div
        className="flex w-full justify-center px-6 py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <FaqItem />
      </motion.div>
    </>
  );
};

export default Homepage;
