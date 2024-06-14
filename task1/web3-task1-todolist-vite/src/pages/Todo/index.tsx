import {useEffect, useState} from "react";
import {GlobalAppMetadata, LOCAL_DATA_KEYS} from "@/constants";
import SessionStorageUtil from '@/utils/SessionStorageUtil'
import {toast} from "sonner";
import type {AddMapCallbackEventTypes, ICallbackEventsCallbackData, ITodoItem, ListMapCallbackEventTypes, ModalMapCallbackEventTypes} from "@/types";

import ToDoList from "@/components/ToDoList";
import AddToDo from "@/components/AddToDo";
import EditToDoModal from "@/components/EditToDoModal";
import ToDoDetail from "@/components/ToDoDetail";
import Title from "@/components/Title";


const Todo = () => {

    const [todos, setTodos] = useState<Array<ITodoItem>>([])
    const [todoDetail, setTodoDetail] = useState<ITodoItem | null>(null);

    // 新增编辑所需要
    const [visibleModal, setVisibleModal] = useState(false);
    const [editTodoDetail, setEditTodoDetail] = useState<ITodoItem | null>(null);

    useEffect(() => {
        document.title = `Code Task1：Todolist 丨 ${GlobalAppMetadata.title} - ${GlobalAppMetadata.subtitle}`;
        const _todos = SessionStorageUtil.get<Array<ITodoItem>>(LOCAL_DATA_KEYS.todos);
        if (_todos && todos.length === 0) {
            setTodos(_todos)
        }
    }, [todos])

    // 新增逻辑
    const addTodo = (todo: ITodoItem) => {
        if (!todo.id) {
            todo.id = new Date().getTime().toString();
        }
        if (!todo.createdAt) {
            todo.createdAt = new Date().getTime();
        }
        const list = todos.concat(todo);

        SessionStorageUtil.set<Array<ITodoItem>>(LOCAL_DATA_KEYS.todos, list);
        setTodos(list)
        toast("提示", {
            description: `【${todo.title}】数据保存成功！`,
        })
    }

    // 编辑逻辑
    const editTodo = (todo: ITodoItem) => {
        const list = todos;
        const oldTodoIndex = list.findIndex((item) => item.id === todo.id)
        if (oldTodoIndex === -1) {
            return;
        }
        if (todo.state === 'complete') {
            todo.completeAt = new Date().getTime();
        } else {
            todo.completeAt = undefined;
        }

        list.splice(oldTodoIndex, 1, todo)
        SessionStorageUtil.set<Array<ITodoItem>>(LOCAL_DATA_KEYS.todos, list);
        setTodos(list);
        toast("提示", {
            description: `【${todo.title}】数据保存成功！`,
        })
    }

    // 删除逻辑
    const deleteTodo = (todo: ITodoItem) => {
        const list = todos;
        const index = list.findIndex((item) => item.id === todo.id)
        if (index !== -1) {
            list.splice(index, 1)
            if (list.length !== 0) {
                SessionStorageUtil.set<Array<ITodoItem>>(LOCAL_DATA_KEYS.todos, list);
                setTodos(list)
            } else {
                SessionStorageUtil.set<Array<ITodoItem>>(LOCAL_DATA_KEYS.todos, []);
                setTodos([])
            }

            if (todoDetail && todoDetail.id === todo.id) {
                setTodoDetail(null)
            }

            toast("提示", {
                description: `【${todo.title}】数据删除成功！`,
            })
        }
    }

    // 监听列表事件
    const onTodoListCallbackEvents = (data: ICallbackEventsCallbackData<ListMapCallbackEventTypes>) => {
        console.log("监听列表事件 onTodoListCallbackEvents", data);
        const map: { [key in ListMapCallbackEventTypes]: () => void } = {
            edit: () => {
                setTodoDetail(data.data as ITodoItem)
                setVisibleModal(true)
            },
            delete: () => {
                deleteTodo(data.data as ITodoItem)
            },
            detail: () => {
                setTodoDetail(data.data as ITodoItem)
            },
            complete: () => {
                const _todoData = data.data as ITodoItem;
                _todoData.state = 'complete'
                editTodo(_todoData)
            },
        }
        map[data.type]();
    }

    // 监听添加组件事件
    const onTodoAddCallbackEvents = (data: ICallbackEventsCallbackData<AddMapCallbackEventTypes>) => {
        console.log("监听添加组件事件 onTodoAddCallbackEvents", data);
        const map: { [key in AddMapCallbackEventTypes]: () => void } = {
            add: () => {
                addTodo(data.data as ITodoItem)
            },
            addModal: () => {
                setEditTodoDetail(null)
                setVisibleModal(true)
            }
        }
        map[data.type]()
    }

    // 监听弹窗事件
    const onTodoAddModalCallbackEvents = (data: ICallbackEventsCallbackData<ModalMapCallbackEventTypes>) => {
        console.log("监听弹窗事件 onTodoAddModalCallbackEvents", data);
        const map: { [key in ModalMapCallbackEventTypes]: () => void } = {
            open: () => {
            },
            close: () => {
                setVisibleModal(false)
            },
            add: () => {
                addTodo(data.data as ITodoItem)
                setVisibleModal(false)
            },
            edit: () => {
                editTodo(data.data as ITodoItem)
                setVisibleModal(false)
            }
        }
        map[data.type]()
    }

    return (
        <>
            <EditToDoModal visible={visibleModal} formData={editTodoDetail} callbackEvents={onTodoAddModalCallbackEvents}></EditToDoModal>

            <Title title="Task1：Code Todolist"></Title>

            <div className="relative z-[1] flex">
                <div className="w-3/12 p-3">
                    <div className="p-4 pl-0">
                        <AddToDo callbackEvents={onTodoAddCallbackEvents}></AddToDo>
                    </div>
                    <div className="h-[660px]">
                        <ToDoList list={todos} callbackEvents={onTodoListCallbackEvents}></ToDoList>
                    </div>
                </div>

                <div className="w-9/12 p-5 pt-5 pl-0">
                    <ToDoDetail item={todoDetail}></ToDoDetail>
                </div>
            </div>
        </>
    )
}

export default Todo
