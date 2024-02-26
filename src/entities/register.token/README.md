# RegisterToken Module Documentation

The RegisterToken module (`src/entities/register.token`) is crucial for managing the user registration process by verifying email addresses and generating unique registration tokens.

## Entity: RegisterToken (`register.token.entity.ts`)

Represents registration tokens issued to users as part of the email verification process during registration.

### Attributes:

-   **id**: Unique identifier for the registration token record.
-   **email**: The email address associated with the registration token.
-   **code**: A unique code sent to the user's email for verification.
-   **token**: A unique token generated upon successful email verification, used for user registration.
-   **expirationDate**: The expiration timestamp of the code/token, determining its validity period.

## Service: TokenService (`register.token.service.ts`)

Handles the generation, verification, and management of registration tokens and codes.

### Methods:

-   **createSixNumberedCode(email)**: Generates a six-digit verification code for the given email. Previous tokens/codes for the email are cleared to ensure uniqueness. The code is valid for 1 hour.
-   **verifyCode(code)**: Verifies the provided six-digit code and generates a unique registration token upon successful verification.
-   **verifyToken(token)**: Verifies the registration token and retrieves the associated email, indicating readiness for user registration.
-   **clearRegisterTokens(email)**: Deletes any existing registration tokens and codes for the specified email to maintain uniqueness and security.
-   **findOneByCode(code)**: Retrieves a registration token record based on the verification code.
-   **findOneByToken(token)**: Retrieves a registration token record based on the registration token.

## Controller: RegisterTokenController

(Note: Specific controller actions for managing registration tokens and codes directly via HTTP endpoints were not detailed in the provided files, indicating that interactions are likely handled internally within the application or through user registration-related endpoints.)

## Security Considerations

-   Verification codes and tokens are designed to be unique and time-sensitive, enhancing the security of the registration process.
-   Clearing previous tokens and codes for an email upon generating a new code prevents reuse and ensures that only the most recent verification process is valid.

---

This documentation provides an overview of the RegisterToken module's functionality, focusing on managing the email verification process for new user registrations. For complete API usage and examples, refer to the service file in the `src/entities/register.token` directory.
