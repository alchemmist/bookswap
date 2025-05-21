# Курсовой проект

В этом репозитории вам нужно его реализовать

## Ссылка на ТЗ:

https://git.culab.ru/bsc-development-basics-2nd-semester/dev-basics-2025-longreads/-/tree/main/course-project?ref_type=heads

# Database

```mermaid
erDiagram
    USERS {
        UUID id PK
        TEXT username
        TEXT password
        BOOL is_admin
        TIMESTAMP created_at
    }
    BOOKS {
        UUID id PK
        TEXT title
        TEXT author
        TEXT cover
        UUID responsable FK
        TIMESTAMP created_at
    }
    REVIEWS {
        INT id PK
        TEXT content
        INT stars
        UUID reviewer FK
        UUID book FK
        TIMESTAMP created_at
    }
    PLACES {
        INT id PK
        TEXT title
        TEXT full_address
    }
    TRANSFERS {
        INT id PK
        UUID sender FK
        UUID receiver FK
        BOOL closed
        INT place FK
        UUID book FK
        TIMESTAMP created_at
        TIMESTAMP closed_at
    }

    USERS ||--o{ BOOKS     : "responsible for"
    USERS ||--o{ REVIEWS   : "writes"
    BOOKS ||--o{ REVIEWS   : "has"
    USERS ||--o{ TRANSFERS : "sends"
    USERS ||--o{ TRANSFERS : "receives"
    BOOKS ||--o{ TRANSFERS : "transferred in"
    PLACES ||--o{ TRANSFERS: "at"
```

