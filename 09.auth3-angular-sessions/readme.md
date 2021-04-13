## Session Authentication Using Express and Angular
This example demonstrates the simplest case of using session-based authentication as we've demonstrated in CSCI E31 with Angular.

This example uses Express/Web routes for `/users/register`, `/users/login`, and `/users/logout` routes, but uses Angular at the `/` route to display user information for the logged-in user (or redirect to the login page for an unauthorized one).

The routing between the two sides (Web/HTML vs Angular) isn't robust, but it demonstrates the architecture required and leaves the exact routing as an exercise for the student.  

### Usage
Be sure to:
+ server: craete a `.env` with properties set for PORT, DB_USER, DB_PWD
+ client: check `environments/environment.ts` to make sure the values are correct for your environment

#### Starting the server
```
cd server
npm install
npm run start-dev
```
#### Building the Angular App
```
ng build
```
#### Register an account and login
+ http://localost:3030/users/register
+ http://localost:3030/users/login
+ Angular: http://localost:3030/ - will display user info if login session exists, or redirect to login page otherwise
