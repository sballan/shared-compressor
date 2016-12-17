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
	subject

}