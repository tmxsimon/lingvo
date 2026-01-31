type FaqQuestion = {
  question: string;
  answer: string;
};

type FaqItemProps = {
  faq: FaqQuestion;
};

const FaqItemComponent: React.FC<FaqItemProps> = ({ faq }) => {
  return (
    <details className="borde pb-base border-b">
      <summary className="py-base-sm flex cursor-pointer items-center justify-between text-base font-semibold">
        {faq.question}
        <span className="text-lg">▼</span>
      </summary>
      <p className="mt-base-sm text-sm text-neutral-500">{faq.answer}</p>
    </details>
  );
};

type FaqHeaderProps = {
  title: string;
  subtitle: string;
  description: string;
};

const FaqItem: React.FC = () => {
  const faqs: FaqQuestion[] = [
    {
      question: "What is Lingvo?",
      answer:
        "Lingvo is a modern language-learning app that combines a digital dictionary, audio pronunciation, and advanced progress tracking.",
    },
    {
      question: "Is the app free?",
      answer:
        "Yes, the basic version of the app is completely free. We also offer premium features for a small fee.",
    },
    {
      question: "Who is this app for?",
      answer:
        "The app is designed for anyone who wants to learn foreign languages — from beginners to advanced learners.",
    },
    {
      question: "Does the website work on mobile and tablet?",
      answer:
        "Yes, the app is fully responsive and works on all devices — desktop, tablet, and mobile phone.",
    },
    {
      question: "Can I customize the app for any language?",
      answer:
        "Yes, you can create your own dictionaries for any language you want to study.",
    },
  ];

  const FaqHeader: React.FC<FaqHeaderProps> = ({
    title,
    subtitle,
    description,
  }) => {
    return (
      <div className="mb-base-lg text-center">
        <p className="text-brand-300 mb-base text-xl font-semibold">{title}</p>
        <h2 className="mb-base-lg gap-md flex flex-col text-5xl font-bold">
          <span>{subtitle}</span>
          <span>We have the answers.</span>
        </h2>
        <p className="mx-auto max-w-md text-center text-base text-neutral-400">
          {description}
        </p>
      </div>
    );
  };

  return (
    <section className="w-full max-w-3xl">
      <FaqHeader
        title="WHAT ELSE MIGHT YOU WANT TO KNOW?"
        subtitle="Do you have questions?"
        description="Answers to frequently asked questions that will help you better understand how the app works."
      />

      <div className="space-y-base">
        {faqs.map((faq) => (
          <FaqItemComponent key={faq.question} faq={faq} />
        ))}
      </div>
    </section>
  );
};

export default FaqItem;
