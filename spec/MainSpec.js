const LineScanner = require( "../index" );

function verify( lines, delimeter ) {
	const scanner = new LineScanner( lines.join( delimeter ) );
	const iterator = scanner[ Symbol.iterator ]();
	let iteratorResult = iterator.next();
	for( const line of lines ) {
		expect( iteratorResult.value ).toBe( line );
		expect( iteratorResult.done ).toBe( false );
		iteratorResult = iterator.next();
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
		new LineScanner( "" );
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