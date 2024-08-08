# Development Guide

## Installation

First, you need clone source code:

```bash
git clone https://github.com/minhhahao/nestjs-monorepo-starter nestjs-monorepo-starter
```

Then, you should make the file `env`.

```bash
cp .env.sample .env
````

Next step, you need update value for key in this file.

```.env
# Database
DB_ENGINE=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
DATABASE_URL=${DB_ENGINE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# JWT secret
JWT_SECRET=

# Redis
REDIS_HOST=
REDIS_PORT=6379
...
```

### Installation without docker

Before install the project, you need to install the following tools:

* **Required**:
  * **Nodejs**:  Version ^20.16.0. Tested with Nodejs ^20.16.0.
  * **PNPM**: You can install it by running `npm install -g pnpm`.
* **Optional**:
  * **PostgreSQL**: Version ^14. Tested with PostgreSQL 
  * **Redis**: Version ^6. Tested with Redis 6

After that, you can install the project by running the following command:

```bash
pnpm install
```

Wait a few minutes for the installation to complete.

### Installation within docker

* Updating

## Usage

This is table command for development/deployment:

| Command | Use within Docker | Use without Docker | Note |
|---------|-------------------|--------------------|----- |
| Install dependencies | ... | `pnpm install` | |
| Add new package | ... | `pnpm add <package-name>` | |
| Add new package dev | ... | `pnpm add -D <package-name>` | |
| Start the API dev | ... | `pnpm start:dev:api` | **Default**: server run with port 3000 |
| Start the Queue dev | ... | `pnpm start:dev:queues` | |
| Start the Admin dev | ... | `pnpm start:dev:admin` | **Default**: server run with port 3001 |
| View logs | .. | N/A | |
| Stop the stack | ... | use key combination `control + C`| |
| Make migrations | ... | ... | |
| Migrate database | ... | ... | |
| Check code convention | ... | `pnpm lint` | |
| Format code | ... | `pnpm format` | |
| Run tests | ... | `pnpm test` | make sure is package dev installed |
| Run coverage | ... | ... | make sure is package dev installed |
| Build the API | ... | `pnpm build:api` | |
| Build the Queue | ... | `pnpm build:queues` | |
| Build the Admin | ... | `pnpm build:admin` | |
| Start the API prod | ... | `pnpm start:prod:api` | |
| Start the Queue prod | ... | `pnpm start:prod:queues` | |
| Start the Admin prod | ... | `pnpm start:prod:admin` | |

### Get help

Please contact me if:

* You can't config WebStorm on your project.
* You want to use [Visual Studio Code](https://code.visualstudio.com/) instead.
* You want's to use break points or debug code in server.
