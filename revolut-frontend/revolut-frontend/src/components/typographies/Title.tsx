import { AllHTMLAttributes } from "react";

export default function Title({
  className = "",
  children,
  ...others
}: AllHTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4 className={`text-3xl md:text-4xl font-bold ${className}`} {...others}>
      {children}
    </h4>
  );
}
