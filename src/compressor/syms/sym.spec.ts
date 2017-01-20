import { Sym } from './sym';

import { Terminal } from './Terminal';

xdescribe(`Sym`, () => {
	// Sym is abstract, so we extend it to test.
	class MySym extends Sym{
		// literal property needs to be declared
		get literal(): string{ return 'MySym Literal'}
	}

	it(`is abstract, but can be tested by extending and defining abstract properties`, () => {
		const mySym = new MySym('TestValue')
		expect(mySym).toBeDefined();
	})

	it(`can be instantiated with a single value argument`, () => {
		const mySym1 = new MySym('TestValue')
		const mySym2 = new MySym('TestValue')
		
		expect(mySym1 === mySym2).toBe(true);
	})

	it(`if you try to instantiated more that one Sym with the same value argument, the original is returned`, () => {
		const mySym1 = new MySym('TestValue')
		const mySym2 = new MySym('TestValue')

		expect(mySym1 === mySym2).toBe(true);
	})

	it(`has a static dictionary property, which is a map of es6 symbols to Syms`, () => {
		const mySym = new MySym('TestValue');

		Sym.dictionary.set(mySym.key, mySym)
		
	})


	
})