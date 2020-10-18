import { Type } from './type';

interface IPokemon {
    id: number;
    name: string;
    description: string;
    category: string;
    height: string;
    weight: string;
    image: string;
    typeOne: Type;
    typeTwo: Type;
    doubleDamageTo: Type[];
    doubleDamageFrom: Type[];
}

export class Pokemon implements IPokemon {
    id: number;
    name: string;
    description: string;
    category: string;
    height: string;
    weight: string;
    image: string;
    typeOne: Type;
    typeTwo: Type;
    doubleDamageTo: Type[];
    doubleDamageFrom: Type[];
}
