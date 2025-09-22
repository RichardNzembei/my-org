import React, { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';

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
import {useTasks} from "./hooks/useTasks";



export default function App() {
  const [task, setTask] = useState('');
  const {tasks, addTask, toggleTask, deleteTask} = useTasks();

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
        <Button title="Add Task" onPress={()=>{addTask(task); setTask("");}} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.taskcontainer}>
            <TouchableOpacity
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Toggle ${item.title}`}
              accessibilityState={{ checked: item.completed }}
              onPress={() => toggleTask(item.id)}
            >
              <Text style={[styles.task, item.completed && styles.completed]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <Button
              title="Delete"
              accessibilityLabel={`Delete ${item.title}`}
              onPress={() => deleteTask(item.id)}
            />
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
