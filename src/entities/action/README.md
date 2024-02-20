# Action Module Documentation

The Action module (`src/entities/action`) governs the actions users perform within the Game of Drones Platform, particularly related to tasks in tournaments and training sessions.

## Entity: Action (`action.entity.ts`)

Represents actions that users can perform, linked to specific tasks and tournament times.

### Attributes:

-   **id**: Unique identifier for an action.
-   **description**: Multilingual description of the action.
-   **time**: Timestamp indicating when the action was performed.
-   **userTournamentTime**: Association with `UserTournamentTime` to link the action to a specific tournament time.
-   **task**: Association with `Task` to identify the task this action belongs to.

## User Side Services

(Note: The user side primarily interacts with actions through tasks and does not directly manage actions, so user-specific service/controller methods are not detailed here.)

## Admin Side Services and Controllers

### Service: ActionAdminService (`action.admin.service.ts`)

Manages administrative operations related to actions.

#### Methods:

-   **create(createActionDto, taskInstance)**: Creates a new action linked to a task and user tournament time, including creating the multilingual description.
-   **delete(id)**: Deletes an action and its associated multilingual description.

### Controller: ActionAdminController (`action.admin.controller.ts`)

Handles admin-facing operations for actions. This controller does not expose specific endpoints but is intended for administrative use through service invocations.

(Note: Detailed controller actions for the admin side are managed through the service and might be invoked by other admin controllers or services.)

## Security Considerations

Admin functionalities are protected with `CustomAuthGuard` and `IsAdminGuard` to ensure that only authorized administrators can manage actions.

---

This documentation provides an overview of the Action module's functionality, particularly focusing on administrative tasks such as creating and deleting actions. For complete API usage and examples, refer to the service and controller files in the `src/entities/action` directory.
