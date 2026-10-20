import {Checkbox, ListItem} from '@mui/material';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from '@/features/todolists/model/tasks-reducer.ts';
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan.tsx';
import IconButton from '@mui/material/IconButton';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {TodolistType} from '@/features/todolists/model/todolists-reducer.ts';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    task: TaskType
    todolistId: TodolistType['id']
}

export const Task = ({task, todolistId}: Props) => {
    const {id, title, isDone} = task;

    const dispatch = useAppDispatch();

    function changeTaskTitleHandler (title: TaskType['title']) {
        dispatch(changeTaskTitleAC({todolistId, taskID: id, title}));
    }
    function changeTaskStatus(todolistId: TodolistType['id'], taskID: TaskType['id'], isDone: TaskType['isDone']) {
        dispatch(changeTaskStatusAC({todolistId, taskID, isDone}));
    }
    function removeTask(todolistId: TodolistType['id'], taskId: TaskType['id']) {
        dispatch(removeTaskAC({todolistId, taskId}));
    }
    return (
        <ListItem
                  sx={{p: 0, justifyContent: 'space-between', opacity: isDone ? 0.5 : 1}}>
            <div>
                <Checkbox
                    checked={isDone}
                    onChange={(e) => changeTaskStatus(todolistId, id, e.currentTarget.checked)}
                />
                <EditableSpan value={title} className={isDone ? 'task-done' : ''} onChange={changeTaskTitleHandler}/>
            </div>

            <IconButton onClick={() => removeTask(todolistId, id)}><DeleteIcon /></IconButton>
        </ListItem>
    )
}