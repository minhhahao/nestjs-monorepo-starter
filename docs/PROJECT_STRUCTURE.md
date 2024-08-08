# The project folder structure

The folder structure of the project is as follows:

```plaintext
.
├── LICENSE
├── README.md
├── apps
│   ├── admin
│   │   ├── src
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.module.ts
│   │   │   ├── admin.service.ts
│   │   │   └── main.ts
│   │   └── tsconfig.app.json
│   ├── api
│   │   ├── src
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.ts
│   │   │   ├── auth
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.dto.ts
│   │   │   │   ├── auth.interfaces.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.service.ts
│   │   │   ├── main.ts
│   │   │   └── users
│   │   │       ├── users.controller.ts
│   │   │       └── users.module.ts
│   │   └── tsconfig.app.json
│   └── queues
│       ├── src
│       │   ├── main.ts
│       │   └── queues.module.ts
│       └── tsconfig.app.json
├── libs
│   ├── config
│   │   ├── src
│   │   │   └── index.ts
│   │   └── tsconfig.lib.json
│   ├── database
│   │   ├── src
│   │   │   └── index.ts
│   │   └── tsconfig.lib.json
│   ├── extends
│   │   ├── src
│   │   │   └── index.ts
│   │   └── tsconfig.lib.json
│   ├── guards
│   │   ├── src
│   │   │   └── index.ts
│   │   └── tsconfig.lib.json
│   ├── middlewares
│   │   ├── src
│   │   │   └── index.ts
│   │   └── tsconfig.lib.json
│   ├── modules
│   │   ├── src
│   │   │   ├── index.ts
│   │   │   └── index.ts
│   │   └── tsconfig.lib.json
│   ├── nest-cli.json
│   ├── prisma
│   │   ├── migrations
│   │   │   ├── 20240807024524_
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   └── schema
│   │       ├── schema.prisma
│   └── utils
│       ├── src
│       │   └── index.ts
│       └── tsconfig.lib.json
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── test.txt
├── tsconfig.build.json
└── tsconfig.json

```
