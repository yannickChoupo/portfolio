<<<<<<< HEAD
build:
=======
makebuild:
>>>>>>> 5d8720e8c57d6c7c4d2f58b8b67549d522e1fa65
    docker-compose up
build-dev:
    cd client && $(MAKE) build-dev
    cd server && $(MAKE) build
run-dev:
	docker-compose up

###
build-local:
    cd client && $(MAKE) build-local
    cd server && $(MAKE) build
run-local:
	docker-compose up

###
build-production:
    cd client && $(MAKE) build-production
    cd server && $(MAKE) build
run-production:
	docker-compose up
