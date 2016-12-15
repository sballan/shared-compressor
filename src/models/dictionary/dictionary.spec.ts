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


})