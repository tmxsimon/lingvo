import type { FlipperType } from "../types";
import Flipper from "./Flipper";
import useFlippers from "../hooks/useFlippers";

const Flippers = ({ flippersPages }: { flippersPages: FlipperType[][] }) => {
  const { flippersPage, flipped, matched, disabled, handleClick } =
    useFlippers(flippersPages);

  return (
    <div className="gap-2 grid xl:grid-cols-4 xl:grid-rows-3 grid-cols-3 grid-rows-4 h-full xl:max-h-142 max-h-180 xl:max-w-280 w-full max-w-200"> 
        {flippersPage.map((_, index) => {
          return <Flipper
            key={index}
            value={flippersPage[index]?.value}
            note={flippersPage[index]?.note}
            isFlipped={flipped.includes(index) || matched.includes(index)}
            isMatched={matched.includes(index)}
            disabled={disabled}
            onClick={() => handleClick(index)}
          />
        })}
    </div>
  );
};

export default Flippers;
