type CardProps = {
  isActive: boolean;
  content: string;
  translation: string;
};

const Card = ({ isActive, content, translation }: CardProps) => {
  return (
    <div className="text-center">
      <div className="text-4xl">{content}</div>
      {isActive && <div className="mt-base text-3xl">{translation}</div>}
    </div>
  );
};

export default Card;
