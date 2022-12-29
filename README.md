# jshashreadable

An implementation of a modified form of an MD5 HASH in javascript with no external depencies.

Code was written for maximal readablilty and understandibility, so a trade off was made in executing the operations at a higher level with suboptimal functions written from scratch.

## Usage

Call the function with hash("string");

Ex.

hash("cat"); will return "1ffd96a09f680ab05405e66199077966"






Javascript bitwise operators were not properly working for me.

Ex. 

~0x89abcdef (NOT 0x89abcdef) returns

1985229328

when it should be returning 

4132712976

for the purposes of the hashing operation.

These functions can be found at

notOperator();

andOperator();

orOperator();

xorOperator();

and accept hexadecimal inputs contained within strings.

Ex.

notOperator("89abcdef");

returns

4132712976

## Extras
