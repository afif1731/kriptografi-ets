# ETS KRIPTOGRAFI BACK-END

## How To Run This Project

1. Clone this project

```
git clone https://github.com/afif1731/kriptografi-ets.git
```

2. Copy `.env.sample` to `.env.development` to configure a custom environment

```
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASS=
DATABASE_PORT=
DATABASE_HOST=
PORT=
NODE_ENV="development"
```

3. Run `yarn install`

4. If you don't have dotenv installed, install by using `npm install -g dotenv dotenv-cli`

5. If you want to use docker for the database, run `yarn setup:dev`

6. Then run `yarn migrate:dev` and then `yarn seed:dev`

7. To run the project, run `yarn start:dev`

8. Use postman for testing
