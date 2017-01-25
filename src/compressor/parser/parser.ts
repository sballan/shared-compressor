import {
	Token, Expr,
	Terminal, Separator, Char,
	Nonterminal, Word, Clause, Sentence, Paragraph, Corpus
} from '../tokens';

import { Scanner } from './scanner'


export class Parser {
	private scanner: Scanner;
	private inputStrings: string[];
	tokens: Token<Expr>[];


	constructor(inputString: string) { 
		this.scanner = new Scanner(inputString);
		this.inputStrings = inputString.split('').reverse();
	}

	public run() {
		console.log("About to parse words: \n", this.tokens)
		this.words();
		console.log("About to parse clauses: \n", this.tokens)
		// this.clauses();
		// console.log("About to parse sentences: \n", this.tokens)
		// this.sentences()
		// console.log("About to parse paragraphs: \n")
		// this.paragraphs();
	}

	public words(): Token<Word>[] {
		const wordTokens = this.scanner.words();
		
		return wordTokens;
	}

	public clauses() {
		const clauseTokens = this.scanner.clauses();
		
		return clauseTokens;

	}

	public sentences() : Token<Sentence>[] {
		const sentenceTokens = this.scanner.sentences();
		
		return sentenceTokens;
	}

	public paragraphs() : Token<Paragraph>[]{
		const paragraphTokens = this.scanner.paragraphs();
		
		return paragraphTokens;

	}

	public corpus() : Token<Corpus>{
		const corpusToken = this.scanner.corpus();
		
		return corpusToken;

	}

}