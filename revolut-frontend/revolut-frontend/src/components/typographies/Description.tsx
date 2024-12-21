import { AllHTMLAttributes } from "react";

export default function Description({
  className = "",
  children,
  ...others
}: AllHTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-gray-500 text-sm md:text-base ${className}`} {...others}>
      {children}
    </p>
  );
}
