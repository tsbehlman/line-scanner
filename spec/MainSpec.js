let LineScanner = require( "../index" );

function verify( lines, delimeter ) {
	let scanner = new LineScanner( Buffer.from( lines.join( delimeter ) ) );
	let iteratorResult = scanner[Symbol.iterator]().next();
	for( let line of lines ) {
		expect( iteratorResult.value.toString() ).toBe( line );
		expect( iteratorResult.done ).toBe( false );
		iteratorResult = iteratorResult.next();
	}
	expect( iteratorResult.done ).toBe( true );
	expect( iteratorResult.value ).toBe( undefined );
}

function verifyLines( lines ) {
	verify( lines, "\n" );
}

function verifyCarriageReturns( lines ) {
	verify( lines, "\r\n" );
}

describe( "LineScanner", () => {
	it( "initializes", () => {
		let scanner = new LineScanner( "" );
	} );
	
	it( "implements iterator method", () => {
		expect( LineScanner.prototype[Symbol.iterator] instanceof Function ).toBe( true );
	} );
	
	it( "returns nothing", () => {
		verifyLines( [] );
	} );
	
	it( "returns one line", () => {
		verifyLines( [ "foo" ] );
	} );
	
	it( "returns two lines", () => {
		verifyLines( [ "foo", "bar" ] );
	} );
	
	it( "returns three lines", () => {
		verifyLines( [ "foo", "bar", "baz" ] );
	} );
	
	it( "returns three lines with carriage returns", () => {
		verifyCarriageReturns( [ "foo", "bar", "baz" ] );
	} );
} );