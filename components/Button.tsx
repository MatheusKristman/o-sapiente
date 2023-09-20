import React from "react";

interface ButtonProps {
  primary?: boolean;
  primaryMobile?: boolean;
  secondary?: boolean;
  secondaryMobile?: boolean;
  fullWidth?: boolean;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  primary,
  primaryMobile,
  secondary,
  secondaryMobile,
  fullWidth,
  label,
  onClick,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      className={`py-1.5 px-8 text-base rounded-lg border-2 font-medium ${
        primary &&
        "bg-green-primary border-green-primary text-white hover:brightness-90 transition disabled:brightness-75 disabled:hover:brightness-75"
      } ${
        secondary &&
        "bg-transparent border-green-primary text-green-primary font-medium hover:bg-green-primary/10 transition disabled:bg-green-primary/10 disabled:hover:bg-green-primary/10"
      } ${
        primaryMobile &&
        "bg-white border-white text-green-primary disabled:brightness-75 disabled:hover:brightness-75"
      } ${
        secondaryMobile &&
        "bg-transparent border-white text-white disabled:bg-white/10 disabled:hover:bg-white/10"
      } ${
        fullWidth ? "w-full" : "w-fit"
      } disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:brightness-75`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
