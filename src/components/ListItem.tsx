import { StyleSheet, Text, View ,TouchableOpacity} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import listStore from "@/zustand/listStore";

interface listItemProp {
  list: {
    id:any;
    title: string;
    color: string;
    listitems: { text: string }[];
  };
}

// Renk isimlerine karşılık gelen hex kodları
const colorMap: { [key: string]: string } = {
  mavi: "#4A90E2",
  kırmızı: "#D64545",
  mor: "#8E44AD",
  turuncu: "#F5A623",
};

const ListItem: React.FC<listItemProp> = ({ list }) => {

    const { removeList } = listStore();


  return (
    <View style={[styles.listcontainer, { backgroundColor: colorMap[list.color] || "#fff" }]}>
      <TouchableOpacity onPress={()=>{removeList(list.id)}} style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end",marginBottom:10}}>
        <Ionicons name="close" size={25} color={"white"} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{list.title}</Text>
      </View>
      <View style={styles.contentContainer}>
        {list.listitems.map((item, index) => (
          <Text key={index} style={styles.content}>
            {item.text}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listcontainer: {
    display:"flex",
    flexDirection: "column",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    width:"100%",
    minHeight:120
  },
  titleContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    color: "#fff", // Başlık yazı rengi
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    fontSize: 14,
    textAlign: "left",
    color: "#fff", // İçerik yazı rengi
  },
});
