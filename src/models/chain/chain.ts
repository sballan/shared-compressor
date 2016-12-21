import * as _ from 'lodash';

import { Dictionary, Word } from '../dictionary';
import { Node } from '../node';

export class Chain {
	constructor(
		public dictionary: Dictionary,
		public path: string[]
	) { }

	hasPath(path: string[]) : boolean {
		return this.dictionary.hasPath(path);
	}

	pathFrequency(path: string[]) : number {
		return this.dictionary.getWordNode(path).freq;
	}

	hasSubPath(path: string[]) : boolean {
		const pathString1 = this.path.join('');
		const pathString2 = path.join('');
		return pathString1.includes(pathString2);
	}

	innerSubPaths(path: string[]) : string[] {
		const length = path.length;
		const subPaths = [];

		for (let i = 0; i < length; i++) {
			const inner = path.slice(i);

			for (let i = inner.length; i > 0; i--) {
				const subPath = inner.slice(0, i + 1)
				if (this.hasSubPath(subPath)) {
					subPaths.push(subPath)
				}
			}
		}

		return subPaths;
	}


	largestInnerSubPath(path: string[]) {

	}

	findSubPath(path: string[]) {
		const length = this.path.length;
		let subPath: string = "";
		for (let i = 0; i < length; i++) {
			if (this.path[i] = path[0]) {
				if (_.eq(this.path.slice(i, i + path.length), path)) {
					return this.dictionary.getWordNode(this.path.slice(0, i + path.length))
				}
			}
		}
	}
		
}