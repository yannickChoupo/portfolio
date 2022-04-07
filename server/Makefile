all:
	echo 'hello'

build-dev:
	docker build -t portfolio_server_dev .

launch-dev:
	 docker run --rm -it -p 5000:5000 -v ${CURDIR}:/app -v ${CURDIR}\node_modules:/app/node_modules -t portfolio_server_dev

build-prod: 
	docker build -f Dockerfile-prod -t portfolio_server_prod .

launch-prod:
	docker run -p 5000:5000 -d portfolio_server_prod
