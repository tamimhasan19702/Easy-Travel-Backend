<!-- @format -->

# 🌍 Travel Booking API Documentation

Welcome to the API documentation for the Travel Booking platform, powered by **Node.js**, **Express**, and **MongoDB**.

---

## 🔐 Authentication

All non-public routes require authentication using JWT tokens. Ensure the token is included in the `Authorization` header as follows:

---

## 🧑‍💼 User Routes

| Method | Endpoint       | Description         | Access     |
| ------ | -------------- | ------------------- | ---------- |
| POST   | /api/users     | Create new user     | Public     |
| GET    | /api/users     | Get all users       | Admin      |
| GET    | /api/users/:id | Get user by ID      | Admin/User |
| PUT    | /api/users/:id | Update user profile | User       |
| DELETE | /api/users/:id | Delete user         | Admin      |

---

## 📩 Trip Request Routes

| Method | Endpoint               | Description           | Access         |
| ------ | ---------------------- | --------------------- | -------------- |
| POST   | /api/trip-requests     | Create trip request   | Traveler       |
| GET    | /api/trip-requests     | Get all trip requests | Admin          |
| GET    | /api/trip-requests/:id | Get trip by ID        | Traveler/Admin |
| PUT    | /api/trip-requests/:id | Update trip request   | Traveler       |
| DELETE | /api/trip-requests/:id | Delete trip request   | Traveler/Admin |

---

## 💼 Bid Routes

| Method | Endpoint      | Description   | Access |
| ------ | ------------- | ------------- | ------ |
| POST   | /api/bids     | Place a bid   | Agency |
| GET    | /api/bids     | Get all bids  | Admin  |
| GET    | /api/bids/:id | Get bid by ID | Agency |
| DELETE | /api/bids/:id | Delete bid    | Agency |

---

## 💬 Message Routes

| Method | Endpoint               | Description             | Access     |
| ------ | ---------------------- | ----------------------- | ---------- |
| POST   | /api/messages/agency   | Send message (Agency)   | Agency     |
| GET    | /api/messages/agency   | Get messages (Agency)   | Agency     |
| POST   | /api/messages/traveler | Send message (Traveler) | Traveler   |
| GET    | /api/messages/traveler | Get messages (Traveler) | Traveler   |
| PUT    | /api/messages/:id/read | Mark message as read    | User/Admin |
| DELETE | /api/messages/:id      | Delete message          | User/Admin |

---

## 🔔 Notification Routes

| Method | Endpoint                    | Description              | Access     |
| ------ | --------------------------- | ------------------------ | ---------- |
| POST   | /api/notifications          | Create notification      | Admin      |
| GET    | /api/notifications          | Get all notifications    | Admin      |
| GET    | /api/notifications/user     | Get user's notifications | User       |
| PUT    | /api/notifications/:id/read | Mark as read             | User/Admin |
| DELETE | /api/notifications/:id      | Delete notification      | Admin      |

---

## ❗ Dispute Routes

| Method | Endpoint          | Description            | Access   |
| ------ | ----------------- | ---------------------- | -------- |
| POST   | /api/disputes     | Raise a dispute        | Traveler |
| GET    | /api/disputes     | Get all disputes       | Admin    |
| GET    | /api/disputes/:id | Get dispute by ID      | Admin    |
| PUT    | /api/disputes/:id | Resolve/Update Dispute | Admin    |
| DELETE | /api/disputes/:id | Delete dispute         | Admin    |

---

## ⚙️ Admin Settings Routes

| Method | Endpoint                 | Description          | Access |
| ------ | ------------------------ | -------------------- | ------ |
| POST   | /api/admin-settings      | Add setting          | Admin  |
| GET    | /api/admin-settings      | Get all settings     | Admin  |
| GET    | /api/admin-settings/:key | Get specific setting | Admin  |
| PUT    | /api/admin-settings/:key | Update setting       | Admin  |
| DELETE | /api/admin-settings/:key | Delete setting       | Admin  |

---

## 🖼️ Portfolio Routes

| Method | Endpoint            | Description             | Access |
| ------ | ------------------- | ----------------------- | ------ |
| POST   | /api/portfolios     | Add portfolio item      | Agency |
| GET    | /api/portfolios     | Get all portfolio items | Public |
| GET    | /api/portfolios/:id | Get portfolio by ID     | Public |
| PUT    | /api/portfolios/:id | Update portfolio        | Agency |
| DELETE | /api/portfolios/:id | Delete portfolio        | Agency |

---

## 🌟 Review Routes

| Method | Endpoint         | Description      | Access   |
| ------ | ---------------- | ---------------- | -------- |
| POST   | /api/reviews     | Post a review    | Traveler |
| GET    | /api/reviews     | Get all reviews  | Public   |
| GET    | /api/reviews/:id | Get review by ID | Public   |
| DELETE | /api/reviews/:id | Delete review    | Admin    |

---

## 💳 Transaction Routes

| Method | Endpoint              | Description           | Access     |
| ------ | --------------------- | --------------------- | ---------- |
| POST   | /api/transactions     | Create a transaction  | Traveler   |
| GET    | /api/transactions     | Get all transactions  | Admin      |
| GET    | /api/transactions/:id | Get transaction by ID | Admin/User |

---

## 📌 Notes

- All `:id` params should be replaced with actual MongoDB document IDs.
- Routes may return `401 Unauthorized` if the JWT token is missing or invalid.
- Admin-only routes are restricted and require the authenticated user to have admin privileges.

---

# Author

[Tareq Monower](https://github.com/tamimhasan19702)
