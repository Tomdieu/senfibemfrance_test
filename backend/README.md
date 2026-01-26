# SenfiBEM France Backend

This is the backend API for the SenfiBEM France platform, built with Django and Django REST Framework. The platform provides job posting and application services for the French market.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Migrations](#database-migrations)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: Complete user authentication and authorization system
- **Job Offers**: Create, read, update, and delete job listings with filtering and search capabilities
- **Job Applications**: Apply for jobs and manage application statuses
- **Role-Based Access Control**: Different permissions for ADMIN, PROFESSIONNEL, RECRUTEUR, and CANDIDAT roles
- **File Uploads**: Support for CV and cover letter uploads
- **API Documentation**: Auto-generated API documentation with Swagger UI
- **Social Authentication**: Integration with Facebook and Google OAuth
- **Filtering and Search**: Advanced filtering and search capabilities for job listings

## Tech Stack

- **Framework**: Django 6.0.1
- **REST Framework**: Django REST Framework 3.16.1
- **Database**: SQLite (default), with support for other databases
- **Authentication**: OAuth2 with social authentication (Facebook, Google)
- **Filtering**: django-filter for advanced query filtering
- **Documentation**: drf-yasg for Swagger/OpenAPI documentation
- **CORS**: django-cors-headers for cross-origin resource sharing
- **Virtual Environment**: Python 3.12

## Project Structure

```
backend/
├── billing/              # Billing and payment processing
├── core/                 # Core utilities and configurations
├── jobs/                 # Job offers and applications
│   ├── models.py         # JobOffer and JobApplication models
│   ├── views.py          # API views with filtering and search
│   ├── serializers.py    # Data serialization
│   ├── filters.py        # Custom filters for job listings
│   ├── urls.py           # URL routing
│   └── ...
├── store/                # E-commerce functionality
├── users/                # User management
├── services/             # External service integrations
├── templates/            # HTML templates
├── media/                # User uploaded files
├── senfibem_backend/     # Main project settings
├── manage.py             # Django management script
├── requirements.txt      # Python dependencies
└── README.md             # This file
```

## Installation

### Prerequisites

- Python 3.12+
- pip package manager
- Virtual environment (recommended)

### Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd senfibemfrance_test/backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Navigate to the backend directory:
```bash
cd backend
```

## Configuration

### Environment Variables

The application uses the following configuration in `settings.py`:

- `SECRET_KEY`: Django secret key (already configured)
- `DEBUG`: Debug mode (set to True for development)
- `ALLOWED_HOSTS`: Hosts allowed to serve the application
- `AUTH_USER_MODEL`: Points to custom User model in the users app

### Database Setup

The application uses SQLite by default. To use a different database, modify the `DATABASES` setting in `senfibem_backend/settings.py`.

## Running the Application

1. Activate your virtual environment:
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Navigate to the backend directory:
```bash
cd backend
```

3. Run database migrations:
```bash
python manage.py migrate
```

4. Create a superuser account (optional but recommended):
```bash
python manage.py createsuperuser
```

5. Start the development server:
```bash
python manage.py runserver
```

The application will be accessible at `http://127.0.0.1:8000/`.

API documentation will be available at `http://127.0.0.1:8000/swagger/`.

## API Documentation

The API is documented using drf-yasg (Swagger UI). After starting the server, visit:

- `http://127.0.0.1:8000/swagger/` for the interactive API documentation
- `http://127.0.0.1:8000/redoc/` for the ReDoc documentation
- `http://127.0.0.1:8000/api/v1/` for the API endpoints

### Available Endpoints

- `/api/v1/jobs/` - Job offers with filtering and search capabilities
- `/api/v1/job-applications/` - Job applications with status management
- `/api/v1/users/` - User management
- `/api/v1/billing/` - Billing and payments
- `/api/v1/store/` - Store functionality
- `/o/` - OAuth2 endpoints
- `/admin/` - Django admin interface

### Filtering and Search

The jobs endpoint supports advanced filtering and search:

- **Filtering**: Use query parameters like `?contract_type=CDI&location=Paris&company_name=Google`
- **Search**: Use the `?search=keyword` parameter to search across title, description, location, company name, and contract type
- **Combining**: You can combine filtering and search in the same request

## Database Migrations

After making changes to models:

1. Create new migrations:
```bash
python manage.py makemigrations
```

2. Apply migrations to the database:
```bash
python manage.py migrate
```

## Testing

To run tests:

```bash
python manage.py test
```

To run tests for a specific app:

```bash
python manage.py test jobs
```

## Deployment

### Production Setup

For production deployment:

1. Change `DEBUG` to `False` in settings
2. Configure a production-ready database (PostgreSQL, MySQL, etc.)
3. Set up proper static file serving
4. Configure HTTPS
5. Set secure values for `SECRET_KEY` and other sensitive settings
6. Configure allowed hosts appropriately

### Environment-Specific Settings

Consider using environment variables or separate settings files for different environments (development, staging, production).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Run tests to ensure everything works (`python manage.py test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Best Practices

- Follow PEP 8 coding standards
- Write meaningful commit messages
- Add docstrings to functions, classes, and modules
- Write tests for new functionality
- Keep pull requests focused on a single feature or bug fix

## Key Features Explained

### Job Offers Module
- Full CRUD operations for job postings
- Role-based permissions (Recruiters can only see/edit their own jobs)
- Advanced filtering by contract type, location, company, etc.
- Search functionality across multiple fields
- Integration with job applications

### Job Applications Module
- Submit applications with CV and cover letter uploads
- Track application status (Pending, Reviewing, Accepted, Rejected)
- Role-based access to applications
- Custom actions to update application status

### Authentication and Authorization
- OAuth2 with refresh tokens (valid for 1 year)
- Social authentication with Facebook and Google
- Role-based permissions system
- Secure password handling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact the development team or create an issue in the repository.