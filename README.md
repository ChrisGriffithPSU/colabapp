This repo contains all the code for the Colab Application, which helps users connect with their friends by creating stories.

### Colab Client
* The `colab-client` folder contains the frontend code.
* The frontend application is built using `Swift`.

### Infrastructure
* The `infra` folder contains the objects needed to deploy the microservices to kubernetes.
* The `volumes` folder contains the files that are used to run services for local development.
* The `k8s` folder contains the files that are used to deploy the services through both `Minikube` and `AWS EKS Cluster`.

### Microservices
* The `microservices` folder contains all the backend code for the applications services.
* The services can be started either individually from the terminal or via docker compose.