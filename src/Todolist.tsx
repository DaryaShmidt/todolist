import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  removeAllTasks: () => void
  createTask: (title: TaskType['title']) => void
}

export const Todolist = ({ title, tasks, removeTask, removeAllTasks, createTask }: PropsType) => {

  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let [inputTitle, setInputTitle] = useState<TaskType['title']>('')

  function onChangeInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setInputTitle(event.currentTarget.value);
  }

  function onClickButtonHandler() {
    createTask(inputTitle);
    setInputTitle('');
  }

  function createTaskOnEnterHandler(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onClickButtonHandler();
    }
  }

  return <div>
    <h3>{title}</h3>
    <div>
      <input value={inputTitle}
        onChange={onChangeInputHandler}
        onKeyDown={createTaskOnEnterHandler} />
      <button onClick={onClickButtonHandler}>+</button>
    </div>
    <ul>
      {tasksForTodolist.length === 0
        ? <span>There is no any task in the list</span>
        : tasksForTodolist.map(t => <li key={t.id}>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <button onClick={() => { removeTask(t.id) }}>x</button>
          </li>)}
    </ul>
    <div>
      <button onClick={() => { changeFilter("all") }}>
        All
      </button>
      <button onClick={() => { changeFilter("active") }}>
        Active
      </button>
      <button onClick={() => { changeFilter("completed") }}>
        Completed
      </button>
    </div>
    <button onClick={removeAllTasks}>Delete all tasks</button>
  </div>
}

























//------------------------------------------------------------------------------------------------

// import React, {useState} from 'react';
// import {FilterValuesType} from './App';
//
// type TaskType = {
//     id: number
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (taskId: number) => void
//     //changeFilter: (value: FilterValuesType) => void
//     deleteAllTasks:()=>void
// }
//
// export function Todolist(props: PropsType) {
//
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//
//     let tasksForTodolist = props.tasks;
//
//     if (filter === "three") {
//         tasksForTodolist = props.tasks.filter(t => t.id<4);
//     }
//     if (filter === "active") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === true);
//     }
//
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//     return <div>
//         <h3>{props.title}</h3>
//         <div>
//             <input/>
//             <button>+</button>
//         </div>
//         <ul>
//             {
//                 tasksForTodolist.map(t => <li key={t.id}>
//                     <input type="checkbox" checked={t.isDone}/>
//                     <span>{t.title}</span>
//                     <button onClick={ () => { props.removeTask(t.id) } }>x</button>
//                 </li>)
//             }
//         </ul>
//         <button onClick={()=>props.deleteAllTasks()}>DELETE ALL TASKS</button>
//         <div>
//             <button onClick={ () => { changeFilter("three") } }>
//                 Give me the first three
//             </button>
//             <button onClick={ () => { changeFilter("all") } }>
//                 All
//             </button>
//             <button onClick={ () => { changeFilter("active") } }>
//                 Active
//             </button>
//             <button onClick={ () => { changeFilter("completed") } }>
//                 Completed
//             </button>
//         </div>
//     </div>
// }
