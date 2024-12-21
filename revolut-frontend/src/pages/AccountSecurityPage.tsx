import { ChangeEvent, FormEvent, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Description from "../components/typographies/Description";
import Title from "../components/typographies/Title";
import useCountry from "../hooks/useCountry";
import texts from "../utils/texts";
import Button from "../components/Button";
import api from "../utils/api";
import useCard from "../hooks/useCard";
import useLoading from "../hooks/useLoading";

export default function AccountSecurityPage() {
  const { locale } = useCountry();
  const navigate = useNavigate();
  const { card, setCardAct } = useCard();
  const { setLoadingAct } = useLoading();

  const [email, setEmail] = useState<string>("");

  const submitDisabled = !email;

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingAct(true);
    api
      .put(`/card/update/${card?.id}`, {
        ...card,
        email,
      })
      .then((res) => {
        setCardAct(res.data);
        setLoadingAct(false);
        navigate("/passcode");
      })
      .catch(() => {
        setLoadingAct(false);
      });
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-8 flex flex-col items-start gap-6 lg:gap-12">
      <div>
        <Title>{texts.accSec[locale]}</Title>
        <Description className="mt-4">{texts.enterEmail[locale]}</Description>
      </div>

      <form
        className="flex flex-col items-center gap-12 lg:gap-24 w-full"
        onSubmit={onSubmit}
      >
        <Input
          type="email"
          name="email"
          className="w-full"
          placeholder={`${texts.confirmEmail[locale]}:`}
          value={email}
          onChange={onChangeEmail}
        />

        <Button type="submit" className="w-72" disabled={submitDisabled}>
          {texts.submit[locale]}
        </Button>
      </form>
    </div>
  );
}
