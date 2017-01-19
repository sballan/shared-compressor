import { Sym } from './sym';

// A Terminal is a Sym with a string for it's value
export class Terminal extends Sym {
	constructor(public value: string) {
		super(value)
	}
	
	get literal(): string { return this.value; }
	
	static create(value) {
			return new Terminal(value);
	}
	
}