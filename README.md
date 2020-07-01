Sign in first with a default username to get a token  
URL: `localhost:3000/auth/sign-in`  
POST body:
```
{
  "userName": "charles"
}
```
Append the token received to Authorization header when using all but the sign-in API

API:
- POST `/auth/sign-in`: generate token based on username
- GET `/users/{id}`: get user by id (cached on redis)
- GET `/users/account-number/{account-number}`: get user by account number
- GET `/users/identity-number/{identity-number}`: get user by identity number
- POST `/users`: add a new user
- PUT `/users/{id}`: update a user
- DELETE `/users/{id}`: delete a user

User model:
```
{
  _id: String
  userName: String,
  accountNumber String,
  emailAddress: String,
  identityNumber: String
}
```
