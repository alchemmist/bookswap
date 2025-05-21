CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOL NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    cover TEXT,
    responsabile TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    stars INTEGER NOT NULL DEFAULT 0,
    reviewer UUID NOT NULL REFERENCES users(id),
    book UUID NOT NULL REFERENCES books(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS places (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    full_address TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS transfers (
    id SERIAL PRIMARY KEY,
    sender UUID NOT NULL REFERENCES users(id),
    receiver UUID REFERENCES users(id),
    is_closed BOOL NOT NULL DEFAULT false,
    place INTEGER NOT NULL REFERENCES places(id),
    book UUID NOT NULL REFERENCES books(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP NOT NULL
);
