import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const listStore = create((set) => ({
  lists: [],

  // Yeni liste ekleme
  addList: async (title, color, listItems) => {
    set((state) => {
      const newLists = [
        ...state.lists,  // `state.todos` değil, `state.lists` olmalı
        {
          id: Date.now(), // Her liste için benzersiz bir id
          title: title,
          color: color,
          listitems: listItems || [],
        },
      ];
      AsyncStorage.setItem("lists", JSON.stringify(newLists)); // Güncellenmiş listeleri kaydet
      return { lists: newLists };
    });
  },

  // Liste'yi silme
  removeList: async (id) => {
    set((state) => {
      const updatedLists = state.lists.filter((list) => list.id !== id);
      AsyncStorage.setItem("lists", JSON.stringify(updatedLists)); // Güncellenmiş listeleri kaydet
      return { lists: updatedLists };  // `newLists` değil, `updatedLists` döndürülmeli
    });
  },

    // Tüm listeleri temizleme
    removeAllLists: async () => {
      set({ lists: [] });
      AsyncStorage.removeItem('lists'); // Tüm liste'leri sil
    },

  // Listeleri yüklemek için işlev
  loadLists: async () => {
    try {
      const getlists = await AsyncStorage.getItem("lists");
      if (getlists) {  // Burada `getlists` kullanılmalı, `lists` değil
        set({ lists: JSON.parse(getlists) });
      }
    } catch (error) {
      console.error("Failed to load lists from AsyncStorage", error);
    }
  },
}));

export default listStore;
