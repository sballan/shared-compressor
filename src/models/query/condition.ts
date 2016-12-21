import { Verb } from './verbs';
import { Node } from '../node';

export type Condition<S> = (s: Node<S>, v: Verb, a: any[]) => boolean;

export const ConditionFactory = function<S> () : Condition<S> {
	return () => { return true};
}