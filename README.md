<img src="./images/logo.png" alt="Favicon Preview" width="82" height="82" style="margin-bottom: 10px">

![Last commit](https://img.shields.io/github/last-commit/alchemmist/bookswap?style=flat)
![Stars](https://img.shields.io/github/stars/alchemmist/bookswap?style=flat)
![Forks](https://img.shields.io/github/forks/alchemmist/bookswap?style=flat)
![License](https://img.shields.io/github/license/alchemmist/bookswap?style=flat)
![Contributors](https://img.shields.io/github/contributors/alchemmist/bookswap?style=flat)
![Neovim](https://img.shields.io/badge/Neovim0.11-default?label=Made%20with)
[![CU](https://img.shields.io/badge/Central%20University-white?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMzMyIiBoZWlnaHQ9IjMyMSIgdmlld0JveD0iMCAwIDMzMiAzMjEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BCjxwYXRoIGQ9Ik0zMzEuOTQxIDEzOS41MDRMMjM3LjAyNiAxOTkuOTAyVjMxMi44OTlMMjIzLjM5MyAzMjFMMTQ2LjUxOSAyNzguMzQ2TDE2NC4yODcgMjY3LjA0OUwyMTguNjU3IDI5Ny4xOTNWMjExLjU1N0wxMjkuMDUzIDI2OC42MkwwIDE5Ny40NDlWMTgxLjUyM0w5NC44ODcyIDEyMS4xMjZWOC4xMDEyTDEwOC41MiAwTDIzNi45OTkgNzEuMjUzNVYxNzcuOTk2TDMwOC45MTcgMTMyLjIzTDI1NC40OTMgMTAyLjA4N1Y4MC45NTNMMzMxLjkxMyAxMjMuNTc4TDMzMS45NDEgMTM4LjEyMVYxMzkuNTA0Wk0yMDkuNzYgMTk1LjM1NUwxMDQuNDQxIDEzNi45NjlMMjMuMDIzNiAxODguNzk3TDEwOC41NzUgMjM2LjE5TDEyOC4zOTYgMjQ3LjE1NkwyMDkuNzg2IDE5NS4zNTVIMjA5Ljc2Wk0yMTguNjI5IDgyLjE5MjVMMTEzLjI4NCAyMy43NzkxVjEyMC43MzlMMjE4LjYwMSAxNzkuMTI2VjgyLjE5MjVIMjE4LjYyOVoiIGZpbGw9IiMxNDE0MTQiLz4KPC9zdmc%2BCg%3D%3D&logoSize=auto&label=CU&labelColor=white&color=grey&link=https%3A%2F%2Fcentraluniversity.ru%2F)](https://centraluniversity.ru/)
![Postgres](https://img.shields.io/badge/17.5-default?label=postgres)
![React](https://img.shields.io/badge/19.0-default?label=React)
![Java](https://img.shields.io/badge/17-default?label=Java)
![Gradle](https://img.shields.io/badge/8.14-default?label=gradle)
![Go](https://img.shields.io/badge/1.24-default?label=go)
![Vite](https://img.shields.io/badge/6.3-default?label=vite)

Project architect: [@alchemmist](https://github.com/alchemmist)

**Motivation:** Text transmission is the foundation of civilization.

**About:** It's a course project in the first year of the bachelor’s course in [Central University](https://centraluniversity.ru). This is application for a free paper book exchange. Admins can add specific places, in any cities, and the users can say: "Hey! I can give this book in this place". Other users who want to read the book click “✓” and make a handshake.


## System design

In this application we have three main services: [`backend`](./backend) (written on Java), `frontend` (written on JavaScript), `auth-service` (written on Go):

```
bookswap
├── auth-service
├── backend
└── frontend
```

Auth-service is a service for authentication with two basic routes. Using [`crypto`](https://github.com/golang/crypto) for hashing passwords. Backend is a service with main bussines logic. The frontend is a basic React app.

For more information you can check the [`docs`](./docs) folder. For example, where you can read the [API doc](./docs/api.md) or see the database [schema](./docs/database.md).

## Demo

<p align="center">
    <img src="./images/demo.gif" alt="Demo GIF" width="750">
</p>

## How to run it
If you want to run the app locally, clone this repo and rename `.env.example` to `.env`. Then use Docker:
```sh
docker compose up --build
```

## Questions | Contribute

If you have questions about this repo or you want to contribute, write to actual project architect (check it in a first line of this `README`).

## Contributors

- [@alchemmist](https://github.com/alchemmist) as Anton Grishin
