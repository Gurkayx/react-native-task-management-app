import listStore from "@/zustand/listStore";
import todoStore from "@/zustand/todoStore";
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function ModalScreen() {
  const theme = useColorScheme() ?? "dark";
  const { removeAllTodos } = todoStore();
  const { removeAllLists } = listStore();

  function handleremovetodos() {
    Alert.alert(
      "Dikkat et!!", // Başlık
      "Tüm notların silinmek üzere devam etmek istiyor musun?",
      [
        {
          text: "Vazgeç",
          style: "cancel",
        },
        {
          text: "Tamam",
          onPress: () => {
            removeAllTodos();
            Alert.alert("Temizlendi", "Tüm notlar başarıyla silindi.", [
              { text: "SÜPER" },
            ]);
          },
        },
      ],
      { cancelable: false }
    );
  }

  function handleremovelists() {
    Alert.alert(
      "Dikkat et!!", // Başlık
      "Tüm listelerin silinmek üzere devam etmek istiyor musun?",
      [
        {
          text: "Vazgeç",
          style: "cancel",
        },
        {
          text: "Tamam",
          onPress: () => {
            removeAllLists();
            Alert.alert("Temizlendi", "Tüm listeler başarıyla silindi.", [
              { text: "SÜPER" },
            ]);
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "black" : "white" },
      ]}
    >
      <View style={{marginBottom:150}}>
        <Text style={theme === "dark" ? styles.darkThemeLogo:styles.lightThemeLogo}><Text style={{color:"#4A90E2"}}>G</Text>note</Text>
        <Text style={theme === "dark" ? styles.versionText:styles.versionTextlight}><Text style={{color:"#4A90E2"}}>V</Text>1.0</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.deleteTodoBtn}
          onPress={handleremovetodos}
        >
          <Text style={styles.btntext}>Tüm notları temizle</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={handleremovelists}
        style={styles.deleteListBtn}>
          <Text style={styles.btntext}>Tüm listeleri temizle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteTodoBtn: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  deleteListBtn: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
  },
  btntext: {
    color: "white",
    fontWeight: "bold",
  },
  darkThemeLogo:{
    color:"white",
    fontWeight:"bold",
    fontSize:36,
    letterSpacing:3,
  },
  lightThemeLogo:{
    color:"black",
    fontWeight:"bold",
    fontSize:36,
    letterSpacing:3,
  },
  versionText:{
    fontSize:15,
    fontWeight:"bold",
    color:"white",
    paddingStart:5
  },
  versionTextlight:{
    fontSize:15,
    fontWeight:"bold",
    color:"black",
    paddingStart:5
  }
});
