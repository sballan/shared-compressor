import { Scanner } from '../models/scanner';

export class SimpleRun {
	
	static start(input: string) {
		/**
		 *	1. turn input string into nodes (a 'flat chain'?) in a map
		 *  2. go through input and assign all possible next values for each node
		 */

		const parser = new Scanner(input);
		const output = parser.scanCorpus();
		console.log(JSON.stringify(output.value[400].value[5]));
		// corpus.makeMap(20);
		// corpus.print();
		console.log("Finished parsing, size: ", output.size)

	}
}