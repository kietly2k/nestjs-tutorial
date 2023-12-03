# What i learned
## NestJS
NestJS use ExpressJS under the hood so can access to Express js stuff
- Controller: receive request and return response
- Providers: service that handle business logic, modular
- [Pipes](https://docs.nestjs.com/pipes): function that tranform, validate data
The @nestjs/config package internally uses dotenv.
- [NestJS Configuration](https://docs.nestjs.com/techniques/configuration). Config is injectable
- Any services in NestJS wanna able to be used in other places need `Injectable()` decorator. Ortherwise it will undefine when using
- By default all module are contained and only able to use in that class (private) need to make it global to allow other classes to access and use the module service. Can make global by using decorator or config prop.
- NestJS also support Authorize, Authentiacation with [Passportjs](https://www.passportjs.org/) under the hood.
- The @nestjs/jwt package is a utility package that helps with JWT manipulation
- The @nestjs/passport package is the abtraction use passport js to handle author, authen
- [Passport](https://docs.nestjs.com/recipes/passport)
- [Guards](https://docs.nestjs.com/guards) function that stand between route and http request. Prevent access to route if request does not match requirement.
- [Custom Decorators](https://docs.nestjs.com/custom-decorators)
- Some default Decorator that NestJS provide out of the box saved a lot of time like @Param, @HTTPCode,...

When a request send to NestJS controller. The workflow will be:
Guard -> Param decorator -> Controller
Guard use strategy to handle request validation (Ex: authentication) 
Param decorator: get request data. Process it then return processed data to controller
Controller: receive then use services to process business logic then return response

By default Post request in NestJS return 201 status code and that behavior can change by using HttpCode decorator
Should estimate testing time equal to development time

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
 
Execute migration from local instead of generate new migration `"prisma:dev:deploy": "npx prisma migrate deploy",`
Restart db server in docker
```
"db:dev:rm": "docker compose rm dev-db -s -f -v",
"db:dev:up": "docker compose up dev-db -d",
```

# Notes
- Checkout jwt doc
- Compare with session if can