const Button = ({
  text,
  onClick,
  className = "",
}: {
  text: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`rounded-base-lg cursor-pointer bg-radial-(--primary-gradient) py-3 text-2xl text-white ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
