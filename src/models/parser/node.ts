export class Node<T> {
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

	constructor(key?: string, value?: T, parent?: Node<T>) {
		this.key = Symbol.for(key);
		this.value = value;  
		this.parent = parent;
	}

	addNode(key: string, value: T, path: string[] = []): Node<T> {
		const keySym = Symbol.for(key)
		if (path.length > 0) {
			return this.findNode(path).addNode(key, value);
		}
		else if (this.map.has(keySym)) return this.map.get(keySym);
		else {
			this.map.set(keySym, new Node<T>(key, value, this));
			return this.map.get(keySym);
		}
	}

	getNode(path: string | string[]) {
		if (Array.isArray(path)) return this.findNode(path);
		return this.map.get(Symbol.for(path));
	}

  findNode(path: string[]) : Node<T> {
  	const length = path.length;
		let map = this.map;
    let currentNode: Node<T> = this;   
      
		for (let i = 0; i < length; i++) {
			currentNode = map.get(Symbol.for(path[i]));
			map = currentNode ? currentNode.map : undefined;
    } 
      
    return currentNode;
	}

	has(key: string) : boolean {
		return this.map.has(Symbol.for(key));
	}

	getDec(path: string[]) : Node<T>[] {
		let length = path.length;
		const nodes: Node<T>[] = [];
		let current: Node<T> = this;

		for (let i = 0; i < length; i++) {
			current = current.getNode(path[i]);
			nodes.push(current);
		}
		return nodes;
	}

	getAnc() : Node<T>[] {
		const nodes: Node <T>[] = [];
		let currentNode: Node<T> = this;

		while (currentNode.parent) {
			currentNode = currentNode.parent;
			nodes.push(currentNode)
		}
		return nodes;

	}
	

}