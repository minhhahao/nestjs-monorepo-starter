ARG NODE_VERSION_BUILD=20.16
ARG NODE_VERSION_RUN=20.16-bookworm-slim

# Nodejs build stage
FROM node:${NODE_VERSION_BUILD} as build

RUN corepack enable pnpm

# Set the working directory
USER node
WORKDIR /code

# Requirements are installed here to ensure they will be cached.
COPY --chown=node:node ../../package.json ../../pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --production

# Copy the source code to app folder
COPY --chown=node:node ../../. .

# Generate the prisma client
RUN pnpm exec prisma generate

# Build the app
RUN pnpm run build:api


# Run-time build stage
FROM node:${NODE_VERSION_RUN} as runtime

# Install OpenSSL for Prisma
RUN apt-get update -y
RUN apt-get install -y openssl

# set non-root user and expose port 3000
USER node
EXPOSE 3000

# Set the working directory
WORKDIR /code

# Copy the build artifacts from the build stage
COPY --from=build --chown=node:node /code/node_modules ./node_modules
COPY --from=build --chown=node:node /code/dist/apps/api ./dist

# Create .env file
RUN echo "NODE_ENV=production" > .env

# Run the app
CMD ["node", "/code/dist/main.js"]
