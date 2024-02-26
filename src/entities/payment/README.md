# Payment Module Documentation

The Payment Module (`src/payment`) is designed to handle all payment-related activities within the application. This includes managing orders, processing payments, and handling payment callbacks.

## Entity: Order (`order.entity.ts`)

The `Order` entity represents a transaction or order made by a user for participating in tournaments.

### Attributes:

-   **id**: Unique identifier for the order, generated using UUID.
-   **paymentId**: ID received from the payment gateway, nullable.
-   **status**: Status of the order (e.g., Created, Paid, Cancelled).
-   **user**: Reference to the `User` entity who placed the order.
-   **tournament**: Reference to the `Tournament` entity for which the order was placed.

## Service: PaymentService (`payment.service.ts`)

Facilitates the creation of orders, interaction with the payment gateway, and management of payment callbacks.

### Methods:

-   **createOrder(userId, tournamentId)**: Initiates a new order for a user participating in a tournament.
-   **createPayment(language, userId, tournamentId)**: Processes the payment by interacting with the payment gateway and returns the payment URL.
-   **handlePaymentCallback(data)**: Handles the callback from the payment gateway, updating the order status accordingly.

## Controller: PaymentController (`payment.controller.ts`)

Manages HTTP requests related to payments and orders.

### Endpoints:

-   **POST /payment**: Initiates a payment process for tournament participation.
-   **POST /payment/callback**: Endpoint for the payment gateway to send payment callbacks.

## Security Considerations

The Payment Module integrates security measures to protect payment information and ensure that operations such as creating orders and processing payments are performed securely.

-   All payment initiation requests are secured with `CustomAuthGuard` to verify the user's identity.
-   The `ApiBearerAuth` decorator is used to require a valid JWT token for accessing the payment initiation endpoint.
-   Sensitive information such as payment IDs and user details are handled securely to prevent unauthorized access.

## Best Practices

-   The module uses environment variables for storing sensitive information like API keys and payment gateway URLs, ensuring that these details are not hard-coded into the application.
-   Error handling is implemented comprehensively across the service and controller layers to manage exceptions and provide meaningful error messages to the client.
-   Logging is utilized for monitoring payment processing steps and debugging purposes.

---

This documentation provides a foundational overview of the Payment Module's functionalities, structure, and security practices. For further implementation details and code examples, refer to the source files in the `src/payment` directory.
