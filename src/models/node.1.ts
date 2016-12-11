import { Word } from './word';
import { Map } from '../utils/map';

export class Node<T> {
	key: string;
	value: T;
	map: Map<Node<T>> = {};
	
	constructor(value: T) {
		this.value = value;
	}

	private addToMap(key: string, value: T) {
		if (this.has(key)) return value;
		else this.map[key] = new Node<T>(value);
	}

	addNode(key: string, value: T, level: number = 0) {
		if (level <= 0) this.addToMap(key, value);
		else this.addNode(key, value, level - 1)
	}

	has(key: string) : boolean {
		return this.map[key] ? true : false;
	}

}