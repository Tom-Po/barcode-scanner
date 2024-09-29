import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useAppDispatch, useAppSelector } from "./hooks";
import { addProduct } from "./store/productSlice";
import { fakeEAN13 } from "@/utils/utils";

export default function ModalScreen() {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  const handleAddProduct = () => {
    const fakeEAN = fakeEAN13();
    console.log("DEBUG");

    console.log(products);

    console.log([fakeEAN.toString()]);

    try {
      dispatch(addProduct("3213123123121"));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.debugMenu}>
        <Text style={styles.title}>Debug menu</Text>
        <Text>{products.length} produits</Text>
        <Button onPress={handleAddProduct} title="Ajouter un produit" />
      </View>

      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  debugMenu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});
