# Authentication Module Documentation

The Authentication module (`src/auth`) provides essential features for user authentication and authorization within the Game of Drones Platform. This encompasses user registration, login, email verification, token refresh functionalities, and integration with third-party authentication providers.

## Service: AuthService (`auth.service.ts`)

Responsible for all backend logic associated with authentication processes, including password hashing, token generation, and verification.

### Key Methods:

-   **signIn(email: string, password: string)**: Authenticates a user by their email and password.
-   **refreshJWTToken(refreshToken: string)**: Refreshes an expired JWT token.
-   **verifyJWTToken(token: string)**: Validates a JWT token's integrity and authenticity.
-   **register(token: string, password: string)**: Registers a new user with a verification token and password.
-   **verifyMail(email: string)**: Initiates the email verification process.
-   **verifyCode(code: string)**: Verifies the code sent to the user's email during the registration process.

## Controller: AuthController (`auth.controller.ts`)

Handles incoming HTTP requests related to authentication and directs them to the appropriate service methods.

### Endpoints:

-   **POST /auth/verify/email**: Initiates email verification.
-   **POST /auth/verify/code**: Verifies the code sent to the user's email.
-   **POST /auth/login**: Logs in a user with their credentials.
-   **POST /auth/login/refresh**: Refreshes a user's JWT token.
-   **POST /auth/login/verify**: Verifies the validity of a user's JWT token.
-   **GET /auth/profile**: Retrieves the profile of the currently authenticated user.
-   **POST /auth/register**: Registers a new user.
-   **GET /auth/google**: Initiates authentication via Google.
-   **GET /auth/google/callback**: Handles the callback from Google authentication.
-   **GET /auth/facebook**: Initiates authentication via Facebook.
-   **GET /auth/facebook/callback**: Handles the callback from Facebook authentication.

## Guards and Strategies

The Authentication module utilizes Guards and Strategies to manage access control and to integrate third-party authentication services.

### Guards

-   **CustomAuthGuard**: A custom guard that extends the functionality of NestJS's built-in AuthGuard. It is used for routes that require the user to be authenticated by JWT token.
-   **AuthGuard('google')**: Utilizes the Google OAuth strategy for authentication on Google-specific endpoints.
-   **AuthGuard('facebook')**: Utilizes the Facebook OAuth strategy for authentication on Facebook-specific endpoints.

### Strategies

-   **GoogleStrategy**: Implements OAuth2 for Google. It is responsible for validating Google OAuth tokens and extracting the user profile.
-   **FacebookStrategy**: Implements OAuth2 for Facebook. It manages the validation of Facebook OAuth tokens and extraction of user profile information.

### Implementation Details

-   The module leverages **NestJS Passport** for OAuth integrations with Google and Facebook, making use of JWT tokens for session management.
-   Password security is ensured using the `bcrypt` library for hashing.

## Security Practices

-   All sensitive routes are protected using guards to ensure that only authenticated users can access them.
-   Strategies are configured to validate third-party tokens against the OAuth provider, ensuring the authenticity of the authentication data.
