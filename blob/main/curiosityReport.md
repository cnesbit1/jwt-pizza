# Curiosity Report: Docker for Data Engineering and DevOps

## Introduction

As I get ready to start my data engineering internship this summer, I’ve been looking into Docker and why it plays such a big role in modern workflows. Docker containers are used extensively to manage data pipelines, scale analytics environments, and maintain consistency across systems. I picked Docker as my curiosity topic because I’ll be using it regularly soon, and I want to really understand how it works so I can build and manage efficient, portable, and reliable data systems. This report is meant to give a broad but approachable overview of Docker, while it won’t cover everything in depth, it highlights the most useful and interesting parts I’ve come across.

This report is structured into four main sections:

1. **Facts About Docker** – covering core concepts, architecture, and internal mechanisms
2. **Examples and Use Cases** – demonstrating real-world usage in DevOps and data engineering
3. **Common Docker Commands** - showing commond docker commands and utilities
4. **References** – links to documentation, tutorials, and videos I found valuable

---

## 1. Facts About Docker

Docker is an open-source platform for developing, shipping, and running applications inside containers. These containers allow isolated environments that bundle code with dependencies.

### Key Concepts

- **Images** are read-only templates that define what software is inside a container and how it behaves. They are built from Dockerfiles and can be shared via container registries.
- **Containers** are running instances of images. They encapsulate everything needed to run an application: code, runtime, libraries, and environment variables.
- **Dockerfile** is a script containing a set of instructions to build an image. It defines the base image, application code, dependencies, and startup commands.
- **Docker Daemon** (`dockerd`) is the background process responsible for managing Docker objects (images, containers, networks, volumes) and communicating with the Docker client.
- **Docker Compose** is a tool for defining and running multi-container applications. It allows you to spin up entire stacks by describing services, networks, and volumes in a single YAML file.

### Internals

- **Namespaces**: Docker uses Linux namespaces to provide isolation for containers. This includes the process ID (PID), network, mount, user, and interprocess communication (IPC) namespaces.
- **Control Groups (cgroups)**: These limit and prioritize resources (CPU, memory, disk I/O) used by containers, ensuring efficient resource utilization and preventing any one container from monopolizing the system.
- **OverlayFS**: Docker layers images using OverlayFS, allowing file changes to be stacked. This means base images can be shared while still enabling customizations without affecting the original layers.
- **Container runtimes**: Docker uses `containerd` as its container runtime and `runc` to create and run containers. These conform to Open Container Initiative (OCI) standards to ensure compatibility and portability across systems.

### Docker vs Virtual Machines

| Docker (Container) | Virtual Machine (VM)     |
| ------------------ | ------------------------ |
| Shares host OS     | Has full OS per instance |
| Fast startup       | Slower boot time         |
| Lightweight        | Heavier resource usage   |
| Better portability | Lower portability        |

---

## 2. Examples and Use Cases

One of the things that stood out most in my research is just how versatile Docker is in the real world. Below are example scenarios and patterns that illustrate how Docker fits into professional workflows.

### DevOps Pipelines

- Docker enables a standardized **Build → Test → Deploy** process by ensuring all environments behave the same regardless of the underlying infrastructure.
- Integrated with CI/CD platforms like **GitHub Actions**, **GitLab CI**, **Jenkins**, and **CircleCI**, Docker containers help isolate each pipeline step, providing clean, temporary environments for building, linting, testing, and deploying.
- Developers can containerize apps alongside their environment configs, reducing the risk of errors due to local system differences (the classic "it works on my machine" issue).
- Version-controlled Dockerfiles act as infrastructure-as-code, improving reproducibility and traceability in deployments.

### QA and Testing

- With `docker-compose`, QA teams can spin up complete environments containing the application, databases, caches, and mock services. Making it easy to test complex systems without affecting production.
- Test suites (e.g., Jest, Playwright, Selenium, Postman) run inside containers to eliminate machine-specific inconsistencies and facilitate parallel execution.
- Containers allow teams to quickly reproduce bugs by replicating the same runtime and environment settings found in production.
- Integration tests and end-to-end tests can be scheduled as part of nightly builds or pre-merge hooks using container orchestration tools.

### Data Engineering Workflows

- Docker allows tools like **Apache Airflow**, **Kafka**, **Spark**, and **Hadoop** to be containerized and deployed as modular services in a data pipeline.
- ETL workflows can be tested in isolated environments before being scheduled into production systems, ensuring reliability and minimizing side effects.
- Common Python/R/Scala libraries for data cleaning and machine learning can be pre-installed in custom images, creating reusable environments for analysts and engineers.
- Containers simplify collaboration, teams can share prebuilt environments across cloud and local workstations using Docker Hub or private registries.
- Data processing tasks benefit from Docker volumes and bind mounts, allowing persistent storage of configuration files, logs, and intermediate data products.

### Microservices Architecture

- Microservices-based systems use Docker to isolate services like authentication, billing, recommendation engines, APIs, and frontend clients.
- Each containerized service can be developed, deployed, and scaled independently, improving fault isolation and flexibility.
- Docker's networking features (like user-defined bridge networks and aliases) allow services to discover and communicate with each other securely and efficiently.
- Tools like **Traefik** or **NGINX** can be used in containers as reverse proxies to route traffic among microservices.

### Best Practices Summary

- **Use Alpine-based images** to minimize image size and reduce attack surfaces.
- Include a `.dockerignore` file to exclude unnecessary files from build context (e.g., `.git`, `node_modules`).
- **Avoid running containers as root**; use non-root users for improved security.
- **Pin image versions** explicitly (e.g., `node:18.15-alpine`) to avoid unexpected breakages from upstream changes.
- Regularly scan images using tools like [Trivy](https://github.com/aquasecurity/trivy), `docker scan`, or CI-integrated scanners to detect vulnerabilities early.
- Use multi-stage builds to separate build dependencies from runtime environments, keeping production images lightweight and secure.

---

## 🛠️ Common Docker Commands

Here are some widely-used Docker commands that are essential for daily development, deployment, and debugging tasks:

### Image and Container Management

```bash
# Build an image from a Dockerfile in the current directory
docker build -t my-image-name .

# Run a container from an image
docker run -d -p 8080:80 my-image-name

# List all running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a running container
docker stop <container_id>

# Remove a stopped container
docker rm <container_id>

# Remove an image
docker rmi my-image-name
```

### Docker Compose

```bash
# Start services defined in docker-compose.yml
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop services
docker-compose down

# Rebuild services
docker-compose up --build
```

### Volume and Network

```bash
# List volumes
docker volume ls

# List networks
docker network ls
```

---

## 4. References

### Official Documentation

- [Docker Docs](https://docs.docker.com/)
- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [CLI Reference](https://docs.docker.com/engine/reference/commandline/docker/)
- [Docker Compose Overview](https://docs.docker.com/compose/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/security/)
- [Docker Networking Guide](https://docs.docker.com/network/)
- [Docker Storage Volumes](https://docs.docker.com/storage/volumes/)

### YouTube Videos

- [Docker Explained Simply – TechWorld with Nana](https://www.youtube.com/watch?v=pTFZFxd4hOI)
- [Docker in 100 Seconds – Fireship](https://www.youtube.com/watch?v=Gjnup-PuquQ)
- [Docker for DevOps Full Course – FreeCodeCamp](https://www.youtube.com/watch?v=9zUHg7xjIqQ)
- [Docker Compose Crash Course – Traversy Media](https://www.youtube.com/watch?v=Qw9zlE3t8Ko)
- [Learn Docker in 1 Hour – Academind](https://www.youtube.com/watch?v=3c-iBn73dDE)

### Articles & Tutorials

- [Play with Docker](https://labs.play-with-docker.com/)
- [Docker for Beginners (FreeCodeCamp)](https://www.freecodecamp.org/news/docker-simplified-96639a35ff36/)
- [Docker Cheatsheet (Kapeli)](https://kapeli.com/cheat_sheets/Docker.docset/Contents/Resources/Documents/index)
- [Awesome Docker GitHub Repo](https://github.com/veggiemonk/awesome-docker)

---

## Conclusion

Docker enables reproducibility, portability, and scalability, key pillars for any data engineer working in a DevOps-driven environment. Digging into Docker has helped me understand how containers actually work under the hood and where they fit into real software workflows. I am grateful that I was required to compile this report from the documentation and facts I've learned because I'll be using it as a resource as I expand my skillset in Docker. I feel much more confident heading into my new role and look forward to putting this knowledge to good use.
