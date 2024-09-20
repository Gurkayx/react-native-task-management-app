import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import listStore from "@/zustand/listStore";

const AddListModal = () => {
  const { addList } = listStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [listColor, setListColor] = useState("mavi");
  const [contentArray, setContentArray] = useState([]);
  const navigation = useNavigation();

  const isDisabled = !title || !contentArray.length;

  const handleSave = () => {
    if (title && contentArray.length) {
      addList(title, listColor, contentArray);
      navigation.goBack();
    } else {
      alert("Lütfen başlık ve içerik giriniz.");
    }
  };

  const handleContentAdd = () => {
    const newContentArray: any = content.split(",").map((item) => ({
      text: item.trim(),
      completed: false,
    }));
    setContentArray(newContentArray);
  };

  const toggleCompleted = (index: number) => {
    const updatedContentArray = [...contentArray];
    updatedContentArray[index].completed =
      !updatedContentArray[index].completed;
    setContentArray(updatedContentArray);
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
          placeholder="Yeni liste başlığı"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Yeni liste içeriği"
          style={styles.input2}
          value={content}
          onChangeText={setContent}
        />

        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <Text>Liste elemanlarını virgül (,) ile ayırın</Text>
        </View>

        <TouchableOpacity
          onPress={handleContentAdd}
          style={[styles.addButton, styles[`${listColor}Button`]]} // Dinamik stil burada
        >
          <Text style={styles.addButtonText}>İçerik Ekle</Text>
        </TouchableOpacity>

        <FlatList
          data={contentArray}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => toggleCompleted(index)}
              style={styles.listItem}
            >
              <Text
                style={[
                  styles.listItemText,
                  item.completed && styles.completedText,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.priorityContainer}>
          {["mavi", "kırmızı", "mor", "turuncu"].map((color: string) => (
            <TouchableOpacity
              key={color}
              onPress={() => setListColor(color)}
              style={[
                styles.priorityButton,
                listColor === color ? styles[`${color}Button`] : null,
              ]}
            >
              <Text
                style={
                  listColor === color
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
          style={[
            styles.saveButton,
            styles[`${listColor}Button`], // Seçilen renk burada uygulanacak
            isDisabled && styles.disabledButton,
          ]}
          disabled={isDisabled}
        >
          <Text style={styles.saveButtonText}>Kaydet</Text>
          <Ionicons name="save-sharp" color={"white"} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddListModal;

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
    minHeight: 400,
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
  input2: {
    backgroundColor: "whitesmoke",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    height: 120,
  },
  addButton: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  listItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  listItemText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
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
  },
  maviButton: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  kırmızıButton: {
    backgroundColor: "#D64545",
    borderColor: "#D64545",
  },
  morButton: {
    backgroundColor: "#8E44AD",
    borderColor: "#8E44AD",
  },
  turuncuButton: {
    backgroundColor: "#F5A623",
    borderColor: "#F5A623",
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
  disabledButton: {
    backgroundColor: "gray",
  },
});
