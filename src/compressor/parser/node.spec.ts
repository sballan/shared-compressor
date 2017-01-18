import { Node } from './node';

describe(`Node`, () => {
	it(`can be constructed with no arguments`, () => {
		const node = new Node();

		expect(node).toBeDefined();
	})

	it(`is constructed with a key and value`, () => {
		const node = new Node<String>("myKey", "myValue");

		expect(node).toBeDefined();
	})

	it(`has key, value, map, and freq properties`, () => {
		const node = new Node<String>("myKey", "myValue");

		expect(node.key).toBe("myKey")
		expect(node.value).toBe("myValue");
		expect(node.map).toBeDefined();
		expect(node.freq).toBe(0);
	})

	it(`can access an array of all the nodes in the map with the nodes property`, () => {
		const node = new Node<String>("myKey", "myValue");

		const node1 = new Node<String>('myKey', 'myValue')
		const node2 = new Node<String>('myOtherKey', 'myOtherValue')
		const node3 = new Node<String>('myThirdKey', 'myThirdValue')
		node.map.set('myKey', node1);
		node.map.set('myOtherKey', node2);
		node.map.set('myThirdKey', node3);

		expect(node.nodes).toContain(node1)
		expect(node.nodes).toContain(node2)
		expect(node.nodes).toContain(node3)
	})

	it(`can add a node by passing a key and value to the method addNode()`, () => {
		const node = new Node<String>("myKey", "myValue");
		node.addNode('otherKey', 'otherValue');
		const newNode = node.map.get('otherKey');
		expect(newNode).toBeDefined();

	})

	it(`can add a node to a nested node by additionally passing a path: string[] to  method addNode()`, () => {
		const node = new Node<String>("myKey", "myValue");
		node.addNode('firstKey', 'firstValue');
		node.addNode('secondKey', 'secondValue', ['firstKey']);
		const newNode = node.map.get('firstKey').map.get('secondKey');

		expect(newNode).toBeDefined();
		expect(newNode.key).toBe('secondKey');
		expect(newNode.value).toBe('secondValue');

	})

	it(`can find a nested node by passing a path: string[] to  method findNode()`, () => {
		const node = new Node<String>("myKey", "myValue");
		node.addNode('firstKey', 'firstValue');
		node.addNode('secondKey', 'secondValue', ['firstKey']);
		const newNode = node.findNode(['firstKey', 'secondKey']);

		expect(node.map.get('firstKey').map.get('secondKey')).toBe(newNode)
		expect(newNode).toBeDefined();
		expect(newNode.key).toBe('secondKey');
		expect(newNode.value).toBe('secondValue');

	})

	it(`can get a node with nethod getNode() by passing it a path: string`, () => {
		const node = new Node<String>("myKey", "myValue");
		const newNode = node.addNode('otherKey', 'otherValue');

		expect(node.getNode(newNode.key)).toBe(newNode);
	})

	it(`can get a node with nethod getNode() by passing it a path: string[]`, () => {
		const node = new Node<String>("myKey", "myValue");
		node.addNode('firstKey', 'firstValue');
		node.addNode('secondKey', 'secondValue', ['firstKey']);

		expect(node.getNode(["firstKey"])).toBeDefined();
		expect(node.getNode(["firstKey"]).getNode(["secondKey"])).toBeDefined();
		expect(node.getNode(["firstKey", "secondKey"])).toBeDefined();
		expect(node.getNode(["secondKey"])).toBeUndefined()
	})

	it(`has has() method which takes a key: string argument and returns a boolean`, () => {
		const node = new Node<String>("myKey", "myValue");
		const newNode = node.addNode('otherKey', 'otherValue');
		const bool = node.has("otherKey")

		expect(bool).toBe(true);

	})

	it(`can get all of it's ancestor nodes with getAnc()`, () => {
		const node = new Node<String>("myKey", "myValue");
		node.addNode('secondKey', 'secondValue');
		node.addNode('thirdKey', 'thirdValue', ['secondKey']);
		node.addNode('fourthKey', 'fourthValue', ['secondKey', 'thirdKey']);
		const childNode = node.addNode('fifthKey', 'fifthValue', ['secondKey', 'thirdKey', 'fourthKey']);
		
		const nodes = childNode.getAnc()
		expect(nodes.pop().value).toBe('myValue')
		expect(nodes.pop().value).toBe('secondValue')
		expect(nodes.pop().value).toBe('thirdValue')
		expect(nodes.pop().value).toBe('fourthValue')
	
	})

	it(`can get all the nodes between this node and a decendent by passing a path to getDec()`, () => {
		const node = new Node<String>("myKey", "myValue");
		node.addNode('secondKey', 'secondValue');
		node.addNode('thirdKey', 'thirdValue', ['secondKey']);
		node.addNode('fourthKey', 'fourthValue', ['secondKey', 'thirdKey']);
		node.addNode('fifthKey', 'fifthValue', ['secondKey', 'thirdKey', 'fourthKey']);
		
		const nodes = node.getDec(['secondKey', 'thirdKey', 'fourthKey', 'fifthKey'])
		expect(nodes.pop().value).toBe('fifthValue')
		expect(nodes.pop().value).toBe('fourthValue')
		expect(nodes.pop().value).toBe('thirdValue')
		expect(nodes.pop().value).toBe('secondValue')

	})

	
})