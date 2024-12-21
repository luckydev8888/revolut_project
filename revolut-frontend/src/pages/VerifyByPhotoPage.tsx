import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Title from "../components/typographies/Title";
import useCountry from "../hooks/useCountry";
import texts from "../utils/texts";
import Button from "../components/Button";

export default function VerifyByPhotoPage() {
  const navigate = useNavigate();
  const { locale } = useCountry();

  const handleContinue = () => {
    navigate("/confirm-id/2");
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center gap-12">
      <Title>{texts.verifyWithIdPhoto[locale]}:</Title>
      <Icon icon="fa6-solid:id-card" className="text-gray-500 text-[140pt]" />
      <Button onClick={handleContinue} className="w-72">
        {texts.continue[locale]}
      </Button>
    </div>
  );
}
