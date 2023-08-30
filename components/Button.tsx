interface ButtonProps {
  primary?: boolean;
  primaryMobile?: boolean;
  secondary?: boolean;
  secondaryMobile?: boolean;
  fullWidth?: boolean;
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  primary,
  primaryMobile,
  secondary,
  secondaryMobile,
  fullWidth,
  label,
  onClick,
}) => {
  return (
    <button
      className={`py-1.5 px-8 text-base rounded-lg border-2 font-medium ${
        primary &&
        "bg-green-primary border-green-primary text-white hover:brightness-90 transition"
      } ${
        secondary &&
        "bg-transparent border-green-primary text-green-primary font-medium hover:bg-green-primary/10 transition"
      } ${primaryMobile && "bg-white border-white text-green-primary"} ${
        secondaryMobile && "bg-transparent border-white text-white"
      } ${fullWidth ? "w-full" : "w-fit"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
