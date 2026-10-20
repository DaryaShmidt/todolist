import {TodolistType} from '../ui/Todolists/Todolist/Todolist.tsx';
import {RootState} from '../../../app/store.ts';


export const selectTodolists = (state: RootState): TodolistType[] => state.todolists;