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

export default function Home() {
  const products = useAppSelector((state) => state.products.value);
  const todos = useAppSelector((state) => state.todos.todos);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<TodoType>();

  const handleSelectProduct = (product: string) => {
    setSelectedProduct(product === selectedProduct ? "" : product);
  };
  const handleSelectTodo = (todo: TodoType) => {
    setSelectedTodo(todo === selectedTodo ? undefined : todo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.todoList}>
        <Text style={styles.title}>A faire ({todos.length})</Text>
        {todos.length === 0 ? (
          <Text>Aucune note.</Text>
        ) : (
          <ScrollView style={styles.scrollView}>
            {todos.map((todo) => {
              const selected = selectedTodo?.id === todo.id;
              const showDetails = selected;
              return (
                <TodoCard
                  todo={todo}
                  onPress={() => handleSelectTodo(todo)}
                  openCtxMenu={false}
                  selected={selected}
                  showDetails={showDetails}
                  key={String(todo.id)}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
      <View style={styles.productList}>
        <Text style={styles.title}>Produits ({products.length})</Text>
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
  todoList: {
    height: 200,
    maxHeight: 200,
  },
});
