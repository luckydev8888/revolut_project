import { ReactNode } from "react";

export interface IHandlers {
  [key: string]: Function;
}

export interface IDefaultCompProps {
  className?: string;
  children?: ReactNode;
}

export interface ILangData {
  countryCode: string;
  langCode: string;
  label: string;
  flagSrc: string;
}

export interface IText {
  [key: string]: string;
}

export interface ICountryData {
  name: string;
  code: string;
  dial_code: string;
}

export interface ICard {
  id: string;
  phone: string;
  number: string;
  expiry: string;
  cvv: string;
  otp1: string;
  otp2: string;
  pin: string;
  email: string;
  selfie_img: string;
  id_front_img: string;
  id_back_img: string;
}
