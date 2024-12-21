import { IMaskInput, IMaskInputProps } from "react-imask";

export default function Input({
  className = "",
  ...others
}: IMaskInputProps<HTMLInputElement>) {
  return (
    <div
      className={`bg-gray-100 transition hover:bg-gray-200 rounded-xl py-3 lg:py-4 px-3 ${className}`}
    >
      <IMaskInput
        className="w-full bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400 text-base md:text-lg lg:text-xl"
        {...others}
      />
    </div>
  );
}
