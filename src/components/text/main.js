import { useEffect, useState } from "react";
import { Text as RNText } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Text = ({ children, style, size, weight, color }) => {
  /*
    "3xs",
    "2xs",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
  */

  const [propsStyles, setPropsStyle] = useState({});

  useEffect(() => {
    let style = {};
    if (size == "xl") {
      style.fontSize = wp("5.4%");
    } else if (size == "lg") {
      style.fontSize = wp("5.4%");
    } else if (size == "md") {
      style.fontSize = wp("4%");
    } else if (size == "sm") {
      style.fontSize = wp("3.2%");
    } else if (size == "xs") {
      style.fontSize = wp("2.9%");
    } else {
      style.fontSize = size;
    }

    setPropsStyle(style);
  }, []);

  return (
    <RNText style={[style, propsStyles, { color, fontWeight: weight }]}>
      {children}
    </RNText>
  );
};

export default Text;
