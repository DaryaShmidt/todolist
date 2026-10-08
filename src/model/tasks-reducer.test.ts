import {TasksState} from '../app/App.tsx';
import {beforeEach, expect, test} from 'vitest';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    removeAllTasksAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer.ts';
import {nanoid} from '@reduxjs/toolkit';
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer.ts';




let startState: TasksState = {};
let todolistId1: string;
let todolistId2: string;
let taskId11: string;

beforeEach(() => {

    todolistId1 = nanoid()
    todolistId2 = nanoid()

    taskId11 = nanoid()

    startState = {
        [todolistId1]: [{ id: taskId11,  title: 'Task11', isDone: false}, { id: nanoid(),  title: 'Task12', isDone: true}],
        [todolistId2]: [{ id: nanoid(),  title: 'Task21', isDone: true}, { id: nanoid(),  title: 'Task22', isDone: true}],
    }
})


test ('correct task should be created in correct todolist', () => {
    const title = 'New Task';
    const endState = tasksReducer(startState, createTaskAC({id: todolistId1, title}))

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][0].title).toBe('New Task');

})

test('correct task should change its title in correct todolist', () => {
    const title = 'Updated Task Title';

    const endState = tasksReducer(startState, changeTaskTitleAC({title, todolistId: todolistId1, taskID: taskId11}));
    expect(endState[todolistId1][0].title).toBe('Updated Task Title' )
})

test ('correct task should change its status', () => {
    const isDone = true;
    const endState = tasksReducer(startState, changeTaskStatusAC({todolistId: todolistId1, taskID: taskId11, isDone}));
    expect(endState[todolistId1][0].isDone).toBe(true)
})

test ('correct task should be removed from correct todolist', () => {
    const endState = tasksReducer(startState, removeTaskAC({todolistId: todolistId1, taskId: taskId11}));

    expect(endState[todolistId1].length).toBe(1);
})

test ('all tasks should be removed from correct todolist', () => {
    const endState = tasksReducer(startState, removeAllTasksAC({todolistId: todolistId2}));
    expect(endState[todolistId2].length).toBe(0)
})

test ('array should be created for new todolist', () => {
    const title = 'New Todolist';
    const endState = tasksReducer(startState, createTodolistAC(title));

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);
    if(!newKey){
        throw Error ('the new key is not added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('array should be deleted for removed todolist', () => {
    const endState = tasksReducer(startState, deleteTodolistAC({id: todolistId1}))
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState[todolistId1]).toBeUndefined()
})