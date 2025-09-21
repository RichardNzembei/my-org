import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from './components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(()=>{
    const loadTasks=async()=>{
      try{
        const saved=await AsyncStorage.getItem("tasks");
        if(saved) setTasks(JSON.parse(saved));
      }catch(e){
        console.error("failed to load tasks", e);
      }
    };
    loadTasks();
  }, []);

  useEffect(()=>{
    const saveTasks=async()=>{
      try{
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      }catch(e){
        console.error("failed to save tasks", e);
      }
    };
    saveTasks();
  },[tasks]);

  const addTask = () => {
    if (task.trim() === '') return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask('');
  };
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Header title="Pocket Tasks" subtitle="Your personal tasks manager" />

      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task ..."
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add Task" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskcontainer}>
            <TouchableOpacity onPress={() => toggleTask(item.id)}>
              <Text style={[styles.task, item.completed && styles.completed]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <Button title="❌" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  inputcontainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
    padding: 5,
  },
  taskcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
  },
  task: {
    fontSize: 18,
    padding: 8,
    color: 'blue',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
