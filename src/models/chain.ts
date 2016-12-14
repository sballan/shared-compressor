import { Word } from './word';
import { WordNode } from './word-node';
import { Dictionary } from './dictionary';

export class Chain {
	public dictionary = new Dictionary();

	private addWord(wordString: string) : Word{
		const word = this.dictionary.addWord(wordString).value;
		return word;
  }
	
  private addWords(wordStrings: string[]): Word[]{
  	return wordStrings.map(w => this.addWord(w));
	}

  private getWord(wordString: string): Word {
    return this.dictionary.getWord(wordString)
  }
	
	private addLink(wordString: string, path?: string[]) : WordNode {
		const word = this.addWord(wordString);
		return this.dictionary.addNode(word, path);
  }
	
	private getLink(path: string | string[]) : WordNode {
		return this.dictionary.getNode(path);
  }
	
  makeLinks(wordStrings: string[]) {
    const length = wordStrings.length;
      
    for (let i = 0; i < length; i++) {
      let path = wordStrings.slice(0, i)
      const arg = path.length > 0 ? path : null
        
			this.addLink(wordStrings[i], arg)
		}  
	}



	print() {
		console.log(this.dictionary[20]);
	}

}