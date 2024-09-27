import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { removeTodo, TodoType } from "@/app/store/todoSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import dayjs from "dayjs";
import { useAppDispatch } from "@/app/hooks";

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
  const { id, title, content, dueDate, urgency } = todo;
  const dispatch = useAppDispatch();
  return (
    <View
      style={[
        styles.todoCard,
        selected ? styles.selected : {},
        styles[urgency],
      ]}
    >
      <TouchableOpacity
        delayPressIn={100}
        activeOpacity={1}
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
          {dayjs(dueDate).format("DD/MM")} - {title.slice(0, 35)}
          {title.length > 30 && "..."}
        </Text>
        {!selected && (
          <View style={styles.pill}>
            <FontAwesome
              name="bell"
              size={20}
              opacity={selected ? 0.8 : 0.5}
              color={urgency === "urgent" ? "white" : "orange"}
              style={styles.pill}
            />
          </View>
        )}
      </TouchableOpacity>
      {showDetails && selected && (
        <>
          <View style={styles.todoContentWrapper}>
            <Text>{content}</Text>
          </View>

          <TouchableOpacity
            style={[styles.pill, { right: 12, top: 5 }]}
            onPress={() => dispatch(removeTodo(todo))}
          >
            <FontAwesome
              name="close"
              size={20}
              opacity={selected ? 0.8 : 0.5}
              color={urgency === "urgent" ? "white" : "orange"}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  todoCard: {
    marginVertical: 5,
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
    borderColor: "#FE6632",
  },
  urgentTitle: {
    backgroundColor: "#FE6632",
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
