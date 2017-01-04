import { Parser } from '../models/scanning';

export class SimpleRun {
	
	static start(input: string) {
		/**
		 *	1. turn input string into nodes (a 'flat chain'?) in a map
		 *  2. go through input and assign all possible next values for each node
		 */

		const parser = new Parser(input);
		parser.scan();
		console.log(parser)
		// corpus.makeMap(20);
		// corpus.print();
		
	}
}