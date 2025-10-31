lint-frontend:
	make -C frontend lint

install:
	npm ci && make -C frontend install

run-frontend:
	make -C frontend run

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

build:
	rm -rf frontend/dist
	make -C frontend build