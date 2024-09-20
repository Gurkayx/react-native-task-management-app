import { StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "./useColorScheme";
import todoStore from "@/zustand/todoStore";
import { Ionicons } from "@expo/vector-icons";

interface todoItemProp {
  todo: any;
}

const Todoitem: React.FC<todoItemProp> = ({ todo }) => {
  const theme = useColorScheme() ?? "dark";
  const { toggleTodo, removeTodo } = todoStore();
  const [isEnabled, setIsEnabled] = useState(todo.completed);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    toggleTodo(todo.id);
  };



  // Renk isimlerine karşılık gelen hex kodları
  const colorMap: { [key: string]: string } = {
    mavi: "#4A90E2",
    kırmızı: "#D64545",
    mor: "#8E44AD",
    turuncu: "#F5A623",
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: todo.priority ? colorMap[todo.priority] : (theme === "dark" ? colorMap[todo.color] : colorMap[todo.color]),
          borderColor: theme === "dark" ? "white" : "black",
          borderWidth: todo.priority ? 1 : 0,
        },
      ]}
    >
      <View style={styles.textContainer}>
        <Text
          style={[
            { color: theme === "dark" ? "white" : "white", fontWeight: "bold" },
            isEnabled && styles.completedText,
          ]}
        >
          {todo.title}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "white" }}
          thumbColor={isEnabled ? (theme === "dark" ? "black" : "blue") : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <TouchableOpacity
          onPress={() => {
            removeTodo(todo.id);
          }}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-bin" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Todoitem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, // Android için gölge
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "black",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
