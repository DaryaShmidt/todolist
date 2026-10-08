import {TodolistType} from '../Todolist.tsx';
import {
    changeTodolistFilterAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer,
    updateTodolistTitleAC
} from './todolists-reducer.ts';
import { beforeEach, expect, test } from 'vitest';
import {FilterValuesType} from '../app/App.tsx';
import {nanoid} from '@reduxjs/toolkit';

let todolistId1: string;
let todolistId2: string;
let startState: TodolistType[] = [];

beforeEach(() => {
    todolistId1 = nanoid()
    todolistId2 = nanoid()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test ('correct todolist should be deleted', () => {

    const endState = todolistsReducer(startState, deleteTodolistAC({id: todolistId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

});

test ('correct todolist should be created', () => {

    const title = 'New Todolist';
    const endState = todolistsReducer(startState, createTodolistAC(title))

    expect (endState.length).toBe(3);
    expect (endState[2].title).toBe(title);
});

test ('correct todolist should be change its title', () => {
    const title = 'New Title';
    const endState = todolistsReducer(startState, updateTodolistTitleAC({id: todolistId2, title}))

    expect(endState[1].title).toBe(title)
    expect(endState[1].id).toBe(todolistId2)
});

test ('correct todolist should change its filter', () => {
    const filter: FilterValuesType = 'active';
    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId1, filterValue: filter}));

    expect(endState[0].filter).toBe(filter)
})