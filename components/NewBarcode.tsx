import React, { useRef, useEffect } from "react";
import { View, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import JsBarcode from "jsbarcode";

const Barcode = ({
  value,
  width = 2,
  height = 100,
}: {
  value: string;
  width: number;
  height: number;
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      console.log("oui");

      // Generate the barcode and update the SVG content
      JsBarcode(svgRef.current, value, {
        format: "EAN", // You can choose different barcode formats like CODE128, EAN, etc.
        width: width,
        height: height,
      });
    }
  }, [value]);

  return (
    <View>
      <Text>Test {value}</Text>
      <SvgXml ref={svgRef} />
    </View>
  );
};

export default Barcode;
