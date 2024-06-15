import {useEffect, useState} from "react";
import type {ICallbackEventsCallbackData, ITodoItem, ListMapCallbackEventTypes} from "@/types";

import {ScrollArea} from "@/components/ui/scroll-area"
import ToDoItem from "@/components/ToDoItem";

interface IProps {
    callbackEvents: (callbackData: ICallbackEventsCallbackData<ListMapCallbackEventTypes>) => void,
    list: ITodoItem[],
}

const ToDoList = ({list, callbackEvents}: IProps) => {
    const [todoList, setTodoList] = useState<ITodoItem[]>([]);
    useEffect(() => {

        // 根据日期排序
        list.sort((a, b) => {
            return Number(b.createdAt) - Number(a.createdAt);
        })

        setTodoList(list);
    }, [list])

    const handleCallEvents = (data: ICallbackEventsCallbackData<ListMapCallbackEventTypes>) => {
        data.event?.preventDefault();
        callbackEvents(data)
    }

    return (
        <ScrollArea className="h-full p-4 pl-0 pt-0">
            {
                todoList.length !== 0 && (
                    <div className="flex flex-col gap-2">
                        {
                            todoList.map((item, index) => (
                                <ToDoItem item={item} index={todoList.length-index} key={index} callbackEvents={handleCallEvents}></ToDoItem>
                            ))
                        }
                    </div>
                )
            }
            {
                todoList.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full h-[500px] border border-gray-200 rounded-md">
                        <div className="text-md text-gray-400">暂无待办任务</div>
                    </div>
                )
            }
        </ScrollArea>
    )
}

export default ToDoList;
