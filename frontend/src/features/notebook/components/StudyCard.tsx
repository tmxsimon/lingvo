import Icon from "../../../components/Icon";

type StudyCardProps = {
  title: string;
  category: "vocabulary" | "grammar" | "pronunciation";
  description: string;
  date: string;
};

const categoryStyles = {
  vocabulary: {
    border: "border-brand-200",
    bottom: "bg-brand-200",
    badge: "bg-brand-300",
  },
  grammar: {
    border: "border-green-200",
    bottom: "bg-green-200",
    badge: "bg-green-300",
  },
  pronunciation: {
    border: "border-orange-100",
    bottom: "bg-orange-100",
    badge: "bg-orange-300",
  },
};

const categoryLabels = {
  vocabulary: "vocabulary",
  grammar: "grammar",
  pronunciation: "pronunciation",
};

const StudyCard = ({ title, category, description, date }: StudyCardProps) => {
  const styles = categoryStyles[category];
  const label = categoryLabels[category];

  return (
    <div className={`w-full max-w-md flex flex-col bg-white rounded-4xl overflow-hidden border-4 ${styles.border} shadow-lg`}>
      <div className="flex-1 p-9 pb-6 ">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <div className="mb-4">
          <span className={`${styles.badge} text-white text-sm font-semibold px-4 py-2 rounded-full inline-block`}>
            {label}
          </span>
        </div>
        <p className="text-neutral-500 text-sm leading-relaxed mb-4">{description}</p>
        <div className="border-t border-neutral-400 pt-4">
          <div className="flex items-center gap-base-sm text-base text-neutral-500">
            <div className="size-5">
              <Icon name="clock" />
            </div>
            {date}
          </div>
        </div>
      </div>
      <div className={`h-12 ${styles.bottom}`}></div>
    </div>
  );
};

export default StudyCard;
