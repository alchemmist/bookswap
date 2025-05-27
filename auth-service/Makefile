test:
	docker compose -f compose-for-tests.yaml up -d
	go test ./internal/api
	docker compose -f compose-for-tests.yaml down -v

