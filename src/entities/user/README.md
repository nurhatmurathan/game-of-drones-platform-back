# User Module Documentation

The User module (`src/entities/user`) encapsulates all functionalities related to user management within the Game of Drones Platform, including registration, profile management, and password reset.

## Entity: User (`user.entity.ts`)

The `User` entity represents a user in the system and is mapped to the `users` table in the database.

### Attributes:

-   **id**: The primary key of the user table.
-   **firstName**: The first name of the user.
-   **lastName**: The last name of the user.
-   **email**: The user's email address, which is unique across the system.
-   **password**: The hashed password for the user.
-   **avatar**: A URL to the user's avatar image.
-   **isAdmin**: A boolean value indicating if the user has administrative rights.
-   **billingAccount**: A one-to-one relationship with the `BillingAccount` entity.
-   **userTournamentTimes**: A one-to-many relationship to manage user entries in tournament times.
-   **userTournamentTrainings**: A one-to-many relationship to manage user entries in tournament trainings.

## Service: UserService (`user.service.ts`)

The `UserService` provides business logic for managing user-related operations.

### Key Methods:

-   **create(userData: UserCreateDto, isAdmin?: boolean)**: Creates a new user in the system with optional admin rights.
-   **findOneByEmail(email: string)**: Finds a user by their email.
-   **findOneById(id: number)**: Finds a user by their unique identifier.
-   **getProfileCover(id: number)**: Retrieves minimal profile information for display purposes, such as on a cover page.
-   **getProfile(id: number)**: Retrieves full profile information for the user.
-   **editProfile(id: number, firstName: string, lastName: string, avatar: string)**: Updates the user's profile information.
-   **editPassword(id: number, oldPassword: string, newPassword: string)**: Changes the user's password after verifying the old password.
-   **getPasswordResetLink(email: string, language: string)**: Initiates the password reset process by sending an email to the user with a reset link.
-   **passwordResetWithToken(token: string, password: string)**: Completes the password reset process using a token.

## Controller: UserController (`user.controller.ts`)

The `UserController` handles HTTP requests related to users, delegating to `UserService` for business processing.

### Endpoints:

-   **GET /users/profile/cover**: Returns user cover details.
-   **GET /users/profile**: Returns detailed user profile information.
-   **POST /users/profile/edit**: Allows the user to edit their profile information.
-   **POST /users/password/edit**: Enables the user to change their password.
-   **POST /users/password/reset**: Initiates a password reset process and sends an email with a reset link.
-   **POST /users/password/reset/:token**: Completes the password reset process with the provided token.

### Usage:

Here is an example of how the user service and controller might be used within the application:

```typescript
// In the controller
@Post('register')
async register(@Body() userData: UserCreateDto) {
  return await this.userService.create(userData);
}
```

# User Admin Module Documentation

In addition to standard user operations, the Game of Drones Platform includes administrative functionalities for user management within the `src/entities/user` directory. This includes administrative endpoints and services for managing user accounts and admin accounts.

## Admin Service: UserAdminService (`user.admin.service.ts`)

The `UserAdminService` extends the basic `UserService` by providing additional methods specifically for administrative use.

### Key Methods:

-   **findAllUsers()**: Retrieves a list of all users excluding admin users. This can be used for administrative oversight and user management.
-   **findAllAdminUsers()**: Fetches a list of all users with admin privileges. Useful for tracking and managing the admin user base.

## Admin Controller: UserAdminController (`user.admin.controller.ts`)

The `UserAdminController` handles HTTP requests targeted at administrative user management functions.

### Endpoints:

-   **GET /admin-users/users**: Lists all non-admin users in the system.
-   **GET /admin-users/admins**: Lists all admin users.

### Security:

-   Both endpoints are protected by `CustomAuthGuard` and `IsAdminGuard` to ensure that only authenticated admin users can access these functionalities.

### Usage:

The admin endpoints might be used in the following way within the application:

```typescript
// In the admin controller
@Get('users')
async findAllUser(): Promise<UserCoverDto[]> {
  return this.userAdminService.findAllUsers();
}

@Get('admins')
async findAllAdminUsers(): Promise<UserCoverDto[]> {
  return this.userAdminService.findAllAdminUsers();
}
```
