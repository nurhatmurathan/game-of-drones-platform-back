# Task Module Documentation

The Task module (`src/entities/task`) manages the tasks within the Game of Drones Platform, which are sets of actions or objectives that users must complete.

## Entity: Task (`task.entity.ts`)

Represents the task details in the system.

### Attributes:

-   **id**: Unique identifier for the task.
-   **maxCount**: Maximum number of times the task can be performed.
-   **name**: Name of the task.
-   **inOneGame**: Boolean indicating if the task is to be completed within a single game.
-   **description**: Multilingual description of the task.
-   **taskDescription**: Detailed multilingual description of the task.
-   **reward**: Reward given upon task completion.
-   **actions**: Related actions that make up the task.

## User Side Services and Controllers

### Service: TaskService (`task.service.ts`)

Manages operations related to tasks for users.

#### Methods:

-   **findAll(language)**: Retrieves all tasks with their descriptions in the specified language.
-   **findOne(id, userId, language)**: Retrieves detailed information about a specific task, including completion status for the given user.
-   **getInstance(id)**: Retrieves a task instance by ID.

### Controller: TaskController (`task.controller.ts`)

Handles HTTP endpoints for user interactions with tasks.

#### Endpoints:

-   **GET /task**: Lists all available tasks.
-   **GET /task/:id**: Provides detailed information for a specific task.

## Admin Side Services and Controllers

### Service: TaskAdminService (`task.admin.service.ts`)

Provides administrative capabilities for managing tasks.

#### Methods:

-   **findAll()**: Retrieves all tasks for admin purposes.
-   **findOne(id)**: Retrieves detailed information about a task for admin editing.
-   **create(createData)**: Creates a new task with the given data.
-   **update(id, updateData)**: Updates an existing task.
-   **delete(id)**: Deletes a task and its related multilingual text records.
-   **createActionDuringTheTournament(createData)**: Creates a new action for the task during a tournament.

### Controller: TaskAdminController (`task.admin.controller.ts`)

Manages admin-facing HTTP endpoints for task management.

#### Endpoints:

-   **GET /admin-task**: Retrieves all tasks.
-   **GET /admin-task/:id**: Retrieves detailed information of a task.
-   **POST /admin-task**: Creates a new task.
-   **PUT /admin-task/:id**: Updates an existing task.
-   **DELETE /admin-task/:id**: Deletes a task.
-   **POST /admin-task/create-action**: Creates a new action for a task.

## Security Considerations

Admin endpoints are protected with `CustomAuthGuard` and `IsAdminGuard` to ensure only authorized admins can access and modify task information.

---

For complete API usage and examples, refer to the service and controller files in the `src/entities/task` directory.
