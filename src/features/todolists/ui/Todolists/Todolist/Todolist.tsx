import {CreateItemForm} from '../../../../../common/components/CreateItemForm/CreateItemForm.tsx';
import {TodolistType} from '@/features/todolists/model/todolists-reducer.ts';
import {createTaskAC, TaskType} from '@/features/todolists/model/tasks-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {TodolistTitle} from '@/features/todolists/ui/Todolists/Todolist/TodolistTitle/TodolistTitle.tsx';
import {Tasks} from '@/features/todolists/ui/Todolists/Todolist/Tasks/Tasks.tsx';
import {FilterButtons} from '@/features/todolists/ui/Todolists/Todolist/FilterButtons/FilterButtons.tsx';


type PropsType = {
    todolist: TodolistType
}

export const Todolist = ({
                             todolist,
                         }: PropsType) => {


    const dispatch = useAppDispatch();

    function createTask(todolistId: TodolistType['id'], title: TaskType['title']) {
        dispatch(createTaskAC({id: todolistId, title}))
    }

    return <div>
                <TodolistTitle todolist={todolist}/>
                <CreateItemForm onCreateItem={(title) => createTask(todolist.id, title)}/>
                <Tasks todolist={todolist}/>
                <FilterButtons todolist={todolist}/>
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
