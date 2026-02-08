import ICONS from "../../../constants/icons";

type CardItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
};

type CardProps = {
  card: CardItem;
};

const Card: React.FC<CardProps> = ({ card }) => {
  const IconComponent = card.icon;

  return (
    <div className="gap-base bg-bg flex h-90 w-70 flex-col rounded-3xl p-8 text-left shadow-md">
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

const cards: CardItem[] = [
  {
    icon: ICONS.openBook,
    title: "Your own digital dictionary",
    description:
      "Create vocabulary lists exactly according to what you need to learn right now.",
    bgColor: "bg-brand-100",
    iconColor: "var(--color-brand-300)",
  },
  {
    icon: ICONS.volume,
    title: "Audio pronunciation",
    description:
      "Don’t just read — listen too. You can play every word to hear the correct pronunciation.",
    bgColor: "bg-purple-100",
    iconColor: "var(--color-purple-300)",
  },
  {
    icon: ICONS.flame,
    title: "Progress tracking",
    description:
      'Thanks to the "Temperature" indicator, you can clearly see which words you already know well enough to practice.',
    bgColor: "bg-green-100",
    iconColor: "var(--color-green-300)",
  },
  {
    icon: ICONS.fileText,
    title: "Comprehensive notes",
    description:
      "Write grammar summaries, cheat sheets, or full texts. Keep all your theory clearly organized next to your vocabulary.",
    bgColor: "bg-orange-100",
    iconColor: "var(--color-orange-300)",
  },
];
const CardText: React.FC = () => {
  return (
    <section className="flex flex-col items-center px-6 py-20">
      <div className="mb-base-lg max-w-4xl text-center">
        <p className="text-brand-300 mb-base-lg text-xl font-semibold">
          HOW TO USE THE APP?
        </p>
        <h2 className="mb-base-lg gap-base-lg flex flex-col text-5xl font-bold">
          <span>Learn a foreign language</span>
          <span>without pointless cramming</span>
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
