PROJ_NAME := musee
FRONTEND := frontend
BACKEND := backend

up:
	docker compose up -d

down:
	docker compose down

backend_shell:
	docker exec -it $(PROJ_NAME)-$(BACKEND)-1 /bin/bash

backend_test:
	docker exec -it $(PROJ_NAME)-$(BACKEND)-1 python scripts/auto_run_tests.py

backend_test_cov:
	docker exec -it $(PROJ_NAME)-$(BACKEND)-1 pytest --cov=backend/src/app --cov-report=term-missing 

frontend_logs:
	docker compose logs -f $(FRONTEND)

frontend_shell:
	docker exec -it $(PROJ_NAME)-$(FRONTEND)-1 /bin/sh

frontend_test:
	docker exec -it $(PROJ_NAME)-$(FRONTEND)-1 npm run test

frontend_test_cov:
	docker exec -it $(PROJ_NAME)-$(FRONTEND)-1 npx vitest run --coverage

list:
	@echo
	@echo "Available targets:"
	@make -qp | awk -F':' '/^[a-zA-Z0-9][^$#\/\t=]*:([^=]|$$)/ && !/^\./ && !/%$$/ {split($$1,A,/ /); for(i in A) if (A[i] != "Makefile") print A[i]}' | sort | uniq
	@echo
