<img src="./frontend/public/favicon.ico" alt="Favicon Preview" width="82" height="82" style="margin-bottom: 10px">

![Last commit](https://img.shields.io/github/last-commit/alchemmist/bookswap?style=flat)
![Stars](https://img.shields.io/github/stars/alchemmist/bookswap?style=flat)
![Forks](https://img.shields.io/github/forks/alchemmist/bookswap?style=flat)
![License](https://img.shields.io/github/license/alchemmist/bookswap?style=flat)
![Contrebutors](https://img.shields.io/github/contributors/alchemmist/bookswap?style=flat)
![Neovim](https://img.shields.io/badge/Neovim0.11-default?label=Made%20with)
[![CU](https://img.shields.io/badge/CenralUniversity-white?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMzMyIiBoZWlnaHQ9IjMyMSIgdmlld0JveD0iMCAwIDMzMiAzMjEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BCjxwYXRoIGQ9Ik0zMzEuOTQxIDEzOS41MDRMMjM3LjAyNiAxOTkuOTAyVjMxMi44OTlMMjIzLjM5MyAzMjFMMTQ2LjUxOSAyNzguMzQ2TDE2NC4yODcgMjY3LjA0OUwyMTguNjU3IDI5Ny4xOTNWMjExLjU1N0wxMjkuMDUzIDI2OC42MkwwIDE5Ny40NDlWMTgxLjUyM0w5NC44ODcyIDEyMS4xMjZWOC4xMDEyTDEwOC41MiAwTDIzNi45OTkgNzEuMjUzNVYxNzcuOTk2TDMwOC45MTcgMTMyLjIzTDI1NC40OTMgMTAyLjA4N1Y4MC45NTNMMzMxLjkxMyAxMjMuNTc4TDMzMS45NDEgMTM4LjEyMVYxMzkuNTA0Wk0yMDkuNzYgMTk1LjM1NUwxMDQuNDQxIDEzNi45NjlMMjMuMDIzNiAxODguNzk3TDEwOC41NzUgMjM2LjE5TDEyOC4zOTYgMjQ3LjE1NkwyMDkuNzg2IDE5NS4zNTVIMjA5Ljc2Wk0yMTguNjI5IDgyLjE5MjVMMTEzLjI4NCAyMy43NzkxVjEyMC43MzlMMjE4LjYwMSAxNzkuMTI2VjgyLjE5MjVIMjE4LjYyOVoiIGZpbGw9IiMxNDE0MTQiLz4KPC9zdmc%2BCg%3D%3D&logoSize=auto&label=CU&labelColor=white&color=grey&link=https%3A%2F%2Fcentraluniversity.ru%2F)](https://centraluniversity.ru/)
![Postgres](https://img.shields.io/badge/17.5-default?label=postgres)
![React](https://img.shields.io/badge/19.0-default?label=React)
![Java](https://img.shields.io/badge/17-default?label=Java)
![Gradle](https://img.shields.io/badge/8.14-default?label=gradle)
![Go](https://img.shields.io/badge/1.24-default?label=go)
![Vite](https://img.shields.io/badge/6.3-default?label=vite)

Project architect: [@alchemmist](https://github.com/alchemmist)

**Motivation:** Text transmission is the foundation of civilization.

**About:** It's a course project at first course of bachelor in [Central University](https://centraluniversity.ru). This is applicatoin for a free paper book exchange. Admins can add a specific places, at any cities, and the users will say: "Hey! I can give this book in this place". Other user, who want read the book, click to "✓" and making handshake.


## System design

In this application we have three main service: [`backend`](./backend) (writen on Java), `frontend` (writen on JavaSctipt), `auth-service` (writen on Go):

```
bookswap
├── auth-service
├── backend
└── frontend
```

Auth-service is service for authentication with to basic routes. Using [`crypto`](https://github.com/golang/crypto) for hashing password. Backend is service with main bussines logic. Frontend it's basic React app.

For more information you can check [`docs`](./docs) folder. For example, where you can read [API doc](./docs/api.md) or see database [schema](./docs/database.md).

## Demo

<p align="center">
    <img src="./images/demo.gif" alt="Demo GIF" width="750">
</p>

## Questions

If you have a questions about this repo you can write to actual project architect.

## Contributors

- [@alchemmist](https://github.com/alchemmist) as Anton Grishin
