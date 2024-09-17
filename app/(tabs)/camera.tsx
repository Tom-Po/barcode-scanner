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
import { View } from "@/components/Themed";
import { useAppSelector } from "../hooks";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/productSlice";
import BarcodeCard from "@/components/cards/BarcodeCard";

export default function CameraScreen() {
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleSelectProduct = (product: string) => {
    setSelectedProduct(product === selectedProduct ? "" : product);
  };

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
        dispatch(addProduct(value));
      });
    },
  });

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
          {products.map((product) => (
            <BarcodeCard
              barcode={product}
              key={product}
              selected={product === selectedProduct}
              onPress={(product: string) => handleSelectProduct(product)}
            />
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
  barcodeList: {
    backgroundColor: "#DDD",
    maxHeight: "50%",
    height: "100%",
    width: "100%",
    padding: 10,
    marginTop: "100%",
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
});
