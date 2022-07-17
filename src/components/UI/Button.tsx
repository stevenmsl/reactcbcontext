import { MouseEventHandler } from "react";
import classes from "./Button.module.css";

type ButtonProps = {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`${classes.button} ${className}`}
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
