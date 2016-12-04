import { Corpus } from '../models';
import { Word } from '../models';

export class SimpleRun {
	
	static start(input: string) {
		/**
		 *	1. turn input string into nodes (a 'flat chain'?) in a hash
		 *  2. go through input and assign all possible next values for each node
		 */

		const corpus = new Corpus(input);
		corpus.parse();
		
	}
}