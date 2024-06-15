import {format} from "date-fns";
import type {ITodoItem} from "@/types";
import {useEffect, useState} from "react";

interface IProps {
    item?: ITodoItem | null,
}

const todoStateMap: { [key: string]: string } = {
    doing: "处理中",
    todo: '待处理',
    complete: '已完成',
}

const ToDoDetail = ({item}: IProps) => {

    const [todo, setTodo] = useState<ITodoItem | null>(null)

    useEffect(() => {
        if (item) {
            setTodo(item)
        } else {
            setTodo(null)
        }
    }, [item])

    return (
        <>
            <div className="flex-col items-center mt-16 p-3 w-full border border-gray-200 rounded-md text-gray-600">
                <div className="border-b border-gray-200 mb-4">
                    <h1 className="text-gray-950 font-semibold text-md mb-1"> 待办详情 </h1>
                </div>
                {
                    todo && (
                        <div className="flex flex-col gap-y-4 text-md">
                            <h3><span className="text-md">待办标题</span>：<span className="font-bold">{todo.title}</span></h3>
                            <p className="mt-3">
                                <span className="text-md">待办内容</span>：{todo.description}
                            </p>
                            {
                                item?.createdAt && (
                                    <p>
                                        <span className="text-md">创建时间</span>：{format(new Date(item?.createdAt), "yyyy年mm月dd日 HH点mm分ss秒")}
                                    </p>
                                )
                            }
                            <p>
                                <span className="text-md">待办状态</span>：{todoStateMap[todo.state]}
                            </p>
                            {
                                (todo.state === 'complete' && todo.completeAt) &&
                                (
                                    <p>
                                        <span className="text-md">完成时间</span>：{format(new Date(todo.completeAt), "yyyy年mm月dd日 HH点mm分ss秒")}
                                    </p>
                                )
                            }
                        </div>
                    )
                }
                {
                    !item && (
                        <div className="flex flex-col items-center justify-center min-h-[400px] ">
                            <span className="text-gray-500">未选择待办任务</span>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default ToDoDetail;
