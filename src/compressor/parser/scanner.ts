import {
	Token, Expr,
	Terminal, Separator, Char,
	Nonterminal, Word, Clause, Sentence, Paragraph, Corpus
} from '../tokens'

function isChar(value: string): boolean {
	return value.match(/[A-Za-z0-9]/) !== null;
}

export class Scanner {
	// public cache: Array<Token<Word | Separator>>;
	private buffer: Token<Expr>[] = [];
	private tokens: Array<Token<Expr>> = [];
	private current: Token<Expr>;
	public inputTokens: Token<Expr>[] = [];

	constructor(public inputString: string) { 
		this.terminals(inputString)
	}

	terminals(inputString: string = this.inputString) {
		inputString.split('').forEach(c => {
			let token;
			if (isChar(c)) token = Token.create<Char>(c, Char)	
			else token = Token.create<Separator>(c, Separator)
			this.inputTokens.push(token)
		})
	}
	
	words(): Token<Word>[] {
		this.tokens = []
		while (this.inputTokens.length > 0) {
			this.current = this.inputTokens.pop();

			if (!(this.current.value instanceof Terminal)) {
				throw Error('Tried to parse Nonterminal as Word')
			}

			if (this.current.value instanceof Separator) {
				if (this.buffer.length > 0) {
					const wordToken = Token.create<Word>(this.buffer, Word);
					this.tokens.push(wordToken);
				}
				this.tokens.push(this.current as Token<Separator>);
				this.buffer = [];
			} else if (this.current.value instanceof Char) {
				this.buffer.push(this.current as Token<Char>);
			} else {
				console.log(this.current);
				throw Error('Wrong arguments to words()')	
			}

		}
	
		return this.inputTokens = this.tokens.reverse() as Token<Word>[];

	}

	clauses() {
		this.tokens = [];
		while (this.inputTokens.length > 0) {
			const current = this.inputTokens.pop();

			if (!(current.value instanceof Word) && !(current.value instanceof Separator)) {
				throw Error('Tried to parse Phrase as Word')
			}

			if (current.value instanceof Separator) {
				if (current.value.literal === '.' || current.value.literal === ',') {
					if (this.buffer.length > 0) {
						const clauseToken = Token.create<Clause>(this.buffer, Clause);
						this.tokens.push(clauseToken);
						this.buffer = [];
					}
					this.buffer.push(current as Token<Separator>)
				}			
			} else if (current.value instanceof Word) {
				this.buffer.push(current as Token<Word>);
			} else {
				console.log(current);
				throw Error('Wrong arguments to words()')	
			}

		}

		if (this.buffer.length > 0) {
			const clauseToken = Token.create<Clause>(this.buffer, Clause) as Token<Clause>;
			this.tokens.push(clauseToken);
			this.buffer = [];
		}

		return this.inputTokens = this.tokens.reverse() as Token<Clause>[];

	}

	sentences() {
		this.tokens = [];
		while (this.inputTokens.length > 0) {
			const current = this.inputTokens.pop();

			if (!(current.value instanceof Clause) && !(current.value instanceof Separator)) {
				throw Error('Tried to parse Phrase as Word')
			}

			if (current.value instanceof Separator) {
				if (current.value.literal === '.') {
					if (this.buffer.length > 0) {
						const sentenceToken = Token.create<Sentence>(this.buffer, Sentence);
						this.tokens.push(sentenceToken);
						this.buffer = [];
					}
					this.buffer.push(current as Token<Separator>)
				}			
			} else if (current.value instanceof Clause) {
				this.buffer.push(current as Token<Clause>);
			} else {
				console.log(current);
				throw Error('Wrong arguments to sentences()')	
			}

		}

		if (this.buffer.length > 0) {
			const clauseToken = Token.create<Sentence>(this.buffer, Sentence) as Token<Sentence>;
			this.tokens.push(clauseToken);
			this.buffer = [];
		}

		return this.inputTokens = this.tokens.reverse() as Token<Sentence>[];

	}

	paragraphs() {
		this.tokens = [];
		while (this.inputTokens.length > 0) {
			const current = this.inputTokens.pop();

			if (!(current.value instanceof Sentence) && !(current.value instanceof Separator)) {
				throw Error('Tried to parse Paragraph as Sentence')
			}

			if (current.value instanceof Separator) {
				if (current.value.literal === '\n\n') {
					if (this.buffer.length > 0) {
						const paragraphToken = Token.create<Paragraph>(this.buffer, Sentence);
						this.tokens.push(paragraphToken);
						this.buffer = [];
					}
					this.buffer.push(current as Token<Separator>)
				}			
			} else if (current.value instanceof Sentence) {
				this.buffer.push(current as Token<Sentence>);
			} else {
				console.log(current);
				throw Error('Wrong arguments to paragraphs()')	
			}

		}

		if (this.buffer.length > 0) {
			const paragraphToken = Token.create<Paragraph>(this.buffer, Paragraph) as Token<Paragraph>;
			this.tokens.push(paragraphToken);
			this.buffer = [];
		}

		return this.inputTokens = this.tokens.reverse()as Token<Paragraph>[];

	}

	corpus() {
		this.tokens = [];
		while (this.inputTokens.length > 0) {
			const current = this.inputTokens.pop();

			if (!(current.value instanceof Paragraph) && !(current.value instanceof Separator)) {
				throw Error('Tried to parse Corpus as Paragraph')
			}

			if (current.value instanceof Paragraph) {
				this.buffer.push(current as Token<Paragraph>);
			} else if (current.value instanceof Separator) {
				this.buffer.push(current as Token<Separator>);
			} else {
				throw Error('Wrong arguments to corpus()')	
			}

		}

		if (this.buffer.length > 0) {
			const corpusToken = Token.create<Paragraph>(this.buffer, Corpus) as Token<Paragraph>;
			this.tokens.push(corpusToken);
			this.buffer = [];
		} else {
			throw Error("Buffer should not be empty")
		}

		if(this.tokens.length>1) throw Error("Buffer overflow")

		return this.inputTokens = [this.tokens.reverse().pop() as Token<Corpus>];

	}
}