# Tournament Module Documentation

The Tournament module (`src/entities/tournament`) is at the core of the Game of Drones Platform, managing all aspects of tournaments from creation, registration, to administration.

## Entity: Tournament (`tournament.entity.ts`)

The `Tournament` entity represents the tournament data within the system.

### Attributes:

-   **id**: Unique identifier for the tournament.
-   **name**: Name of the tournament.
-   **startDate**: Timestamp indicating when the tournament starts.
-   **price**: Entry fee for the tournament.
-   **maxPLacesInGame**: Maximum number of places available in a single game.
-   **route**: Association with the `Route` entity representing the tournament's route.
-   **coverDescription**: One-to-one relation with `MultilingualText` for the cover description in multiple languages.
-   **description**: One-to-one relation with `MultilingualText` for the detailed description in multiple languages.
-   **tournamentTimes**: Collection of `TournamentTime` entities representing different times for the tournament events.
-   **userTournamentTrainings**: Association with the `UserTournamentTrainings` entity for managing user trainings within the tournament.

## User Side Services and Controllers

### Service: TournamentService (`tournament.service.ts`)

Provides methods for retrieving tournament details and registering users to tournaments.

#### Key Methods:

-   **findOneById(id, relations)**: Retrieves a single tournament by ID with optional relations.
-   **findOne(id, language, userId)**: Retrieves detailed information of a tournament for a specific user in a given language.
-   **findAll(language)**: Retrieves a list of all tournaments in a specified language.
-   **registerUserToTournament(userId, tournamentId)**: Registers a user to a tournament and creates a tournament time if needed.

### Controller: TournamentController (`tournament.controller.ts`)

Handles user-facing HTTP requests related to tournament operations.

#### Endpoints:

-   **GET /tournament**: Retrieves all tournaments.
-   **GET /tournament/:id**: Retrieves a specific tournament.
-   **POST /tournament/v1/select**: Registers a user to a tournament.

## Admin Side Services and Controllers

### Service: TournamentAdminService (`tournament.admin.service.ts`)

Extends the user service with administrative capabilities for managing tournaments.

#### Key Methods:

-   **findAll()**: Retrieves a list of all tournaments with related entities for administrative purposes.
-   **findOne(id)**: Retrieves detailed information of a tournament for administration.
-   **create(createData)**: Creates a new tournament with the given data.
-   **update(id, updateData)**: Updates a tournament with the given data.
-   **delete(id)**: Deletes a tournament and associated multilingual text records.

### Controller: TournamentAdminController (`tournament.admin.controller.ts`)

Handles admin-facing HTTP requests for tournament management.

#### Endpoints:

-   **GET /admin-tournament**: Retrieves all tournaments for admin.
-   **GET /admin-tournament/:id**: Retrieves specific tournament details for admin.
-   **POST /admin-tournament**: Creates a new tournament.
-   **PUT /admin-tournament/:id**: Updates an existing tournament.
-   **DELETE /admin-tournament/:id**: Deletes a tournament.

## Security Considerations

Both admin and user controllers are protected with guards to ensure proper authorization. The admin controller uses an additional `IsAdminGuard` to ensure only admins can access the endpoints.

---

This documentation provides an overview of the Tournament module's functionality, both for users and administrators. For complete API usage and examples, refer to the corresponding service and controller files in the `src/entities/tournament` directory.
