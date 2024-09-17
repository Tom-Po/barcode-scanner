import { StyleSheet, ScrollView } from "react-native";

import { Text, View } from "@/components/Themed";
import { useAppSelector } from "../hooks";
import { RootState } from "../store/store";
import { Link } from "expo-router";
import BarcodeCard from "@/components/cards/BarcodeCard";
import { useState } from "react";
import TodoCard from "@/components/cards/TodoCard";
import { TodoType } from "../store/todoSlice";

const NoProducts = () => (
  <View>
    <Text style={styles.title}>Aucun produit</Text>
    <View style={styles.separator} />
    <View style={styles.buttonStyle}>
      <Link style={styles.link} href="/camera">
        Scanner des produits
      </Link>
    </View>
  </View>
);

export default function TabOneScreen() {
  const products = useAppSelector((state: RootState) => state.products.value);
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  // Todo enum or something to sort properly

  const handleSelectProduct = (product: string) => {
    setSelectedProduct(product === selectedProduct ? "" : product);
  };

  const handleSelectTodo = (todo: TodoType) => {
    setSelectedTodo(todo.id === selectedTodo?.id ? null : todo);
  };

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.title}>Notes</Text>
        {todos.map((todo) => (
          <>
            <TodoCard
              todo={todo}
              onPress={() => handleSelectTodo(todo)}
              selected={selectedTodo?.id === todo.id}
            />
          </>
        ))}
      </>
      <View style={styles.separator} />
      <View style={styles.productList}>
        <Text style={styles.title}>Liste des produits</Text>
        {products.length === 0 && <NoProducts />}
        <ScrollView style={styles.scrollView}>
          {products.map((p) => (
            <BarcodeCard
              barcode={p}
              onPress={() => handleSelectProduct(p)}
              selected={selectedProduct === p}
              key={p}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
  separator: {
    height: 1,
    width: "80%",
  },
  productList: {
    padding: 20,
    height: "100%",
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
