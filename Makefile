tls:
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./config/certs/tls.key -out ./config/certs/tls.crt

build: tls
	docker-compose up --build

 