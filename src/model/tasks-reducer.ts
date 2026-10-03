import {TasksState} from '../App.tsx';
import {TaskType, TodolistType} from '../Todolist.tsx';
import {v1} from 'uuid';

type createTaskAction = ReturnType<typeof createTaskAC>
type changeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>
type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
type removeTaskAction = ReturnType<typeof removeTaskAC>
type removeAllTasksAction = ReturnType<typeof removeAllTasksAC>
type createTodolistTasksAction = ReturnType<typeof createTodolistTasksAC>
type removeTodolistTasksAction = ReturnType<typeof removeTodolistTasksAC>

type Actions = createTaskAction | changeTaskTitleAction | changeTaskStatusAction | removeTaskAction | removeAllTasksAction | createTodolistTasksAction | removeTodolistTasksAction;

export const createTaskAC = (id: TodolistType['id'], title: TaskType['title']) => {
    return {type: 'CREATE-TASK', payload: {id, title}} as const
};

export const changeTaskTitleAC = (title: TaskType['title'], todolistId: TodolistType['id'], taskID: TaskType['id']) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {title, todolistId, taskID}} as const
};

export const changeTaskStatusAC = (todolistId: TodolistType['id'], taskID: TaskType['id'], isDone: TaskType['isDone']) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskID, isDone}} as const
};

export const removeTaskAC = (todolistId: TodolistType['id'], taskId: TaskType["id"]) => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
};

export const removeAllTasksAC = (todolistId: TodolistType['id']) => {
    return {type: 'REMOVE-ALL-TASKS', payload: {todolistId}} as const
}

export const createTodolistTasksAC = (todolistId: TodolistType['id']) => {
    return {type: 'CREATE-TODOLIST-TASKS', payload: {todolistId}} as const
}

export const removeTodolistTasksAC = (todolistId: TodolistType['id']) => {
    return {type: 'REMOVE-TODOLIST-TASKS', payload: {todolistId}} as const
}


export const tasksReducer = (state: TasksState, action: Actions): TasksState => {
    switch (action.type) {
        case 'REMOVE-TODOLIST-TASKS':
            const newState = {...state};
            delete newState[action.payload.todolistId]
            return newState;
        case 'CREATE-TODOLIST-TASKS':
            return {...state,[action.payload.todolistId]: []}
        case 'REMOVE-ALL-TASKS':
            return {...state, [action.payload.todolistId]: []};
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskID ? {...task, isDone: action.payload.isDone} : task)};
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map (task => task.id === action.payload.taskID ? {...task, title: action.payload.title} : task)};
        case 'CREATE-TASK':
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.id]: [...state[action.payload.id], newTask]};
        case 'REMOVE-TASK':
           return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
        default:
            return state;
    }
}

