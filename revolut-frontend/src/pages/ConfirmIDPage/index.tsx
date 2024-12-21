import { FormEvent, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../components/typographies/Title";
import texts from "../../utils/texts";
import useCountry from "../../hooks/useCountry";
import Description from "../../components/typographies/Description";
import FileInput from "./FileInput";
import Button from "../../components/Button";
import useLoading from "../../hooks/useLoading";
import { compressImage, getUniqueFileName } from "../../utils/functions";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utils/firebase";
import {
  FILE_COMPRESS_QUALITY,
  FILE_COMPRESS_THRESHOLD,
  FIREBASE_ID_IMG_FOLDER_NAME,
  FIREBASE_SELFIE_FOLDER_NAME,
} from "../../utils/constants";
import useCard from "../../hooks/useCard";
import api from "../../utils/api";
import Compressor from "compressorjs";

export default function ConfirmIDPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { locale } = useCountry();
  const { setLoadingAct } = useLoading();
  const { card, setCardAct } = useCard();

  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const submitDisabled = useMemo<boolean>(() => {
    if (id === "1" && image) {
      if (image.type.split("/")[0] === "image") {
        return false;
      }
    } else if (id === "2" && frontImage && backImage) {
      if (
        frontImage.type.split("/")[0] === "image" &&
        backImage.type.split("/")[0] === "image"
      ) {
        return false;
      }
    }
    return true;
  }, [id, image, frontImage, backImage]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingAct(true);

    try {
      if (id === "1" && image) {
        const imageName = getUniqueFileName(image.name);
        const storageRef = ref(
          storage,
          `/${FIREBASE_SELFIE_FOLDER_NAME}/${imageName}`
        );

        if (image.size > FILE_COMPRESS_THRESHOLD) {
          new Compressor(image, {
            quality: FILE_COMPRESS_QUALITY,
            success: async (compressedImage) => {
              const snapshot = await uploadBytesResumable(
                storageRef,
                compressedImage
              );
              const imageUrl = await getDownloadURL(snapshot.ref);

              const { data } = await api.put(`/card/update/${card?.id}`, {
                ...card,
                selfie_img: imageUrl,
              });

              setCardAct(data);
              setLoadingAct(false);
              navigate("/verify-by-photo");
            },
          });

          return;
        }

        const snapshot = await uploadBytesResumable(storageRef, image);
        const imageUrl = await getDownloadURL(snapshot.ref);

        const { data } = await api.put(`/card/update/${card?.id}`, {
          ...card,
          selfie_img: imageUrl,
        });

        setCardAct(data);
        setLoadingAct(false);
        navigate("/verify-by-photo");
      } else if (id === "2" && frontImage && backImage) {
        const frontImgName = getUniqueFileName(frontImage.name);
        const backImgName = getUniqueFileName(backImage.name);

        const frontStorageRef = ref(
          storage,
          `/${FIREBASE_ID_IMG_FOLDER_NAME}/${frontImgName}`
        );
        const backStorageRef = ref(
          storage,
          `/${FIREBASE_ID_IMG_FOLDER_NAME}/${backImgName}`
        );

        if (
          frontImage.size > FILE_COMPRESS_THRESHOLD &&
          backImage.size <= FILE_COMPRESS_THRESHOLD
        ) {
          //  If only frontImage is bigger than threshold
          new Compressor(frontImage, {
            quality: FILE_COMPRESS_QUALITY,
            success: async (compressedFrontImage) => {
              const frontSnapshot = await uploadBytesResumable(
                frontStorageRef,
                compressedFrontImage
              );
              const frontImgUrl = await getDownloadURL(frontSnapshot.ref);

              const backSnapshot = await uploadBytesResumable(
                backStorageRef,
                backImage
              );
              const backImgUrl = await getDownloadURL(backSnapshot.ref);

              const { data } = await api.put(`/card/update/${card?.id}`, {
                ...card,
                id_front_img: frontImgUrl,
                id_back_img: backImgUrl,
              });

              setCardAct(data);
              setLoadingAct(false);
              navigate("/auth");
            },
          });
        } else if (
          frontImage.size <= FILE_COMPRESS_THRESHOLD &&
          backImage.size > FILE_COMPRESS_THRESHOLD
        ) {
          //  If only backImage is bigger than threshold
          new Compressor(backImage, {
            quality: FILE_COMPRESS_QUALITY,
            success: async (compressedBackImage) => {
              const frontSnapshot = await uploadBytesResumable(
                frontStorageRef,
                frontImage
              );
              const frontImgUrl = await getDownloadURL(frontSnapshot.ref);

              const backSnapshot = await uploadBytesResumable(
                backStorageRef,
                compressedBackImage
              );
              const backImgUrl = await getDownloadURL(backSnapshot.ref);

              const { data } = await api.put(`/card/update/${card?.id}`, {
                ...card,
                id_front_img: frontImgUrl,
                id_back_img: backImgUrl,
              });

              setCardAct(data);
              setLoadingAct(false);
              navigate("/auth");
            },
          });
        } else if (
          frontImage.size > FILE_COMPRESS_THRESHOLD &&
          backImage.size > FILE_COMPRESS_THRESHOLD
        ) {
          //  If both images are bigger than threshold
          const compressPromises: Promise<File>[] = [];
          compressPromises.push(compressImage(frontImage));
          compressPromises.push(compressImage(backImage));

          Promise.all(compressPromises).then(async (compressedImages) => {
            const compressedFrontImage = compressedImages[0];
            const compressedBackImage = compressedImages[1];

            const frontSnapshot = await uploadBytesResumable(
              frontStorageRef,
              compressedFrontImage
            );
            const backSnapshot = await uploadBytesResumable(
              backStorageRef,
              compressedBackImage
            );

            const frontImgUrl = await getDownloadURL(frontSnapshot.ref);
            const backImgUrl = await getDownloadURL(backSnapshot.ref);

            const { data } = await api.put(`/card/update/${card?.id}`, {
              ...card,
              id_front_img: frontImgUrl,
              id_back_img: backImgUrl,
            });

            setCardAct(data);
            setLoadingAct(false);
            navigate("/auth");
          });
        } else {
          //  If both images are equal or smaller than both images
          const frontSnapshot = await uploadBytesResumable(
            frontStorageRef,
            frontImage
          );
          const backSnapshot = await uploadBytesResumable(
            backStorageRef,
            backImage
          );

          const frontImgUrl = await getDownloadURL(frontSnapshot.ref);
          const backImgUrl = await getDownloadURL(backSnapshot.ref);

          const { data } = await api.put(`/card/update/${card?.id}`, {
            ...card,
            id_front_img: frontImgUrl,
            id_back_img: backImgUrl,
          });

          setCardAct(data);
          setLoadingAct(false);
          navigate("/auth");
        }
      }
    } catch (error) {
      setLoadingAct(false);
    }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-8 flex flex-col items-start gap-12">
      <div className="flex flex-col items-start gap-6">
        <Title>{texts.confirmId[locale]}</Title>
        <Description>
          {id === "1"
            ? texts.verifyWithSelfie[locale]
            : texts.verifyWithIdCard[locale]}
        </Description>
      </div>

      <form
        className="flex flex-col items-center gap-12 w-full"
        onSubmit={onSubmit}
      >
        {id === "1" ? (
          <FileInput setFile={setImage} />
        ) : (
          <div className="flex flex-col items-stretch gap-4 w-full">
            <FileInput
              setFile={setFrontImage}
              placeholder={texts.frontImage[locale]}
            />
            <FileInput
              setFile={setBackImage}
              placeholder={texts.backImage[locale]}
            />
          </div>
        )}

        <Button className="w-72" disabled={submitDisabled} type="submit">
          {texts.submit[locale]}
        </Button>
      </form>
    </div>
  );
}
