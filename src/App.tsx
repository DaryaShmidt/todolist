import {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist, TodolistType} from './Todolist';
import {v1} from 'uuid';
import {CreateItemForm} from './CreateItemForm.tsx';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from '@mui/material';
import {NavButton} from './NavButton.ts';
import {containerSx} from './TodolistItem.styles.ts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    createTodolistAC, deleteTodolistAC,
    todolistsReducer,
    updateTodolistTitleAC
} from './model/todolists-reducer.ts';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    createTodolistTasksAC, removeAllTasksAC, removeTaskAC, removeTodolistTasksAC,
    tasksReducer
} from './model/tasks-reducer.ts';


export type FilterValuesType = "all" | "active" | "completed";
type ThemeMode = 'dark' | 'light';

export type TasksState = {
    [key: string]: TaskType[]
};

export const App = () => {

    const [todolists, dispatchTodolists] = useReducer (todolistsReducer, [])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {})

    function createTodolist(title: string){
        const id = v1();
        const action =  createTodolistAC(id, title)
        dispatchTodolists(action);
        dispatchTasks(createTodolistTasksAC(id))
    }

    function createTask(todolistId: TodolistType['id'], title: TaskType['title']) {
        dispatchTasks(createTaskAC(todolistId, title))
    }

    function changeTaskTitle(title: TaskType['title'], todolistId: TodolistType['id'], taskID: TaskType['id']) {
        dispatchTasks(changeTaskTitleAC(title, todolistId, taskID));
    }

    function changeTodolistTitle(title: TodolistType['title'], todolistId: TodolistType['id']) {
        dispatchTodolists(updateTodolistTitleAC(todolistId, title))
    }

    function changeTaskStatus(todolistId: TodolistType['id'], taskID: TaskType['id'], isDone: TaskType['isDone']) {
        dispatchTasks(changeTaskStatusAC(todolistId, taskID, isDone));
    }

    function removeTask(todolistId: TodolistType['id'], taskId: TaskType["id"]) {
        dispatchTasks(removeTaskAC(todolistId, taskId));
    }

    function removeAllTasks(todolistId: TodolistType['id']) {
        dispatchTasks(removeAllTasksAC(todolistId));
    }

    function changeFilter(todolistId: TodolistType['id'], filterValue: FilterValuesType) {
        dispatchTodolists(changeTodolistFilterAC(todolistId, filterValue))
    }

    function deleteTodolist(todolistId: TodolistType['id']) {
        dispatchTodolists(deleteTodolistAC(todolistId))
        dispatchTasks(removeTodolistTasksAC(todolistId))
    }

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#ef6c00',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" sx={{ mb: '30px' }}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode} />
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={{ mb: '30px' }}>
                    <CreateItemForm onCreateItem={createTodolist}/>
                </Grid>
                <Grid container spacing={4}>
            {todolists.map(todolist => {

                function getFilteredTasks() {
                    let tasksForTodolist = tasks[todolist.id];
                    switch (todolist.filter) {
                        case "active":
                            tasksForTodolist = tasks[todolist.id].filter(t => t.isDone === false);
                            return tasksForTodolist;
                        case "completed":
                            tasksForTodolist = tasks[todolist.id].filter(t => t.isDone === true);
                            return tasksForTodolist;
                        default:
                            return tasksForTodolist;
                    }
                }

                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{ p: '0 20px 20px 20px' }}>
                            <Todolist key={todolist.id}
                                      todolist={todolist}
                                      tasks={getFilteredTasks()}
                                      removeTask={removeTask}
                                      removeAllTasks={removeAllTasks}
                                      createTask={createTask}
                                      changeTaskStatus={changeTaskStatus}
                                      changeFilter={changeFilter}
                                      deleteTodolist={deleteTodolist}
                                      changeTaskTitle={changeTaskTitle}
                                      changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                )
            })}</Grid>
            </Container>
            </ThemeProvider>
        </div>
    );
}

