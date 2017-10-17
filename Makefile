default: all

all: dumper

dumper:
	npm install

eslint:
	npm run eslint

unit-test:
	npm run test

.PHONY: dumper eslint unit-test
