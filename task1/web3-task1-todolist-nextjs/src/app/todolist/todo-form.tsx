"use client";

import React, {useEffect, useState} from "react";
import type {ITodoItem} from "@/types/global";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"

interface ITodoFromProps {
    visible: boolean,
    formData?: ITodoItem,
    callbackEvents: Function
}

const formSchema = z.object({
    id: z.string().optional(),
    title: z.string({required_error: "不能为空"}).min(1, {message: "请输入待办标题"}),
    description: z.string({required_error: '不能为空'}).min(1, {message: "请输入待办描述"}),
    state: z.string({required_error: '不能为空'}),
    createdAt: z.number().optional(),
    completeAt: z.number().optional()
})

export default function TodoForm({visible, formData, callbackEvents}: ITodoFromProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: undefined,
            title: "",
            description: "",
            state: "todo",
            createdAt: undefined,
            completeAt: undefined
        }
    })

    useEffect(() => {
        if (visible) {
            if (formData) {
                form.reset({
                    id: formData.id,
                    title: formData.title,
                    description: formData.description,
                    state: formData.state,
                    createdAt: formData.createdAt,
                    completeAt: formData.completeAt,
                })
            } else {
                form.reset({
                    id: undefined,
                    title: "",
                    description: "",
                    state: "todo",
                    createdAt: undefined,
                    completeAt: undefined
                })
            }
        }
        console.log('form', form.getValues())
        setIsVisible(visible)
    }, [visible, formData, form])

    const onTodoModalOpenChange = (isOpen: boolean) => {
        setIsVisible(isOpen)
        if (isOpen) {
            callbackEvents({type: "open", data: isOpen})
        } else {
            callbackEvents({type: "close", data: isOpen})
        }
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (!values.createdAt) {
            values.createdAt = new Date().getTime()
        }
        callbackEvents({type: "submit", data: values})
        setIsVisible(false)
    }

    return (
        <>
            <Dialog open={isVisible} onOpenChange={(e) => onTodoModalOpenChange(e)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{form.getValues().id ? '编辑' : '新增'}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full mx-auto mt-2 mb-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>标题</FormLabel>
                                        <FormControl>
                                            <Input placeholder="请输入待办任务标题" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>内容</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="请输入内容" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>状态</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="请选择状态" {...field}/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="todo">待处理</SelectItem>
                                                        <SelectItem value="doing">进行中</SelectItem>
                                                        <SelectItem value="complete">已完成</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button type="submit">保 存</Button>
                                <Button type="button" variant="outline" onClick={() => onTodoModalOpenChange(false)}>取 消</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

        </>
    )
}
