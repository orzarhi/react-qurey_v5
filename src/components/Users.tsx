import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { wait } from "../lib/utils"

type UserType = {
    id: number
    name: string
}

export const Users = () => {
    const [index, setIndex] = useState<number>(1)
    const [users, setUsers] = useState<UserType[]>([])

    const { isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users')
            await wait(2000)
            const data = await res.json()
            setUsers(data)

            return null;
        }
    })

    const { isPending, variables, mutate, } = useMutation({
        mutationFn: async (user: UserType) => {
            await wait(3000)
            setUsers([...users, user])
            setIndex(index + 1)
        }
    })

    if (isLoading) return <div className='text-purple-500'>Loading...</div>


    return (
        <div>
            <h1 className='text-2xl underline '>isPending & variables</h1>
            <button
                disabled={isPending}
                className="px-4 my-5 border rounded border-zinc-500 w-52 hover:bg-zinc-600/50"
                onClick={() => mutate({ id: index, name: `Or Zarhi ${index}` })}>
                {isPending ? <Loader2 className="w-4 h-6 mx-auto animate-spin" /> : 'Add User'}

            </button>
            <ul>
                {users?.map((user, index) => ((
                    <li key={index}>
                        {user.name}
                    </li>
                )))}
                {isPending && <li style={{ opacity: 0.5 }}>{variables.name} </li>}
            </ul>
        </div>
    )
}
