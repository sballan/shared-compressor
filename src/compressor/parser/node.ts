import { Token, Expr, Terminal } from '../tokens';

export class Node<T> {
	public key: symbol;
	public value: T;
	public map: Map<symbol, Node<any>> = new Map();
	public freq: number = 0;
	public parent: Node<any>;

	get nodes() : Node<any>[] {
		const nodes = [];
		this.map.forEach(n => nodes.push(n))
		return nodes;
	}

	constructor(key?: symbol, value?: T, parent?: Node<any>) {
		this.key = key;
		this.value = value;  
		this.parent = parent;
	}

	addNode<U>(key: symbol, value: U, path: symbol[] = []): Node<U> {
		if (path.length > 0) {
			return this.findNode(path).addNode(key, value);
		}
		else if (this.map.has(key)) return this.map.get(key) as Node<U>;
		else {
			this.map.set(key, new Node<U>(key, value, this));
			return this.map.get(key) as Node<U>;
		}
	}

	getNode(path: symbol | symbol[]): Node<any> {
		if (Array.isArray(path)) return this.findNode(path);
		return this.map.get(path);
	}

  findNode(path: symbol[]) : Node<any> {
  	const length = path.length;
		let map = this.map;
    let currentNode: Node<any> = this;   
      
		for (let i = 0; i < length; i++) {
			currentNode = map.get(path[i]);
			map = currentNode ? currentNode.map : undefined;
    } 
      
    return currentNode;
	}

	has(key: symbol) : boolean {
		return this.map.has(key);
	}

	getDec(path: symbol[]) : Node<any>[] {
		let length = path.length;
		const nodes: Node<any>[] = [];
		let current: Node<any> = this;

		for (let i = 0; i < length; i++) {
			current = current.getNode(path[i]);
			nodes.push(current);
		}
		return nodes;
	}

	getAnc() : Node<any>[] {
		const nodes: Node <any>[] = [];
		let currentNode: Node<any> = this;

		while (currentNode.parent) {
			currentNode = currentNode.parent;
			nodes.push(currentNode)
		}
		return nodes;

	}
	

}