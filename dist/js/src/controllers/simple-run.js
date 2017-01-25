"use strict";
const scanner_1 = require('../models/scanner');
class SimpleRun {
    static start(input) {
        /**
         *	1. turn input string into nodes (a 'flat chain'?) in a map
         *  2. go through input and assign all possible next values for each node
         */
        const parser = new scanner_1.Scanner(input);
        const output = parser.scanCorpus();
        console.log(JSON.stringify(output.value[400].value[5]));
        // corpus.makeMap(20);
        // corpus.print();
        console.log("Finished parsing, size: ", output.size);
    }
}
exports.SimpleRun = SimpleRun;
//# sourceMappingURL=simple-run.js.map