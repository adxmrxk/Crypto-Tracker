# Docker Setup for Crypto Tracker

## Prerequisites
- Docker Desktop installed and running

## Quick Start

1. **Build and run all containers:**
   ```bash
   docker-compose up --build
   ```

2. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## Commands

```bash
# Start containers (background)
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after code changes
docker-compose up --build

# Remove everything (including data)
docker-compose down -v
```

## Container Structure

```
crypto-tracker
├── frontend (nginx serving React build) → port 3000
├── backend (Express API) → port 5000
└── mongodb (database) → port 27017
```

## Notes
- MongoDB data persists in a Docker volume (`mongodb_data`)
- Your local MongoDB is NOT used - Docker runs its own
- First build may take a few minutes to download images
