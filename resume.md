# Meem E-commerce Backend

## Project Overview

Developed a robust Node.js backend for an e-commerce platform, enabling seamless online shopping experiences with secure user management, product catalog, and order processing.

## Key Features

- **User Authentication & Authorization**: Implemented JWT-based authentication alongside Google OAuth integration using Passport.js for secure login and session management.
- **Product & Category Management**: Built comprehensive CRUD operations for products and categories, including image uploads via Multer and slug generation for SEO-friendly URLs.
- **Review System**: Enabled user reviews and ratings for products to enhance customer engagement and feedback.
- **Order Processing & Payments**: Integrated Stripe for secure payment processing, with full order lifecycle management including status tracking and email notifications.
- **File Uploads & Email Notifications**: Handled product image uploads and automated email confirmations using Nodemailer.
- **Database Seeding**: Created scripts for populating the database with sample data for development and testing purposes.

## Technologies Used

- **Backend Framework**: Node.js with Express.js for RESTful API development.
- **Database**: MongoDB with Mongoose ODM for data modeling and management.
- **Authentication**: JSON Web Tokens (JWT), Passport.js for OAuth, bcrypt for password hashing.
- **Payments**: Stripe API for transaction processing.
- **Utilities**: Multer for file uploads, Nodemailer for email services, CORS for cross-origin requests, express-session for session handling, validator for input validation.
- **Development Tools**: Nodemon for development, dotenv for environment configuration.

## Achievements

- Designed a modular architecture with separate layers for routes, controllers, services, and models, promoting code reusability and maintainability.
- Ensured security best practices through encrypted passwords, token-based auth, and input validation.
- Achieved scalable API design supporting high-volume e-commerce operations with error handling and middleware integration.
- Successfully integrated third-party services (Stripe, Google OAuth) for enhanced functionality and user experience.
