# 🛠️ FixItNow - Home Service Booking Platform (Backend)

FixItNow is a RESTful backend API for a Home Service Booking Platform where customers can discover home services, book technicians, make secure online payments, leave reviews, and administrators can manage the entire platform.

The project is built using **Node.js, Express.js, TypeScript, Prisma ORM, PostgreSQL, JWT Authentication, and Stripe Payment Gateway**.

---

# 🚀 Live API

[https://your-live-api.vercel.app](https://fix-it-now-pi.vercel.app/)

---

# 📦 GitHub Repository

[https://github.com/your-username/FixItNow](https://github.com/Rupokhossain/fixitnow-backend)

---

# 🎥 Video Demonstration

https://your-video-link

---

# 📮 Postman Documentation

[https://documenter.getpostman.com/view/xxxxxxxxxxxxxxxx](https://rh-siam999-7842668.postman.co/workspace/siam-ahmed's-Workspace~0d88c24f-29c5-4702-8d96-7041f6307ff4/collection/51987966-6306dcd8-2bfc-48d5-9187-41d4ba0d5aea?action=share&creator=51987966&active-environment=51987966-b4d0e6a2-2f4f-4fe6-943f-b6cb893ed62a)

---

# ✨ Key Features

## 🔐 Authentication & Authorization

- JWT Authentication
- Role Based Authorization
- Customer, Technician & Admin Roles
- Secure Password Hashing using bcrypt

---

## 👨‍🔧 Technician Module

- Create Technician Profile
- Update Technician Profile
- Update Availability
- View All Technicians
- View Single Technician

---

## 📂 Category Module

- Create Category
- Update Category
- Delete Category
- Get All Categories

---

## 🛠️ Service Module

- Create Service
- Update Own Service
- Delete Own Service
- View All Services
- View Service Details

### Supports

- Search
- Filtering
- Pagination
- Sorting

---

## 📅 Booking Module

### Customer

- Book a Service
- View Own Bookings
- View Booking Details

### Technician

- View Assigned Bookings
- Accept Booking
- Decline Booking
- Start Service
- Complete Service

---

## 💳 Stripe Payment Integration

- Stripe Checkout Session
- Secure Payment Gateway
- Webhook Verification
- Automatic Payment Record Creation
- Automatic Booking Status Update

---

## ⭐ Review Module

- Review Only Completed Bookings
- One Review Per Booking
- View All Reviews

---

## 👑 Admin Module

- View All Users
- Block User
- Unblock User
- Delete User
- Dashboard Statistics

---

# 🛠️ Technology Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT
- bcryptjs

## Payment

- Stripe

## Others

- Cookie Parser
- CORS
- dotenv
- Prisma Client

---

# 📁 Project Structure

```
src
│
├── app
│   ├── config
│   ├── lib
│   ├── middleware
│   ├── modules
│   │
│   ├── auth
│   ├── user
│   ├── category
│   ├── technician
│   ├── service
│   ├── booking
│   ├── payment
│   ├── review
│   ├── admin
│   │
│   └── utils
│
├── app.ts
└── server.ts
```

---

# ⚙️ Installation Guide

## Clone Repository

```bash
git clone https://github.com/your-username/FixItNow.git
```

## Go To Project Folder

```bash
cd FixItNow
```

## Install Dependencies

```bash
npm install
```

## Create .env File

```env
PORT=8000

DATABASE_URL=

APP_URL=http://localhost:3000

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

JWT_ACCESS_EXPIRES_IN=1d

JWT_REFRESH_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10

STRIPE_SECRET_KEY=

STRIPE_WEBHOOK_SECRET=
```

## Generate Prisma Client

```bash
npx prisma generate
```

## Run Migration

```bash
npx prisma migrate dev
```

## Start Development Server

```bash
npm run dev
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/refresh-token |

---

## Categories

| Method | Endpoint |
|---------|----------|
| POST | /api/categories |
| GET | /api/categories |
| PATCH | /api/categories/:id |
| DELETE | /api/categories/:id |

---

## Technician

| Method | Endpoint |
|---------|----------|
| POST | /api/technician/profile |
| PATCH | /api/technician/profile |
| PUT | /api/technician/availability |
| GET | /api/technician |
| GET | /api/technician/:id |

---

## Services

| Method | Endpoint |
|---------|----------|
| POST | /api/services |
| GET | /api/services |
| GET | /api/services/:id |
| PATCH | /api/services/:id |
| DELETE | /api/services/:id |

---

## Bookings

| Method | Endpoint |
|---------|----------|
| POST | /api/bookings |
| GET | /api/bookings |
| GET | /api/bookings/:id |
| PATCH | /api/technician/bookings/:id |

---

## Payments

| Method | Endpoint |
|---------|----------|
| POST | /api/payments/create |
| POST | /api/payments/confirm |
| GET | /api/payments |
| GET | /api/payments/:id |

---

## Reviews

| Method | Endpoint |
|---------|----------|
| POST | /api/reviews |
| GET | /api/reviews |

---

## Admin

| Method | Endpoint |
|---------|----------|
| GET | /api/admin/users |
| PATCH | /api/admin/users/:id/block |
| PATCH | /api/admin/users/:id/unblock |
| DELETE | /api/admin/users/:id |

---

# 🔒 Authentication

Protected routes require JWT Access Token.

```
Authorization: Bearer <access_token>
```

---

# 👤 Test Credentials

## 👑 Admin

**Email:** admin@gmail.com

**Password:** 123456

---

## 👨‍🔧 Technician

**Email:** rupok@gmail.com

**Password:** 123456

---

## 👤 Customer

**Email:** siam@gmail.com

**Password:** 123456

---


# 📄 License

This project was developed for learning and educational purposes.

---

# 👨‍💻 Developer

**Siam Ahmed**

GitHub: [https://github.com/your-username](https://github.com/Rupokhossain/)

LinkedIn: [https://linkedin.com/in/your-linkedin](https://www.linkedin.com/in/siam-ahmed-dev/)
