import {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export const App = ()=> {
  let [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ]);

  function createTask(title: TaskType['title']) {
    const newTask =  {id: v1(), title: title, isDone: false};
    setTasks([newTask, ...tasks]);
  }

  function changeTaskStatus(taskID: TaskType['id'], isDone:TaskType['isDone']){
    const newState: TaskType[] = tasks.map(task => task.id === taskID ? {...task, isDone} : task)
    setTasks(newState);
  }

  function removeTask(id: TaskType["id"]) {
    let filteredTasks = tasks.filter(t => t.id != id);
    setTasks(filteredTasks);
  }

  function removeAllTasks() {
    setTasks([]);
  }

  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                removeAllTasks={removeAllTasks}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                />
    </div>
  );
}

