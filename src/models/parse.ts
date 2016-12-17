export class Parse {
	static chars(chars: string) {

		return chars.split('');
	}

	static words(words: string) {
		words = words.replace(/(\r\n|\n|\r)/gm, ' ')
		return words.split(' ');
	}

	static sentances(sentances: string) {
		return sentances.split('.');
	}

}