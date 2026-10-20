import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist')

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {id: nanoid(), title}}
});

export const updateTodolistTitleAC = createAction<{id: string, title: string}>('todolists/updateTodolistTitle');

export const changeTodolistFilterAC = createAction<{id: string, filterValue: FilterValuesType}>('todolists/changeTodolistFilter');

const initialState: TodolistType[] = [];

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(updateTodolistTitleAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title;
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state[index].filter = action.payload.filterValue;
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            const newTodolist: TodolistType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all'
            }
            state.push(newTodolist)
        })
})
