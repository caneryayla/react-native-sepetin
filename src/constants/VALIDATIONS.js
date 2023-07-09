import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const requiredText = "Zorunlu alan";
const passwordLength = 8;

export const SignupValidationSchema = Yup.object().shape({
  email: Yup.string().email("Geçerli email giriniz").required(requiredText),
  password: Yup.string()
    .min(passwordLength, `Lütfen en az ${passwordLength} karakter giriniz`)
    .required(requiredText),
});

export const ProfileAddAdressSchema = Yup.object().shape({
  name: Yup.string().required("Lütfen geçerli bir isim giriniz."),
  surname: Yup.string().required("Lütfen geçerli bir soyad giriniz."),
  phone: Yup.number().required("Lütfen geçerli bir telefon giriniz."),
  cityId: Yup.number().required("Lütfen il seçiniz"),
  countyId: Yup.number().required("Lütfen ilçe seçiniz"),
  neighborhoodsId: Yup.number().required("Lütfen mahalle seçiniz"),
  address: Yup.string().required("Lütfen adres giriniz"),
  addressTitle: Yup.string().required("Lütfen adres başlığı seçiniz"),
});

export const ProfilePasswordChange = Yup.object().shape({
  password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Şifreler uyuşmuyor!")
    .required("Lütfen geçerli bir şifre giriniz."),
  newPassword: Yup.string()
    .oneOf([Yup.ref("newPasswordRe"), null], "Şifreler uyuşmuyor!")
    .required("Şifrenizi giriniz!")
    .min(
      passwordLength,
      `Şifrenizin uzunluğu en az ${passwordLength} olmalıdır! `
    ),

  newPasswordRe: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Şifreler uyuşmuyor!")
    .required("Şifrenizi giriniz!")
    .min(
      passwordLength,
      `Şifrenizin uzunluğu en az ${passwordLength} olmalıdır! `
    ),
});

export const ProfileEmailChange = Yup.object().shape({
  email: Yup.string()
    .email("Lütfen geçerli bir email giriniz.")
    .notOneOf(
      [Yup.ref("newEmail"), Yup.ref("newEmailRe")],
      "Mailler uyuşmuyor!"
    )
    .required("Lütfen geçerli bir email giriniz."),
  newEmail: Yup.string()
    .email("Lütfen geçerli bir email giriniz.")
    .oneOf([Yup.ref("newEmailRe"), null], "Mailler uyuşmuyor!")
    .required("Lütfen geçerli bir email giriniz."),

  newEmailRe: Yup.string()
    .email("Lütfen geçerli bir email giriniz.")
    .oneOf([Yup.ref("newEmail"), null], "Mailler uyuşmuyor!")
    .required("Lütfen geçerli bir email giriniz."),
});

export const UserBuyScreen = Yup.object().shape({
  selectAddress: Yup.string().required("Lütfen geçerli bir email giriniz."),
  cartNo: Yup.string()
    .required("Lütfen geçerli bir email giriniz.")
    .min(16, `Lütfen kart numaranızı doğru giriniz`),
  cartMonth: Yup.string().required("Lütfen geçerli bir email giriniz."),
  cartYear: Yup.string().required("Lütfen geçerli bir email giriniz."),
  cartCVV: Yup.string()
    .required("Lütfen geçerli bir email giriniz.")
    .min(3, `Lütfen CVV kodunu doğru giriniz`),
});
