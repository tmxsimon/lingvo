import PageTitle from "../PageTitle";

type PageTitleWithButtonProps = {
  title: string;
  button?: React.ReactNode;
};

const PageTitleWithButton = ({ title, button }: PageTitleWithButtonProps) => {
  return (
    <div className="flex flex-col items-center">
      <PageTitle title={title} />
      {button}
    </div>
  );
};

export default PageTitleWithButton;
