tls:
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./config/certs/tls.key -out ./config/certs/tls.crt

db:
	mkdir -p db/keycloak/content

deploy: tls db
	docker-compose --env-file config/env/.env.deploy up

 