import { Word } from './word';
import { Map } from '../utils/map';

export class Node<T> {
	protected key: string;
	protected value: T;
	protected map: Map<Node<T>> = {};
	
	constructor(key?: string, value?: T) {
		this.value = value;
	}

	private _addToMap(key: string, value: T) : Node<T> {
		if (this._has(key)) return this.map[key];
		else return this.map[key] = new Node<T>(key, value);
	}

	protected _addNode(key: string, value: T, path?: string[]) : Node<T> {
		let node;
		if (path) node = this._findNode(path);
		else node = this;

		return node._addToMap(key, value);
	}

	protected _getNode(path: string | string[]) {
		if (Array.isArray(path)) return this._findNode(path);
		else return this.map[path];
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