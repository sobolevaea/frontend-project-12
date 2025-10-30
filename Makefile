lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

deploy:
	git push heroku main

start:
	make start-backend

develop:
	make start-backend
# 	make start-backend & make start-frontend

build:
# пока непрянятно зачем
# 	rm -rf frontend/dist
	cd frontend && npm run build