import WordCard from "../../tools/WordCard/components/WordCard";
import WordOption from "../../tools/WordOption/components/WordOption";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center gap-12 pt-32">
      <WordCard
        frontText="hello"
        backText="xin chào"
        onCorrect={() => alert("Good boy")}
        onWrong={() => alert("Study more")}
      />

      <WordOption
        parts={{ part1: "His name ", part2: " John." }}
        options={{
          option1: { text: "are", isCorrect: false },
          option2: { text: "is", isCorrect: true },
          option3: { text: "it", isCorrect: false },
          option4: { text: "call", isCorrect: false },
        }}
        onCorrect={() => alert("Correct")}
        onWrong={() => alert("Wrong")}
      />
    </div>
  );
};

export default Homepage;
