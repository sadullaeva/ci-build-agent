.PHONY: run-docker-agent
run-docker-agent:
	docker run --network host -p $(PORT):$(PORT) --env PORT=$(PORT) build-agent
