## Technologies
- [ ] Docker
- [x] Nestjs TypeScript
- [x] Prisma ORM
- [x] Redis (cache)
- [x] Eslint + Prettier
- [x] Automation with Husky + Lint Staged
- [x] Unit testing with Jest
- [x] Essencial Plugins VSCode + Launch Debug

## Requirements
You need to configure the environment variables annotated in [.env-example](.env-example)

## For Development
```bash
# install application
$ pnpm install --frozen-lockfile

# watch mode development
$ pnpm run start:dev

# run unit tests
$ pnpm run test
```