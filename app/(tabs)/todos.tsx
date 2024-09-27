import TodoForm from "@/components/forms/TodoForm";
import TodoList from "@/components/lists/todoList";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../hooks";
import { RootState } from "../store/store";
import { TodoType } from "../store/todoSlice";

export default function Todo() {
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  const [longPressed, setLongPressed] = useState<TodoType | null>(null);
  // Todo enum or something to sort properly

  const handleSelectTodo = (todo: TodoType) => {
    setSelectedTodo(todo.id === selectedTodo?.id ? null : todo);
  };

  const handleLongPressTodo = (todo: TodoType) => {
    // setLongPressed(todo.id === longPressed?.id ? null : todo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes ({todos.length})</Text>
      <TodoForm />
      <TodoList
        selectedTodo={selectedTodo}
        todos={todos}
        handleLongPressTodo={handleLongPressTodo}
        handleSelectTodo={handleSelectTodo}
      />
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
