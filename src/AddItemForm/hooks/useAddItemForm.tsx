import {ChangeEvent, KeyboardEventHandler, useState} from "react";


export function useAddItemForm(
    onItemAdded: (title: string) => void) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const addItem = () => {
        if (title.trim() !== "") {
            onItemAdded(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }


    return {
        title,
        error,
        addItem,
        onChangeHandler,
        onKeyPressHandler,
    }

}