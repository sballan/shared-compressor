import { Token, Expr, Terminal } from '../tokens';
import { Node } from './node';

export class TokenNode<T extends Expr> extends Node<Token<T>> {
	public key: symbol;
	public value: Token<T>;
	public map: Map<symbol, Node<Token<Expr>>> = new Map();
	public freq: number = 0;
	public parent: TokenNode<Expr>;

	get nodes() : TokenNode<Expr>[] {
		return super.nodes;
	}

	constructor(key?: symbol, value?: Token<T>, parent?: TokenNode<Expr>) {
		super(key, value, parent)
	}

	addNode<U extends Expr>(key: symbol, value: Token<U>, path: symbol[] = []): TokenNode<U> {
		return super.addNode(key, value, path)
	}

	getNode(path: symbol | symbol[]): TokenNode<Expr> {
		return super.getNode(path);
	}

  findNode(path: symbol[]) : Node<Token<Expr>> {
		return super.findNode(path);
	}

	has(key: symbol) : boolean {
		return this.map.has(key);
	}

	getDec(path: symbol[]) : Node<Token<Expr>>[] {
		return super.getDec(path);
	}

	getAnc() : Node<Token<Expr>>[] {
		return super.getAnc();

	}
	

}