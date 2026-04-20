type CardProps = {
  isActive: boolean;
  content: string;
  translation: string;
  note?: string;
  reversed?: boolean;
};

const Card = ({
  isActive,
  content,
  translation,
  note,
  reversed = false,
}: CardProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-4xl">{reversed ? translation : content}</div>
      {isActive && (
        <>
          {reversed && <div className="mt-base text-3xl">{content}</div>}
          <div className="mt-base-sm text-gray-neutral-500 max-w-180 text-2xl wrap-break-word">
            {note}
          </div>
          {!reversed && <div className="mt-base text-2xl">{translation}</div>}
        </>
      )}
    </div>
  );
};

export default Card;
