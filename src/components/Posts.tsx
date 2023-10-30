import { useQuery } from '@tanstack/react-query'
import { Post } from '../types/post'
import { wait } from '../lib/utils'

export const Posts = () => {
    const { data, isLoading, isError, status } = useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            // await wait(3000)
            // await new Promise((_, reject) => setTimeout(reject, 1000))
            return res.json()
        },
    })

    if (isLoading) return <div className='text-sky-500'>Loading...</div>
    if (isError) return <div className='text-red-500'>Error...</div>


    return (
        <div className='mt-20'>
            <h1 className='mb-3 text-2xl underline '>Posts</h1>
            {data?.map((post) => (
                <div key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    )
}
