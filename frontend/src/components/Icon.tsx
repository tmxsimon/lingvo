import ICONS from "../constants/icons";

type IconProps = {
  name: keyof typeof ICONS;
  onClick?: () => void;
  className?: string;
};

const Icon = ({ name, onClick, className = "size-full" }: IconProps) => {
  className += " stroke-current";
  const IconElement = ICONS[name];
  return <IconElement className={className} onClick={onClick} />;
};

export default Icon;
