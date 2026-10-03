import {v1} from 'uuid';
import {TodolistType} from '../Todolist.tsx';
import {
    changeTodolistFilterAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer,
    updateTodolistTitleAC
} from './todolists-reducer.ts';
import { beforeEach, expect, test } from 'vitest';
import {FilterValuesType} from '../App.tsx';

let todolistId1: string;
let todolistId2: string;
let startState: TodolistType[] = [];

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test ('correct todolist should be deleted', () => {

    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

});

test ('correct todolist should be created', () => {

    const title = 'New Todolist';
    const todolistId = v1();
    const endState = todolistsReducer(startState, createTodolistAC(todolistId, title))

    expect (endState.length).toBe(3);
    expect (endState[2].title).toBe(title);
});

test ('correct todolist should be change its title', () => {
    const title = 'New Title';
    const endState = todolistsReducer(startState, updateTodolistTitleAC(todolistId2, title))

    expect(endState[1].title).toBe(title)
    expect(endState[1].id).toBe(todolistId2)
});

test ('correct todolist should change its filter', () => {
    const filter: FilterValuesType = 'active';
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId1, filter));

    expect(endState[0].filter).toBe(filter)
})