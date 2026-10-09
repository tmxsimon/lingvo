import Icon, { type IconProps } from "./Icon";

type ModalPageIconProps = {} & IconProps;

const ModalPageIcon = ({ name, className, ...props }: ModalPageIconProps) => {
  return <Icon name={name} className={`size-6 ${className}`} {...props} />;
};

export default ModalPageIcon;
