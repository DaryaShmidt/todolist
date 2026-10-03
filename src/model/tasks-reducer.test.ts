import {TasksState} from '../App.tsx';
import {beforeEach, expect, test} from 'vitest';
import {v1} from 'uuid';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC, createTodolistTasksAC,
    removeAllTasksAC,
    removeTaskAC, removeTodolistTasksAC,
    tasksReducer
} from './tasks-reducer.ts';



let startState: TasksState = {};
let todolistId1: string;
let todolistId2: string;
let taskId11: string;

beforeEach(() => {

    todolistId1 = v1()
    todolistId2 = v1()

    taskId11 = v1()

    startState = {
        [todolistId1]: [{ id: taskId11,  title: 'Task11', isDone: false}, { id: v1(),  title: 'Task12', isDone: true}],
        [todolistId2]: [{ id: v1(),  title: 'Task21', isDone: true}, { id: v1(),  title: 'Task22', isDone: true}],
    }
})


test ('correct task should be created in correct todolist', () => {
    const title = 'New Task';
    const endState = tasksReducer(startState, createTaskAC(todolistId1, title))

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId1][2].title).toBe('New Task');

})

test('correct task should change its title in correct todolist', () => {
    const title = 'Updated Task Title';

    const endState = tasksReducer(startState, changeTaskTitleAC(title, todolistId1, taskId11))
    expect(endState[todolistId1][0].title).toBe('Updated Task Title' )
})

test ('correct task should change its status', () => {
    const isDone = true;
    const endState = tasksReducer(startState, changeTaskStatusAC(todolistId1, taskId11, isDone));
    expect(endState[todolistId1][0].isDone).toBe(true)
})

test ('correct task should be removed from correct todolist', () => {
    const endState = tasksReducer(startState, removeTaskAC(todolistId1, taskId11));

    expect(endState[todolistId1].length).toBe(1);
})

test ('all tasks should be removed from correct todolist', () => {
    const endState = tasksReducer(startState, removeAllTasksAC(todolistId2))
    expect(endState[todolistId2].length).toBe(0)
})

test ('array should be created for new todolist', () => {
    const newTodolistId = v1();
    const endState = tasksReducer(startState, createTodolistTasksAC(newTodolistId))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k === newTodolistId);
    if(!newKey){
        throw Error ('the new key is not added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('array should be deleted for removed todolist', () => {
    const endState = tasksReducer(startState, removeTodolistTasksAC(todolistId1))
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState[todolistId1]).toBeUndefined()
})