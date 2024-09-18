import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { TodoType } from "@/app/store/todoSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TodoCard(props: {
  todo: TodoType;
  selected: boolean;
  // TODO fuck typescript
  onPress?: any;
}) {
  const { todo, selected, onPress } = props;
  const { id, title, content, color, createdAt, dueDate, urgency } = todo;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.todoCard,
        selected ? styles.selected : {},
        styles[urgency],
      ]}
      onPress={() => onPress(id)}
    >
      {/* <Text>id : {id}</Text> */}
      <Text style={styles.todoTitle}>{title}</Text>
      <Text style={styles.todoContent}>{content}</Text>
      <Text style={styles.pill}>
        <FontAwesome
          name="bell"
          size={20}
          color={urgency === "urgent" ? "red" : "blue"}
        />
      </Text>
      <Text>Date création {createdAt.toISOString()}</Text>
      <Text>Date due {dueDate.toISOString()}</Text>
      <Text>color : {color}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todoCard: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
    position: "relative",
  },
  selected: {
    borderRadius: 3,
    borderWidth: 1,
  },
  todoTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
    padding: 10,
  },
  todoContent: {
    padding: 10,
  },
  urgent: {
    borderColor: "red",
  },
  common: {
    borderColor: "blue",
  },
  pill: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
