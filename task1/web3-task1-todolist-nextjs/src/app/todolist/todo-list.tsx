import {cn} from "@/lib/utils"
import {Badge} from "@/components/ui/badge"
import {ScrollArea} from "@/components/ui/scroll-area"

import type {ITodoEvents, ITodoItem} from '@/types/global'
import React, {useEffect, useState} from "react";
import {format} from "date-fns";

interface ITodoListProps {
    items: Array<ITodoItem>,
    onHandlerEvents: Function,
}

export function TodoList({items, onHandlerEvents}: ITodoListProps) {

    const [todos, setTodos] = useState<Array<ITodoItem>>([])
    useEffect(() => {
        setTodos(items)
    }, [items])

    const handleCallEvents = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>, data: ITodoEvents) => {
        event.preventDefault();
        onHandlerEvents(event, data)
    }

    return (
        <ScrollArea className="h-full">
            {
                todos.length !== 0 && (
                    <div className="flex flex-col gap-2 p-4 pl-0 pt-0">
                        {todos.map((item, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all cursor-pointer hover:bg-accent"
                                )}
                                onClick={(e) => handleCallEvents(e, {type: 'detail', data: item})}
                            >
                                <div className="flex w-full flex-col gap-1">
                                    <div className="flex items-center">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={cn("font-semibold text-lg", item.state === 'complete' ? 'line-through text-gray-600' : '')}
                                            >{item.title}</div>
                                            {item.state === 'todo' && (
                                                <span className="flex h-2 w-2 rounded-full bg-gray-400"/>
                                            )}
                                            {item.state === 'doing' && (
                                                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"/>
                                            )}
                                            {item.state === 'complete' && (
                                                <span className="flex h-2 w-2 rounded-full bg-green-600"/>
                                            )}
                                        </div>
                                        <div
                                            className={cn(
                                                "ml-auto text-xs", "text-muted-foreground"
                                            )}
                                        >
                                            {format(new Date(item.createdAt), "yyyy-MM-dd HH:mm")}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={cn("line-clamp-2 text-xs text-muted-foreground", item.state === 'complete' ? 'line-through text-gray-600' : '')}>
                                    待办内容： {item.description.substring(0, 300)}
                                </div>
                                {
                                    (item.state === 'complete' && item.completeAt) && (
                                        <div className="text-xs text-muted-foreground">
                                            完成时间： {format(new Date(item.completeAt), "yyyy-MM-dd HH:mm")}
                                        </div>
                                    )
                                }

                                <div className="flex items-center gap-2">
                                    <Badge className="rounded-md cursor-pointer" variant="default"
                                           onClick={(e) => handleCallEvents(e, {type: "edit", data: item})}> 编辑 </Badge>
                                    {
                                        item.state !== 'complete' && (
                                            <Badge className="rounded-md cursor-pointer" variant="default"
                                                   onClick={(e) => handleCallEvents(e, {type: "complete", data: item})}>
                                                完成
                                            </Badge>
                                        )
                                    }
                                    <Badge className="rounded-md cursor-pointer" variant="destructive"
                                           onClick={(e) => handleCallEvents(e, {type: "delete", data: item})}> 删除 </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
            {
                todos.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full h-[500px] border border-gray-200 rounded-md">
                        <div className="text-md text-gray-400">暂无待办任务</div>
                    </div>
                )
            }
        </ScrollArea>
    )
}
