type CardProps = {
  isActive: boolean;
  content: string;
  translation: string;
  note?: string;
};

const Card = ({ isActive, content, translation, note }: CardProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-4xl">{content}</div>
      {isActive && (
        <>
          <div className="mt-base text-3xl">{translation}</div>
          {note && (
            <div className="mt-base-sm text-gray-neutral-500 max-w-180 text-2xl wrap-break-word">
              {note}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Card;
