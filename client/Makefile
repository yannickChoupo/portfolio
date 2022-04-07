all:
	echo 'hello'

build-dev:
	docker build -t portfolio_client_dev .

launch-dev:
	 docker run --rm -it -p 3000:3000 -v ${CURDIR}:/app -v ${CURDIR}\node_modules:/app/node_modules -e CHOKIDAR_USEPOLLING=true -t portfolio_client_dev

build-prod: 
	docker build -f Dockerfile-prod -t portfolio_client_prod .

launch-prod:
	docker run -p 3000:80 -d portfolio_client_prod
