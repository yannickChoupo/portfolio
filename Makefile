build:
	docker-compose up
build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build
run-dev:
	docker-compose up
build-local:
	cd client && $(MAKE) build-local
	cd server && $(MAKE) build
run-local:
	docker-compose up
build-production:
	docker compose -f docker-compose-prod.yml build
run-production:
	docker compose -f docker-compose-prod.yml up -d
stop-production:
	docker compose -f docker-compose-prod.yml down
logs-production:
	docker compose -f docker-compose-prod.yml logs -f
restart-production:
	docker compose -f docker-compose-prod.yml restart
