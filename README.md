# Roam

A travel site providing traveler reviews of restaurants, hotels and fun activities!

- Robust RESTful API that runs on an Express server.
- Implemented authentication and session and used a Postgres database to store the session data.
- Enforced MVC principles.

[Link to Live Site](https://roamin.herokuapp.com/)

## Setting up Development Environment

- Clone the repository
- Install your dependencies: `npm install`
- Create your database: `npm run db:create`
- Load the schema and seed data: `npm run db:reset`
- Create a `.env` file and copy and paste the content of the `.env.template` file and insert your own environment variables.
- Run the server: `npm run start:dev`

## Technical Stack

### Back End
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/) ([Documentation](https://expressjs.com/en/4x/api.html))

### Database
* [PostgreSQL](https://www.postgresql.org/)
  * [pg-promise](https://github.com/vitaly-t/pg-promise)

### Front End
* [Pug](https://github.com/pugjs/pug)
* [Materialize](http://materializecss.com/)
