import { useState } from "react";
import { motion } from "motion/react";
import Button from "../../../../components/Button";

type CardProps = {
  frontText: string;
  backText: string;
  onCorrect: () => void;
  onWrong: () => void;
};

const Card = ({ frontText, backText, onWrong, onCorrect }: CardProps) => {
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
            <Button
              className="flex-1"
              text="Flip"
              size="large"
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
          <div className="gap-base flex w-full">
            <Button
              className="flex-1"
              text="Don't know"
              theme="danger"
              size="large"
              onClick={onWrong}
            />
            <Button
              className="flex-1"
              text="Know"
              size="large"
              onClick={onCorrect}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
