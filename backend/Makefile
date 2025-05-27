test:
	docker compose -f compose-for-tests.yaml up -d
	sleep 1
	gradle clean test 
	docker compose -f compose-for-tests.yaml down -v


