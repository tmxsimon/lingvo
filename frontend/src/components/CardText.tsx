import ICONS from "../constants/icons";

const CardText = () => {
  
  const cards = [
    {
      icon: ICONS.bookOpenText,
      title: "Vlastní digitální slovník",
      description: "Sestave si seznamy slovíček přesně podle toho, co se zrovna potřebujete naučit.",
      bgColor: "bg-brand-100",
      iconColor: "#347AD5",
    },
    {
      icon: ICONS.volume,
      title: "Audio výslovnost",
      description: "Nejen čtěte, ale i slyšte. Každý slovíček si můžete přehrát pro správnou výslovnost.",
      bgColor: "bg-[#D9D7FF]",
      iconColor: "#6961F9",
    },
    {
      icon: ICONS.flame,
      title: "Sledování pokroku",
      description: "Diky ukazateli \"Temperature\" přesně vidite, která slova už umite procvičit.",
      bgColor: "bg-[#B8FFC9]",
      iconColor: "#36B354",
    },
    {
      icon: ICONS.fileText,
      title: "Komplexní zápisky",
      description: "Pište si přehledy gramatiky, taháky nebo celé texty. Mějte veškerou teorii přehledně vedle svých slovíček.",
      bgColor: "bg-[#FFE0B2]",
      iconColor: "#C98011",
    },
  ];

  return (
    <div className="flex flex-col items-center px-6 py-20">
      <div className="text-center mb-16 max-w-4xl">
        <p className="text-brand-300 text-xl font-semibold mb-5">JAK APLIKACI VYUŽÍT?</p>
        <h2 className="text-5xl font-bold mb-5 flex flex-col gap-4">
          <p>Cizí jazyk</p>
          <p>bez zbytečného šprtání</p>
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-6 w-full max-w-7xl">
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className="bg-white flex h-90 w-70 flex-col gap-4 rounded-3xl p-8 text-left shadow-md"
            >
              <div className={`${card.bgColor} inline-flex size-12 items-center justify-center rounded-2xl`}>
                <IconComponent 
                  className="w-8 h-8"
                  style={{ stroke: card.iconColor }}
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-2xl font-semibold text-brand-neutral-900">{card.title}</h3>
              <p className="text-[1.05rem] leading-relaxed text-brand-neutral-700">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CardText;