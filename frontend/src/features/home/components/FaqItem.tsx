import { useTranslation } from "react-i18next";

type FaqQuestion = {
  question: string;
  answer: string;
};

type FaqItemProps = {
  faq: FaqQuestion;
};

const FaqItemComponent: React.FC<FaqItemProps> = ({ faq }) => {
  return (
    <details className="pb-base border-b">
      <summary className="py-base-sm flex cursor-pointer items-center justify-between text-base font-semibold">
        {faq.question}
        <span className="text-lg">▼</span>
      </summary>
      <p className="mt-base-sm text-sm text-neutral-500">{faq.answer}</p>
    </details>
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
      <div className="mb-base-lg text-center">
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
      </div>

      <div className="space-y-base">
        {faqs.map((faq) => (
          <FaqItemComponent key={faq.question} faq={faq} />
        ))}
      </div>
    </section>
  );
};

export default FaqItem;
