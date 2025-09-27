# FoodApp - A Manifest-Powered Application

This is a complete food ordering application built with React and powered exclusively by the Manifest backend platform.

## Features

- **User Authentication**: Secure sign-up and login for customers and restaurant owners.
- **Restaurant Listings**: Publicly browse available restaurants.
- **Restaurant Management**: Users with the 'owner' role can create and manage their own restaurants.
- **Menu Management**: Owners can add and update menu items for their restaurants via the Admin Panel.
- **Order Placement**: Customers can place orders (feature implemented on the backend).
- **Automatic Admin Panel**: A built-in admin interface for managing all data, users, and settings.

## Backend (Manifest)

The entire backend is defined in the `manifest.yml` file. It automatically generates:

- A secure REST API for all entities.
- A complete database schema with migrations.
- User authentication and role-based access policies.
- An administrative dashboard.

### Entities

- `User`: Authenticable entity with roles (`customer`, `owner`, `admin`).
- `Restaurant`: Represents a restaurant with an owner relationship to a User.
- `MenuItem`: Belongs to a Restaurant, includes price and an image.
- `Order`: Links a `customer` (User) and a `Restaurant`, tracking order status and total price.

## Frontend (React)

The frontend is a single-page application built with React and Vite. It adheres to strict development patterns:

- **Manifest SDK**: All backend communication is handled through the official `@mnfst/sdk`.
- **No Direct API Calls**: The app contains no `fetch()` or `axios` calls to API endpoints, ensuring a clean separation of concerns.
- **Zero Custom Auth Logic**: Authentication is managed entirely by `manifest.login()` and `manifest.logout()`.
- **Component-Based**: The UI is structured into a `LandingPage` for anonymous users and a `DashboardPage` for logged-in users.
- **Styling**: All styling is done using Tailwind CSS for a modern, responsive design.

## Getting Started

### Prerequisites

- Node.js and npm
- A running Manifest backend instance

### Setup

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    Create a `.env` file in the root directory and add your Manifest backend URL:
    ```
    VITE_BACKEND_URL=https://your-manifest-backend-url.vercel.app
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Default Credentials

- **Admin Panel**: Access at `https://your-manifest-backend-url.vercel.app/admin`
  - Email: `admin@manifest.build`
  - Password: `admin`
- **Demo Users (Create in Admin Panel):**
  - Customer: `customer@example.com` / `password` (Role: `customer`)
  - Owner: `owner@example.com` / `password` (Role: `owner`)
