import type { FlipperType } from "../types";
import Flipper from "./Flipper";
import useFlippers from "../hooks/useFlippers";

const Flippers = ({ flippersPages }: { flippersPages: [FlipperType[]] }) => {
  const { flippersPage, flipped, matched, disabled, handleClick } =
    useFlippers(flippersPages);

  const renderFlipper = (index: number) => (
    <Flipper
      key={index}
      value={flippersPage[index]?.value}
      note={flippersPage[index]?.note}
      isFlipped={flipped.includes(index) || matched.includes(index)}
      isMatched={matched.includes(index)}
      disabled={disabled}
      onClick={() => handleClick(index)}
    />
  );

  return (
    <div className="gap-base flex flex-col items-center">
      <div className="gap-base flex">
        {renderFlipper(0)}
        {renderFlipper(1)}
        {renderFlipper(2)}
        {renderFlipper(3)}
      </div>
      <div className="gap-base flex">
        {renderFlipper(4)}
        {renderFlipper(5)}
        {renderFlipper(6)}
        {renderFlipper(7)}
      </div>
      <div className="gap-base flex">
        {renderFlipper(8)}
        {renderFlipper(9)}
        {renderFlipper(10)}
        {renderFlipper(11)}
      </div>
    </div>
  );
};

export default Flippers;
