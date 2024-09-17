import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TodoType } from "@/app/store/todoSlice";

export default function TodoCard(props: {
  todo: TodoType;
  selected: boolean;
  // TODO fuck typescript
  onPress?: any;
}) {
  const { todo, selected, onPress } = props;
  const { id, title, content, color, createdAt, urgency } = todo;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.todoCard, selected ? styles.selected : ""]}
      onPress={() => onPress(id)}
    >
      <Text>id : {id}</Text>
      <Text>title : {title}</Text>
      <Text>content : {content}</Text>
      <Text>urgency : {urgency}</Text>
      <Text>created : {createdAt.toISOString()}</Text>
      <Text>color : {color}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todoCard: {
    marginVertical: 30,
    marginHorizontal: 10,
  },
  selected: {
    borderRadius: 3,
    borderColor: "#000",
    borderWidth: 1,
  },
});
