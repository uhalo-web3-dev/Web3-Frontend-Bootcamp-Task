export default function Title({title}: { title: string }) {
    return (
        <div className="flex justify-center items-center p-6">
            <h1 className="text-2xl font-bold text-center text-blue-500">{title}</h1>
        </div>
    )
}
