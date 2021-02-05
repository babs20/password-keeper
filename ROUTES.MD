# ROUTES

## localhost/
- / (GET) homepage

## localhost/users
- /login (POST) to login and render /users/:userid/accounts
- /logout (POST)

## localhost/registration
- /user (POST) registration for users
- /organization (POST) registration for orgs

## localhost/api
- /user (GET) show user information
- /user (PUT) edit user information

- /accounts (POST) create new account
- /accounts (GET) show ALL accounts or category (based on query) or based on search
- /accounts (PUT) edit account

- /generate-password (POST) generate password

- /organization (GET) show organization information
- /organization (PUT) edit organization information

- /manage (GET) show all users in the organiation
- /manage (PUT) edit users in the organization
