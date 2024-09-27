import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { TodoType } from "@/app/store/todoSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import dayjs from "dayjs";

export default function TodoCard(props: {
  todo: TodoType;
  selected: boolean;
  showDetails: boolean;
  // TODO fuck typescript
  onPress?: any;
  onLongPress?: any;
  openCtxMenu: boolean;
}) {
  const {
    todo,
    selected,
    showDetails = true,
    onPress,
    onLongPress = () => {},
    openCtxMenu,
  } = props;
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
      onLongPress={onLongPress(todo)}
    >
      <Text
        style={[
          styles.todoTitle,
          urgency === "urgent" && styles.urgentTitle,
          selected && { borderRadius: 0 },
        ]}
      >
        {title}
      </Text>
      {showDetails && (
        <>
          <View style={styles.todoContentWrapper}>
            <Text>{content}</Text>
            <Text>Date due {dayjs(dueDate).format("DD/MM/YY")}</Text>
          </View>
          <View style={styles.pill}>
            <FontAwesome
              name="bell"
              size={20}
              opacity={selected ? 0.8 : 0.5}
              color={urgency === "urgent" ? "white" : "orange"}
              style={styles.pill}
            />
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todoCard: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
    position: "relative",
    opacity: 0.65,
  },
  selected: {
    borderRadius: 5,
    borderWidth: 1,
    opacity: 1,
  },
  todoTitle: {
    fontWeight: "bold",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  todoContentWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  urgent: {
    borderColor: "red",
  },
  urgentTitle: {
    backgroundColor: "red",
    color: "white",
  },
  common: {
    borderColor: "orange",
  },
  pill: {
    position: "absolute",
    right: 5,
    top: 2.5,
  },
});
