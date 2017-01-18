import { Dictionary, Word } from '../dictionary';
import { Chain } from './chain';

describe(`Chain`, () => {
	let dictionary; 

	beforeEach(() => {
		dictionary = new Dictionary();
		dictionary.addWord('word1')
		dictionary.addWord('word2')
		dictionary.addWord('word1a', ['word1'])
		dictionary.addWord('word1b', ['word1'])
		dictionary.addWord('word1ba', ['word1', 'word1b'])
	})

	it(`needs to be constructed with a dictionary and a path`, () => {
		const chain = new Chain(dictionary, ['word1', 'word1b', 'word1ba'])

		expect(chain).toBeDefined();
	})

	it(`can use hasSubPath() to determine if this chain contains a sequence of words`, () => {
		const chain = new Chain(dictionary, ['word1', 'word1b', 'word1ba'])
		
		expect(chain.hasSubPath(['word1'])).toBe(true)
		expect(chain.hasSubPath(['word1b'])).toBe(true)
		expect(chain.hasSubPath(['word1ba'])).toBe(true)
		expect(chain.hasSubPath(['word1', 'word1b'])).toBe(true)
		expect(chain.hasSubPath(['word1', 'word1b', 'word1ba'])).toBe(true)
		expect(chain.hasSubPath(['word1b', 'word1ba'])).toBe(true)
	})

	it(`can use hasInnerSubPath() to determine if this chain contains any subsequence in a sequence of words`, () => {
		const chain = new Chain(dictionary, ['word1', 'word1b', 'word1ba'])
		
		expect(chain.innerSubPaths(['word1'])).toEqual([['word1']])
		expect(chain.innerSubPaths(['word1', 'word1b'])).toContain(['word1', 'word1b'])
		expect(chain.innerSubPaths(['word1', 'word1b'])).toContain(['word1'])
		expect(chain.innerSubPaths(['word1', 'word1b'])).toContain(['word1b'])

		expect(chain.innerSubPaths(['word1', 'word1b', 'badWord'])).toContain(['word1', 'word1b'])
		expect(chain.innerSubPaths(['word1', 'word1b', 'badWord'])).toContain(['word1'])
		expect(chain.innerSubPaths(['word1', 'word1b', 'badWord'])).toContain(['word1b'])

		expect(chain.innerSubPaths(['badWord', 'word1', 'word1b'])).toContain(['word1', 'word1b'])
		expect(chain.innerSubPaths(['badWord', 'word1', 'word1b'])).toContain(['word1'])
		expect(chain.innerSubPaths(['badWord', 'word1', 'word1b'])).toContain(['word1b'])

	})

	it(`can find largest inner subpath with largestInnerSubPath()`, () => {
		const chain = new Chain(dictionary, ['word1', 'word1b', 'word1ba'])
		
		expect(chain.largestInnerSubPath(['word1', 'word1b', 'word1ba'])).toEqual(['word1', 'word1b', 'word1ba']);
		expect(chain.largestInnerSubPath(['word1', 'word1b'])).toEqual(['word1', 'word1b']);
		expect(chain.largestInnerSubPath(['word1'])).toEqual(['word1']);
		expect(chain.largestInnerSubPath(['word1b', 'word1ba'])).toEqual([ 'word1b', 'word1ba']);
	})
})