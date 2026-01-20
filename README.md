# Senfibem France

A comprehensive platform for managing services, billing, jobs, and e-commerce operations. Built with Django REST Framework backend and Next.js modern frontend.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Modules](#project-modules)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Senfibem France is a full-stack web application designed to streamline service management, billing operations, job listings, and e-commerce functionality. The platform provides a robust backend API and a modern, responsive user interface.

## Technology Stack

### Backend
- **Framework**: Django & Django REST Framework
- **Database**: SQLite (Development) / PostgreSQL (Production recommended)
- **Python Version**: 3.8+
- **Key Libraries**: Listed in `requirements.txt`

### Frontend
- **Framework**: Next.js (TypeScript)
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## Project Structure

```
senfibemfrance_test/
├── backend/                          # Django backend application
│   ├── senfibem_backend/             # Main project settings
│   ├── users/                        # User management & authentication
│   ├── core/                         # Core business logic
│   ├── billing/                      # Billing & payment processing
│   ├── jobs/                         # Job management system
│   ├── services/                     # Service offerings
│   ├── store/                        # E-commerce & product management
│   ├── templates/                    # HTML templates
│   ├── db.sqlite3                    # Development database
│   ├── manage.py                     # Django management script
│   └── requirements.txt              # Python dependencies
├── frontend/                         # Next.js frontend application
│   ├── src/
│   │   ├── app/                      # Next.js app directory
│   │   ├── components/               # React components
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── actions/                  # Server actions & API calls
│   │   ├── lib/                      # Utility functions
│   │   ├── types/                    # TypeScript type definitions
│   │   ├── store/                    # State management
│   │   └── styles/                   # Global styles
│   ├── public/                       # Static assets
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── next.config.js                # Next.js configuration
│   ├── components.json               # Component library config
│   └── package.json                  # Node dependencies
├── cahier_des_charges.txt            # Project specifications
└── README.md                         # This file
```

## Prerequisites

### Backend Requirements
- Python 3.8 or higher
- pip (Python package manager)

### Frontend Requirements
- Node.js 16.x or higher
- npm or yarn

## Installation

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser** (for admin access):
   ```bash
   python manage.py createsuperuser
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in the frontend directory with necessary API endpoints and configuration.

## Configuration

### Backend Configuration

Configure Django settings in `backend/senfibem_backend/settings.py`:
- Database credentials
- Secret key
- Allowed hosts
- CORS settings for frontend communication

### Frontend Configuration

Configure API endpoints in the frontend's environment files and `src/proxy.ts` for backend communication.

## Running the Application

### Backend

From the `backend/` directory:

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

### Frontend

From the `frontend/` directory:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Documentation

API endpoints are organized by module:

- **Users API**: `/api/users/` - User management and authentication
- **Core API**: `/api/core/` - Core business operations
- **Billing API**: `/api/billing/` - Billing and payment management
- **Jobs API**: `/api/jobs/` - Job listings and management
- **Services API**: `/api/services/` - Service information
- **Store API**: `/api/store/` - E-commerce and product management

For detailed API documentation, use Django's built-in admin interface at `/admin` or implement OpenAPI/Swagger documentation.

## Project Modules

### Users
Handles user authentication, profiles (candidate and company), and user management.

### Core
Contains core business logic and shared functionality across the platform.

### Billing
Manages invoicing, payments, and subscription plans.

### Jobs
Provides job listing and application management functionality.

### Services
Manages service offerings and descriptions.

### Store
E-commerce functionality including products, orders, and subscription management.

## Contributing

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -m 'Add your feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

## License

[Specify your license here]

---

For more information, refer to the `cahier_des_charges.txt` for detailed project specifications.
