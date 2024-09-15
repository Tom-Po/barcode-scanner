import { Button, StyleSheet, Text } from "react-native";
import { useState } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
  Code,
} from "react-native-vision-camera";
import {
  BarcodeCreatorView,
  BarcodeFormat,
} from "react-native-barcode-creator";
import { View } from "@/components/Themed";

export default function CameraScreen() {
  const device = useCameraDevice("back");
  const [barcodes, setBarcodes] = useState<string[]>(["3057067573012"]);
  const { hasPermission, requestPermission } = useCameraPermission();
  const codeScanner = useCodeScanner({
    codeTypes: ["ean-13"],
    onCodeScanned: (codes: Code[]) => {
      codes.forEach((c: Code) => {
        const { value } = c;
        if (!value || value.length < 13 || barcodes.includes(value)) return;
        console.log("EAN");
        console.log(c.value);
        setBarcodes([...barcodes, value]);
      });
    },
  });

  const removeBarcode = (code: string) => {
    setBarcodes(barcodes.filter((b) => b !== code));
  };

  if (!hasPermission) {
    requestPermission();
    return <Text>Les permissions n'ont pas été accordées</Text>;
  }
  if (device == null) return <Text>Aucune caméra disponible</Text>;
  console.log(barcodes);

  return (
    <View style={styles.container}>
      {barcodes.map((b) => (
        <View style={styles.barcodeWrapper}>
          <BarcodeCreatorView
            background={"#FFF"}
            foregroundColor={"#000"}
            value={b}
            format={BarcodeFormat.EAN13}
            style={styles.barcode}
          />
          <Text>{b}</Text>
        </View>
      ))}
      <Camera
        style={[StyleSheet.absoluteFill, { height: "50%", top: "unset" }]}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  barcodeWrapper: {
    padding: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  barcode: {
    width: 200,
    height: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
});
