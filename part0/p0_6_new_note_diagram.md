Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of browser: The browser POST note to server
    server-->>browser: Responds with status code 201 created
    deactivate server
    Note right of browser: The browser stays on the same page, and it sends no further HTTP requests
    Note over browser: The browser execute onsubmit event listener to render the new notes locally
```