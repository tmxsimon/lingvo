import { motion } from "motion/react";
import Icon from "../../../components/Icon";

type FlipperProps = {
  value?: string;
  note?: string;
  isFlipped: boolean;
  isMatched?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const Flipper = ({
  value,
  note,
  isFlipped,
  isMatched,
  disabled,
  onClick,
}: FlipperProps) => {
  if (!value) return null;

  const flipDuration = 0.3;
  const animationProps = {
    animate: { rotateY: isFlipped ? 180 : 0 },
    transition: { duration: flipDuration },
  };

  return (
    <motion.div
      className="rounded-base-sm p-base bg-brand-300 flex h-46 w-72 cursor-pointer flex-col items-center justify-center text-center"
      {...animationProps}
      onClick={() => {
        if (disabled || isMatched) return;
        onClick();
      }}
    >
      <motion.div className="relative h-full w-full" {...animationProps}>
        {/* back */}
        <motion.div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center backface-hidden"
          {...animationProps}
        >
          <div className="text-adaptive-white text-2xl">?</div>
        </motion.div>

        {/* front */}
        <motion.div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center backface-hidden"
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isFlipped ? 0 : 180 }}
          transition={{ duration: flipDuration }}
        >
          <div className="text-adaptive-white text-lg">{value}</div>
          {note && isMatched && (
            <div
              className="absolute right-0 bottom-0 cursor-pointer"
              data-tooltip-id="note-tooltip"
              data-tooltip-content={note}
            >
              <Icon name="info" className="text-adaptive-white size-6" />
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Flipper;
