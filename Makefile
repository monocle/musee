PROJ_NAME := musee
FRONTEND := frontend

up:
	docker compose up -d

down:
	docker compose down

frontend_logs:
	docker compose logs -f $(FRONTEND)

frontend_shell:
	docker exec -it $(PROJ_NAME)-$(FRONTEND)-1 /bin/sh

frontend_test:
	docker exec -it $(PROJ_NAME)-$(FRONTEND)-1 npm run test

list:
	@echo
	@echo "Available targets:"
	@make -qp | awk -F':' '/^[a-zA-Z0-9][^$#\/\t=]*:([^=]|$$)/ && !/^\./ && !/%$$/ {split($$1,A,/ /); for(i in A) if (A[i] != "Makefile") print A[i]}' | sort | uniq
	@echo
