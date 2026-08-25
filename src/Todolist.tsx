import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type PropsType = {
  todolist: TodolistType
  tasks: TaskType[]
  removeTask: (todolistId: TodolistType['id'], taskId: string) => void
  removeAllTasks: (todolistId: TodolistType['id']) => void
  createTask: (todolistId: TodolistType['id'], title: TaskType['title']) => void
  changeTaskStatus: (todolistId: TodolistType['id'], taskId: TaskType['id'], isDone:TaskType['isDone']) => void;
  changeFilter: (todolistId: TodolistType['id'], filterValue: FilterValuesType) => void
  deleteTodolist: (todolistId: TodolistType['id']) => void
}

export const Todolist = ({todolist, tasks, removeTask, removeAllTasks, createTask, changeTaskStatus, changeFilter, deleteTodolist}: PropsType) => {


  let [error, setError] = useState<string|null>(null);

  function changeFilterHandler(todolistId: TodolistType['id'], filterValue: FilterValuesType) {
    changeFilter(todolistId, filterValue);
  }

  let [inputTitle, setInputTitle] = useState<TaskType['title']>('')

  function onChangeInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setError(null);
    setInputTitle(event.currentTarget.value);
  }


  function onClickButtonHandler(todolistId: TodolistType['id']) {
    if (inputTitle.trim() === ''){
      setError('Title is required');
    } else{
      createTask(todolistId, inputTitle);
      setInputTitle('');
    }
  }

  function createTaskOnEnterHandler(event: KeyboardEvent<HTMLInputElement>, todolistId: TodolistType['id']) {
    if (event.key === 'Enter') {
      onClickButtonHandler(todolistId);
    }
  }

  function onChangeTaskStatusHandler(todolistId: TodolistType['id'], taskId: TaskType['id'], isDone: TaskType['isDone']) {
    changeTaskStatus(todolistId, taskId, isDone);
  }

  function removeTaskHandler(todolistId: TodolistType['id'], taskId: TaskType['id']) {
    removeTask(todolistId, taskId);
  }

  function deleteTodolistHandler(todolistId: TodolistType['id']) {
    deleteTodolist(todolistId);
  }


  return <div>
    <div className={'container'}>
      <h3>{todolist.title}</h3>
      <button onClick={()=> deleteTodolistHandler(todolist.id)}>X</button>
    </div>
    <div>
      <input value={inputTitle}
        onChange={onChangeInputHandler}
        onKeyDown={(event)=> createTaskOnEnterHandler(event, todolist.id)}
        className={error ? 'error' : '' }/>
      <button onClick={()=>onClickButtonHandler(todolist.id)}>+</button>
      {error && <span className={'error-message'}>{error}</span>}
    </div>
    <ul>
      {tasks.length === 0
        ? <span>There is no any task in the list</span>
        : tasks.map(t => <li key={t.id}>
            <input
              type="checkbox"
              checked={t.isDone}
              onChange={(e) => onChangeTaskStatusHandler(todolist.id, t.id, e.currentTarget.checked)}
            />
            <span className={t.isDone === true ? 'is-done' : ''}>{t.title}</span>
            <button onClick={() => removeTaskHandler(todolist.id, t.id)}>x</button>
          </li>)}
    </ul>
    <div>
      <button onClick={() => changeFilterHandler(todolist.id, "all") } className={todolist.filter === 'all' ? 'active-filter' : ''}>
        All
      </button>
      <button onClick={() => changeFilterHandler(todolist.id, "active")} className={todolist.filter === 'active' ? 'active-filter' : ''}>
        Active
      </button>
      <button onClick={() => changeFilterHandler(todolist.id, "completed")} className={todolist.filter === 'completed' ? 'active-filter' : ''}>
        Completed
      </button>
    </div>
    <button onClick={()=> removeAllTasks(todolist.id)}>Delete all tasks</button>
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
