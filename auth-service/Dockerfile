FROM golang:1.24-alpine as builder

WORKDIR /app

COPY . .

RUN go mod tidy
RUN go build -o ./auth-service ./cmd/server

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/auth-service .

CMD ["./auth-service"]
