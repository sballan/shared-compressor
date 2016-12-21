import { Node } from '../node'

export interface Verb {
	<S, O>
	(subject: Node<S>,
	args: any[]);
} 

/**
 * args: array of strings signifying the path
 */
export function getNode<S>(
	subject: Node<S>,
	args: any[]
) {
	return subject.getNode(args)
}

/**
 * args: array of strings signifying the path
 */
export function getChain<S>(
	subject: Node<S>,
	args: string[]
): Node<S>[] {
	let length = args.length;
	const chain: Node<S>[] = [];
	let current: Node<S> = subject;

	for (let i = 0; i < length; i++) {
		chain.push(current);
		current = current.getNode(args[i]);
	}
	return chain;
}

export function find<S>(
    subject: Node<S>,
    args: any[]
) {
    
}
