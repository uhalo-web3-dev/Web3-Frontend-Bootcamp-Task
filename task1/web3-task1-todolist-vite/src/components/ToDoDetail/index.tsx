import {format} from "date-fns";
import type {ITodoItem} from "@/types";

interface IProps {
    item?: ITodoItem | null,
}

const todoStateMap: { [key: string]: string } = {
    doing: "处理中",
    todo: '待处理',
    complete: '已完成',
}

const ToDoDetail = ({item}: IProps) => {

    return (
        <>
            <div className="mt-16 p-3 w-full border border-gray-200 rounded-md text-gray-600">
                <div className="border-b border-gray-200 mb-4">
                    <h1 className="text-gray-950 font-semibold text-lg mb-1"> 待办详情 </h1>
                </div>
                {
                    item && (
                        <div className="flex flex-col gap-y-2 text-sm">
                            <h3><span className="text-sm">待办标题</span>：{item.title}</h3>
                            <p className="mt-3"><span className="text-sm">待办内容</span>：{item.description}</p>
                            {
                                item?.createdAt && (
                                    <p><span className="text-sm">创建时间</span>：{format(new Date(item?.createdAt), "yyyy年mm月dd日 HH点mm分ss秒")}</p>
                                )
                            }
                            <p><span className="text-sm">待办状态</span>：{todoStateMap[item.state]}</p>
                            {
                                (item.state === 'complete' && item.completeAt) &&
                                (
                                    <p>
                                        <span className="text-sm">完成时间</span>：{format(new Date(item.completeAt), "yyyy年mm月dd日 HH点mm分ss秒")}
                                    </p>
                                )
                            }
                        </div>
                    )
                }
                {
                    !item && (
                        <div className="flex flex-col items-center justify-center h-[150px] ">
                            <span className="text-gray-500">未选择待办任务</span>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default ToDoDetail;
