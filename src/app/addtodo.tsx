import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import todoStore from "@/zustand/todoStore";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddTodoModal = () => {
  const { addTodo } = todoStore();
  const [note, setNote] = useState("");
  const [importantNote, setImportantNote] = useState(false);
  const [todoColor, setTodoColor] = useState("mavi"); // Renk durumu
  const navigation = useNavigation();

  const isDisabledbtn = !note;

  const handleSave = () => {
    if (note.trim()) {
      addTodo(note, importantNote, todoColor); // Renk ekleniyor
      setNote("");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <TextInput
          placeholder="Yeni bir not içeriği"
          style={styles.input}
          value={note}
          onChangeText={setNote}
        />

        <View style={styles.priorityContainer}>
          {["mavi", "kırmızı", "mor", "turuncu"].map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => setTodoColor(color)}
              style={[
                styles.priorityButton,
                todoColor === color ? styles[`${color}Button`] : null,
              ]}
            >
              <Text
                style={
                  todoColor === color
                    ? styles.priorityText
                    : styles.priorityTextNot
                }
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleSave}
          disabled={isDisabledbtn}
          style={[
            styles.saveButton,
            {
              backgroundColor: isDisabledbtn
                ? "gray" // Disable durumda renk
                : todoColor === "mavi"
                ? "#4A90E2"
                : todoColor === "kırmızı"
                ? "#D64545"
                : todoColor === "mor"
                ? "#8E44AD"
                : "#F5A623",
            },
          ]}
        >
          <Text style={styles.saveButtonText}>Kaydet</Text>
          <Ionicons name="save-sharp" color={"white"} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTodoModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 260,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  input: {
    backgroundColor: "whitesmoke",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  priorityButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "skyblue",
  },
  maviButton: {
    backgroundColor: "#4A90E2",
  },
  kırmızıButton: {
    backgroundColor: "#D64545",
  },
  morButton: {
    backgroundColor: "#8E44AD",
  },
  turuncuButton: {
    backgroundColor: "#F5A623",
  },
  activePriority: {
    backgroundColor: "skyblue",
  },
  priorityText: {
    color: "white",
    fontWeight: "bold",
  },
  priorityTextNot: {
    color: "skyblue",
    fontWeight: "bold",
  },
  saveButton: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 10,
  },
});
