import { StyleSheet } from "react-native";
import {
  BarcodeCreatorView,
  BarcodeFormat,
} from "react-native-barcode-creator";

export default function Barcode(props: { code: string }) {
  return (
    <BarcodeCreatorView
      background={"#FFF"}
      foregroundColor={"#000"}
      value={props.code}
      format={BarcodeFormat.EAN13}
      style={styles.barcode}
    />
  );
}

const styles = StyleSheet.create({
  barcodeWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  barcode: {
    width: 200,
    height: 50,
    marginVertical: 10,
  },
});
