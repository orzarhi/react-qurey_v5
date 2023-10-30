import { useStore } from "@tanstack/react-store";
import { store, add, subtract, restart } from "../store";

export const Store = () => {
    const catsCount = useStore(store, (state) => state['cats']);
    const dogsCount = useStore(store, (state) => state['dogs']);

    return (
        <div>
            <h1 className='text-2xl underline '>Store</h1>
            <button
                className="w-3/5 px-4 my-5 border rounded border-zinc-500 hover:bg-zinc-600/50"
                onClick={() => subtract('cats')}>
                Update Cats State
            </button>
            <button
                className="w-2/5 px-4 my-5 border rounded border-zinc-500 hover:bg-zinc-600/50"
                onClick={() => restart('cats')}>
                Restart
            </button>
            <p>Cats: {catsCount}</p>
            <button
                className="w-3/5 px-4 my-5 border rounded border-zinc-500 hover:bg-zinc-600/50"
                onClick={() => add('dogs')}>
                Update Dogs State
            </button>
            <button
                className="w-2/5 px-4 my-5 border rounded border-zinc-500 hover:bg-zinc-600/50"
                onClick={() => restart('dogs')}>
                Restart
            </button>
            <p>Dogs: {dogsCount}</p>


        </div>
    )
}
