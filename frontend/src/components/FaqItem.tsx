interface FaqQuestion {
  question: string;
  answer: string;
}

const FaqItem = () => {
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
      <div className="max-w-3xl w-full">
        <div className="text-center mb-16">
          <p className="text-brand-300 text-xl font-semibold mb-4">CO VÁS JEŠTĚ MŮŽE ZAJÍMAT?</p>
          <h2 className="text-5xl font-bold mb-6 flex flex-col gap-4">
            <p>Máte otázky?</p>
            <p>My na ně odpovíme.</p>
          </h2>
          <p className="text-neutral-400 text-[1.05rem] text-center max-w-[415px] mx-auto">
            Odpovědi na často kladené otázky, které Vám pomohou lépe porozumět jak aplikace funguje.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="border-b border-gray-300 pb-4">
              <summary className="cursor-pointer font-semibold text-base flex justify-between items-center py-2">
                {faq.question}
                <span className="text-lg">▼</span>
              </summary>
              <p className="text-gray-600 text-sm mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
  );
};

export default FaqItem;

