import { AllHTMLAttributes, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import useCountry from "../../hooks/useCountry";
import { ILangData } from "../../utils/interfaces";
import { languages } from "../../utils/data";
import texts from "../../utils/texts";

export default function Footer({
  className = "",
}: AllHTMLAttributes<HTMLDivElement>) {
  const { locale, setLocaleAct } = useCountry();

  const menuRef = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState<boolean>(false);
  const [langData, setLangData] = useState<ILangData>(languages[0]);

  const closeOpenedMenu = (e: MouseEvent) => {
    if (opened && !menuRef.current?.contains(e?.target as HTMLElement)) {
      setOpened(false);
    }
  };
  document.addEventListener("mousedown", closeOpenedMenu);

  const toggleSelectLanguage = () => {
    setOpened(!opened);
  };

  const selectLanguage = (data: ILangData) => {
    setLocaleAct(data.langCode);
    setLangData(data);
    toggleSelectLanguage();
  };

  return (
    <footer className={className}>
      <div className="container max-w-8xl mx-auto flex flex-col justify-start items-center gap-4 py-2 px-0 md:px-4 xl:px-0">
        {/* Select of language */}
        <div className="relative text-sm min-w-64 cursor-pointer text-gray-500 border">
          <div
            className="flex items-center gap-2 p-2"
            onClick={toggleSelectLanguage}
          >
            <img src={langData.flagSrc} alt={locale} width={24} />
            <div className="flex-1 flex items-center justify-between gap-4">
              <span>{langData.label}</span>
              <Icon
                icon={
                  opened
                    ? "iconamoon:arrow-down-2-light"
                    : "iconamoon:arrow-up-2-light"
                }
              />
            </div>
          </div>

          {opened && (
            <div
              className="absolute flex flex-col bottom-full border py-2 w-full bg-white"
              ref={menuRef}
            >
              {languages.map((item) => (
                <div
                  key={item.countryCode}
                  className="flex items-center gap-2 p-2 hover:bg-blue-700 hover:text-gray-100"
                  onClick={() => selectLanguage(item)}
                >
                  <img src={item.flagSrc} alt={item.countryCode} width={24} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <a href="#" className="text-gray-500 text-sm">
          {texts.privacyPolicy[locale]}
        </a>
      </div>
    </footer>
  );
}
