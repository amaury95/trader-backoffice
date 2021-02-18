SSL_KEY=./config/certs/tls.key
SSL_CRT=./config/certs/tls.crt

tls: $(SSL_KEY) $(SSL_CRT)
	@openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $(SSL_KEY) -out $(SSL_CRT)

db:
	@mkdir -p db/keycloak/content

define deploy_service
	docker-compose --env-file config/env/.env.deploy up -d --build $(1)
endef

deploy-nginx:
	@$(call deploy_service,nginx)

deploy-apollo:
	@$(call deploy_service,apollo)

deploy-keycloak:
	@$(call deploy_service,keycloak)
 
deploy: tls db deploy-keycloak deploy-apollo deploy-nginx

 