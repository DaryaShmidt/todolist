import {TasksState} from '../app/App.tsx';
import {TaskType, TodolistType} from '../Todolist.tsx';
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer.ts';



export const createTaskAC = createAction<{id: TodolistType['id'], title: TaskType['title']}>('tasks/createTask');

export const changeTaskTitleAC = createAction<{title: TaskType['title'], todolistId: TodolistType['id'], taskID: TaskType['id']}>('tasks/changeTaskTitle');

export const changeTaskStatusAC = createAction<{todolistId: TodolistType['id'], taskID: TaskType['id'], isDone: TaskType['isDone']}>('tasks/changeTaskStatus');

export const removeTaskAC = createAction<{todolistId: TodolistType['id'], taskId: TaskType["id"]}>('tasks/removeTask');

export const removeAllTasksAC = createAction<{todolistId: TodolistType['id']}>('tasks/removeAllTasks');

const initialState: TasksState = {};

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(createTodolistAC, (state, action) => {
            return {...state, [action.payload.id]: []};
        })
        .addCase(removeAllTasksAC, (state, action) => {
            return {...state, [action.payload.todolistId]: []};
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskID)
            if (index !== -1) {
                state[action.payload.todolistId][index].isDone = action.payload.isDone;
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskID)
            if (task) {
                task.title = action.payload.title;
            }
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask = {id: nanoid(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.id]: [newTask,...state[action.payload.id]]};
        })
        .addCase(removeTaskAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            state[action.payload.todolistId].splice(index, 1);
        })
});

