import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Button.css";

interface ButtonProps {
  href?: string;
  to?: string;
  exact?: boolean;
  size?: "small" | "default" | "large";
  inverse?: boolean;
  danger?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  classNames?: string;
}

const Button: React.FC<ButtonProps> = ({
  href,
  to,
  size = "default",
  inverse,
  danger,
  type = "button",
  onClick,
  disabled,
  children,
  ...props
}) => {
  const className = `button button--${size} ${
    inverse ? "button--inverse" : ""
  } ${danger ? "button--danger" : ""}`;

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
