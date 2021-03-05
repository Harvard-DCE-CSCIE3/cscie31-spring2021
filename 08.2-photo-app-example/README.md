## Photo App Example
This application demonstrates several of the techniques covered so far in CSCI E31. See Weeks 6-8 for Express routing,
`pug` templates, and mongodb.
### Starting the app
+ Create a .env file containing two properties:
  + DB_USER=[your mongodb username]
  + DB_PWD=[your mongodb password]]
+ Edit the mongodb connection string in `app.js` (line 12) to your mongodb instance, on MongoDB Atlas or elsewhere
+ Navigate to the project folder, and run `npm run start-dev`. Upload an image file to see the 'gallery' output
