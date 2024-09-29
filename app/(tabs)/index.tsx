import {
  StyleSheet,
  ScrollView,
  Platform,
  UIManager,
  LayoutAnimation,
  TouchableWithoutFeedback,
} from "react-native";
import { uuid } from "expo-modules-core";

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
  const [showProducts, setShowProducts] = useState(false);
  const handleSelectProduct = (product: string) => {
    setSelectedProduct(product === selectedProduct ? "" : product);
  };
  const handleSelectTodo = (todo: TodoType | null) => {
    setSelectedTodo(todo === selectedTodo ? null : todo);
  };

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.todoList, showProducts ? styles.reducedTodo : {}]}>
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
        <TouchableWithoutFeedback
          delayPressIn={100}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setShowProducts(!showProducts);
          }}
        >
          <Text style={[styles.title, { color: "white" }]}>
            Produits ({products.length})
          </Text>
        </TouchableWithoutFeedback>
        {products.length === 0 && <NoProducts />}
        <ScrollView style={styles.scrollView}>
          {products.map((p) => (
            <BarcodeCard
              barcode={p}
              onPress={() => handleSelectProduct(p)}
              selected={selectedProduct === p}
              key={uuid.v4()}
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
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
    width: "100%",
    textAlign: "center",
  },
  productList: {
    backgroundColor: "#0066CB",
    paddingHorizontal: 10,
    height: "100%",
    paddingBottom: 50,
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
    height: "75%",
    marginBottom: 20,
  },
  reducedTodo: {
    height: "0%",
  },
});
