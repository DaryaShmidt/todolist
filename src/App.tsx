import {useState} from 'react';
import './App.css';
import {TaskType, Todolist, TodolistType} from './Todolist';
import {v1} from 'uuid';
import {CreateItemForm} from './CreateItemForm.tsx';

export type FilterValuesType = "all" | "active" | "completed";

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

    return (
        <div className="App">
            <CreateItemForm onCreateItem={createTodolist}/>

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
                )
            })}

        </div>
    );
}

