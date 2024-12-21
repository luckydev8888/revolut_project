import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import useCountry from "../../hooks/useCountry";
import texts from "../../utils/texts";

export default function FileInput({
  setFile,
  placeholder = "",
}: {
  setFile: Dispatch<SetStateAction<File | null>>;
  placeholder?: string;
}) {
  const { locale } = useCountry();

  const inputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string>("");

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files?.[0].name || "");
    setFile(e.target.files?.[0] || null);
  };

  return (
    <div className="bg-gray-100 rounded-md p-2 flex items-center gap-4 w-full">
      <button
        className="bg-white shadow p-2 rounded-sm text-base hover:bg-gray-50 transition"
        type="button"
        onClick={handleChooseFile}
      >
        {texts.chooseFile[locale]}:
      </button>
      <input
        type="file"
        hidden
        ref={inputRef}
        accept="image/*"
        onChange={onChangeFile}
      />
      {fileName ? (
        <span>{fileName}</span>
      ) : (
        <span className="text-gray-500">{placeholder}</span>
      )}
    </div>
  );
}
