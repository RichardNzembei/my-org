import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const saved = await AsyncStorage.getItem('tasks');
        if (saved) setTasks(JSON.parse(saved));
      } catch (e) {
        console.error('failed to load tasks', e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (e) {
        console.error('Failed to save tasks.', e);
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = (title:string) => {
    if (title.trim() === '') return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return {tasks, addTask, toggleTask, deleteTask};
}
