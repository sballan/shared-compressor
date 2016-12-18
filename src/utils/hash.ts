import { Node } from '../models/node';

export interface Hash<T> {[index: string]: T}

export class HashMap<T> extends Map<string, Node<T>> {

}

