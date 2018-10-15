class LineScanner {
	constructor( string ) {
		this.string = string;
		this.length = string.length;
		this.index = 0;
	}
	
	next() {
		let startIndex = this.index;
		let endIndex = this.length;
		
		while( this.index < this.length ) {
			let charCode = this.string.charCodeAt( this.index++ );
			
			if( charCode === 10 ) {
				endIndex = this.index - 1;
				break
			}
			else if( charCode === 13 ) {
				endIndex = this.index - 1;
				this.index += 1;
				break;
			}
		}
		
		return this.string.substring( startIndex, endIndex );
	}
	
	hasNext() {
		return this.index < this.length;
	}
	
	[Symbol.iterator]() {
		let nestedNext = () => {
			let done = !this.hasNext();
			return {
				value: done ? undefined : this.next(),
				next: nestedNext,
				done: done
			};
		};
		return {
			next: nestedNext
		};
	}
}

module.exports = LineScanner;