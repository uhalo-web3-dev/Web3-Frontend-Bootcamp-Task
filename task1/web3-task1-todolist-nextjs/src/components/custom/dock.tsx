"use client"

import {useEffect, useState} from "react";
import {DockNavbarList} from '@/constants'
import type {IDockNavbar} from "@/types/global";

export default function Dock({activeNavbar, onCallbackEvents}: { activeNavbar?: IDockNavbar, onCallbackEvents: Function }) {
    const [routerActive, setRouterActive] = useState<IDockNavbar>()

    useEffect(() => {
        setRouterActive(activeNavbar)
    }, [activeNavbar])

    const routeTo = (item: IDockNavbar) => {
        setRouterActive(item)
        onCallbackEvents(item)
    }
    return (
        <ul className="fixed z-10 bottom-8 left-[50%] translate-x-[-50%] flex items-center justify-center gap-x-3 border border-gray-200 rounded-full p-2 pl-4 pr-4 shadow-lg shadow-gray-200 bg-white bg-opacity-70">
            {
                DockNavbarList.map((item, index) => (
                    <li key={index}
                        className={`rounded-3xl pt-1 pb-1 pl-4 pr-4 text-center text-[14px] cursor-pointer transition-all hover:bg-blue-400 hover:text-white ${item.key === routerActive?.key ? 'bg-blue-400 text-white' : ''}`}
                        onClick={() => routeTo(item)}>
                        <div>{item.title}</div>
                        <div className="text-xs mt-[1px]">{item.desc}</div>
                    </li>
                ))
            }
        </ul>
    )
}
