import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import listStore from "@/zustand/listStore";
import NoListHave from "@/src/components/NoListHave";
import AddlistFlyBtn from "@/src/components/AddlistFlyBtn";
import ListItem from "@/src/components/ListItem";

export default function TabTwoScreen() {
  const { lists, loadLists,removeList } = listStore();
  const theme = useColorScheme() ?? "dark";
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadLists(); // Ekran yüklendiğinde liste'leri yükle
  }, [loadLists]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      loadLists();
    }, 2000); // Adjust timeout to your needs
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "black" : "white" },
      ]}
    >
      <AddlistFlyBtn />
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          marginTop: 20,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme === "dark" ? "white" : "black"} // RefreshControl için renk ayarı
          />
        }
      >
        {lists.length === 0 ? (
          <NoListHave />
        ) : (
          lists.map((list: any) => <ListItem list={list} key={list.id} />)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
