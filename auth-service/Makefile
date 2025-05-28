test:
	docker compose -f compose-for-tests.yaml up -d
	sleep 1
	go test ./internal/api
	docker compose -f compose-for-tests.yaml down -v

