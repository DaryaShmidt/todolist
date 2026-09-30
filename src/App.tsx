import {useState} from 'react';
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


export type FilterValuesType = "all" | "active" | "completed";
type ThemeMode = 'dark' | 'light';

export const App = () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}])

    type TasksState = {
        [key: string]: TaskType[]
    }

    let [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    })

    function createTodolist(title: string){
        const newTodolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolist['id']]: []})
    }

    function createTask(todolistId: TodolistType['id'], title: TaskType['title']) {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    }

    function changeTaskTitle(title: TaskType['title'], todolistId: TodolistType['id'], taskID: TaskType['id']) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskID ? {...task, title} : task)});
    }

    function changeTodolistTitle(title: TodolistType['title'], todolistId: TodolistType['id']) {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
    }

    function changeTaskStatus(todolistId: TodolistType['id'], taskID: TaskType['id'], isDone: TaskType['isDone']) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskID ? {...task, isDone} : task)
        });
    }

    function removeTask(todolistId: TodolistType['id'], taskId: TaskType["id"]) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)});
    }

    function removeAllTasks(todolistId: TodolistType['id']) {
        setTasks({...tasks, [todolistId]: []});
    }

    function changeFilter(todolistId: TodolistType['id'], filterValue: FilterValuesType) {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {
            ...todolist,
            filter: filterValue
        } : todolist))
    }

    function deleteTodolist(todolistId: TodolistType['id']) {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId];
        setTasks({...tasks})
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

