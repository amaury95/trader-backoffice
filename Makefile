SSL_KEY=./config/certs/tls.key
SSL_CRT=./config/certs/tls.crt

tls: $(SSL_KEY) $(SSL_CRT)
	@openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout $(SSL_KEY) -out $(SSL_CRT)

keycloak-content:
	@mkdir -p db/keycloak/content

define deploy_service
	docker-compose up -d --build $(1)
endef

nginx:
	@$(call deploy_service,nginx)

apollo:
	@$(call deploy_service,apollo)

keycloak: keycloak-content
	@$(call deploy_service,keycloak)
 
deploy: tls keycloak apollo nginx

 