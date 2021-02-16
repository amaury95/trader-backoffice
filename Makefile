tls:
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./certs/signature.key -out ./certs/signature.crt

build-server:
	pushd server && yarn build

build-client:
	pushd client && yarn build