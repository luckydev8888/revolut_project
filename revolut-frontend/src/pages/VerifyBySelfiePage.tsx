import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Title from "../components/typographies/Title";
import useCountry from "../hooks/useCountry";
import texts from "../utils/texts";
import Button from "../components/Button";
import Description from "../components/typographies/Description";

export default function VerifyBySelfiePage() {
  const navigate = useNavigate();
  const { locale } = useCountry();

  const handleContinue = () => {
    return navigate("/confirm-id/1");
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="flex flex-col items-center">
        <Title>{texts.verifyId[locale]}:</Title>
        <img src="/assets/images/verify-id.png" className="w-36" />
      </div>

      <div className="flex flex-col items-center gap-0 lg:gap-12 w-full">
        <div className="bg-gray-200 p-4 flex flex-col gap-4 items-start w-full">
          <div className="flex items-start gap-4">
            <div>
              <Icon className="text-2xl text-gray-500" icon="mdi:camera-off" />
            </div>
            <Description>{texts.notProfilePicture[locale]}</Description>
          </div>
          <div className="flex items-start gap-4">
            <div>
              <Icon
                className="text-2xl text-gray-500"
                icon="material-symbols:security"
              />
            </div>

            <Description>{texts.photoProtected[locale]}</Description>
          </div>
        </div>
      </div>

      <Button className="mt-6 w-72" onClick={handleContinue}>
        {texts.continue[locale]}
      </Button>
    </div>
  );
}
