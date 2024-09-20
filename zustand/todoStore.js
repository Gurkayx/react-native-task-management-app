import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const todoStore = create((set) => ({
  todos: [],

  // Yeni todo ekleme
  addTodo: async (title, priority, color) => {
    set((state) => {
      const newTodos = [
        ...state.todos,
        {
          id: Date.now(), // Her todo için benzersiz bir id
          title: title,
          completed: false, // Başlangıçta tamamlanmamış
          priority: priority,
          color: color, // Renk özelliği ekleniyor
        },
      ];
      AsyncStorage.setItem('todos', JSON.stringify(newTodos)); // Güncellenmiş todo'ları kaydet
      return { todos: newTodos };
    });
  },

  // Todo'nun tamamlanma durumunu değiştirme
  toggleTodo: async (id) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      AsyncStorage.setItem('todos', JSON.stringify(updatedTodos)); // Güncellenmiş todo'ları kaydet
      return { todos: updatedTodos };
    });
  },

  // Todo'yu silme
  removeTodo: async (id) => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      AsyncStorage.setItem('todos', JSON.stringify(updatedTodos)); // Güncellenmiş todo'ları kaydet
      return { todos: updatedTodos };
    });
  },

  // Tüm todo'ları temizleme
  removeAllTodos: async () => {
    set({ todos: [] });
    AsyncStorage.removeItem('todos'); // Tüm todo'ları sil
  },

  // Todo'ları yüklemek için işlev
  loadTodos: async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos) {
        set({ todos: JSON.parse(todos) });
      }
    } catch (error) {
      console.error("Failed to load todos from AsyncStorage", error);
    }
  },
}));

export default todoStore;
