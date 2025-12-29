import WordCard from "../../tools/WordCard/components/WordCard";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center pt-50">
      <WordCard
        frontText="hello"
        backText="xin chào"
        onKnow={() => alert("Good boy")}
        onDontKnow={() => alert("Study more")}
      />
    </div>
  );
};

export default Homepage;
