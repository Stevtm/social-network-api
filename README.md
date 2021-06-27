# Social Network API

This application is an API for a social network built using MongoDB (Mongoose). API routes have been created for managament of User and Thought collections using CRUD operations.

A walkthrough of the API functionality is shown in this video: https://youtu.be/_xk4g-Z7das

The application is build using the following tools & packages:

- Mongoose
- Express
- Node.js

## Application Functionality

The following API routes have been generated:

### For Users:

- GET:
  - Return all users in the database (including thoughts and friends from each user)
  - Return one user by id (including thoughts and friends from the user)
- POST:
  - Create a new user
  - Add a friend (other user) to a user's friend list
- PUT:
  - Update a user by id
- DELETE:
  - Remove a user by id
  - Remove a friend from a user's friend list

### For Thoughts:

- GET:
  - Return all thoughts in the database (including reactions for each thought)
  - Return one thought by id (including reactions for the thought)
- POST:
  - Create a new thought by specific user
  - Create a reaction to a thought
- PUT:
  - Update a thought by id
- DELETE:
  - Delete a thought by id
  - Delete a reation by id

## Usage

To test the API routes, use a tool like Postman or Insomnia.

## References

- Mongoose: https://mongoosejs.com/
- Express: https://expressjs.com/
- Node.js: https://nodejs.org/en/
