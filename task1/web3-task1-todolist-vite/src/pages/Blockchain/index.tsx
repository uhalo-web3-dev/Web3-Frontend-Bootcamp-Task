import Title from "@/components/Title";
import {useEffect} from "react";
import {GlobalAppMetadata} from "@/constants";

const Blockchain = () => {

    useEffect(() => {
        document.title = `Task2：Blockchain basic QA 丨  ${GlobalAppMetadata.title} - ${GlobalAppMetadata.subtitle}`;
    }, [])

    return (
        <>
            <Title title="Task2：Blockchain Basic QA"></Title>
            <div className="w-full h-[600px] flex flex-col items-center justify-center text-green-500">
                this is Blockchain Basic QA page,it's todo...
            </div>
        </>
    )
}


export default Blockchain;
