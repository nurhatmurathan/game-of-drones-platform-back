# MultilingualText Module Documentation

The MultilingualText module (`src/entities/multilingualtext`) handles the storage and management of text fields in multiple languages, allowing content to be dynamically served based on the user's language preference.

## Entity: MultilingualText (`multilingualtext.entity.ts`)

The `MultilingualText` entity represents a table that contains translations for various text fields in different languages.

### Attributes:

-   **id**: The primary key of the table.
-   **en**: A `varchar` column that stores the English translation of the text.
-   **ru**: A `varchar` column that stores the Russian translation of the text.
-   **kz**: A `varchar` column that stores the Kazakh translation of the text.

## Service: MultilingualtextService (`multilingualtext.service.ts`)

The `MultilingualtextService` provides the business logic for creating, updating, and deleting multilingual text records.

### Key Methods:

-   **create(createData: MultilingualtextDto)**: Creates a new multilingual text record from the provided DTO.
-   **update(updateData: MultilingualtextUpdateDto)**: Updates an existing multilingual text record with the given data.
-   **delete(id: number)**: Deletes the multilingual text record with the specified ID.

## Usage:

Here's how the MultilingualText service might be used within the application:

```typescript
// Creating a new multilingual text record
const multilingualTextData: MultilingualtextDto = {
    en: "Welcome",
    ru: "Добро пожаловать",
    kz: "Қош келдіңіз",
};
const newMultilingualText = await multilingualtextService.create(multilingualTextData);

// Updating an existing multilingual text record
const updatedData: MultilingualtextUpdateDto = {
    id: 1,
    en: "Updated Welcome",
    ru: "Обновленное приветствие",
    kz: "Жаңартылған қошемет",
};
const updatedMultilingualText = await multilingualtextService.update(updatedData);

// Deleting a multilingual text record
await multilingualtextService.delete(1);
```
