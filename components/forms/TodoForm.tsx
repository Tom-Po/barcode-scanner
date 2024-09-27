import { useAppDispatch } from "@/app/hooks";
import { TodoType } from "@/app/store/todoSlice";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { addTodo } from "../../app/store/todoSlice";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  const dispatch = useAppDispatch();

  const submit = () => {
    const todo: TodoType = {
      id: uuid.v4(),
      title,
      content,
      color: "green",
      createdAt: new Date(),
      dueDate,
      linkedProducts: [],
      urgency: "common",
    };
    dispatch(addTodo(todo));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text>Titre</Text>
        <TextInput value={title} onChangeText={setTitle} style={styles.input} />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Contenu</Text>
        <TextInput
          value={content}
          onChangeText={setContent}
          style={styles.input}
        />
      </View>
      <Button onPress={() => submit()} title="Ajouter une note" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputWrapper: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    marginVertical: 5,
  },
});
