import TodoCard from "@/components/cards/TodoCard";
import TodoForm from "@/components/forms/TodoForm";
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

  const urgentTodos = todos
    .filter((t) => t.urgency === "urgent")
    .sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1));
  const commonTodos = todos
    .filter((t) => t.urgency === "common")
    .sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes ({todos.length})</Text>
      <TodoForm />
      <View style={styles.header}>
        <Text>Urgent</Text>
      </View>
      {urgentTodos.map((todo) => (
        <TodoCard
          key={"todo" + todo.id}
          todo={todo}
          selected={selectedTodo?.id === todo.id}
          showDetails={true}
          openCtxMenu={false}
          onPress={() => handleSelectTodo(todo)}
          onLongPress={() => handleLongPressTodo(todo)}
        />
      ))}
      <View style={styles.header}>
        <Text>A faire</Text>
      </View>
      {commonTodos.map((todo) => (
        <TodoCard
          key={"todo" + todo.id}
          todo={todo}
          selected={selectedTodo?.id === todo.id}
          showDetails={selectedTodo?.id === todo.id}
          openCtxMenu={false}
          onPress={() => handleSelectTodo(todo)}
          onLongPress={() => handleLongPressTodo(todo)}
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
  header: {
    paddingHorizontal: 10,
  },
});
