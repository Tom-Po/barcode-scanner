import { StyleSheet, ScrollView } from "react-native";

import { Text, View } from "@/components/Themed";
import { useAppSelector } from "../hooks";
import { Link } from "expo-router";
import BarcodeCard from "@/components/cards/BarcodeCard";
import { useState } from "react";
import { TodoType } from "../store/todoSlice";
import TodoList from "@/components/lists/todoList";

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

export default function Home() {
  const products = useAppSelector((state) => state.products.products);
  const todos = useAppSelector((state) => state.todos.todos);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  const handleSelectProduct = (product: string) => {
    setSelectedProduct(product === selectedProduct ? "" : product);
  };
  const handleSelectTodo = (todo: TodoType | null) => {
    setSelectedTodo(todo === selectedTodo ? null : todo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.todoList}>
        <Text style={styles.title}>A faire ({todos.length})</Text>
        {todos.length === 0 ? (
          <Text>Aucune note.</Text>
        ) : (
          <ScrollView style={styles.scrollView}>
            <TodoList
              todos={todos}
              selectedTodo={selectedTodo}
              handleSelectTodo={handleSelectTodo}
              handleLongPressTodo={(todo) => {}}
            />
          </ScrollView>
        )}
      </View>
      <View style={styles.productList}>
        <Text style={[styles.title, { color: "white" }]}>
          Produits ({products.length})
        </Text>
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
    backgroundColor: "#0066CB",
    paddingHorizontal: 10,
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
    backgroundColor: "#0066CB",
    fontSize: 15,
    textAlign: "center",
    padding: 10,
    margin: 10,
  },
  buttonStyle: {
    display: "flex",
    alignItems: "stretch",
  },
  todoList: {
    height: 300,
  },
});
