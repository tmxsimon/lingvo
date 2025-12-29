import Button from "../../../../components/Button";

type WordOptionProps = {
  parts: { part1: string; part2: string };
  options: {
    option1: { text: string; isCorrect: boolean };
    option2: { text: string; isCorrect: boolean };
    option3?: { text: string; isCorrect: boolean };
    option4?: { text: string; isCorrect: boolean };
  };
  onCorrect: () => void;
  onWrong: () => void;
};

const WordOption = ({
  parts,
  options,
  onCorrect,
  onWrong,
}: WordOptionProps) => {
  const onOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      onCorrect();
    } else {
      onWrong();
    }
  };

  return (
    <div className="rounded-base-lg bg-glass border-glass flex size-128 flex-col justify-between border px-4 pt-12 pb-8">
      <div className="w-full text-center text-4xl">
        {parts.part1} ... {parts.part2}
      </div>
      <div className="flex flex-col gap-2">
        <Button
          text={options.option1.text}
          onClick={() => onOptionClick(options.option1.isCorrect)}
          className="w-full"
        />
        <Button
          text={options.option2.text}
          onClick={() => onOptionClick(options.option2.isCorrect)}
          className="w-full"
        />
        {options.option3 && (
          <Button
            text={options.option3.text}
            onClick={() => onOptionClick(options.option3!.isCorrect)}
            className="w-full"
          />
        )}
        {options.option4 && (
          <Button
            text={options.option4.text}
            onClick={() => onOptionClick(options.option4!.isCorrect)}
            className="w-full"
          />
        )}
      </div>
    </div>
  );
};

export default WordOption;
