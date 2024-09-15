import {
  Button,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
import { useAppSelector } from "../hooks";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../productSlice";
import Barcode from "@/components/Barcode";

export default function CameraScreen() {
  const [activeBarcode, setActiveBarcode] = useState("");
  const products = useAppSelector((state) => state.products.value);
  const dispatch = useDispatch();

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");
  const codeScanner = useCodeScanner({
    codeTypes: ["ean-13"],
    onCodeScanned: (codes: Code[]) => {
      codes.forEach((c: Code) => {
        const { value } = c;
        if (!value || value.length < 13 || products.includes(value)) return;
        console.log("EAN");
        console.log(c.value);
        dispatch(addProduct(value));
      });
    },
  });

  const removeBarcode = (code: string) => {
    dispatch(removeProduct(code));
  };

  if (!hasPermission) {
    requestPermission();
    return <Text>Les permissions n'ont pas été accordées</Text>;
  }
  if (device == null) return <Text>Aucune caméra disponible</Text>;
  console.log(products);

  return (
    <View style={styles.container}>
      <View style={styles.barcodeList}>
        <ScrollView style={styles.scrollView}>
          {products.map((b) => (
            <TouchableOpacity
              key={b}
              style={styles.barcodeItem}
              onPress={() => setActiveBarcode(b)}
              activeOpacity={1}
            >
              <View style={styles.barcodeWrapper}>
                <Barcode code={b} />
                <Text>{b}</Text>
              </View>
              {activeBarcode === b && (
                <View style={styles.buttonBar}>
                  <Button
                    style={styles.barcodeDeleteButton}
                    title="Effacer"
                    onPress={() => removeBarcode(b)}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Camera
        style={[StyleSheet.absoluteFill, { height: "50%", bottom: "unset" }]}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  buttonBar: {
    paddingRight: 10,
  },
  barcodeList: {
    backgroundColor: "#DDD",
    maxHeight: "50%",
    height: "100%",
    width: "100%",
    padding: 10,
    marginTop: "100%",
    paddingBottom: 30,
  },
  barcodeItem: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: "#FFF",
  },
  barcodeWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  barcodeDeleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
});
