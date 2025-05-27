## REST API

**auth-servcie:**

- `POST /login` -- request with `username`, `password`; resposne with empty body and status code
- `POST /register` -- request with `username`, `password`, `is_admin (optional)`; response with `user{id, username, avatar (first time empty), is_admin}` and status code

**backend:**

- Users:
  - `GET /api/users` - List of users
  - `GET /api/users/{id}` - Get user
  - `POST /api/users` - Create user
  - `PUT /api/users/{id}` - Update user
  - `DELETE /api/users/{id}` - Delete user
- Books:
  - `GET /api/books` - List of all books
  - `GET /api/books/{id}` - Get book
  - `POST /api/books` - Create book
  - `PUT /api/books/{id}` - Update book
  - `DELETE /api/books/{id}` - Delete book
- Reviews:
  - `GET /api/reviews` - List of all reviews
  - `GET /api/reviews/{id}` - Get review
  - `POST /api/reviews` - Create review
  - `PUT /api/reviews/{id}` - Update review
  - `DELETE /api/reviews/{id}` - Delete review
- Places:
  - `GET /api/places` - List all all places
  - `GET /api/places/{id}` - Get place
  - `POST /api/places` - Create palce
  - `PUT /api/places/{id}` - Update place
  - `DELETE /api/places/{id}` - Delete place
- Transfers:
  - `GET /api/transfers` - Get all transfers
  - `GET /api/transfers/{id}` - Get transfer
  - `POST /api/transfers` - Create a new transfer
  - `PATCH /api/transfers/{id}/close` - Close transfer (after handshake)
  - `DELETE /api/transfers/{id}` - Delete transfer

