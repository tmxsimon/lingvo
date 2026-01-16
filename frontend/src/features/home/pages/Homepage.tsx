import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import Card from "../../tools/Card/components/Card";
import WordOption from "../../tools/WordOption/components/WordOption";

const Homepage = () => {
  return (
    <div className="gap-base flex flex-col items-center pt-32">
      <div className="flex flex-col gap-2">
        <div className="mx-auto flex gap-2">
          <Button
            text="button"
            type="primary"
            theme="primary"
            onClick={() => console.log("123")}
          />
          <Button
            text="button"
            type="secondary"
            theme="primary"
            onClick={() => console.log("123")}
          />
          <Button
            text="button"
            type="tertiary"
            theme="primary"
            onClick={() => console.log("123")}
          />
        </div>
        <div className="mx-auto flex gap-2">
          <Button
            text="button"
            type="primary"
            theme="neutral"
            onClick={() => console.log("123")}
          />
          <Button
            text="button"
            type="secondary"
            theme="neutral"
            onClick={() => console.log("123")}
          />
          <Button
            text="button"
            type="tertiary"
            theme="neutral"
            onClick={() => console.log("123")}
          />
        </div>
        <div className="mx-auto flex gap-2">
          <Button
            text="button"
            type="primary"
            theme="warning"
            onClick={() => console.log("123")}
          />
          <Button
            text="button"
            type="secondary"
            theme="warning"
            onClick={() => console.log("123")}
          />
          <Button
            text="button"
            type="tertiary"
            theme="warning"
            onClick={() => console.log("123")}
          />
        </div>
        <div className="mx-auto flex gap-2">
          <Button
            text="button"
            type="primary"
            theme="danger"
            onClick={() => console.log("123")}
          />
          <Button
            text="button"
            type="secondary"
            theme="danger"
            onClick={() => console.log("123")}
          />
          <Button
            text="button"
            type="tertiary"
            theme="danger"
            onClick={() => console.log("123")}
          />
        </div>
        <div className="mt-base-sm mx-auto inline-block space-x-2">
          <Button
            text="button"
            size="small"
            underline
            onClick={() => console.log("123")}
          />
          <Button text="button" underline onClick={() => console.log("123")} />
          <Button
            text="button"
            size="large"
            underline
            onClick={() => console.log("123")}
          />
        </div>

        <div className="mt-base-sm mx-auto inline-block space-x-2">
          <Button
            text="button"
            type="secondary"
            iconFront={<Icon name="globe" />}
            size="small"
            underline
            onClick={() => console.log("123")}
          />
          <Button
            text="button"
            type="secondary"
            iconFront={<Icon name="globe" />}
            underline
            onClick={() => console.log("123")}
          />
          <Button
            text="button"
            type="secondary"
            iconFront={<Icon name="globe" />}
            size="large"
            underline
            onClick={() => console.log("123")}
          />
        </div>
        <div className="my-base mx-auto inline-block space-x-2">
          <Button
            text="button"
            iconBack={<Icon name="globe" />}
            size="small"
            underline
            onClick={() => console.log("123")}
          />
          <Button
            text="button"
            iconBack={<Icon name="globe" />}
            underline
            onClick={() => console.log("123")}
          />
          <Button
            text="button"
            iconBack={<Icon name="globe" />}
            size="large"
            underline
            onClick={() => console.log("123")}
          />
        </div>
      </div>
      <Card
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
