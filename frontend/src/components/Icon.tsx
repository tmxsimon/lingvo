import ICONS from "../constants/icons";

type IconProps = {
  name: keyof typeof ICONS;
  className?: string;
};

const Icon = ({ name, className = "" }: IconProps) => {
  const IconElement = ICONS[name];
  return <IconElement className={className} />;
};

export default Icon;
