import { Hash } from '../../utils';
import { Node } from '../node'
import { Dictionary, Word } from '../dictionary';
import { Verb } from './verbs';


export class Query<S> {
	public executed: boolean = false;

	constructor(
		public subject: Node<S>,
		public verb: Verb,
		public args: any[],
		public condition: (s: Node<S>, v: Verb, a: any[] ) => boolean
	) { }



	execute() {
		this.executed = true;
		return this.condition(this.subject, this.verb, this.args);
	}
}
