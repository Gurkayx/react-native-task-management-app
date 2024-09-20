import React, { useEffect } from "react";
import { StyleSheet, useColorScheme, ScrollView, RefreshControl, View } from "react-native";
import AddtodoFlyBtn from "@/src/components/AddtodoFlyBtn";
import Todoitem from "@/src/components/Todoitem";
import NoTodoHave from "@/src/components/NoTodoHave";
import todoStore from "@/zustand/todoStore";

export default function TabOneScreen() {
  const theme = useColorScheme() ?? "dark";
  const { todos, addTodo, toggleTodo, removeTodo, removeAllTodos, loadTodos } = todoStore();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadTodos(); // Ekran yüklendiğinde todo'ları yükle
  }, [loadTodos]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or any async operation
    setTimeout(() => {
      setRefreshing(false);
      loadTodos(); // Veriyi yeniden yükle
    }, 2000); // Adjust timeout to your needs
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "black" : "white" },
      ]}
    >
      <AddtodoFlyBtn />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme === "dark" ? "white" : "black"} // RefreshControl için renk ayarı
          />
        }
      >
        {todos.length === 0 ? (
          <NoTodoHave />
        ) : (
          todos.map((todo:any) => (
            <Todoitem todo={todo} key={todo.id} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
