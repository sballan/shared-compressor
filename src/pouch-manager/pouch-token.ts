import * as bluebird from 'bluebird';
import * as PouchDb from 'pouchdb';

import {
	Expr, Token, Terminal, Tokenizable, Nonterminal
} from '../compressor/tokens';


export interface Writeable {
	_id: string;
	type: string;
}

export interface WriteableTerminal extends Writeable {
	literal
}

export interface WriteableNonterminal extends Writeable {
	tokenIds: string[];
}

export class PouchToken extends Token<Tokenizable> {
	public initialized: boolean = false;

	constructor(value: any) {
		super(value)
		if (!PouchToken.initialized) {
			throw Error('Static PouchToken needs to be initialized first')
		}
	}

	private checkExists() {
		return PouchToken.client.get(this.key)
	}

	validate() {

	}

	save() {
		return 
	}

	get writeable() : Writeable {
		if (this.value.value instanceof Terminal) {
			return PouchToken.makeTerminal(this.value);
		} else if (this.value.value instanceof Nonterminal) {
			return PouchToken.makeNonterminal(this.value);
		}
	}

	static makeTerminal(token: Token<Terminal>): WriteableTerminal {
		return {
			_id: token.key,
			type: token.type,
			literal: token.literal
		}
	}

	static makeNonterminal(token: Token<Nonterminal>): WriteableNonterminal {
		return {
			_id: token.key,
			type: token.type,
			tokenIds: token.tokenKeys
		}
	}
	
	static initialized: boolean = false;
	static client: any = null;

	static init(client) {
		if (this.initialized) return;
		this.client = client;
	}	
}