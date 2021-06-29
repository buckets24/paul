# Paul 2.0

### Prerequisites (without docker)

## Initial db installation

(https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database#setting-up-postgresql-on-windows)

- Install postgresql, latest version (>v13)
  - It will prompt you to enter a super user password.
- Create a database called paul.

### Code setup

- Install dependencies `npm install`
- Bootstrap Prisma `npx prisma init`
- Create `.env` file on the root of directory. Copy content from `.env.template`

### Sync the prisma schema into the postgres database

`npx prisma db push --preview-feature`

### Initialize seed data in your local database. This reads `seed.ts` and runs it.

`npx prisma db seed --preview-feature`

### Reset database

`npx prisma migrate reset`

### Run dev server

`npm run dev`

### Known issues and their work arounds

- If you can't commit because lint-staged was not found, try rebuilding/reinstalling node_modules. If that does not work please install it globally for now.
