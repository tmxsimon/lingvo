import type { SVGProps } from "react";
import icons, { type iconsType } from "../constants/icons";

type IconProps = SVGProps<SVGSVGElement> & {
  name: iconsType;
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
