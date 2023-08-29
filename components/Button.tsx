interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  fullWidth?: boolean;
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  primary,
  secondary,
  fullWidth,
  label,
  onClick,
}) => {
  return (
    <button
      className={`py-1.5 px-8 text-base rounded-lg border-2 ${
        primary &&
        "bg-green-primary border-green-primary text-white hover:brightness-90 transition"
      } ${
        secondary &&
        "bg-transparent border-green-primary text-green-primary hover:bg-green-primary/10 transition"
      } ${fullWidth ? "w-full" : "w-fit"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
