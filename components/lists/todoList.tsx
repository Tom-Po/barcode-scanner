import { TodoType } from "@/app/store/todoSlice";
import { StyleSheet, Text, View } from "react-native";
import TodoCard from "../cards/TodoCard";

export default function TodoList(props: {
  todos: TodoType[];
  selectedTodo: TodoType | null;
  handleSelectTodo: (todo: TodoType) => void;
  handleLongPressTodo: (todo: TodoType) => void;
}) {
  const { todos, handleSelectTodo, handleLongPressTodo, selectedTodo } = props;
  const urgentTodos = todos
    .filter((t) => t.urgency === "urgent")
    .sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1));
  const commonTodos = todos
    .filter((t) => t.urgency === "common")
    .sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1));
  return (
    <View style={styles.container}>
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
      {commonTodos.map((todo, index) => (
        <TodoCard
          key={"todo" + todo.id}
          todo={{ ...todo, title: `${todo.title} (${index + 1})` }}
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
  header: {
    paddingHorizontal: 10,
  },
  container: {
    paddingHorizontal: 10,
  },
});
