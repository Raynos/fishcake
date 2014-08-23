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

	for file in endpoints/*; do \
		cd $$file && npm install && cd ../..; \
	done

swagger:
	cd server && rm -rf public
	cd server/node_modules/rtapi-swagger-ui && npm run build
	cd server && cp -R node_modules/rtapi-swagger-ui/dist public
	cd server && mkdir public/specs
	cd server && npm run swagger-spec
	cd server/public && ecstatic --cache=0

start:
	node server/server.js --port=14598

swagger-update:
	cd server && npm run swagger-update

.PHONY: test install fast-test start swagger-update swagger
