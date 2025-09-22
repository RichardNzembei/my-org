import React, { useState } from "react";
import { View, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";
import Header from "./components/Header";
import { TaskProvider, useTasksContext } from "./context/TasksContext";

function TaskList() {
  const { tasks, toggleTask, deleteTask } = useTasksContext();

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.taskContainer}>
          <TouchableOpacity onPress={() => toggleTask(item.id)}>
            <Text style={[styles.task, item.completed && styles.completed]}>
              {item.title}
            </Text>
          </TouchableOpacity>
          <Button title="❌" onPress={() => deleteTask(item.id)} />
        </View>
      )}
    />
  );
}

function TaskInput() {
  const [task, setTask] = useState("");
  const { addTask } = useTasksContext();

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter a task..."
        value={task}
        onChangeText={setTask}
      />
      <Button
        title="Add"
        onPress={() => {
          addTask(task);
          setTask("");
        }}
      />
    </View>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <View style={styles.container}>
        <Header title="📱 Pocket Tasks" subtitle="Your personal task manager" />
        <TaskInput />
        <TaskList />
      </View>
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
    padding: 5,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
  },
  task: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
