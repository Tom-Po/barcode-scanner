import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
import { Link } from "expo-router";
import Barcode from "@/components/Barcode";

export default function TabOneScreen() {
  const products = useAppSelector((state: RootState) => state.products.value);
  console.log(products);

  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.productList}>
        <Text style={styles.title}>Liste des produits</Text>
        {products.length === 0 && (
          <View>
            <Text>Aucun produit</Text>
            <View style={styles.buttonStyle}>
              <Link style={styles.link} href="/camera">
                Scanner des produits
              </Link>
            </View>
          </View>
        )}
        {products.map((p) => (
          <>
            <Text>{p}</Text>
            <Barcode code={p} />
          </>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  separator: {
    height: 1,
    width: "80%",
  },
  productList: {
    padding: 20,
  },
  productListItem: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 3,
    paddingBottom: 3,
  },
  link: {
    color: "white",
    fontSize: 15,
  },
  buttonStyle: {
    padding: 10,
    backgroundColor: "blue",
    display: "flex",
    alignItems: "center",
  },
});
