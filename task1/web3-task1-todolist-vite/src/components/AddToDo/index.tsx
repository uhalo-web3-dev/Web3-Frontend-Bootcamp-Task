import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Input} from "@/components/ui/input"
import {Button} from '@/components/ui/button'
import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form"
import type {AddMapCallbackEventTypes, ICallbackEventsCallbackData, ITodoItem} from "@/types";

import {toast} from "sonner";

interface IProps {
    callbackEvents: (data: ICallbackEventsCallbackData<AddMapCallbackEventTypes>) => void
}

const formSchema = z.object({
    title: z.string().optional(),
})


const AddToDo = ({callbackEvents}: IProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        if (!data.title) {
            toast("提示", {
                description: `请填写待办事项！`,
            })
            return;
        }
        const todoData: ITodoItem = {
            id: undefined,
            title: data.title,
            description: data.title,
            state: "todo",
            createdAt: undefined,
            completeAt: undefined
        }
        callbackEvents({type: "add", data: todoData})
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-x-2 flex grow">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="请输入待办内容" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-x-2 flex-shrink-0">
                        <Button type="submit">保存</Button>
                        <Button type="button" onClick={() => callbackEvents({type: "addModal"})}>添加</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}

export default AddToDo;
