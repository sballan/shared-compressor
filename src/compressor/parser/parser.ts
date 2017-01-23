import {
	Token, Expr, isChar,
	Terminal, Separator, Char,
	Nonterminal, Word, Clause, Sentence, Paragraph
} from '../tokens';

export class Parser {
	private input: string[];
	private tokens: Token<Expr>[];


	constructor(input: string) { 
		this.input = input.split('').reverse();
	}

	public run() {
		console.log("About to scan: \n")
		this.scan();
		console.log("About to parse words: \n")
		this.words();
		console.log("About to parse clauses: \n")
		this.clauses();
		console.log("About to parse sentences: \n")
		this.sentences()
		console.log("About to parse paragraphs: \n")
		this.paragraphs();
	}

	private scan() {
		this.tokens = [];

		this.input.forEach(c => {
			const token = Token.create(c, Terminal)[0]
			this.tokens.push(token)
		})
	}

	private words() {
		const words: Array<Token<Word | Terminal>> = [];
		const length = this.tokens.length;

		// buffer for word being parsed
		let buffer: Token<Terminal>[] = [];

		while (this.tokens.length > 0) {
			const token = this.tokens.pop();

			if (!(token instanceof Terminal)) {
				throw Error('Tried to parse Nonterminal as Word')
			}

			switch (true) {
				case token.value.literal === ' ':
					const wordToken = Token.create<Word>(buffer, Word)[0];
					words.push(wordToken, token as Token<Terminal>);
					break;
				case isChar(token.value.literal):
					buffer.push(token as Token<Terminal>);
					break;
				default:	
					words.push(token as Token<Terminal>);
					break;	
			}
		}

		return this.tokens = words.reverse();

	}

	private clauses() {
		const clauses: Array<Token<Clause | Terminal>> = [];
		const length = this.tokens.length;

		let buffer: Array<Token<Word | Terminal>> = [];

		while (this.tokens.length > 0) {
			const token = this.tokens.pop();

			if (!(token instanceof Word) && !(token instanceof Terminal)) {
				throw Error('Tried to parse Phrase as Word')
			}

			switch (true) {
				case token.value.literal === '.' || token.value.literal === ',':
					const phraseToken = Token.create<Clause>(buffer, Clause)[0]
					clauses.push(phraseToken, token as Token<Terminal>);	
						break;
				case isChar(token.value.literal):
					buffer.push(token as Token<Terminal>);
					break;
				default:
					clauses.push(token as Token<Terminal>);
					break;
			}

		}

		return this.tokens = clauses.reverse();

	}

	private sentences() {
		const sentences: Array<Token<Sentence | Terminal>> = [];
		const length = this.tokens.length;

		let buffer: Array<Token<Clause | Terminal>> = [];

		while (this.tokens.length > 0) {
			const token = this.tokens.pop();

			if (!(token instanceof Clause) && !(token instanceof Terminal)) {
				throw Error('Tried to parse Phrase as Word')
			}

			switch (true) {
				case token.value.literal === '.':
					const sentenceToken = Token.create<Sentence>(buffer, Sentence)[0];
					sentences.push(sentenceToken, token as Token<Terminal>);	
						break;
				case isChar(token.value.literal):
					buffer.push(token as Token<Terminal>);
					break;
				default:
					sentences.push(token as Token<Terminal>);
					break;
			}

		}

		return this.tokens = sentences.reverse();

	}

	private paragraphs() {
		const paragraphs: Array<Token<Paragraph | Terminal>> = [];
		const length = this.tokens.length;

		let buffer: Array<Token<Sentence | Terminal>> = [];

		while (this.tokens.length > 0) {
			const token = this.tokens.pop();

			if (!(token instanceof Sentence) && !(token instanceof Terminal)) {
				throw Error('Tried to parse Sentence as Clause')
			}

			switch (true) {
				case token.value.literal === '\n\n':
					const paragraphToken = Token.create<Paragraph>(buffer, Paragraph)[0];
					paragraphs.push(paragraphToken, token as Token<Terminal>);	
					break;
				case isChar(token.value.literal):
					buffer.push(token as Token<Terminal>);
					break;
				default:
					paragraphs.push(token as Token<Terminal>);
					break;
			}

		}

		return this.tokens = paragraphs.reverse();

	}

}