# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
<!-- Requirement 1: Credential Management

Requirement:
Users must be able to provision, store, register, and manage their Union credentials.

Requirement-Todos:

Define credential data model
Implement credential provisioning
Implement credential storage
Implement credential registration/binding
Implement credential status management
Implement credential lookup
Implement credential validation
Handle invalid/unknown credentials
Add authorization rules
Write unit tests for credential validation
Write integration tests for credential registration
Test invalid and expired credentials
Requirement 2: NFC Authentication




Requirement:
The system must authenticate a user through an NFC interaction and establish a valid user session.

Requirement-Todos:

Define NFC authentication flow
Implement NFC reader communication
Implement backend NFC endpoint
Validate NFC credential
Resolve credential to user
Create authenticated session
Reject invalid credentials
Handle duplicate/replayed requests
Add authentication logging
Write unit tests
Write integration tests
Test invalid NFC credentials
Test unauthorized access
Requirement 3: Event Access




Requirement:
Authenticated users must be able to access an assigned event/game.

Requirement-Todos:

Define event data model
Define user-event relationship
Implement event lookup
Validate event access
Implement event entry
Handle unauthorized users
Record event access
Write access-control tests
Write integration tests
Requirement 4: Attendance




Requirement:
Union must record when an authenticated participant attends an event.

Requirement-Todos:

Define attendance data model
Implement attendance creation
Prevent duplicate attendance records
Store timestamp
Associate attendance with user
Associate attendance with event
Add attendance lookup
Test successful attendance
Test duplicate attendance
Test unauthorized attendance
Requirement 5: Tasks & Progress




Requirement:
Participants must be able to view assigned tasks, complete them, and receive corresponding progress/points.

Requirement-Todos:

Define task data model
Assign tasks to events/users
Display available tasks
Implement task completion
Prevent duplicate completion
Calculate points
Update user progress
Store completion timestamp
Test task completion
Test duplicate completion
Test point calculation -->