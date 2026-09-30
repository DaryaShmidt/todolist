import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type Props = {
    onCreateItem: (title: string) => void
}


export const CreateItemForm = ({onCreateItem}: Props) => {

    let [inputTitle, setInputTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null);

    function onChangeInputHandler(event: ChangeEvent<HTMLInputElement>) {
        setError(null);
        setInputTitle(event.currentTarget.value);
    }

    function onClickButtonHandler() {
        if (inputTitle.trim() === '') {
            setError('Title is required');
        } else {
            onCreateItem(inputTitle);
            setInputTitle('');
        }
    }

    function createItemOnEnterHandler(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            onClickButtonHandler();
        }
    }

    return (
        <div>
            <TextField
                   variant={"outlined"}
                   value={inputTitle}
                   label="Enter a title"
                   size={'small'}
                   error={!!error}
                   helperText={error}
                   onChange={onChangeInputHandler}
                   onKeyDown={createItemOnEnterHandler}
                   className={error ? 'error' : ''}/>
            <IconButton onClick={() => onClickButtonHandler()} color={'primary'}><AddBoxIcon /></IconButton>
        </div>
    );
};

