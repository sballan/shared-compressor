import { Map } from '../../utils';
import { Node } from '../node'
import { Dictionary, Word } from '../dictionary';
import { Verb } from './verbs';


export class Query<S, O> {
	public executed: boolean = false;

	constructor(
		public subject: Node<S>,
		public verb: Verb,
		public args: any[],
		public object: Node<O>
	) { }



	execute() {
		this.executed = true;
		return this.verb<S, O>(this.subject, this.args, this.object)
	}
}
