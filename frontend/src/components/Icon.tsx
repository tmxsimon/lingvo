import type { SVGProps } from "react";
import icons from "../constants/icons";

type IconProps = SVGProps<SVGSVGElement> & {
  name: keyof typeof icons;
  autoSize?: boolean;
  className?: string;
};

const Icon = ({
  name,
  autoSize = false,
  className = "size-8",
  ...iconProps
}: IconProps) => {
  className += ` ${autoSize ? "stroke-current" : ""}`;
  const IconElement = icons[name];
  return <IconElement className={className} {...iconProps} />;
};

export default Icon;
