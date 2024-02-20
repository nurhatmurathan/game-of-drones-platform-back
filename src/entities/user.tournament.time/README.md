# UserTournamentTime Module Documentation

The UserTournamentTime module (`src/entities/user.tournament.time`) manages the association between users and tournament times, tracking user registrations and their participation in tournaments and training sessions within the Game of Drones Platform.

## Entity: UserTournamentTime (`user.tournament.time.entity.ts`)

Represents the link between users and specific tournament times or training sessions.

### Attributes:

-   **id**: Unique identifier for the UserTournamentTime.
-   **place**: The place or position of the user in the tournament time.
-   **tournamentTime**: Association with `TournamentTime` entity.
-   **user**: Association with `User` entity.
-   **actions**: Collection of `Action` entities representing actions taken by the user during the tournament time.
-   **trainings**: Collection of `Training` entities the user is associated with for this tournament time.

## User Side Services and Controllers

### Service: UserTournamentTimeService (`user.tournament.time.service.ts`)

Manages operations related to users' tournament times.

#### Methods:

-   **registerUserToTournamentTime(userId, tournamentTimeId)**: Registers a user to a specific tournament time.
-   **countReservedPlaces(tournamentTimeId)**: Counts the number of places reserved for a tournament time.
-   **findOne(userId, tournamentTimeId)**: Finds a specific UserTournamentTime instance.
-   **userFutureTournamentTimes(language, userId)**: Retrieves future tournament times for a user.
-   **userPastedTournamentTimes(language, userId)**: Retrieves past tournament times for a user.
-   **addTraining(userId, tournamentTimeId, trainingId)**: Adds a training session to a user's tournament time.
-   **getInstance(id)**: Retrieves a UserTournamentTime instance by ID.
-   **getListOfUserTournamentTimesIdsOfGivenUser(userId)**: Lists IDs of tournament times for a given user.
-   **isSelectedTournamentTime(userId, tournamentTimeId)**: Checks if a tournament time is selected by a user.

### Controller: UserTournamentTimeController (`user.tournament.time.controller.ts`)

Handles HTTP endpoints for user interactions with tournament times.

#### Endpoints:

-   **GET /user-tournament-time/tournaments/future**: Lists future tournament times for the user.
-   **GET /user-tournament-time/tournaments/pasted**: Lists past tournament times for the user.
-   **POST /user-tournament-time/v1/:tournamentTimeId/add-training**: Adds a training session to the user's tournament time.

## Admin Side Services and Controllers

### Service: UserTournamentTimeAdminService (`user.tournament.time.admin.service.ts`)

Provides administrative functionalities for managing users' tournament times.

#### Methods:

-   **create(userId, tournamentTimeId)**: Creates a new UserTournamentTime instance.
-   **createTournamentTimeUsers(tournamentTimeId, users)**: Associates multiple users with a tournament time.
-   **removeBatch(userTournamentTimes)**: Removes a batch of UserTournamentTime instances.
-   **removeTournamentTimeUsers(tournamentTimeId, usersIds)**: Disassociates users from a tournament time.
-   **tournamentTimeUsers(tournamentTimeId)**: Retrieves all UserTournamentTime instances for a tournament time.
-   **updateTournamentTimeUsers(tournamentTimeId, users)**: Updates the users associated with a tournament time.

### Controller: UserTournamentTimeAdminController (`user.tournament.time.admin.controller.ts`)

Handles admin-facing operations for managing users' tournament times. (Note: The controller's administrative endpoints are intended for internal use and are managed through service invocations, detailed documentation for specific endpoints is not provided here.)

## Security Considerations

Admin endpoints are protected with `CustomAuthGuard` and `IsAdminGuard` to ensure that only authorized administrators can manage users' tournament times.

---

For complete API usage and examples, refer to the service and controller files in the `src/entities/user.tournament.time` directory.
