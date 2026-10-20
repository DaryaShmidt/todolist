import {Grid, Paper} from '@mui/material';
import {selectTodolists} from '@/features/todolists/model/todolists-selectors.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {Todolist} from '@/features/todolists/ui/Todolists/Todolist/Todolist.tsx';



export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists);

    return (
        <>
            {todolists.map(todolist => {
                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{ p: '0 20px 20px 20px' }}>
                            <Todolist key={todolist.id}
                                      todolist={todolist}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}