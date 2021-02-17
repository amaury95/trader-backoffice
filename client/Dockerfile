FROM node:10-slim as builder
WORKDIR /app
ADD . .
RUN npm install
RUN npm run build

FROM nginx:1.17
WORKDIR /app
COPY --from=builder /app/build .