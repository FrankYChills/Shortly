# Shortly API

> Shortly API is a web service to generate short link from given long link.

> ### The app is deployed live at -> https://shortly-e4xw.onrender.com

## Features

> ### 1. User Authentication and Authorization.

> ### 2. Any User can store a shortened url for max of 30 days. The storage time will increase on the access of that shortened url.

> ### 3. All the shortened urls will be unique.

## How it Works

> It is must for an user to first register and login to use the service.The user then can generate shortened url using the endpoint provided below.

## Endpoints

> `BASE URL -  https://shortly-e4xw.onrender.com`

```
REGISTER A NEW USER - /api/auth/register
METHOD - POST
BODY - username(String,required), password(String,required)
```

```
LOGIN USER - /api/auth/login
METHOD - POST
BODY - username(String,required),password(String,required)
```

```
SHORTEN AN URL - /api/shortit
METHOD - POST
HEADERS - Authorization(required)
BODY - url(String,required)
```

## Tools and Technologies Used

> Backend API - Node.js

> Storage - MongoDB
