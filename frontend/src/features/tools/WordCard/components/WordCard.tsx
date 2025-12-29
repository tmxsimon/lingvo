import { useState } from "react";
import { motion } from "motion/react";

type CardProps = {
  frontText: string;
  backText: string;
  onDontKnow: () => void;
  onKnow: () => void;
};

const CardButton = ({
  text,
  onClick,
  className = "",
}: {
  text: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`rounded-base-lg cursor-pointer bg-radial-(--primary-gradient) py-4 text-2xl text-white ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const Card = ({ frontText, backText, onDontKnow, onKnow }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const durationSeconds = 0.3;

  const animationProps = {
    animate: { rotateY: isFlipped ? 180 : 0 },
    transition: { duration: durationSeconds },
  };

  const handleFlipClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="rounded-base-lg bg-glass border-glass h-112 w-96 border px-4 pt-12 pb-8"
      {...animationProps}
    >
      <motion.div className="relative h-full w-full" {...animationProps}>
        {/* front */}
        <motion.div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-between backface-hidden"
          {...animationProps}
        >
          <div className="text-6xl">{frontText}</div>
          <div className="flex w-full">
            <CardButton
              className="flex-1"
              text="Flip"
              onClick={handleFlipClick}
            />
          </div>
        </motion.div>
        {/* back */}
        <motion.div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-between backface-hidden"
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isFlipped ? 0 : 180 }}
          transition={{ duration: durationSeconds }}
        >
          <div className="text-6xl">{backText}</div>
          <div className="flex w-full gap-4">
            <CardButton
              className="flex-1"
              text="Don't know"
              onClick={onDontKnow}
            />
            <CardButton className="flex-1" text="Know" onClick={onKnow} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
