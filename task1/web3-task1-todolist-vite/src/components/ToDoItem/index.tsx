import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {Badge} from "@/components/ui/badge.tsx";
import {ICallbackEventsCallbackData, ITodoItem, ListMapCallbackEventTypes} from "@/types";


interface IProps {
    item: ITodoItem,
    index: number,
    callbackEvents: (callbackData: ICallbackEventsCallbackData<ListMapCallbackEventTypes>) => void,
}

const ToDoItem = ({item, index, callbackEvents}: IProps) => {

    return (
        <>
            <div
                className={cn(
                    "flex flex-col list-start gap-2 rounded-lg border p-3 text-left text-sm transition-all cursor-pointer hover:bg-accent"
                )}
            >

                <div
                    className="flex w-full flex-col gap-1"
                    onClick={(e) => callbackEvents({event: e, type: 'detail', data: item})}
                >
                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            <div
                                className={cn("font-semibold text-lg flex items-center")}
                            >
                                <span className="bg-gray-950 rounded text-xs p-0.5 pl-1.5 pr-1.5 text-white">{index}</span>
                                <span className={cn('ml-1', item.state === 'complete' ? 'line-through text-gray-600' : '')}>{item.title}</span>
                            </div>
                            {
                                item.state === 'todo' && (
                                    <span className="flex h-2 w-2 rounded-full bg-gray-400"/>
                                )
                            }
                            {
                                item.state === 'doing' && (
                                    <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"/>
                                )
                            }
                            {
                                item.state === 'complete' && (
                                    <span className="flex h-2 w-2 rounded-full bg-green-600"/>
                                )
                            }
                        </div>
                        {
                            item.createdAt && (
                                <div className="ml-auto text-xs text-muted-foreground">
                                    {format(new Date(item.createdAt), "yyyy-MM-dd HH:mm")}
                                </div>
                            )
                        }
                    </div>
                </div>
                <div
                    className={cn("line-clamp-2 text-xs text-muted-foreground", item.state === 'complete' ? 'line-through text-gray-600' : '')}
                    onClick={(e) => callbackEvents({event: e, type: 'detail', data: item})}
                >
                    待办内容： {item.description.substring(0, 300)}
                </div>
                {
                    (item.state === 'complete' && item.completeAt) && (
                        <div className="text-xs text-muted-foreground">
                            完成时间： {format(new Date(item.completeAt), "yyyy-MM-dd HH:mm")}
                        </div>
                    )
                }

                <div className="flex list-center gap-2">
                    <Badge className="rounded-md cursor-pointer" variant="default"
                           onClick={(e) => callbackEvents({event: e, type: "detail", data: item})}> 详情 </Badge>
                    <Badge className="rounded-md cursor-pointer" variant="default"
                           onClick={(e) => callbackEvents({event: e, type: "edit", data: item})}> 编辑 </Badge>
                    {
                        item.state !== 'complete' && (
                            <Badge className="rounded-md cursor-pointer" variant="default"
                                   onClick={(e) => callbackEvents({event: e, type: "complete", data: item})}>
                                完成
                            </Badge>
                        )
                    }
                    <Badge className="rounded-md cursor-pointer" variant="destructive"
                           onClick={(e) => callbackEvents({event: e, type: "delete", data: item})}> 删除 </Badge>
                </div>
            </div>
        </>
    );
}

export default ToDoItem;
