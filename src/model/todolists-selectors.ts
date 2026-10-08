import {TodolistType} from '../Todolist.tsx';
import {RootState} from '../app/store.ts';


export const selectTodolists = (state: RootState): TodolistType[] => state.todolists;