# Portfolio
# linux
# Showcase

# Development 
``` bash
# Build command 
    docker compose --env-file=.env.dev -f docker-compose-dev.yml build 
--no-cache

# Launch command
    docker compose  -f  docker-compose-dev.yml --env-file=.env.dev up -d
````



# Deployment

``` bash 
docker build -t yannickkloud/portfolio:client-latest ./portfolio/client
docker push yannickkloud/portfolio:client-latest
```


``` bash 
docker compose --profile portfolio pull portfolio-client
docker compose --profile portfolio up -d --force-recreate portfolio-client web-portfolio
```