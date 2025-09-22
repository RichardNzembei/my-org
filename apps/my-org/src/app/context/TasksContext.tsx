import React, { createContext, useContext } from 'react';
import { useTasks, Task } from '../hooks/useTasks';

type TasksContextType = {
  tasks: Task[];
  addTask: (tittle: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext must be used within a TasksProvider');
  }
  return context;
};
