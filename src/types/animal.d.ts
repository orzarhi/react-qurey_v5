export type AnimalCounts = {
    dogs: number;
    cats: number;
}

export type Animal = keyof AnimalCounts;