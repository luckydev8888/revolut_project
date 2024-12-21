import { AllHTMLAttributes } from "react";

interface IProps extends AllHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
}

export default function Button({
  className = "",
  children,
  disabled,
  ...others
}: IProps) {
  return (
    <button
      className={`${
        !!disabled ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
      } py-3 text-white rounded-2xl min-w-20 lg:min-w-24 shadow-lg shadow-blue-200 transition text-base ${className}`}
      disabled={!!disabled}
      {...others}
    >
      {children}
    </button>
  );
}
