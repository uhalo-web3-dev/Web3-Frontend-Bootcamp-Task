export interface ITask {
    id: string,
    state: "todo" | "doing" | 'complete',
    title: string,
    description: string,
    createdAt: Date,
    completeAt?: Date,
    remindDate: Date
}

export type TaskEventsType = 'add' | 'delete' | 'edit' | 'detail' | 'complete'

export interface ITaskEvents {
    type: TaskEventsType,
    data: ITask
}

