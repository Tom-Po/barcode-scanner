import { View, Text, StyleSheet } from "react-native";
import { TodoType } from "@/app/store/todoSlice";

export default function TodoCard(props: { todo: TodoType }) {
  const { id, title, content, color, createdAt, urgency } = props.todo;
  return (
    <View style={styles.todoCard}>
      <Text>id : {id}</Text>
      <Text>title : {title}</Text>
      <Text>content : {content}</Text>
      <Text>urgency : {urgency}</Text>
      <Text>created : {createdAt.toISOString()}</Text>
      <Text>color : {color}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  todoCard: {
    marginVertical: 30,
    marginHorizontal: 10,
    borderRadius: 3,
    borderColor: "#000",
    borderWidth: 2,
  },
});
