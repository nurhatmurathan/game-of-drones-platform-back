# UserPasswordResetToken Module Documentation

The UserPasswordResetToken module (`src/entities/user.passwordreset.token`) manages password reset tokens for users, enabling secure password recovery processes within the Game of Drones Platform.

## Entity: UserPasswordresetToken (`user.passwordreset.token.entity.ts`)

Represents password reset tokens issued to users for password recovery.

### Attributes:

-   **id**: Unique identifier for the password reset token record.
-   **user**: Association with the `User` entity to which the token is issued.
-   **token**: The actual password reset token, generated securely and unique per issuance.
-   **expirationDate**: The expiration timestamp of the token, determining its validity period.

## Service: UserPasswordresetTokenService (`user.passwordreset.token.service.ts`)

Handles the creation, validation, and management of password reset tokens.

### Methods:

-   **create(user)**: Generates a new password reset token for a specified user. Previous tokens for the user are deleted to ensure uniqueness and security. The token is valid for 24 hours.
-   **getTokenUser(token)**: Retrieves the user associated with a given password reset token, ensuring the token is valid and not expired.
-   **deleteUserToken(user)**: Deletes any existing password reset tokens for a specified user.

### Token Generation:

-   Password reset tokens are generated using the `crypto` library to ensure they are secure and unpredictable.
-   Upon generation, tokens are saved with a 24-hour expiration period to limit their validity window for security purposes.

## Controller: UserPasswordresetTokenController

(Note: Specific controller actions for managing password reset tokens directly via HTTP endpoints were not detailed in the provided files, indicating that interactions may be handled internally within the application or through other user-related endpoints.)

## Security Considerations

-   Token validation ensures that only valid, non-expired tokens can be used for password reset processes.
-   Generating a new token for a user automatically invalidates any previously issued tokens to prevent misuse.

---

This documentation provides an overview of the UserPasswordResetToken module's functionality for managing password reset tokens. For complete API usage and examples, refer to the service file in the `src/entities/user.passwordreset.token` directory.
