import { cn } from "@/libs/utils";
import React, { ReactNode } from "react";

interface ButtonProps {
    primary?: boolean;
    primaryMobile?: boolean;
    secondary?: boolean;
    secondaryMobile?: boolean;
    fullWidth?: boolean;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: ReactNode;
    type?: "button" | "submit" | undefined;
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
    icon,
    type,
}) => {
    return (
        <button
            type={type ? type : "button"}
            disabled={disabled}
            className={cn(
                "py-1.5 px-8 flex items-center justify-center gap-2 text-base rounded-lg border-2 font-medium disabled:brightness-75 disabled:cursor-not-allowed disabled:hover:brightness-75",
                primary &&
                "bg-green-primary border-green-primary text-white hover:brightness-90 transition disabled:brightness-75 disabled:hover:brightness-75",
                secondary &&
                "bg-transparent border-green-primary text-green-primary font-medium hover:bg-green-primary/10 transition disabled:bg-green-primary/10 disabled:hover:bg-green-primary/10",
                primaryMobile &&
                "bg-white border-white text-green-primary disabled:brightness-75 disabled:hover:brightness-75",
                secondaryMobile &&
                "bg-transparent border-white text-white disabled:bg-white/10 disabled:hover:bg-white/10",
                fullWidth ? "w-full" : "w-fit",
            )}
            onClick={onClick}
        >
            {icon ? icon : null}
            {label}
        </button>
    );
};

export default Button;
