import {
	Token, Expr, isChar,
	Terminal, Separator, Char,
	Nonterminal, Word, Clause, Sentence, Paragraph
} from '../tokens';

export class Parser {
	private input: string[];
	tokens: Token<Expr>[];


	constructor(input: string) { 
		this.input = input.split('').reverse();
	}

	public run() {
		console.log("About to scan: \n", this.tokens)
		this.scan();
		console.log("About to parse words: \n", this.tokens)
		this.words();
		console.log("About to parse clauses: \n", this.tokens)
		this.clauses();
		console.log("About to parse sentences: \n", this.tokens[0].value.literal)
		// this.sentences()
		// console.log("About to parse paragraphs: \n")
		// this.paragraphs();
	}

	scan() {
		this.tokens = [];

		this.input.forEach(c => {
			let token;
			if (isChar(c)) token = Token.create<Char>(c, Char)[0]	
			else token = Token.create<Separator>(c, Separator)[0]	
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

			if (!(token.value instanceof Terminal)) {
				throw Error('Tried to parse Nonterminal as Word')
			}

			if (token.value instanceof Separator) {
				if (buffer.length > 0) {
					const wordToken = Token.create<Word>(buffer, Word)[0];
					words.push(wordToken);
				}
				words.push(token as Token<Separator>);
				buffer = [];
			} else if (token.value instanceof Char) {
				buffer.push(token as Token<Char>);
			} else {
				console.log(token);
				throw Error('Wrong arguments to words()')	
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

			if (!(token.value instanceof Word) && !(token.value instanceof Terminal)) {
				throw Error('Tried to parse Phrase as Word')
			}

			if (token.value instanceof Separator) {
				if (token.value.literal === '.' || token.value.literal === ',') {
					if (buffer.length > 0) {
						const clauseToken = Token.create<Clause>(buffer, Clause)[0];
						clauses.push(clauseToken);
						buffer = [];
					}
					clauses.push(token as Token<Separator>);
				} else {
					buffer.push(token as Token<Separator>)
				}			
			} else if (token.value instanceof Word) {
				buffer.push(token as Token<Word>);
			} else {
				console.log(token);
				throw Error('Wrong arguments to words()')	
			}

		}

		if (buffer.length > 0) {
			const clauseToken = Token.create<Clause>(buffer, Clause)[0];
			clauses.push(clauseToken);
		}

		return this.tokens = clauses.reverse();

	}

	private sentences() {
		const sentences: Array<Token<Sentence | Terminal>> = [];
		const length = this.tokens.length;

		let buffer: Array<Token<Clause | Terminal>> = [];

		while (this.tokens.length > 0) {
			const token = this.tokens.pop();

			if (!(token.value instanceof Clause) && !(token.value instanceof Terminal)) {
				throw Error('Tried to parse Sentence as Phrase')
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
				throw Error('Tried to parse Paragraph as Sentence')
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