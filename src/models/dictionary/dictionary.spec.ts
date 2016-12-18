import { Dictionary } from './dictionary';

describe(`Dictionary`, () => {
	it(`can be contructed with no arguments`, () => {
		const dictionary = new Dictionary();

		expect(dictionary).toBeDefined();
	})

	it(`can add a single word by passing a wordString: string to addWord()`, () => {
		const dictionary = new Dictionary();
		dictionary.addWord('myWord');

		expect(dictionary.map['myWord']).toBeDefined();
	})

	it(`can add a nested word by additionally passing a path: string[] to addWord()`, () => {
		const dictionary = new Dictionary();
		dictionary.addWord('myWord');
		dictionary.addWord('myOtherWord', ['myWord']);

		expect(dictionary.map['myWord']).toBeDefined();
	})

	it(`can also add a nested word by passing a wordString: string[] to addWord()`, () => {
		const dictionary = new Dictionary();
		dictionary.addWord(['myWord']);
		dictionary.addWord(['myWord', 'myOtherWord']);

		expect(dictionary.map['myWord']).toBeDefined();
		expect(dictionary.map['myWord'].map['myOtherWord']).toBeDefined();
	})

	it(`can get a word by passing a wordString: string to getWord()`, () => {
		const dictionary = new Dictionary();
		dictionary.addWord(['myWord']);
		dictionary.addWord(['myWord', 'myOtherWord']);

		expect(dictionary.getWord('myWord'))
			.toBe(dictionary.map['myWord'].value);
		expect(dictionary.getWord('myOtherWord'))
			.toBe(dictionary.map['myOtherWord'].value);
		expect(dictionary.getWord('myOtherWord'))
			.toBe(dictionary.map['myWord'].map['myOtherWord'].value);
	})

	it(`can get a wordNode by passing a path: string to getWordNode()`, () => {
		const dictionary = new Dictionary();
		dictionary.addWord(['myWord']);

		expect(dictionary.getWordNode('myWord'))
			.toBe(dictionary.map['myWord']);
	})

	it(`can get a nested wordNode by passing a path: string[] to getWordNode()`, () => {
		const dictionary = new Dictionary();
		dictionary.addWord(['myWord']);
		dictionary.addWord(['myWord', 'myOtherWord']);

		expect(dictionary.getWordNode(['myWord']))
			.toBe(dictionary.map['myWord']);
		expect(dictionary.getWordNode(['myOtherWord']))
			.toBe(dictionary.map['myOtherWord']);
		expect(dictionary.getWordNode(['myWord', 'myOtherWord']))
			.toBe(dictionary.map['myWord'].map['myOtherWord']);
	})

	it(`has has() method which takes a key: string argument and returns a boolean`, () => {
		const dictionary = new Dictionary();
		dictionary.addWord(['myWord']);
		dictionary.addWord(['myWord', 'myOtherWord']);

		expect(dictionary.has("myWord")).toBe(true);
		expect(dictionary.has("myOtherWord")).toBe(true);

	})


})