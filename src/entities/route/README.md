# Route Module Documentation

The Route module (`src/entities/route`) handles the creation and management of routes within the Game of Drones Platform. Routes are essential components that define the path of drone flights in various tournaments and training sessions.

## Entity: Route (`route.entity.ts`)

The `Route` entity represents the blueprint of a flight path that drones follow during tournaments and trainings.

### Attributes:

-   **id**: Unique identifier for the route.
-   **name**: Name of the route.
-   **description**: Multilingual description of the route.
-   **length**: Length of the route.
-   **bestTime**: The record time for the route.
-   **map**: A string containing map data.
-   **tournaments**: A collection of `Tournament` entities that use this route.
-   **trainings**: A collection of `Training` entities that use this route.

## User Side Services and Controllers

### Service: RouteService (`route.service.ts`)

Handles the retrieval of route information for the user side.

#### Methods:

-   **findAll()**: Retrieves a list of all routes without detailed descriptions.
-   **findOne(id, language)**: Retrieves detailed information of a specific route including multilingual descriptions.

### Controller: RouteController (`route.controller.ts`)

Manages the user-facing HTTP endpoints for route operations.

#### Endpoints:

-   **GET /route**: Lists all available routes.
-   **GET /route/:id**: Provides detailed information for a specific route.

## Admin Side Services and Controllers

### Service: RouteAdminService (`route.admin.service.ts`)

Extends the `RouteService` with additional functionalities for administrative purposes.

#### Methods:

-   **findAll()**: Retrieves all routes including all details for admin use.
-   **findOne(id)**: Retrieves a single route with full details for admin purposes.
-   **create(createData)**: Creates a new route including multilingual descriptions.
-   **update(id, updateData)**: Updates an existing route and its multilingual descriptions.
-   **delete(id)**: Deletes a route and its associated multilingual text.

### Controller: RouteAdminController (`route.admin.controller.ts`)

Handles the admin-facing HTTP requests for route management.

#### Endpoints:

-   **GET /admin-route**: Retrieves a list of all routes for admin purposes.
-   **GET /admin-route/:id**: Retrieves detailed information of a route for admin editing.
-   **POST /admin-route**: Creates a new route.
-   **PUT /admin-route/:id**: Updates an existing route.
-   **DELETE /admin-route/:id**: Deletes a route.

## Security Considerations

All admin endpoints are secured with `CustomAuthGuard` and `IsAdminGuard` to ensure that only authorized admins can perform operations.

---

For complete API usage and examples, please refer to the individual service and controller files in the `src/entities/route` directory.
