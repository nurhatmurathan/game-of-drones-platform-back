# TournamentTime Module Documentation

The TournamentTime module (`src/entities/tournament.time`) is responsible for scheduling and managing the time slots for tournaments within the Game of Drones Platform.

## Entity: TournamentTime (`tournament.time.entity.ts`)

Represents a specific time slot within a tournament.

### Attributes:

-   **id**: Unique identifier for the tournament time.
-   **startTime**: Timestamp indicating when the tournament time slot starts.
-   **places**: Number of available places for this tournament time.
-   **reserved**: Number of reserved places.
-   **stage**: Tournament stage number.
-   **tournament**: Relation to the `Tournament` entity.
-   **userTournamentTimes**: Relation to `UserTournamentTime` entities for tracking user registrations.

## User Side Services and Controllers

### Service: TournamentTimeService (`tournament.time.service.ts`)

Manages user interactions with tournament times.

#### Methods:

-   **findOne(id)**: Retrieves a specific tournament time.
-   **isTheUserRegisteredForTheTournament(tournamentId, userId)**: Checks if the user is registered for any time slots in the tournament.
-   **create(startTime, tournament)**: Creates a new tournament time.
-   **getOrCreateTournamentTime(userId, tournamentInstance)**: Retrieves or creates a new tournament time for user registration.
-   **registerUserToTournamentTime(userId, id, tournamentId)**: Registers a user to a tournament time.
-   **getUserTournamentTimes(userId, tournamentId)**: Retrieves tournament times a user is registered for.
-   **assignUserToDron(userId)**: Assigns a user to a drone for the tournament.
-   **tournamentStartedAndExistsValidator(id, userId)**: Validates if a tournament time has started and if the user is registered.
-   **findAllByTournamentId(tournamentId, userId)**: Retrieves all tournament times for a specific tournament.

### Controller: TournamentTimeController (`tournament.time.controller.ts`)

Handles HTTP endpoints for tournament time operations.

#### Endpoints:

-   **POST /tournament-time/register**: Registers a user to a tournament time.
-   **GET /tournament-time/start-game**: Assigns a user to a drone and starts the game.
-   **POST /tournament-time/validate-tournament**: Validates if a tournament time has started.

## Admin Side Services and Controllers

### Service: TournamentTimeAdminService (`tournament.time.admin.service.ts`)

Provides administrative capabilities for managing tournament times.

#### Methods:

-   **create(tournamentTimeData)**: Creates a new tournament time.
-   **findAllByTournamentId(tournamentId)**: Retrieves all tournament times for a tournament.
-   **findOne(id, relations)**: Retrieves a specific tournament time with optional relations.
-   **save(instance)**: Saves a tournament time instance.
-   **delete(id)**: Deletes a tournament time.

### Controller: TournamentTimeAdminController (`tournament.time.admin.controller.ts`)

Manages admin-facing endpoints for tournament time management.

#### Endpoints:

-   **GET /admin-tournament-time/:id**: Retrieves a specific tournament time for admin.
-   **PUT /admin-tournament-time/:id**: Updates a tournament time.

## Security Considerations

Admin endpoints are protected with `CustomAuthGuard` and `IsAdminGuard` to ensure only authorized admins can access and modify tournament times.

---

For complete API usage and examples, refer to the service and controller files in the `src/entities/tournament.time` directory.
