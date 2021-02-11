Keeper
=========

## About

Keeper is a single-page AJAX-based password storage app for organizations. It uses jQuery, HTML5, PostgreSQL, and Tailwind CSS using PostCSS.

## Final Product

!["Homepage"](#)
!["Dashboard"](#)
!["Password Generator"](#)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `username` 
  - password: `password` 
  - database: `database`
3. Install dependencies: `npm i`
4. Reset database (using Node v10.20.x): `npm run db:reset`
5. Compile Tailwind config (using Node v12.13.x or higher): `npm run build`
6. Run the server: `npm start`
7. Visit `http://localhost:8080/`

## Warnings & Tips
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.20.x for PSQL and Node 12.13.0 for compiling with PostCSS
- NPM 5.x or above
- PG 6.x
- aes256 1.1.x or above
- autoprefixer 10.2.x or above
- bcrypt 5.x or above
- body-parser 1.19.x or above
- cookie-session 1.4.x or above
- dotenv 2.x or above
- express 4.17.x or above
- method-override 3.x or above
- PostCSS 8.2.x or above
- Tailwind CSS 2.0.x or above

