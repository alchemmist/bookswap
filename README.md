# Bookswap

[![Java](https://img.shields.io/badge/Java-%23ED8B00.svg?logo=openjdk&logoColor=white)](#)
![Gradle](https://img.shields.io/badge/Gradle-black?logo=gradle&logoColor=%2302303A&logoSize=auto&label=Build%20system&labelColor=grey&color=%2302303A)
[![Go](https://img.shields.io/badge/Go-%2300ADD8.svg?&logo=go&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#)

[![CU](https://img.shields.io/badge/CenralUniversity-white?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMzMyIiBoZWlnaHQ9IjMyMSIgdmlld0JveD0iMCAwIDMzMiAzMjEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BCjxwYXRoIGQ9Ik0zMzEuOTQxIDEzOS41MDRMMjM3LjAyNiAxOTkuOTAyVjMxMi44OTlMMjIzLjM5MyAzMjFMMTQ2LjUxOSAyNzguMzQ2TDE2NC4yODcgMjY3LjA0OUwyMTguNjU3IDI5Ny4xOTNWMjExLjU1N0wxMjkuMDUzIDI2OC42MkwwIDE5Ny40NDlWMTgxLjUyM0w5NC44ODcyIDEyMS4xMjZWOC4xMDEyTDEwOC41MiAwTDIzNi45OTkgNzEuMjUzNVYxNzcuOTk2TDMwOC45MTcgMTMyLjIzTDI1NC40OTMgMTAyLjA4N1Y4MC45NTNMMzMxLjkxMyAxMjMuNTc4TDMzMS45NDEgMTM4LjEyMVYxMzkuNTA0Wk0yMDkuNzYgMTk1LjM1NUwxMDQuNDQxIDEzNi45NjlMMjMuMDIzNiAxODguNzk3TDEwOC41NzUgMjM2LjE5TDEyOC4zOTYgMjQ3LjE1NkwyMDkuNzg2IDE5NS4zNTVIMjA5Ljc2Wk0yMTguNjI5IDgyLjE5MjVMMTEzLjI4NCAyMy43NzkxVjEyMC43MzlMMjE4LjYwMSAxNzkuMTI2VjgyLjE5MjVIMjE4LjYyOVoiIGZpbGw9IiMxNDE0MTQiLz4KPC9zdmc%2BCg%3D%3D&logoSize=auto&label=CU&labelColor=white&color=grey&link=https%3A%2F%2Fcentraluniversity.ru%2F)](https://centraluniversity.ru/)
[![Neovim](https://img.shields.io/badge/Neovim-57A143?logo=neovim&logoColor=fff)](#)
![Build Status](https://img.shields.io/github/actions/workflow/status/alchemmist/bookswap/ci.yml?branch=main)




It's a course project at first course of bachelor in [Central University]()

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
