import { Node } from './node';

describe(`Node`, () => {
	it(`can be contructed with no arguments`, () => {
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
		expect(node.freq).toBe(1);
	})

	it(`can add a node by passing a key and value to the method addNode()`, () => {
		const node = new Node<String>("myKey", "myValue");
		node._addNode('otherKey', 'otherValue');
		const newNode = node.map['otherKey'];
		expect(newNode).toBeDefined();

	})

	it(`can add a node to a nested node by additionally passing a path: string[] to  method addNode()`, () => {
		const node = new Node<String>("myKey", "myValue");
		node._addNode('firstKey', 'firstValue');
		node._addNode('secondKey', 'secondValue', ['firstKey']);
		const newNode = node.map['firstKey'].map['secondKey'];

		expect(newNode).toBeDefined();
		expect(newNode.key).toBe('secondKey');
		expect(newNode.value).toBe('secondValue');

	})

	it(`can find a nested node by passing a path: string[] to  method _findNode()`, () => {
		const node = new Node<String>("myKey", "myValue");
		node._addNode('firstKey', 'firstValue');
		node._addNode('secondKey', 'secondValue', ['firstKey']);
		const newNode = node._findNode(['firstKey', 'secondKey']);

		expect(node.map['firstKey'].map['secondKey']).toBe(newNode)
		expect(newNode).toBeDefined();
		expect(newNode.key).toBe('secondKey');
		expect(newNode.value).toBe('secondValue');

	})

	it(`can get a node with nethod getNode() by passing it a path: string`, () => {
		const node = new Node<String>("myKey", "myValue");
		const newNode = node._addNode('otherKey', 'otherValue');

		expect(node._getNode(newNode.key)).toBe(newNode);
	})

	it(`can get a node with nethod getNode() by passing it a path: string[]`, () => {
		const node = new Node<String>("myKey", "myValue");
		node._addNode('firstKey', 'firstValue');
		node._addNode('secondKey', 'secondValue', ['firstKey']);

		expect(node._getNode(["firstKey"])).toBeDefined();
		expect(node._getNode(["firstKey"])._getNode(["secondKey"])).toBeDefined();
		expect(node._getNode(["firstKey", "secondKey"])).toBeDefined();
		// expect(node._getNode(["secondKey"])).toBeUndefined()
	})

	it(`has has() method which takes a key: string argument and returns a boolean`, () => {
		const node = new Node<String>("myKey", "myValue");
		const newNode = node._addNode('otherKey', 'otherValue');
		const bool = node._has("otherKey")

		expect(bool).toBe(true);

	})
	


})