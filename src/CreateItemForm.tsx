import {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            <input value={inputTitle}
                   onChange={onChangeInputHandler}
                   onKeyDown={(event) => createItemOnEnterHandler(event)}
                   className={error ? 'error' : ''}/>
            <button onClick={() => onClickButtonHandler()}>+</button>
            {error && <span className={'error-message'}>{error}</span>}
        </div>
    );
};

