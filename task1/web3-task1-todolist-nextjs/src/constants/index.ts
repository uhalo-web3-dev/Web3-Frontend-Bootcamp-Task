import type {IDockNavbar} from "@/types/global"


export const WebsiteAuthor = Object.freeze({
    nickname: "小莫唐尼",
    bio: "您好，您正在发现的是一个正在入门学习 Web3 的新手玩家。",
    avatar: "https://blog.925i.cn/upload/avatar.jpg",
    githubId: "XiaoMo-Donald",
    githubLink: "https://github.com/XiaoMo-Donald",
})

export const GlobalAppMetadata = Object.freeze({
    title: "小莫唐尼",
    subtitle: "Web3 训练营新手玩家",
    description: "您好，您正在发现的是一个正在入门学习 Web3 的新手玩家",
})


export const DockNavbarList: Readonly<Array<IDockNavbar>> = [
    {
        key: "Todolist",
        title: "Task1",
        desc: "react todolist",
        path: "/todolist",
        icon: ""
    }, {
        key: "Blockchain",
        title: "Task2",
        desc: "blockchain basic",
        path: "/blockchain-basic",
        icon: ""
    }, {
        key: "Home",
        title: "Home",
        desc: "website home",
        path: "/",
        icon: ""
    }, {
        key: "Contract",
        title: "Task3",
        desc: "nft contract",
        path: "/contract",
        icon: ""
    }, {
        key: "Components",
        title: "Task4",
        desc: "nft components",
        path: "/components",
        icon: ""
    }
]
