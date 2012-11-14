test:
	@mocha tests/small/*.js tests/large/*.js

small-test:
	@mocha tests/small/*.js 

run:
	@node lib/main.js
