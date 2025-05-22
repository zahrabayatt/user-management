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
