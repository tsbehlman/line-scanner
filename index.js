class LineScanner {
	constructor( string ) {
		this.string = string;
		this.length = string.length;
		this.index = 0;
	}
	
	next() {
		if( this.index >= this.length ) {
			return {
				value: undefined,
				done: true
			};
		}
		
		const startIndex = this.index;
		let endIndex = this.length;
		
		while( this.index < this.length ) {
			const charCode = this.string.charCodeAt( this.index++ );
			
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
		
		return {
			value: this.string.substring( startIndex, endIndex ),
			done: false
		};
	}
	
	[ Symbol.iterator ]() {
		return this;
	}
}

module.exports = LineScanner;