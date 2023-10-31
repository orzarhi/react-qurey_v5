import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { wait } from '../lib/utils';
import { Todo } from '../types/post';

export const Todos = () => {
    const { ref, inView } = useInView({
        threshold: 0,
    });

    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: async ({ pageParam }) => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`)
            await wait(1000)
            // await new Promise((_, reject) => setTimeout(reject, 1000))
            return res.json()
        },
        initialPageParam: 20,
        getNextPageParam: (lastPage, allPages) => {

            return lastPage.length ? allPages.length + 1 : undefined
        }
    })

    const content = data?.pages.map((todos => todos.map((todo) => {
        return (
            <div key={todo.id}>
                <h1 className='mt-10 border bg-slate-200 text-black rounded-lg h-8'>{todo.title}</h1>
            </div>
        )
    })))

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage()
    }, [inView, hasNextPage, fetchNextPage])


    if (isLoading) return <div className='text-sky-500'>Loading...</div>
    if (isError) return <div className='text-red-500'>Error...</div>

    return (
        <div className='mt-20'>
            <h1 className='mb-3 text-2xl underline'>Todos</h1>
            {content}
            <p ref={ref}> Loading... </p>
        </div >
    )
}
