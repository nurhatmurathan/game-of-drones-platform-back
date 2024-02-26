# UserTournamentTrainings Module Documentation

The UserTournamentTrainings module (`src/entities/user.tournament.trainings`) facilitates the management of user registrations for training sessions within tournaments, allowing users to enhance their skills and administrators to oversee participation.

## Entity: UserTournamentTrainings (`user.tournament.trainings.entity.ts`)

Represents the association between users, tournaments, and training sessions.

### Attributes:

-   **id**: Unique identifier for the user's training registration.
-   **user**: Association with `User` entity representing the registered user.
-   **tournament**: Association with `Tournament` entity indicating the relevant tournament.
-   **training**: Association with `Training` entity for the specific training session.

## User Side Services and Controllers

(Note: Specific user side service methods and controller endpoints for managing training registrations directly through this entity were not detailed in the provided files, indicating that interactions are likely handled through overarching tournament or training modules.)

## Admin Side Services and Controllers

### Service: UserTournamentTrainingsAdminService (`user.tournament.trainings.admin.service.ts`)

Provides administrative functionalities for managing users' training registrations within tournaments.

#### Methods:

-   **getTournamentUsers(tournamentId)**: Retrieves all user registrations for training sessions within a specific tournament.

### Controller: UserTournamentTrainingsAdminController (`user.tournament.trainings.admin.controller.ts`)

Manages admin-facing HTTP endpoints for overseeing training registrations.

#### Endpoints:

-   **GET /user-tournament-admin/users/:tournamentId**: Lists all users registered for training sessions within a specified tournament. Returns a simplified user DTO including `id`, `email`, `firstName`, and `lastName`.

## Security Considerations

Admin functionalities are secured with `CustomAuthGuard` and `IsAdminGuard`, ensuring that only authorized administrators can access and manage user training registrations.

---

This documentation provides an overview of the UserTournamentTrainings module's entity structure, administrative service methods, and controller endpoints. For complete API usage and examples, refer to the respective service and controller files in the `src/entities/user.tournament.trainings` directory.
