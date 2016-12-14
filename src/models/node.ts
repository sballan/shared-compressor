import { Word } from './word';
import { Map } from '../utils/map';

export class Node<T> {
	protected key: string;
	protected value: T;
	protected map: Map<Node<T>> = {};
	
	constructor(key?: string, value?: T) {
		this.value = value;
	}

	protected _addNode(key: string, value: T, path?: string[]): Node<T> {
		let node: Node<T>;

		if (this._has(key)) node = this.map[key]
		else node = this.map[key] = new Node<T>(key, value);

		if(path) this._findNode(path).map[key] = node;

		return node;
	}

	protected _getNode(path: string | string[]) {
		if (Array.isArray(path)) return this._findNode(path);
		return this.map[path];
	}
	
  protected _findNode(path: string[]) {
  	const length = path.length;
		let map = this.map;
    let currentNode: Node<T>;   
      
		for (let i = 0; i < length; i++) {
      currentNode = map[path[i]];
      map = currentNode.map  
    } 
      
    return currentNode;
	}

	protected _has(key: string) : boolean {
		return this.map[key] ? true : false;
	}

}