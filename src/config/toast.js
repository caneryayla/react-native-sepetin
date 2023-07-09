import { Text, View } from "react-native";
import ToastContainer from "../components/toast";

export const toastConfig = {
  success: ({ props, text1 }) => (
    <ToastContainer type="success" message={text1} />
  ),
  error: ({ props, text1 }) => <ToastContainer type="error" message={text1} />,
  info: ({ props, text1 }) => <ToastContainer type="info" message={text1} />,
  warn: ({ props, text1 }) => <ToastContainer type="warn" message={text1} />,
};
