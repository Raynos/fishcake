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

swagger:
	cd server && rm -rf public
	cd server/node_modules/rtapi-swagger-ui && npm run build
	cd server && cp -R node_modules/rtapi-swagger-ui/dist public
	cd server && mkdir public/specs
	cd server && npm run swagger-spec --production
	cd server/public && ecstatic --cache=0

.PHONY: test install fast-test
