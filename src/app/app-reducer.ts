import {createAction, createReducer} from '@reduxjs/toolkit';

export type ThemeModeType = 'light' | 'dark';

const initialState= {
    themeMode: 'light' as ThemeModeType,
}

export const changeThemeModeAC = createAction<{themeMode: ThemeModeType}>('app/changeThemeMode');

export const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(changeThemeModeAC, (state, action) => {
            state.themeMode = action.payload.themeMode;
        })

})