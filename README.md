# User Management System

A modern user management system built with React and TypeScript, featuring real-time CRUD operations and dynamic user interface.

## Features

- **User Management**
  - Create, delete users
  - Filter users by username
  - Sort users by age
  - Drag and drop user reordering
  - Real-time validation and error handling
  - Loading states and optimistic updates

- **User Interface**
  - Clean and modern design using Radix UI
  - Skeleton loading states
  - Form validation with error messages
  - Drag and drop functionality
  - Responsive layout
  - Confirmation dialogs for destructive actions

## Tech Stack

### Frontend
- React 18
- TypeScript
- Radix UI Components
- React Hook Form
- Zod Validation
- Axios for API calls
- Zustand for State Management
- TailwindCSS

### Backend
- MockAPI for REST endpoints

## Project Structure

```
src/
├── components/
│   ├── CreateUserDialog/
│   ├── DeleteUserDialog/
│   ├── SearchUsers/
│   └── UsersTable/
├── hooks/
│   ├── useDragAndDrop.ts
│   └── useUsers.ts
├── services/
│   ├── api-client.ts
│   └── users-service.ts
├── store/
│   ├── useUserStore.ts
│   └── useUserQueryStore.ts
└── schemas/
    └── userSchema.ts
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/user-management.git
cd user-management
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## API Integration

The project uses MockAPI as its backend. The base URL for the API is:

```
https://682e10ed746f8ca4a47bc516.mockapi.io/api/v1
```

Available endpoints:
- `GET /users` - List all users
- `POST /users` - Create a new user
- `DELETE /users/:id` - Delete a user
- `GET /users?username=:username` - Search users by username

## Features in Detail

### User Creation
- Form validation using Zod
- Real-time username availability check
- Age validation (18-100)
- Required field validation

### User Management
- Drag and drop reordering
- Sort by age (ascending/descending)
- Search by username
- Delete confirmation dialog

### Performance Optimizations
- Skeleton loading states
- Optimistic updates
- Debounced search
- Local state management with Zustand

## Development Tools

- VS Code
- React Developer Tools
- TypeScript
- Prettier for code formatting
- ESLint for code quality