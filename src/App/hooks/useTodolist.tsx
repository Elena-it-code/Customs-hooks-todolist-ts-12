import {useState} from "react";
import {todolistId1, todolistId2} from "../id-utils";
import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export function useTodolist(onTodolistRemoved: (id: string) => void,
                            onTodolistAdded: (id: string) => void) {
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        onTodolistRemoved(id)
    }

    function changeTodolistTitle(id: string, title: string) {
        // найдём нужный todolist
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.title = title;
            setTodolists([...todolists]);
        }
    }

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        onTodolistAdded(newTodolistId)
    }




    return {todolists, setTodolists, changeFilter, removeTodolist, changeTodolistTitle, addTodolist}
}


/*
    return [todolists, setTodolists] as const
    Использование `as const` в TypeScript помогает определить, что возвращаемое значение должно рассматриваться как
    неизменяемое (read-only) кортеж. Это может быть полезно для повышения безопасности типов и обеспечения неизменности
    возвращаемого значения.

    ### Что делает `as const`?
        `as const` является утверждением типов в TypeScript, которое позволяет указать, что значение должно рассматриваться
    как литеральный тип (literal type). Литеральные типы — это те, которые точно соответствуют значению, а не только его форме.

    ### Почему используется `as const` в этом контексте?
        Когда мы возвращаем кортеж `[todolists, setTodolists]`, мы хотим, чтобы TypeScript знал, что структура и порядок
    элементов этого кортежа неизменны. Это особенно полезно при использовании хука состояния (`useState`) в React,
    потому что мы хотим убедиться, что первый элемент всегда будет массивом `todolists`, а второй элемент
    всегда будет функцией `setTodolists`.

    ### Итог:
        Использование `as const` здесь:

    - Гарантирует неизменность структуры возвращаемого значения.
    - Повышает безопасность типов, предотвращая случайные изменения порядка или количества элементов в кортеже.
    - Делает код более предсказуемым и защищенным от ошибок.

        Таким образом, `as const` помогает избежать ошибок и делает наш код более безопасным и предсказуемым.*/