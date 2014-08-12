test:
	cd server/ && npm test

fast-test:
	cd server/ && npm run fast-test

install:
	cd server/ && npm install
	cd business/ && npm install
	cd endpoints/auth/ && npm install
	cd endpoints/device/ && npm install
	cd endpoints/health/ && npm install

.PHONY: test install fast-test
