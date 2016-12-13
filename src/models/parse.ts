export class Parse {
	static chars(chars: string) {
		return chars.split('');
	}

	static words(words: string) {
		return words.split(' ');
	}

	static sentances(sentances: string) {
		return sentances.split('.');
	}

}