import {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type Props = {
    value: string
    className?: string
    onChange: (title: string) => void

}

export const EditableSpan = ({value, className, onChange}: Props) => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(value);

    function turnOnEditMode() {
        setIsEditMode(true);
    }

    function turnOffEditMode() {
        setIsEditMode(false);
        onChange (title);

    }

    function changeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value);
    }

    return (
        <>
            {isEditMode ? (
                <TextField variant={'outlined'} value={title}  size={'small'} autoFocus onBlur={turnOffEditMode} onChange={changeTitle}></TextField>
            ) : (
                <span className={className} onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    );
};