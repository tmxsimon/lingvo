import { type FormEventHandler } from "react";
import Title from "../../../components/Title";

type SignBoxProps = {
  title: string;
  content: React.ReactNode[];
  buttons: React.ReactNode[];
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
};

const SignBox = ({ title, content, buttons, onSubmit }: SignBoxProps) => {
  return (
    <div className="px-base-lg h-screen-no-navbar-page flex w-full items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="border-brand-neutral-200 backdrop-blur-base p-base-lg rounded-base flex h-full max-h-138 w-full max-w-128 flex-col justify-between border backdrop-brightness-95"
      >
        <Title size="large" text={title} className="text-center" />

        <div className="mb-base-lg gap-base flex flex-col">
          {content.map((part, i) => {
            return <div key={i}>{part}</div>;
          })}
        </div>

        <div>
          {buttons.map((button, i) => {
            return (
              <div key={i} className="flex-1">
                {button}
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default SignBox;
