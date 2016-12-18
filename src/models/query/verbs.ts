import { Node } from '../node'

export interface Verb {
	<S, O>
	(subject: Node<S>,
	args: any[],
	object: Node<O>);
} 

export function get<S, O>(
	subject: Node<S>,
	args: any[],
	object: Node<O>
) {
	return subject.getNode(args)
}

export function find<S, O>(
    subject: Node<S>,
    args: any[],
    object: Node<O>
) {
    
}
