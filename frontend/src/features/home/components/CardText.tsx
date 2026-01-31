import ICONS from "../../../constants/icons";

interface CardItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

interface CardProps {
  card: CardItem;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const IconComponent = card.icon;

  return (
    <div className="gap-base flex h-90 w-70 flex-col rounded-3xl bg-white p-8 text-left shadow-md">
      <div
        className={`${card.bgColor} inline-flex size-12 items-center justify-center rounded-2xl`}
      >
        <IconComponent
          className="h-8 w-8"
          style={{ stroke: card.iconColor }}
          strokeWidth={2}
        />
      </div>
      <h3 className="text-brand-neutral-900 text-2xl font-semibold">
        {card.title}
      </h3>
      <p className="text-brand-neutral-700 text-base leading-relaxed">
        {card.description}
      </p>
    </div>
  );
};

const CardText: React.FC = () => {
  const cards: CardItem[] = [
    {
      icon: ICONS.openBook,
      title: "Vlastní digitální slovník",
      description:
        "Sestave si seznamy slovíček přesně podle toho, co se zrovna potřebujete naučit.",
      bgColor: "bg-brand-100",
      iconColor: "var(--color-brand-300)",
    },
    {
      icon: ICONS.volume,
      title: "Audio výslovnost",
      description:
        "Nejen čtěte, ale i slyšte. Každý slovíček si můžete přehrát pro správnou výslovnost.",
      bgColor: "bg-purple-100",
      iconColor: "var(--color-purple-300)",
    },
    {
      icon: ICONS.flame,
      title: "Sledování pokroku",
      description:
        'Diky ukazateli "Temperature" přesně vidite, která slova už umite procvičit.',
      bgColor: "bg-green-100",
      iconColor: "var(--color-green-300)",
    },
    {
      icon: ICONS.fileText,
      title: "Komplexní zápisky",
      description:
        "Pište si přehledy gramatiky, taháky nebo celé texty. Mějte veškerou teorii přehledně vedle svých slovíček.",
      bgColor: "bg-orange-100",
      iconColor: "var(--color-orange-300)",
    },
  ];

  return (
    <section className="flex flex-col items-center px-6 py-20">
      <div className="mb-base-lg max-w-4xl text-center">
        <p className="text-brand-300 mb-base-lg text-xl font-semibold">
          JAK APLIKACI VYUŽÍT?
        </p>
        <h2 className="mb-base-lg gap-base-lg flex flex-col text-5xl font-bold">
          <span>Cizí jazyk</span>
          <span>bez zbytečného šprtání</span>
        </h2>
      </div>
      <div className="gap-base-lg grid w-full max-w-7xl grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
};

export default CardText;
