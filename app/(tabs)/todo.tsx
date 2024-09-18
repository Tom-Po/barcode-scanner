import TodoCard from "@/components/cards/TodoCard";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../hooks";
import { RootState } from "../store/store";
import { TodoType } from "../store/todoSlice";

export default function Todo() {
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  // Todo enum or something to sort properly

  const handleSelectTodo = (todo: TodoType) => {
    setSelectedTodo(todo.id === selectedTodo?.id ? null : todo);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onPress={() => handleSelectTodo(todo)}
          selected={selectedTodo?.id === todo.id}
        />
      ))}
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
    marginVertical: 10,
  },
});
