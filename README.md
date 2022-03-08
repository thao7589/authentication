Project: Authentication
Backend technology: NodeJs, Express, JWT
Database: https://cloud.mongodb.com/


.env setup:
DB_CONNECT: mongodb+srv://username:password@cluster0.vhhza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
TOKEN_SECRET: random


Run project:
_ npm install
_ npm start


API:
//login 
POST: http://localhost:3000/api/login
//signup POST
POST: http://localhost:3000/api/users/signup
//get user
GET: http://localhost:3000/api/:user_id
//update
PATCH: http://localhost:3000/api/:user_id
//delete
POST: http://localhost:3000/api/close


Explain about technical decisions:
_ Nodejs is easy to learn, since I have been working with Javascript for years.
_ Nodejs could work well with Reactjs
_ Applying MongoDB on Nodejs is simple and fast.


Future improvements:
_ Apply unit test.
_ Refactor code.
_ Build views.
