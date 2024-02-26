# Common Module Documentation

The Common module (`src/common`) includes validators and filters that are utilized across the Game of Drones Platform to ensure data integrity and handle exceptions gracefully.

## Validators

Validators are implemented to ensure the correctness and validity of data being processed by the application.

### Key Validators:

-   **IsDroneAlreadyExist**: Validates whether a drone exists in the database to prevent duplicate entries.
-   **IsEmailAlreadyExist**: Checks if an email is already registered in the system to avoid duplicate user accounts.
-   **IsTournamentAvailable**: Determines if a tournament is available for registration based on its start time.
-   **IsValidCode**: Confirms that a provided code for operations like password reset or email verification is valid and not expired.
-   **IsValidToken**: Validates the integrity and the expiry of authentication tokens.

## Filters

Filters are used to catch and handle exceptions throughout the application, providing a centralized error handling mechanism.

### AllExceptionsFilter (`all-exception.filter.ts`)

Catches all exceptions that are not explicitly handled by other filters and formats them for a consistent error response structure.

#### Features:

-   Catches every exception thrown in the application.
-   Formats error responses to include useful information such as status code, error message, request path, method, and timestamp.
-   Logs detailed error information to a file for debugging purposes.

### HTTP Response Interface (`error-formats/http-response.interface.ts`)

Defines the structure of HTTP error responses, ensuring consistency across different types of errors.

#### Interfaces:

-   **HttpExceptionResponse**: Basic structure for HTTP exceptions, including status code and error message.
-   **CustomHttpExceptionResponse**: Extends `HttpExceptionResponse` to include additional details like request path, method, and timestamp for a more detailed error context.

## Implementation Details

-   Validators use the `class-validator` package to define custom validation logic that can be reused across various parts of the application.
-   The `AllExceptionsFilter` is globally registered in the main application module to ensure that all unhandled exceptions are caught and processed.
-   Error logging within `AllExceptionsFilter` provides a durable record of exceptions for post-mortem analysis.
