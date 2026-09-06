import {ChangeEvent, useState} from 'react';

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
                <input value={title} autoFocus onBlur={turnOffEditMode} onChange={changeTitle}></input>
            ) : (
                <span className={className} onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    );
};