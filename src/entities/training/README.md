# Training Module Documentation

The Training module (`src/entities/training`) manages training sessions that are crucial for users' preparation for tournaments within the Game of Drones Platform.

## Entity: Training (`training.entity.ts`)

Represents the training session details in the system.

### Attributes:

-   **id**: Unique identifier for a training session.
-   **startTime**: Timestamp indicating when the training session starts.
-   **places**: The total number of places available in the training session.
-   **route**: Association with the `Route` entity representing the training session's course.
-   **userTournamentTimes**: Connection to `UserTournamentTime` entities to track users' training sessions.
-   **userTournamentTrainings**: Relationship to `UserTournamentTrainings` entities for managing user training within the tournament context.

## User Side Services and Controllers

### Service: TrainingService (`training.service.ts`)

Provides methods for users to interact with training sessions.

#### Methods:

-   **addTraining(userId, tournamentId, trainingId)**: Registers a user for a specific training session within a tournament.
-   **getAvailableTrainings(tournamentInstance)**: Retrieves available training sessions for a given tournament.
-   **retrieveTraining(instance, tournamentInstance)**: Fetches details of a single training session.
-   **userTrainings(userId)**: Finds all training sessions for a specific user.
-   **trainingStartedAndExistsValidator(userId, trainingId, tournamentId)**: Validates whether a training session has started and if a user is registered for it.

### Controller: TrainingController (`training.controller.ts`)

Manages HTTP endpoints for user interactions with training sessions.

#### Endpoints:

-   **POST /training/:tournamentId/add-training/:trainingId**: Registers a user for a training session.
-   **POST /training/validate-training**: Validates if a training session has started and if a user is registered for it.

## Admin Side Services and Controllers

### Service: TrainingAdminService (`training.admin.service.ts`)

Handles administrative tasks related to training sessions.

#### Methods:

-   **create(createDataSet)**: Creates multiple training sessions based on the provided data set.
-   **findAll(relations)**: Retrieves all training sessions along with specified relations.
-   **delete(id)**: Deletes a training session by ID.

### Controller: TrainingAdminController (`training.admin.controller.ts`)

Manages admin-facing HTTP endpoints for training session management.

#### Endpoints:

-   **POST /admin-training**: Creates new training sessions.
-   **GET /admin-training**: Lists all training sessions with reserved places count.

## Security Considerations

Admin endpoints use `CustomAuthGuard` and `IsAdminGuard` to ensure administrative access is properly secured and restricted to authorized users.

---

For complete API usage and examples, please refer to the individual service and controller files in the `src/entities/training` directory.
