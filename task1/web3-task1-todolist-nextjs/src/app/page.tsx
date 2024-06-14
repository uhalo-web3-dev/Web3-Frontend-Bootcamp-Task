"use client"

import {useEffect} from "react";
import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"
import {GlobalAppMetadata, WebsiteAuthor} from "@/constants";

export default function Home() {

    useEffect(() => {
        document.title = `${GlobalAppMetadata.title} - ${GlobalAppMetadata.subtitle}`;
    }, [])

    return (
        <main className="relative z-[1] flex h-screen flex-col items-center justify-center">
            <div className="mt-[-35px] flex flex-col items-center justify-center">
                <Avatar className="w-20 h-20 border-2 border-white shadow-lg shadow-blue-100 animate-bounce transition hover:scale-105">
                    <AvatarImage src={WebsiteAuthor.avatar} alt={WebsiteAuthor.nickname}/>
                    <AvatarFallback>{WebsiteAuthor.nickname}</AvatarFallback>
                </Avatar>
                <h1 className="mt-2.5 text-2xl font-bold text-blue-500">{WebsiteAuthor.nickname}</h1>
                <p className="text-center mt-4 text-gray-600">{WebsiteAuthor.bio}</p>

                <div className="mt-12 text-center flex flex-col items-center justify-center">
                    <h3 className="text-lg">View Bootcamp In Github</h3>
                    <a
                        className="text-center mt-3 pt-2 pb-2 pl-4 pr-4 rounded-md text-xs flex items-center text-gray-600 bg-gray-100 bg-opacity-50 hover:bg-opacity-100 hover:underline"
                        href="https://github.com/openbuildxyz/Web3-Frontend-Bootcamp" target="_blank"
                    >
                        https://github.com/openbuildxyz/Web3-Frontend-Bootcamp
                    </a>
                    <a
                        className="text-center mt-3 pt-2 pb-2 pl-4 pr-4 rounded-md text-xs flex items-center text-gray-600 bg-gray-100 bg-opacity-50 hover:bg-opacity-100 hover:underline"
                        href="https://github.com/XiaoMo-Donald/Web3-Frontend-Bootcamp-Task" target="_blank"
                    >
                        https://github.com/XiaoMo-Donald/Web3-Frontend-Bootcamp-Task
                    </a>
                </div>
            </div>

        </main>
    );
}
