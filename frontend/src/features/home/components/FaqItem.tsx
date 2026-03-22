import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";

type FaqQuestion = {
  question: string;
  answer: string;
};

type FaqItemProps = {
  faq: FaqQuestion;
  index: number;
};

const FaqItemComponent: React.FC<FaqItemProps> = ({ faq, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-b"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        className="py-base-sm flex w-full cursor-pointer items-center justify-between text-left text-base font-semibold"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {faq.question}
        <motion.span
          className="text-lg shrink-0 ml-4"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="mt-base-sm pb-base text-sm text-neutral-500">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FaqItem: React.FC = () => {
  const { t } = useTranslation();

  const faqs: FaqQuestion[] = [
    {
      question: t("home.faq.faq1.question"),
      answer: t("home.faq.faq1.answer"),
    },
    {
      question: t("home.faq.faq2.question"),
      answer: t("home.faq.faq2.answer"),
    },
    {
      question: t("home.faq.faq3.question"),
      answer: t("home.faq.faq3.answer"),
    },
    {
      question: t("home.faq.faq4.question"),
      answer: t("home.faq.faq4.answer"),
    },
    {
      question: t("home.faq.faq5.question"),
      answer: t("home.faq.faq5.answer"),
    },
  ];

  return (
    <section className="w-full max-w-3xl">
      <motion.div
        className="mb-base-lg text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-brand-300 mb-base text-xl font-semibold">
          {t("home.faq.title")}
        </p>
        <h2 className="mb-base-lg gap-md flex flex-col text-5xl font-bold">
          <span>{t("home.faq.subtitle1")}</span>
          <span>{t("home.faq.subtitle2")}</span>
        </h2>
        <p className="mx-auto max-w-md text-center text-base text-neutral-400">
          {t("home.faq.text")}
        </p>
      </motion.div>

      <div className="space-y-base">
        {faqs.map((faq, i) => (
          <FaqItemComponent key={faq.question} faq={faq} index={i} />
        ))}
      </div>
    </section>
  );
};

export default FaqItem;
