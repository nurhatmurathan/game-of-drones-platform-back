# Mail Service Documentation

The Mail Service in the Game of Drones Platform (`src/mail`) is responsible for sending out emails to users. This includes email confirmations, password resets, and other notifications.

## Service: MailService (`mail.service.ts`)

The `MailService` uses the `MailerService` from `@nestjs-modules/mailer` to send emails.

### Key Functions:

-   **sendUserConfirmation(email: string, code: string)**: Sends an email to the user with a verification code during the registration process.
-   **sendUserPasswordResetLink(user: User, token: string, language: string)**: Sends a password reset link to the user's email in the specified language.

## Email Templates

Email content is managed by Handlebars templates that define the HTML structure and content of the emails sent by the `MailService`.

### Templates Directory: `templates/`

-   **confirmation.hbs**: Template used for sending email verification codes to users.
-   **passwordreseten.hbs**: English template for sending password reset links.
-   **passwordresetkz.hbs**: Kazakh template for sending password reset links.
-   **passwordresetru.hbs**: Russian template for sending password reset links.

Each template is designed with a responsive layout and includes placeholders for dynamic content such as verification codes or password reset links.

## Implementation Details

-   The service uses environment variables (`process.env`) to manage sender email addresses and the host URLs for password reset links.
-   The mail templates are designed to be both informative and user-friendly, ensuring a high level of user engagement and action.

## Example Usage

Here is an example of how the `MailService` might be used within the application:

```typescript
const email = "user@example.com";
const verificationCode = "123456";
await mailService.sendUserConfirmation(email, verificationCode);
```
