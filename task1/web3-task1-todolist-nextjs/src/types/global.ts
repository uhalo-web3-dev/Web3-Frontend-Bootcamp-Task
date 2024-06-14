export interface IDockNavbar {
    key: string,
    title: string,
    desc: string,
    path: string,
    icon?: string
}
export interface ITodoItem {
    id: string,
    state: "todo" | "doing" | 'complete',
    title: string,
    description: string,
    createdAt: number,
    completeAt?: number
}

export type TodoEventsType = 'add' | 'delete' | 'edit' | 'detail' | 'complete'

export interface ITodoEvents {
    type: TodoEventsType,
    data: ITodoItem
}

