import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import ICONS from "../../../constants/icons";

type CardItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
  index: number;
};

type CardProps = {
  card: CardItem;
};

const Card: React.FC<CardProps> = ({ card }) => {
  const IconComponent = card.icon;

  return (
    <motion.div
      className="gap-base bg-bg flex h-90 w-70 flex-col rounded-3xl p-8 text-left shadow-md"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: card.index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12)" }}
    >
      <motion.div
        className={`${card.bgColor} inline-flex size-12 items-center justify-center rounded-2xl`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <IconComponent
          className="h-8 w-8"
          style={{ stroke: card.iconColor }}
          strokeWidth={2}
        />
      </motion.div>
      <h3 className="text-brand-neutral-900 text-2xl font-semibold">
        {card.title}
      </h3>
      <p className="text-brand-neutral-700 text-base leading-relaxed">
        {card.description}
      </p>
    </motion.div>
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
      index: 0,
    },
    {
      icon: ICONS.volume,
      title: t("home.cards.card2.header"),
      description: t("home.cards.card2.text"),
      bgColor: "bg-purple-100",
      iconColor: "var(--color-purple-300)",
      index: 1,
    },
    {
      icon: ICONS.flame,
      title: t("home.cards.card3.header"),
      description: t("home.cards.card2.text"),
      bgColor: "bg-green-100",
      iconColor: "var(--color-green-300)",
      index: 2,
    },
    {
      icon: ICONS.fileText,
      title: t("home.cards.card4.header"),
      description: t("home.cards.card2.text"),
      bgColor: "bg-orange-100",
      iconColor: "var(--color-orange-300)",
      index: 3,
    },
  ];

  return (
    <section className="flex flex-col items-center px-6 py-20">
      <motion.div
        className="mb-base-lg max-w-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-brand-300 mb-base-lg text-xl font-semibold">
          {t("home.cards.title")}
        </p>
        <h2 className="mb-base-lg gap-base-lg flex flex-col text-5xl font-bold">
          <span>{t("home.cards.subtitle1")}</span>
          <span>{t("home.cards.subtitle2")}</span>
        </h2>
      </motion.div>

      <div className="gap-base-lg grid w-full max-w-7xl grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
};

export default CardText;
