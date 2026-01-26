interface FaqQuestion {
  question: string;
  answer: string;
}

interface FaqItemProps {
  faq: FaqQuestion;
}

const FaqItemComponent: React.FC<FaqItemProps> = ({ faq }) => {
  return (
    <details className="border-b borde pb-base">
      <summary className="cursor-pointer font-semibold text-base flex justify-between items-center py-base-sm">
        {faq.question}
        <span className="text-lg">▼</span>
      </summary>
      <p className="text-neutral-500 text-sm mt-base-sm">{faq.answer}</p>
    </details>
  );
};

interface FaqHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

const FaqHeader: React.FC<FaqHeaderProps> = ({ title, subtitle, description }) => {
  return (
    <div className="text-center mb-base-lg">
      <p className="text-brand-300 text-xl font-semibold mb-base">{title}</p>
      <h2 className="text-5xl font-bold mb-base-lg flex flex-col gap-md">
        <span>{subtitle}</span>
        <span>My na ně odpovíme.</span>
      </h2>
      <p className="text-neutral-400 text-base text-center max-w-md mx-auto">
        {description}
      </p>
    </div>
  );
};

const FaqItem: React.FC = () => {
  const faqs: FaqQuestion[] = [
    {
      question: "Co je Lingvo?",
      answer: "Lingvo je moderní aplikace pro studium cizích jazyků, která kombinuje digitální slovník, audio výslovnost a pokročilé sledování pokroku."
    },
    {
      question: "Je aplikace zdarma?",
      answer: "Ano, základní verze aplikace je zcela zdarma. Nabízíme také prémiové funkce za symbolickou cenu."
    },
    {
      question: "Pro koho je tato aplikace určena?",
      answer: "Aplikace je určena pro všechny, kteří se chtějí učit cizí jazyky - od začátečníků až po pokročilé studenty."
    },
    {
      question: "Funguje web i na mobilu nebo tabletu?",
      answer: "Ano, aplikace je plně responzivní a funguje na všech zařízeních - počítači, tabletu i mobilním telefonu."
    },
    {
      question: "Můži si aplikaci přizpůsobit pro jakýkoliv jazyk?",
      answer: "Ano, můžete si vytvářet vlastní slovníky pro jakýkoliv jazyk, který chcete studovat."
    }
  ];

  return (
    <section className="max-w-3xl w-full">
      <FaqHeader 
        title="CO VÁS JEŠTĚ MŮŽE ZAJÍMAT?" 
        subtitle="Máte otázky?"
        description="Odpovědi na často kladené otázky, které Vám pomohou lépe porozumět jak aplikace funguje."
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

