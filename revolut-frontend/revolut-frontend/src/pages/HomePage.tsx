import { FormEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDebounceValue } from "usehooks-ts";
import Input from "../components/Input";
import Description from "../components/typographies/Description";
import Title from "../components/typographies/Title";
import useCountry from "../hooks/useCountry";
import texts from "../utils/texts";
import { ICountryData } from "../utils/interfaces";
import { countries } from "../utils/data";
import { BASE_URL_FLAG, DURATION_AFTER_PHONE } from "../utils/constants";
import Button from "../components/Button";
import api from "../utils/api";
import useLoading from "../hooks/useLoading";
import useCard from "../hooks/useCard";

export default function HomePage() {
  const navigate = useNavigate();
  const { locale, code } = useCountry();
  const { setLoadingAct } = useLoading();
  const { setCardAct } = useCard();

  const menuRef = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState<boolean>(false);
  const [country, setCountry] = useState<ICountryData>(countries[0]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const closeOpenedMenu = (e: MouseEvent) => {
    if (opened && !menuRef.current?.contains(e?.target as HTMLElement)) {
      setOpened(false);
    }
  };
  document.addEventListener("mousedown", closeOpenedMenu);

  const submitDisabled = !phoneNumber;

  const [debouncedSearchKey] = useDebounceValue<string>(searchKey, 500);

  const selectableCountries = useMemo<Array<ICountryData>>(() => {
    const normalizedKey = debouncedSearchKey.toLowerCase();

    return countries.filter(
      (item) =>
        item.name.toLowerCase().includes(normalizedKey) ||
        item.dial_code.toLowerCase().includes(normalizedKey)
    );
  }, [debouncedSearchKey]);

  const toggleOpened = () => {
    setOpened(!opened);
  };

  const selectCountry = (item: ICountryData) => {
    setCountry(item);
    toggleOpened();
  };

  const onAcceptPhoneNumber = (value: string) => {
    setPhoneNumber(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitDisabled) return;

    setLoadingAct(true);
    api
      .post("/card/create", {
        phone: `${country.dial_code}${phoneNumber}`,
      })
      .then((res) => {
        const timeoutId = setTimeout(() => {
          setLoadingAct(false);
          setCardAct(res.data);
          navigate("/card");

          clearTimeout(timeoutId);
        }, DURATION_AFTER_PHONE);
      })
      .catch(() => {
        setLoadingAct(false);
      });
  };

  useEffect(() => {
    const _country = countries.find((item) => item.code === code);

    if (_country) {
      setCountry(_country);
    }
  }, [code]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-8">
      <Title>{texts.welcomeBack[locale]}</Title>
      <Description className="mt-4">{texts.enterPhone[locale]}</Description>

      <form
        className="mt-6 flex flex-col gap-24 items-stretch"
        onSubmit={onSubmit}
      >
        <div className="flex items-stretch gap-2">
          {/* Country select */}
          <div className="relative">
            <div
              className="min-w-24 lg:min-w-32 bg-gray-100 transition hover:bg-gray-200 rounded-xl py-3 lg:py-4 px-3 flex items-center gap-2 text-base md:text-lg lg:text-xl cursor-pointer"
              onClick={toggleOpened}
            >
              <img
                src={`${BASE_URL_FLAG}/${country.code.toLowerCase()}.svg`}
                alt={country.code}
                className="w-6 lg:w-7"
              />
              <span>{country.dial_code}</span>
            </div>

            {opened && (
              <div className="absolute top-[100%] shadow-md" ref={menuRef}>
                <div className="relative min-w-80 lg:min-w-96 max-h-60 overflow-auto bg-white">
                  {/* Search field */}
                  <div className="sticky top-0  border-b border-gray-300 bg-white">
                    <div className="flex items-center gap-2 p-3">
                      <input
                        className="bg-transparent outline-none flex-1"
                        placeholder="Search"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                      />
                      <Icon
                        icon="icomoon-free:search"
                        className="text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Country list */}
                  <div className="px-2 py-1 flex flex-col gap-1">
                    {selectableCountries.map((item) => (
                      <div
                        key={item.code}
                        className="p-2 hover:bg-gray-100 flex items-center gap-4 cursor-pointer active:bg-blue-500 active:text-gray-100"
                        onClick={() => selectCountry(item)}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={`${BASE_URL_FLAG}/${item.code.toLowerCase()}.svg`}
                            alt={item.code}
                            width={28}
                          />

                          <span className="text-gray-400">
                            {item.dial_code}
                          </span>
                        </div>

                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Phone number input */}
          <Input
            type="text"
            name="phone"
            mask="00000000000000"
            className="flex-1"
            placeholder={texts.phoneNumber[locale]}
            onAccept={onAcceptPhoneNumber}
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit" className="w-72" disabled={submitDisabled}>
            {texts.continue[locale]}
          </Button>
        </div>
      </form>
    </div>
  );
}
