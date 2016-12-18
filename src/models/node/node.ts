import { Map } from '../../utils/map';

export class Node<T> {
	public key: string;
	public value: T;
	public map: Map<Node<T>> = {};
	public freq: number = 0;
	
	constructor(key?: string, value?: T) {
		this.key = key;
		this.value = value;  
	}

	addNode(key: string, value: T, path: string[] = []): Node<T> {
		let node: Node<T>;

		if (path.length > 0) {
			return this.findNode(path).addNode(key, value);
		}
		else if (this.map[key]) return this.map[key]
		else return this.map[key] = new Node<T>(key, value);
	}

	getNode(path: string | string[]) {
		if (Array.isArray(path)) return this.findNode(path);
		return this.map[path];
	}
	
  findNode(path: string[]) {
  	const length = path.length;
		let map = this.map;
    let currentNode: Node<T> = this;   
      
		for (let i = 0; i < length; i++) {
			currentNode = map[path[i]];
			map = currentNode ? currentNode.map : undefined;
    } 
      
    return currentNode;
	}

	has(key: string) : boolean {
		return this.map[key] ? true : false;
	}

}