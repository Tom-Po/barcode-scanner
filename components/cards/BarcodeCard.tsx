import { useAppDispatch } from "@/app/hooks";
import { TouchableOpacity, View, Text, StyleSheet, Button } from "react-native";
import Barcode from "../Barcode";
import { removeProduct } from "../../app/store/productSlice";

export default function BarcodeCard(props: {
  barcode: any;
  selected: boolean;
  onPress: (barcode: string) => void;
}) {
  const dispatch = useAppDispatch();
  const { barcode, selected, onPress } = props;
  return (
    <TouchableOpacity
      style={styles.barcodeItem}
      onPress={() => onPress(barcode)}
      activeOpacity={1}
    >
      <View style={styles.barcodeWrapper}>
        <Barcode code={barcode} />
        <Text>{barcode}</Text>
        <Text>Nom du produit / Quantité</Text>
      </View>
      {selected && (
        <View style={styles.buttonBar}>
          <Button
            title="Effacer"
            onPress={() => dispatch(removeProduct(barcode))}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBar: {
    paddingRight: 10,
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
    width: "100%",
    flexShrink: 1,
  },
  barcodeDeleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});
