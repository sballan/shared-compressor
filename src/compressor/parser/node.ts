import { Token, Expr, Terminal } from '../tokens';

const s = new Node<Token<Terminal>>()

export class Node<T extends Token<Expr>> {
	public key: symbol;
	public value: T;
	public map: Map<symbol, Node<T>> = new Map();
	public freq: number = 0;
	public parent: Node<T>;

	get nodes() {
		const nodes = [];
		this.map.forEach(n => nodes.push(n))
		return nodes;
	}

	constructor(key?: symbol, value?: T, parent?: Node<T>) {
		this.key = key;
		this.value = value;  
		this.parent = parent;
	}

	addNode(key: symbol, value: T, path: string[] = []): Node<T> {
		if (path.length > 0) {
			return this.findNode(path).addNode(key, value);
		}
		else if (this.map.has(key)) return this.map.get(key);
		else {
			this.map.set(key, new Node<T>(key, value, this));
			return this.map.get(key);
		}
	}

	getNode(path: symbol | symbol[]) {
		if (Array.isArray(path)) return this.findNode(path);
		return this.map.get(path);
	}

  findNode(path: symbol[]) : Node<any> {
  	const length = path.length;
		let map = this.map;
    let currentNode: Node<T> = this;   
      
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