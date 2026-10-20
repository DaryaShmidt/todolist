import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan.tsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteTodolistAC, TodolistType, updateTodolistTitleAC} from '@/features/todolists/model/todolists-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';

type Props = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: Props) => {

    const dispatch = useAppDispatch();

    function deleteTodolist(todolistId: TodolistType['id']) {
        dispatch(deleteTodolistAC({id: todolistId}))
    }
    function changeTodolistTitle(title: TodolistType['title']) {
        dispatch(updateTodolistTitleAC({id: todolist.id, title}))
    }

    return (
        <div className={'container'}>
            <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle}/></h3>
            <IconButton onClick={() => deleteTodolist(todolist.id)}><DeleteIcon /></IconButton>
        </div>
    )
}