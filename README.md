# Afgog Web

A modern web application for the Afgog platform, built with React, TypeScript, and Vite.

## Features

- **Authentication**: Complete auth flow with login, registration, and password recovery
- **Home Dashboard**: Quick access to main features
- **Orders Management**: View and track your orders
- **Properties**: Browse and manage properties
- **Wishlist**: Save favorite items
- **Settings**: Manage profile and app preferences
- **State Management**: Redux Toolkit with Redux Persist
- **Form Validation**: Formik with Yup validation schemas
- **Routing**: React Router for navigation
- **Notifications**: Toast notifications for user feedback

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Formik & Yup** - Form handling and validation
- **Axios** - HTTP client
- **React Toastify** - Notifications

## Project Structure

```
src/
├── api/                 # API configuration and setup
├── components/          # Reusable UI components
│   ├── Button/
│   ├── Card/
│   ├── Header/
│   └── Inputs/
├── navigation/          # Routing configuration
├── screens/            # Application screens
│   ├── AuthScreen/     # Authentication screens
│   └── TabScreen/      # Main app screens
├── services/           # API services
│   └── auth/          # Authentication service
├── store/             # Redux store configuration
│   └── settings/      # Settings slice
├── theme/             # Theme and styling
└── utils/             # Utility functions

```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd /Users/adedamolaagunbiade/Documents/Azure/AfgogWeb
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory:
   ```
   VITE_API_BASE_URL=https://api.afgog.com
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Comparison with Mobile App

This web application includes all the main features from the mobile app:

✅ Authentication (Login, Register, Password Recovery)
✅ Home Dashboard
✅ Orders Management
✅ Properties Listing
✅ Wishlist
✅ User Settings
✅ Profile Management
✅ State Management (Redux)
✅ Form Validation
✅ API Integration
✅ Toast Notifications

## Environment Variables

- `VITE_API_BASE_URL` - Backend API URL

## License

Private - All rights reserved
