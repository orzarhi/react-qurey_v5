import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"

type UserType = {
    id: number
    name: string
}

export const Todo = () => {
    const [index, setIndex] = useState<number>(1)
    const [users, setUsers] = useState<UserType[]>([])

    useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await res.json()
            setUsers(data)

            return null;
        }
    })

    const { isPending, variables, mutate, } = useMutation({
        mutationFn: async (user: UserType) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setUsers([...users, user])
            setIndex(index + 1)
        }
    })

    return (
        <>
            <h1 className="text-xl underline">Users:</h1>
            <button
                disabled={isPending}
                className="px-4 my-5 text-black border rounded border-zinc-500 w-52 hover:bg-zinc-200"
                onClick={() => mutate({ id: index, name: `Or Zarhi ${index}` })}>
                {isPending ? <Loader2 className="w-4 h-6 mx-auto animate-spin" /> : 'Add User'}

            </button>
            <ul>
                {users?.map((user) => ((
                    <li key={user.id}>
                        {user.name}
                    </li>
                )))}
                {isPending && <li style={{ opacity: 0.5 }}>{variables.name} </li>}
            </ul>
        </>
    )
}
