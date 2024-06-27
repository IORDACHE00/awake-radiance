# Awake Radiance

Clay's full stack dev assignment by Iulian Iordache

## Overview

This is a full stack application consisting of a frontend and a backend. The frontend is built with [Vite](https://vitejs.dev/), and the backend is built with [HonoJs](https://hono.dev/). For the database, I chose [Supabase](https://supabase.com/), a managed PostgreSQL service. The authentication and route authorization is done by using [JWT](https://jwt.io/) although here I could've done way way more such as, implementing a refresh token, properly checking if the user that's making the request is authorized to query, view, update or delete the resource by matching the owner of the resource with the ID of the user that's trying to access it, but for this simple demo I think the current system is enough.

## Note to Reviewers

I would like to provide some context regarding the technology choices made for this assignment. While the initial requirement stated that the backend should ideally be built with Python and Django, I opted to use Hono.js for the following reasons:

1. **Time Constraints**: Given the limited time frame and my current familiarity with Hono.js, I was able to implement the backend more swiftly and ensure the overall functionality of the application.
2. **Focus on Full Stack Implementation**: My primary goal was to deliver a complete and functional full stack application within 2 days. By leveraging Hono.js, I could focus on ensuring seamless integration between the frontend and backend.

### Commitment to Django

I have a solid foundation in Python and Django, and I am confident in my ability to quickly transition the backend to Django if required.

Given the opportunity, I am prepared to:

- Refactor the backend using Django to meet the original requirements.

I appreciate your understanding and consideration. I am enthusiastic about the possibility of contributing to your team.

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Building the Project

To build the project, run the following command from the root of the project directory:

```sh
docker-compose build
```

## Running the project

After building the project, you can run the application with:

```sh
docker-compose up -d
```

This will start both the frontend and backend services.

## Accessing the application

- **Frontend:** The frontend application will be available at [http://localhost:3000/api/v1](http://localhost:3000/api/v1)
- **Backend** The backend application will be available at [http://localhost:4173/login](http://localhost:4173/login)

---

- **Authentication**: You will have to create a new account in order to access the dashboard. Please choose a username, email and password for your account, they will be stored on `Supabase` and are used to identify your own notes. The password is encrypted using bcrypt with a salt factor of 14.

## Configuration

### Environment

The following environment variables are used in this project:

- `VITE_API_BASE_URL`: Base URL for the API used in the frontend.
- `VITE_API_KEY`: API key used in the frontend.
- `SUPABASE_URL`: Database connection string.
- `SUPABASE_KEY`: Database connection authorization token.
- `JWT_SECRET`: The key used for signing the tokens for route authentication and authorization.

## Stopping the project

To stop the running containers, use:

```sh
docker-compose down
```

## Cleaning Up

If you need to remove all images built by Docker Compose, you can use:

```sh
docker-compose down --rmi all
```

This will stop and remove the containers, networks, volumes, and images created by `docker-compose up`.
