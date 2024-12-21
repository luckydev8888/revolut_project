import { useEffect, useLayoutEffect } from "react";
import Title from "../components/typographies/Title";
import useCountry from "../hooks/useCountry";
import texts from "../utils/texts";
import { DURATION_AT_FINAL, URL_HOMEPAGE } from "../utils/constants";
import Description from "../components/typographies/Description";

export default function FinalPage() {
  const { locale } = useCountry();

  useEffect(() => {    
    const timeoutId = setTimeout(() => {
      window.location.href = URL_HOMEPAGE;
    }, DURATION_AT_FINAL);

    return () => clearTimeout(timeoutId);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="flex flex-col items-start gap-8">
      <Title className="font-normal">{texts.thankyou[locale]}</Title>
      <div className="flex flex-col items-start gap-6">
        <Description>{texts.accountCompleted[locale]}</Description>
        <Description>{texts.thanks[locale]}</Description>
        <Description>{texts.haveNiceDay[locale]}</Description>
      </div>
    </div>
  );
}
