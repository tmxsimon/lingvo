import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <TailSpin
      height="80"
      width="80"
      color="var(--color-brand-300)"
      ariaLabel="tail-spin-loading"
      radius="1"
    />
  );
};

export default Loading;
