# Mongoose Examples
These examples illustrate introductory Mongoose examples for Harvard Extension School's CSCI E31
## Repo Contents
Each of the following three files is an illustration of a different method for working with asynchronous code in NodeJS and in Mongoose. Their functionality is the same: to connect to MongoDB, create a Schema and Model, save a record and then retrieve it from the database.

+ **app.js**: Uses callbacks
+ **app.promise.js**: Uses promises
+ **app.asyncawait.js**: Uses async/await

The next two files are a starting point to let you play around with queries.

+ **app.setup.js**: Creates a handful of records in the database
+ **app.find.js**: Queries the database for the records created in `app.setup`  

### Install notes
You will have to replace the mongoDB connection string in these files with your own. (Each file was written to be a self-contained example, so the connection string is duplicated in each file.)

Be sure to install dependencies with `npm install` after you download/clone this repo. Then these JS files can be executed with `node [filename]`
