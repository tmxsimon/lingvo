import Button, { type ButtonProps } from "../../../components/Button";

type UserItemButtonProps = ButtonProps;

const UserItemButton = ({ ...buttonProps }: UserItemButtonProps) => {
  return <Button {...buttonProps} />;
};

export default UserItemButton;
