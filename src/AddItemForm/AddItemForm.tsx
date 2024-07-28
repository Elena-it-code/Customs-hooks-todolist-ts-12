import TextField from '@mui/material/TextField/TextField';
import React from 'react';
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {useAddItemForm} from "./hooks/useAddItemForm";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {

    let {
        title,
        error,
        addItem,
        onChangeHandler,
        onKeyPressHandler
    } = useAddItemForm(props.addItem)

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyPressHandler} // ***
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox />
        </IconButton>
    </div>
} );



// *** onKeyPress={onKeyPressHandler}
// Атрибут onKeyPress устарел (deprecated), и его использование не рекомендуется.
// Вместо этого используйте onKeyDown или onKeyUp для обработки событий клавиатуры в ваших компонентах.
// Это обеспечит большую совместимость и надежность в вашем приложении.

// Причина устаревания
// Событие onKeyPress часто использовалось для обработки символов, вводимых пользователем, но оно имеет ограничения и
// может вести себя неконсистентно в различных браузерах и сценариях. В современных веб-приложениях рекомендуется
// использовать onKeyDown и onKeyUp, которые более надежны и предоставляют большую гибкость.