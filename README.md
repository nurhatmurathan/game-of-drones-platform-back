# Game of Drones Api

Platform for organizing tournaments for real cars

## Overview

### User side

-   Registration, Jwt Auth, 2oAuth(Google, Facebook)
-   The user can register for the tournament only by paying a fee
-   Considered training before the start of the tournament

### Admin side

-   Crud operations
-   Indicate the winner of the race or tournament

## Table of Contents

-   [Getting Started](##running-the-app)

## Getting Started

Copy this repository

### Prerequisites

You should get file `.env` from admin

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Project structure

```
/src
├───auth
│
├───common
│
├───database
│
├─────────entities
│              ├───action
│              │
│              ├───billing.account
│              │
│              ├───dron
│              │
│              ├───item
│              │
│              ├───liga
│              │
│              ├───multilingualtext
│              │
│              ├───payment
│              │
│              ├───register.token
│              │
│              ├───route
│              │
│              ├───task
│              │
│              ├───tournament
│              │
│              ├───tournament.time
│              │
│              ├───training
│              │
│              ├───user
│              │
│              ├───user.passwordreset.token
│              │
│              ├───user.tournament.time
│              │
│              └───user.tournament.trainings
├───mail
│
└───utils
```

## Module Reference

### [Auth](src/auth)

> Handles user authentication and authorization, including JWT token management, OAuth with providers like Facebook and Google, and guards for route protection.

### [Common](src/common)

> Contains shared utilities, enums, filters, and validations that can be used across different parts of the application.

### [Database](src/database)

> Configures the database connection and includes any database migrations or seed scripts necessary for setting up initial data.

### [Entities](src/entities)

> Defines the applications entities (models) and repositories, organized by feature (e.g., drones, tournaments). This is where the core business logic resides.
>
> -   ### [user](src/entities/user)
> -   ### [mutilingualtext](src/entities/multilingualtext)
> -   ### [route](src/entities/route)
> -   ### [tournament](src/entities/tournament)
> -   ### [training](src/entities/training)
> -   ### [user.tournament.trainings](src/entities/user.tournament.trainings)
> -   ### [tournament.time](src/entities/tournament.time)
> -   ### [user.tournament.time](src/entities/user.tournament.time)
> -   ### [task](src/entities/task)
> -   ### [action](src/entities/action)
> -   ### [payment](src/entities/payment)
> -   ### [register.token](src/entities/register.token)
> -   ### [user.passwordreset.token](src/entities/user.passwordreset.token)

### [Mail](src/mail)

> Manages email sending functionalities, including templates for confirmation emails, password resets, and other notifications.

### [Utils](src/utils)

> Provides utility functions and services that are not specific to any domain logic but are used throughout the application.

## Deployment

Instructions on how to deploy the project to a production environment.

## Built With

List of technologies used in the project.

## Support

Information about how to get support for the project, including links to documentation, FAQs, and community forums.
