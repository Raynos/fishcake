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
	cd business/ && npm install
	cd endpoints/auth/ && npm install
	cd endpoints/device/ && npm install
	cd endpoints/health/ && npm install

.PHONY: test install fast-test
