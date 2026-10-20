import {containerSx} from '@/TodolistItem.styles.ts';
import Button from '@mui/material/Button';
import {Box} from '@mui/material';
import {changeTodolistFilterAC, FilterValuesType, TodolistType} from '@/features/todolists/model/todolists-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';

type Props = {
    todolist: TodolistType
}
export const FilterButtons = ({todolist}: Props) => {

    const dispatch = useAppDispatch();

    function changeFilter(todolistId: TodolistType['id'], filterValue: FilterValuesType) {
        dispatch(changeTodolistFilterAC({id: todolistId, filterValue}))
    }

    return (
        <Box sx={containerSx}>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'} onClick={() => changeFilter(todolist.id, 'all')}
                    className={todolist.filter === 'all' ? 'active-filter' : ''}>
                All
            </Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'} onClick={() => changeFilter(todolist.id, 'active')}
                    className={todolist.filter === 'active' ? 'active-filter' : ''}>
                Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}  onClick={() => changeFilter(todolist.id, 'completed')}
                    className={todolist.filter === 'completed' ? 'active-filter' : ''}>
                Completed
            </Button>
        </Box>
    )
}