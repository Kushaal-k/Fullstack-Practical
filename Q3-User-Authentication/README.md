# Q3 – User Authentication System (Register / Login)

A RESTful authentication API built with **Node.js**, **Express**, **MongoDB**, **Mongoose**, **bcrypt**, and **JWT**.

## Folder Structure

```
Q3-User-Authentication/
├── src/
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── controllers/
│   │   └── authController.js # Register & Login logic
│   ├── models/
│   │   └── User.js          # Mongoose User schema
│   ├── routes/
│   │   └── authRoutes.js    # Route definitions
│   └── server.js            # App entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env from template
cp .env.example .env
# Edit .env with your MongoDB URI and a JWT secret

# 3. Start the server
npm run dev   # with nodemon (hot-reload)
npm start     # production
```

## API Endpoints

### POST `/register`

**Body (JSON):**
```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "secret123"
}
```

| Status | Meaning                          |
|--------|----------------------------------|
| 201    | User registered successfully     |
| 400    | Missing / invalid fields         |
| 409    | Email already registered         |
| 500    | Internal server error            |

### POST `/login`

**Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

| Status | Meaning                          |
|--------|----------------------------------|
| 200    | Login successful (returns JWT)   |
| 400    | Missing fields                   |
| 401    | Invalid email or password        |
| 500    | Internal server error            |

## Bonus

- JWT token is generated on successful login with a 1-day expiry.

## Tech Stack

- Node.js & Express
- MongoDB & Mongoose
- bcrypt (password hashing)
- jsonwebtoken (JWT)
- dotenv (environment variables)
