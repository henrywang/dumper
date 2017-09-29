default: all

all: dumper

dumper:
	npm install

eslint:
	npm run eslint

unit-test:
	npm run test

.PHONY: sandbox bdcs-api-server clean tests hlint
