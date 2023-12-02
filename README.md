# What i learned
## NestJS
NestJS use ExpressJS under the hood so can access to Express js stuff
- Controller: receive request and return response
- Providers: service that handle business logic, modular
- [Pipes](https://docs.nestjs.com/pipes): function that tranform, validate data

## [Prima](https://www.prisma.io)
- ORM for connect and do database stuff
- Need to install 2 libraries:
 - Prisma to create schema, run migrations, deploy migrations
 - Prisma client. 
- Install Prisma CLI: `npm install prisma --save-dev`
- Install Prisma Client: `npm install @prisma/client`
Run `npx prisma init` to scaffold pisma folder and env file

# Setup
- Docker: 
 - Init: `docker compose up dev-db -d`
