import WordCard from "../../tools/WordCard/components/WordCard";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center pt-50">
      {/* <h1 className="my-30 text-center text-9xl text-blue-400">Lingvo</h1> */}
      {/* 
      <div className="bg-glass size-12"></div>
      <div className="bg-glass-light size-12"></div>
      <div className="bg-glass-dark size-12"></div> */}

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
