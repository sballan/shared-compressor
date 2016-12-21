// import { Word } from '../dictionary/';
// import { Node } from '../node'

// interface Score {
// 	numerator: number;
// 	denominator: number;
// }

// class Comparison {
// 	score: number = 0;

// 	constructor(
// 			public items: Node<Word>[],
// 			public criterion: any
// 		) {

// 	}

// 	strictScore() : Score {
// 		let item1: Node<Word> = this.items[0];
// 		let item2: Node<Word> = this.items[1];
// 		const depth: number = item1.depth > item2.depth
// 			? item1.depth
// 			: item2.depth;
		
// 		let score: Score;
// 		score.denominator = depth;
		
// 		for (let i = 0; i < depth; i++) {
// 			if (item1 === item2) {
// 				score.numerator++;
// 				item1 = item1.next;
// 				item2 = item2.next;
// 			} else break
// 		}

// 		return score;
// 	}


// }
