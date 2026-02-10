import { useTranslation } from "react-i18next";
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

const CardText: React.FC = () => {
  const { t } = useTranslation();

  const cards: CardItem[] = [
    {
      icon: ICONS.openBook,
      title: t("home.cards.card1.header"),
      description: t("home.cards.card1.text"),
      bgColor: "bg-brand-100",
      iconColor: "var(--color-brand-300)",
    },
    {
      icon: ICONS.volume,
      title: t("home.cards.card2.header"),
      description: t("home.cards.card2.text"),
      bgColor: "bg-purple-100",
      iconColor: "var(--color-purple-300)",
    },
    {
      icon: ICONS.flame,
      title: t("home.cards.card3.header"),
      description: t("home.cards.card2.text"),
      bgColor: "bg-green-100",
      iconColor: "var(--color-green-300)",
    },
    {
      icon: ICONS.fileText,
      title: t("home.cards.card4.header"),
      description: t("home.cards.card2.text"),
      bgColor: "bg-orange-100",
      iconColor: "var(--color-orange-300)",
    },
  ];

  return (
    <section className="flex flex-col items-center px-6 py-20">
      <div className="mb-base-lg max-w-4xl text-center">
        <p className="text-brand-300 mb-base-lg text-xl font-semibold">
          {t("home.cards.title")}
        </p>
        <h2 className="mb-base-lg gap-base-lg flex flex-col text-5xl font-bold">
          <span>{t("home.cards.subtitle1")}</span>
          <span>{t("home.cards.subtitle2")}</span>
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
