import type { SVGProps } from "react";
import ICONS from "../constants/icons";

type IconProps = SVGProps<SVGSVGElement> & {
  name: keyof typeof ICONS;
  className?: string;
};

const Icon = ({ name, className = "size-full", ...iconProps }: IconProps) => {
  className += " stroke-current";
  const IconElement = ICONS[name];
  return <IconElement className={className} {...iconProps} />;
};

export default Icon;
