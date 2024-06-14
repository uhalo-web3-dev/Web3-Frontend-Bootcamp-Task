"use client"

import {Inter} from "next/font/google";
import "./globals.css";
import "../styles/globals.css"
import {Toaster} from "@/components/ui/sonner"
import Dock from "@/components/custom/dock";
import {usePathname, useRouter} from "next/navigation";
import {DockNavbarList, GlobalAppMetadata} from "@/constants";
import type {IDockNavbar} from "@/types/global";
import {useEffect, useState} from "react";

const inter = Inter({subsets: ["latin"]});

interface IRootLayoutOption {
    children: React.ReactNode;
}

export default function RootLayout({children}: Readonly<IRootLayoutOption>) {
    const [activeNavbar, setActiveRouter] = useState<IDockNavbar>()

    const router = useRouter()
    const currentPathname = usePathname()

    useEffect(() => {
        let activeItem = DockNavbarList.find((item) => item.path === currentPathname)
        if (activeItem) {
            setActiveRouter(activeItem)
        } else {
            activeItem = DockNavbarList.find((item) => item.key === "Home")
            setActiveRouter(activeItem)
        }
    }, [currentPathname])

    const onDockEvents = (item: IDockNavbar) => {
        document.title = `${item.title} 丨 ${GlobalAppMetadata.title} - ${GlobalAppMetadata.subtitle}`;
        router.push(item.path)
    }

    return (
        <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
        {children}

        <Dock activeNavbar={activeNavbar} onCallbackEvents={onDockEvents}></Dock>
        <Toaster/>
        </body>
        </html>
    );
}
