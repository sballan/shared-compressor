import {
	Token, Expr, isChar,
	Terminal, Separator, Char,
	Nonterminal, Word, Clause, Sentence, Paragraph, Corpus
} from '../tokens';

import { Scanner } from './scanner'


export class Parser {
	private scanner: Scanner;
	private input: string[];
	tokens: Token<Expr>[];


	constructor(input: string) { 
		this.scanner = new Scanner(input);
		this.input = input.split('').reverse();
	}

	public run() {
		console.log("About to parse words: \n", this.tokens)
		this.words();
		console.log("About to parse clauses: \n", this.tokens)
		this.clauses();
		console.log("About to parse sentences: \n", this.tokens)
		// this.sentences()
		// console.log("About to parse paragraphs: \n")
		// this.paragraphs();
	}

	private words(): Token<Word>[] {
		const wordTokens = this.scanner.words();
		
		return wordTokens;
	}

	private clauses() {
		const clauseTokens = this.scanner.clauses();
		
		return clauseTokens;

	}

	private sentences() : Token<Sentence>[] {
		const sentenceTokens = this.scanner.sentences();
		
		return sentenceTokens;
	}

	private paragraphs() : Token<Paragraph>[]{
		const paragraphTokens = this.scanner.paragraphs();
		
		return paragraphTokens;

	}

	private corpus() : Token<Corpus>{
		const corpusToken = this.scanner.corpus();
		
		return corpusToken;

	}

}