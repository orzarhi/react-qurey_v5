import { Store } from "@tanstack/store";
import { Animal, AnimalCounts } from "../types/animal";

const animalCounts: AnimalCounts = {
    dogs: 0,
    cats: 0,
};

export const add = (animalCount: Animal) => {
    store.setState((state) => {
        return {
            ...state,
            [animalCount]: state[animalCount] + 1,
        };
    });
};
export const subtract = (animalCount: Animal) => {
    store.setState((state) => {
        return {
            ...state,
            [animalCount]: state[animalCount] - 1,
        };
    });
};

export const restart = (animalCount: Animal) => {
    store.setState((state) => {
        return {
            ...state,
            [animalCount]: 0,
        };
    });
};

export const store = new Store(animalCounts);
