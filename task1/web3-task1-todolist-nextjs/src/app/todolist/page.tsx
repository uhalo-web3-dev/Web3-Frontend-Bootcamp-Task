"use client";

import React, {useEffect, useState} from 'react'

import {Button} from "@/components/ui/button"
import {toast} from "sonner"

import type {ITodoEvents, ITodoItem, TodoEventsType} from "@/types/global";
import {TodoList} from "@/app/todolist/todo-list";
import TodoForm from "@/app/todolist/todo-form";
import {GlobalAppMetadata} from "@/constants";
import Title from "@/components/custom/title";
import {format} from "date-fns";

const todoStateMap: { [key: string]: string } = {
    doing: "处理中",
    todo: '待处理',
    complete: '已完成',
}

const LOCAL_DATA_KEYS = {
    todos: "TODOS"
}

export default function Todo() {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [task, setTask] = useState<ITodoItem>()
    const [showTask, setShowTask] = useState<ITodoItem | null>(null)
    const [todos, setTodos] = useState<Array<ITodoItem>>([])

    useEffect(() => {
        document.title = `Code Task1：Todolist 丨 ${GlobalAppMetadata.title} - ${GlobalAppMetadata.subtitle}`;

        const _todos = sessionStorage.getItem(LOCAL_DATA_KEYS.todos);
        if (todos.length === 0 && _todos) {
            const _todoList = JSON.parse(_todos);
            if (_todoList.length !== 0) {
                setTodos(JSON.parse(_todos))
            }
        }
    }, [todos])

    const addTodo = (todo: ITodoItem) => {
        if (!todo.id) {
            todo.id = new Date().getTime().toString();
        }
        const list = todos.concat(todo);
        sessionStorage.setItem(LOCAL_DATA_KEYS.todos, JSON.stringify(list));
        setTodos(list)
        toast("提示", {
            description: `【${todo.title}】数据保存成功！`,
        })
    }

    const editTodo = (todo: ITodoItem) => {
        const list = todos;
        let oldTodoIndex = list.findIndex((item) => item.id === todo.id)
        if (oldTodoIndex === -1) {
            return;
        }
        list.splice(oldTodoIndex, 1, todo)
        sessionStorage.setItem(LOCAL_DATA_KEYS.todos, JSON.stringify(list));
        setTodos(list);
        toast("提示", {
            description: `【${todo.title}】数据保存成功！`,
        })
    }

    const deleteTodo = (todo: ITodoItem) => {
        const list = todos;
        const index = list.findIndex((item) => item.id === todo.id)
        if (index !== -1) {
            list.splice(index, 1)
            if (list.length !== 0) {
                sessionStorage.setItem(LOCAL_DATA_KEYS.todos, JSON.stringify(list));
                setTodos(list)
            } else {
                sessionStorage.setItem(LOCAL_DATA_KEYS.todos, JSON.stringify([]));
                setTodos([])
            }

            if (showTask && showTask.id === todo.id) {
                setShowTask(null)
                console.log('showTask', showTask)
            }

            toast("提示", {
                description: `【${todo.title}】数据删除成功！`,
            })
        }
    }

    const onTodoHandlerEvents = (event: MouseEvent, data: ITodoEvents) => {
        const TodoHandlerEvents: { [key in TodoEventsType]: Function } = {
            'add': () => {
                setIsEdit(false)
                setModalVisible(true)
            },
            'edit': () => {
                setIsEdit(true)
                setTask(data.data)
                setModalVisible(true)
            },
            'delete': () => {
                deleteTodo(data.data)
            },
            'detail': () => {
                setShowTask(data.data)
            },
            'complete': () => {
                const list = todos;
                const taskIndex = todos.findIndex((item) => item.id === data.data.id)
                const taskData = todos[taskIndex];
                if (taskData) {
                    taskData.completeAt = new Date().getTime()
                    taskData.state = 'complete'
                }
                list.splice(taskIndex, 1, taskData)
                setTodos(list);
                sessionStorage.setItem(LOCAL_DATA_KEYS.todos, JSON.stringify(list));
            }
        }
        TodoHandlerEvents[data.type]();
    }
    const onModalFormCallbackEvents = (event: any) => {
        if (event.type === 'submit') {
            if (isEdit) {
                editTodo(event.data)
            } else {
                addTodo(event.data)
            }
        }
        setTask(undefined)
        setModalVisible(false)
        setIsEdit(false)
    }
    return (
        <>
            <Title title="Task1：Code Todolist"></Title>
            {/* 列表 */}
            <div className="relative z-[1] flex">
                <div className="w-3/12 p-3">
                    <div className="p-4 pl-0">
                        <Button variant="outline" onClick={() => setModalVisible(true)}>添加一项待办任务</Button>
                    </div>
                    <div className="h-[660px]">
                        <TodoList items={todos} onHandlerEvents={onTodoHandlerEvents}/>
                    </div>
                </div>
                <div className="w-9/12 p-5 pt-5 pl-0">
                    <div className="mt-16 p-3 w-full border border-gray-200 rounded-md text-gray-600">
                        <div className="border-b border-gray-200 mb-4">
                            <h1 className="text-gray-950 font-semibold text-lg mb-1"> 待办详情 </h1>
                        </div>
                        {
                            showTask && (
                                <div className="flex flex-col gap-y-2 text-sm">
                                    <h3><span className="text-sm">待办标题</span>：{showTask.title}</h3>
                                    <p className="mt-3"><span className="text-sm">待办内容</span>：{showTask.description}</p>
                                    <p><span className="text-sm">创建时间</span>：{format(new Date(showTask.createdAt), "yyyy年mm月dd日 HH点mm分ss秒")}</p>
                                    <p><span className="text-sm">待办状态</span>：{todoStateMap[showTask.state]}</p>
                                    {
                                        (showTask.state === 'complete' && showTask.completeAt) &&
                                        (
                                            <p>
                                                <span
                                                    className="text-sm">完成时间</span>：{format(new Date(showTask.completeAt), "yyyy年mm月dd日 HH点mm分ss秒")}
                                            </p>
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            !showTask && (
                                <div className="flex flex-col items-center justify-center h-[150px] ">
                                    <span className="text-gray-500">未选择待办任务</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/*  表单  */}
            <TodoForm visible={modalVisible} formData={task} callbackEvents={onModalFormCallbackEvents}></TodoForm>
        </>
    )
}
