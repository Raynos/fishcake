NODE_VERSION := $(shell node -v)

test:
	cd server/ && npm test

fast-test:
	cd server/ && npm run fast-test

install:
ifneq ($(NODE_VERSION), $(shell echo "v0.10.26"))
	@echo 'Wrong version of node $(NODE_VERSION)';
	@echo 'Expected to be using v0.10.26';
	@exit 1;
endif

	cd server/ && npm install
    cd browser/ && npm install

server:
	node server/server.js --port=9000

.PHONY: test install fast-test server
