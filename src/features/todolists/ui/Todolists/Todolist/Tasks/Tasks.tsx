import {removeAllTasksAC, TaskType} from '@/features/todolists/model/tasks-reducer.ts';
import {List} from '@mui/material';
import {TodolistType} from '@/features/todolists/model/todolists-reducer.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectTasks} from '@/features/todolists/model/tasks-selectors.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {Task} from '@/features/todolists/ui/Todolists/Todolist/Tasks/Task/Task.tsx';

type Props = {
    todolist: TodolistType;
}

export const Tasks = ({todolist}: Props) => {

    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    let tasksForTodolist = tasks[todolist.id];

    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter((t: TaskType) => t.isDone === false);
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter((t: TaskType) => t.isDone === true);
    }

    function removeAllTasks(todolistId: TodolistType['id']) {
        dispatch(removeAllTasksAC({todolistId}));
    }


    return (
        <>
            <List>
                {tasksForTodolist.length === 0
                    ? <span>There is no any task in the list</span>
                    : tasksForTodolist.map((t: TaskType) => {
                        return (
                            <Task key={t.id} task={t} todolistId={todolist.id}/>
                            )})}
            </List>
            <button onClick={() => removeAllTasks(todolist.id)}>Delete all tasks</button>
        </>
    )
}