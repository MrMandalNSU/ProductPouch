# ProductPouch

A simple interactive application featuring product buy, sell and rental functionalities

## Tech Stack Used

- Frontend: React, Next Js, Mantine UI, Apollo Client, GraphQL query & mutations APIs
- Backend: Node js, Apollo Express, GraphQL, Prisma, Postgres
- APIs: GraphQL queries nad mutations

## Project Set-up guide

- go to `cd frontend/` run `npm install` it will install all the frontend dependencies
- go to `cd backend/` run `npm install` it will install all the backend dependencies
- install postgres on local machine
- create a `.env` file and put database path name and password `DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"`
- run migration on prisma to generate model and relations with the prisma schema `npx prisma migrate dev --name update_user_with_timestamps`
- generate schema by `npx prisma generate`
- for GUI database interface use `npx prisma studio`
- run frontend from frontend directory by `npm run dev` client will start on port 3000
- run backend from backend directory by `npm run dev` server will start on port 4000 and apollo studio will be accessible for GraphQL exploration

## Highlighted topics

- next js static/dynamic routing
- Mantine UI from, stepper, tabs
- apollo client, GraphQL schema, Gql APIs integration
- prisma ORM, postgres
