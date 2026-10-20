import {createTheme} from '@mui/material/styles';
import {ThemeModeType} from "@/app/app-reducer.ts";


export const getTheme = (themeMode: ThemeModeType) => {
    return createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#ef6c00',
            },
        },
    })
}