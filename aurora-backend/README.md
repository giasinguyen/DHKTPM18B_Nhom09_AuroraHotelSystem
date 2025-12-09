# 🌌 Aurora Hotel Management System - Backend

> Enterprise-grade hotel management REST API built with **Spring Boot 3.5.5**, **Java 21**, **PostgreSQL 16**, and **pgvector** for AI-powered features.  
> Part of the Aurora Hotel Management System ecosystem.

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-6db33f?logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-21-007396?logo=openjdk&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1?logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-7.2-dc382d?logo=redis&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.40-000000?logo=jsonwebtokens&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ed?logo=docker&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-6.x-59666c?logo=hibernate&logoColor=white)
![MapStruct](https://img.shields.io/badge/MapStruct-1.6.3-ff6600?logoColor=white)
![Lombok](https://img.shields.io/badge/Lombok-1.18.36-bc2e24?logoColor=white)
![Maven](https://img.shields.io/badge/Maven-3.9-c71a36?logo=apachemaven&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain4j-latest-00b4a9?logo=chainlink&logoColor=white)
![License](https://img.shields.io/badge/license-Educational-blue.svg)

---

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Database Setup](#-database-setup)
- [Building for Production](#-building-for-production)
- [Docker Deployment](#-docker-deployment)
- [Project Structure](#-project-structure)
- [Key Technologies](#-key-technologies)
- [Development Guidelines](#-development-guidelines)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Introduction

Aurora Hotel Backend is a comprehensive RESTful API service that powers the Aurora Hotel Management System. Built with enterprise-grade technologies and best practices, it provides robust, scalable, and secure backend services for managing hotel operations, bookings, payments, and AI-powered features.

### Key Highlights

- 🏗️ **Enterprise Architecture** - Layered architecture with clear separation of concerns
- 🔐 **Advanced Security** - JWT authentication, role-based access control with 70+ permissions
- 🤖 **AI-Powered** - RAG chatbot with Langchain4j and Google Gemini AI
- 💾 **Modern Database** - PostgreSQL 16 with pgvector for vector similarity search
- 🚀 **High Performance** - Redis caching, HikariCP connection pooling, batch operations
- 📊 **Rich Features** - Comprehensive hotel management with multi-branch support
- 💳 **Payment Integration** - VNPay payment gateway integration
- 📧 **Email Services** - Transactional emails with Mailjet and Thymeleaf templates
- 🎨 **Clean Code** - Lombok, MapStruct for reduced boilerplate
- 📦 **Production Ready** - Docker support, health checks, monitoring

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication with access and refresh tokens
- Token introspection and invalidation
- Redis-based token management for scalability
- Role-Based Access Control (RBAC) with 5 roles
- Permission-based authorization with 70+ granular permissions
- AOP-based permission checking with AND/OR logic
- Password hashing with BCrypt
- OAuth2 resource server configuration
- Email verification for new accounts
- Password reset functionality

### 👥 User Management
- Complete user CRUD operations
- Multi-role support (Admin, Manager, Staff, Customer, Guest)
- User profile management
- Branch assignment for staff
- User search and filtering with pagination
- Soft delete functionality
- Audit trails (created/updated timestamps)
- Session metadata tracking

### 🏢 Multi-Branch System
- Multiple hotel branches support
- Branch-specific configurations (check-in/out times, operating hours)
- Branch manager assignment
- Geographic coordinates for location services
- Branch status management (Active, Inactive, Maintenance)
- Branch-level statistics and reporting
- Cross-branch data isolation

### 🏨 Room Management
- Room types with flexible pricing (base, weekend, holiday)
- Room status tracking (Available, Occupied, Cleaning, Maintenance, Out of Service)
- Capacity management (adults, children, max occupancy)
- Bed type configurations
- Room amenities management
- Price override per room
- Room image galleries
- Multi-branch room inventory

### 📅 Booking System
- Multi-room booking support
- Real-time room availability checking
- Booking status workflow (Pending → Confirmed → Checked-in → Checked-out → Completed)
- Auto-generated unique booking codes
- Special requests handling
- Deposit and payment tracking
- Booking modifications and cancellations
- Early check-in/late check-out support
- Booking history and search

### 💳 Payment Processing
- VNPay payment gateway integration
- Multiple payment methods support
- Secure payment transactions with SHA-256 hashing
- Payment status tracking
- Refund processing
- IPN (Instant Payment Notification) handling
- Payment history and reconciliation

### 🛎️ Services & Amenities
- Service catalog management
- Service categories (Room Service, Spa, Laundry, etc.)
- Dynamic pricing per service
- Booking-specific service additions
- Room amenity management
- Service booking tracking

### 📊 Dashboard & Analytics
- Executive dashboard with key metrics
- Revenue analytics and reporting
- Occupancy rate tracking
- Booking trends analysis
- Branch performance comparison
- Custom date range filtering
- Real-time statistics

### 📰 Content Management
- News and events management
- Rich content with HTML support
- Image asset management
- Content categorization
- Publication workflow
- Gallery management for branches

### 📄 Document Management
- Document upload and storage
- Vector similarity search with pgvector
- Document categorization
- Search and retrieval
- RAG (Retrieval-Augmented Generation) support

### 🤖 AI-Powered Features
- RAG chatbot with Langchain4j
- Google Gemini AI integration
- Vector embeddings for semantic search
- Document-based Q&A
- Context-aware responses
- Streaming chat support

### 👔 Staff Management
- Shift scheduling and management
- Work shift definitions
- Staff shift assignments
- Shift check-in/check-out
- Attendance tracking
- Branch-specific staffing

### 🎁 Promotions & Pricing
- Flexible promotion system
- Discount types (percentage, fixed amount)
- Date-based promotions
- Room type specific promotions
- Automatic price calculation
- Seasonal pricing support

### 📧 Email Services
- Transactional email with Mailjet
- HTML email templates with Thymeleaf
- Booking confirmations
- Payment receipts
- Email verification
- Password reset emails

### 🖼️ Media Management
- Cloudinary integration for image storage
- Image upload and optimization
- Gallery management
- Asset versioning
- URL generation

---

## 🚀 Tech Stack

### Core Framework
- **Java 21** - Latest LTS with modern features (Virtual Threads, Pattern Matching, Records)
- **Spring Boot 3.5.5** - Production-ready application framework
- **Maven 3.9** - Dependency management and build automation

### Spring Ecosystem
- **Spring Data JPA** - Data persistence with Hibernate 6.x
- **Spring Security** - Authentication and authorization
- **Spring Web** - RESTful web services
- **Spring WebFlux** - Reactive programming support
- **Spring Validation** - Bean validation with Hibernate Validator
- **Spring AOP** - Aspect-oriented programming for cross-cutting concerns
- **Spring Mail** - Email sending capabilities
- **Spring OAuth2 Resource Server** - JWT token validation

### Database & Persistence
- **PostgreSQL 16** - Advanced open-source relational database
- **pgvector 0.1.6** - Vector similarity search extension
- **Hibernate 6.x** - ORM framework
- **HikariCP** - High-performance JDBC connection pool
- **Spring Data JPA** - Repository abstraction

### Caching & Session
- **Redis 7.2** - In-memory data structure store
- **Lettuce** - Advanced Redis client for Spring
- **Spring Data Redis** - Redis integration

### Security & Authentication
- **Spring Security** - Comprehensive security framework
- **Nimbus JOSE + JWT 9.40** - JWT creation and validation
- **BCrypt** - Password hashing algorithm
- **OAuth2 Resource Server** - Token-based authentication

### AI & Machine Learning
- **Langchain4j 1.7.1** - LLM orchestration framework
- **Google AI Gemini** - Large language model integration
- **Langchain4j pgvector** - Vector store integration
- **Apache Tika** - Document parsing and text extraction
- **Langchain4j Reactor** - Reactive streaming support

### Code Quality & Productivity
- **Lombok 1.18.36** - Reduce boilerplate code (@Data, @Builder, @Slf4j)
- **MapStruct 1.6.3** - Type-safe bean mapping
- **Spring Boot DevTools** - Live reload and development tools

### Payment Integration
- **VNPay Gateway** - Vietnamese payment processing
- **Apache Commons Codec** - SHA-256 hashing for payment security

### Email Services
- **Mailjet Client 5.2.5** - Transactional email service
- **Thymeleaf** - Server-side template engine for HTML emails

### Media Storage
- **Cloudinary HTTP44 1.38.0** - Cloud-based image and video management

### Configuration & Environment
- **Dotenv Java 3.0.0** - Environment variable management

### Testing
- **Spring Boot Test** - Testing framework
- **Spring Security Test** - Security testing utilities
- **JUnit 5** - Unit testing framework
- **Mockito** - Mocking framework

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Maven Wrapper** - Consistent Maven version
- **Railway** - Cloud deployment platform

### Database Tools
- **pgAdmin 4** - PostgreSQL administration
- **Flyway/Liquibase Ready** - Database migration support

---

## 🏗️ Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│   (Controllers, DTOs, Validators)   │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│          Service Layer              │
│    (Business Logic, Services)       │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│       Repository Layer              │
│   (Data Access, Repositories)       │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│         Database Layer              │
│    (PostgreSQL, Redis, pgvector)    │
└─────────────────────────────────────┘
```

### Key Design Patterns

- **MVC (Model-View-Controller)** - Separation of concerns
- **Repository Pattern** - Data access abstraction
- **Service Layer Pattern** - Business logic encapsulation
- **DTO Pattern** - Data transfer objects for API contracts
- **Builder Pattern** - Object construction with Lombok
- **Strategy Pattern** - Payment and pricing strategies
- **AOP (Aspect-Oriented Programming)** - Cross-cutting concerns
- **Dependency Injection** - Inversion of Control with Spring

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Java 21** - Download from [OpenJDK](https://openjdk.org/) or [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.9+** - Download from [Apache Maven](https://maven.apache.org/download.cgi) (or use included Maven Wrapper)
- **PostgreSQL 16+** - Download from [PostgreSQL](https://www.postgresql.org/download/)
- **Redis 7.2+** - Download from [Redis](https://redis.io/download/)
- **Git** - Version control

### Optional
- **Docker & Docker Compose** - For containerized setup (recommended)
- **pgAdmin 4** - PostgreSQL database management
- **IntelliJ IDEA** / **Eclipse** / **VS Code** - IDE
- **Postman** - API testing (collections included)

### External Services
- **Cloudinary Account** - For image storage ([Sign up](https://cloudinary.com/))
- **Mailjet Account** - For email services ([Sign up](https://www.mailjet.com/))
- **Google AI API Key** - For Gemini AI features ([Get API Key](https://aistudio.google.com/api-keys))
- **VNPay Account** - For payment processing (sandbox available)

---

## 📥 Installation

### Option 1: Using Docker Compose (Recommended)

This will set up PostgreSQL, pgAdmin, and Redis automatically.

```bash
# Clone the repository
git clone https://github.com/giasinguyen/aurora-hotel-system.git
cd aurora-hotel-system/aurora-backend

# Start database services
docker-compose up -d

# Wait for services to be healthy (about 30 seconds)
docker-compose ps
```

Services will be available at:
- **PostgreSQL**: `localhost:5432`
- **pgAdmin**: `http://localhost:5050` (admin@gmail.com / admin)
- **Redis**: `localhost:6379`

### Option 2: Manual Installation

#### 1. Install PostgreSQL 16 with pgvector

```bash
# PostgreSQL installation varies by OS
# After installation, install pgvector extension

# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE aurora_hotel;

# Enable pgvector extension
\c aurora_hotel
CREATE EXTENSION IF NOT EXISTS vector;
```

#### 2. Install Redis

```bash
# Installation varies by OS
# For Ubuntu/Debian:
sudo apt-get install redis-server

# For macOS:
brew install redis

# Start Redis
redis-server
```

#### 3. Clone and Setup Application

```bash
# Clone the repository
git clone https://github.com/giasinguyen/aurora-hotel-system.git
cd aurora-hotel-system/aurora-backend

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# See Configuration section below
```

---

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` file:

```env
# Spring Profile
SPRING_PROFILES_ACTIVE=dev

# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/aurora_hotel
DB_USERNAME=admin
DB_PASSWORD=admin

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=admin

# JWT Configuration
JWT_SIGNER_KEY=your-secure-random-256-bit-key
ACCESS_TOKEN_VALID_DURATION=3600        # 1 hour
REFRESH_TOKEN_VALID_DURATION=604800     # 7 days

# VNPay Configuration
VNPAY_TMN_CODE=your_vnpay_merchant_code
VNPAY_HASH_SECRET=your_vnpay_hash_secret
VNPAY_RETURN_URL=http://localhost:3000/payment/return
VNPAY_IPN_URL=http://localhost:8080/api/v1/payments/vnpay/ipn

# Google Gemini AI
GEMINI_AI_KEY=your_gemini_api_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_SECURE=true

# Mailjet Configuration
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
MAILJET_FROM_EMAIL=noreply@aurorahotel.com
MAILJET_FROM_NAME=Aurora Hotel System

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Configuration Files

| File | Purpose |
|------|---------|
| `application.yml` | Main configuration file |
| `application-dev.yml` | Development profile configuration |
| `application-prod.yml` | Production profile configuration |
| `.env` | Environment variables (not committed to Git) |

### Important Security Notes

⚠️ **Never commit `.env` file to version control**  
⚠️ **Use strong random keys for JWT_SIGNER_KEY**  
⚠️ **Change default passwords in production**  
⚠️ **Enable HTTPS in production**

---

## 🏃 Running the Application

### Using Maven Wrapper (Recommended)

```bash
# Make Maven wrapper executable (Linux/macOS)
chmod +x mvnw

# Run the application
./mvnw spring-boot:run

# For Windows
mvnw.cmd spring-boot:run
```

### Using Maven

```bash
# Clean and install dependencies
mvn clean install

# Run the application
mvn spring-boot:run

# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Using Java JAR

```bash
# Build the JAR file
mvn clean package -DskipTests

# Run the JAR
java -jar target/aurora-backend-0.0.1-SNAPSHOT.jar

# Run with profile
java -jar -Dspring.profiles.active=dev target/aurora-backend-0.0.1-SNAPSHOT.jar
```

### Application Startup

The application will start on: **http://localhost:8080**

You should see:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::               (v3.5.5)

2024-12-09 ... : Started AuroraBackendApplication in 3.456 seconds
```

### Health Check

Check if the application is running:

```bash
curl http://localhost:8080/api/v1/health
```

Expected response:
```json
{
  "status": "UP",
  "timestamp": "2024-12-09T10:30:00Z"
}
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:8080/api/v1
```

### API Endpoints Overview

| Module | Base Path | Description |
|--------|-----------|-------------|
| Authentication | `/auth` | Login, register, token refresh |
| Users | `/users` | User management |
| Branches | `/branches` | Branch management |
| Rooms | `/rooms` | Room inventory |
| Room Types | `/room-types` | Room type definitions |
| Room Categories | `/room-categories` | Room categorization |
| Bookings | `/bookings` | Booking management |
| Payments | `/payments` | Payment processing |
| Services | `/services` | Service catalog |
| Amenities | `/amenities` | Room amenities |
| News | `/news` | News and events |
| Promotions | `/promotions` | Promotion management |
| Dashboard | `/dashboard` | Analytics and statistics |
| Documents | `/documents` | Document management |
| RAG Chat | `/rag` | AI chatbot |
| Roles | `/roles` | Role management |
| Permissions | `/permissions` | Permission management |
| Shifts | `/shifts` | Staff shift management |

### Postman Collections

Postman collections are included in the `postman/` directory:

1. **Aurora Hotel Management System.postman_collection.json** - Complete API collection
2. **Aurora_Hotel_Authentication_Tests.postman_collection.json** - Auth tests
3. **Cloudinary API Test Collection.postman_collection.json** - Media upload tests

Import these into Postman for easy API testing.

### Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

### Example API Calls

#### Login
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

#### Get User Profile
```bash
curl -X GET http://localhost:8080/api/v1/users/my-profile \
  -H "Authorization: Bearer <token>"
```

#### Create Booking
```bash
curl -X POST http://localhost:8080/api/v1/bookings \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "branchId": 1,
    "checkInDate": "2024-12-15",
    "checkOutDate": "2024-12-17",
    "rooms": [...]
  }'
```

---

## 🗄️ Database Setup

### Using Docker Compose (Automatic)

```bash
docker-compose up -d
```

The database will be automatically initialized with:
- pgvector extension
- Required tables via Hibernate DDL
- Initial data via SQL scripts

### Manual Database Setup

#### 1. Create Database

```sql
CREATE DATABASE aurora_hotel;
\c aurora_hotel;
CREATE EXTENSION IF NOT EXISTS vector;
```

#### 2. Run Initialization Scripts

The application will automatically run SQL scripts on startup from:
- `src/main/resources/db/init-auto/fix-email-verified.sql`
- `src/main/resources/db/init-auto/init-vector-store.sql`
- `src/main/resources/db/init-auto/init-roles-permissions.sql`

#### 3. Entity Tables

Hibernate will automatically create tables based on JPA entities:
- `users`, `roles`, `permissions`
- `branches`, `rooms`, `room_types`, `room_categories`
- `bookings`, `booking_rooms`, `payments`
- `services`, `service_categories`, `amenities`
- `news`, `promotions`, `documents`
- `work_shifts`, `staff_shift_assignments`, `shift_check_ins`
- And more...

### Database Migrations

For production environments, consider using:
- **Flyway** - Database migration tool
- **Liquibase** - Database schema change management

### pgAdmin Access

If using Docker Compose:
1. Open http://localhost:5050
2. Login: admin@gmail.com / admin
3. Add Server:
   - Host: rag_postgres
   - Port: 5432
   - Database: aurora_hotel
   - Username: admin
   - Password: admin

---

## 🏗️ Building for Production

### Maven Build

```bash
# Clean and build
mvn clean package -DskipTests

# Build with tests
mvn clean package

# Build with specific profile
mvn clean package -DskipTests -Pprod
```

### Build Output

The JAR file will be created at:
```
target/aurora-backend-0.0.1-SNAPSHOT.jar
```

### Build Optimizations

- Dependency resolution caching
- Parallel compilation
- Annotation processing (Lombok, MapStruct)
- Resource filtering
- Test execution (optional)

---

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t aurora-backend:latest .
```

### Run Docker Container

```bash
docker run -d \
  -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e DB_URL=jdbc:postgresql://db-host:5432/aurora_hotel \
  -e DB_USERNAME=admin \
  -e DB_PASSWORD=secure_password \
  -e REDIS_HOST=redis-host \
  -e REDIS_PORT=6379 \
  -e JWT_SIGNER_KEY=your_secure_key \
  --name aurora-backend \
  aurora-backend:latest
```

### Docker Compose Full Stack

```bash
# Start all services (PostgreSQL, Redis, pgAdmin, Backend)
docker-compose up -d

# View logs
docker-compose logs -f aurora-backend

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Docker Multi-Stage Build

The Dockerfile uses multi-stage build for optimization:

1. **Build Stage** - Maven build with dependencies
2. **Runtime Stage** - Minimal JRE image with application JAR

Benefits:
- Smaller final image size
- Faster deployment
- Better security (no build tools in production)

### Docker Health Check

The container includes health check:
```bash
docker ps  # Check HEALTH status
```

---

## 📁 Project Structure

```
aurora-backend/
├── src/
│   ├── main/
│   │   ├── java/com/aurora/backend/
│   │   │   ├── AuroraBackendApplication.java    # Main application class
│   │   │   ├── config/                          # Configuration classes
│   │   │   │   ├── SecurityConfig.java          # Spring Security config
│   │   │   │   ├── JwtConfig.java               # JWT configuration
│   │   │   │   ├── RedisConfig.java             # Redis configuration
│   │   │   │   ├── CloudinaryConfig.java        # Cloudinary setup
│   │   │   │   ├── CorsConfig.java              # CORS configuration
│   │   │   │   ├── OpenApiConfig.java           # API documentation
│   │   │   │   └── ...
│   │   │   ├── controller/                      # REST Controllers
│   │   │   │   ├── AuthenticationController.java
│   │   │   │   ├── UserController.java
│   │   │   │   ├── BookingController.java
│   │   │   │   ├── RoomController.java
│   │   │   │   ├── PaymentController.java
│   │   │   │   ├── RagController.java
│   │   │   │   └── ... (30 controllers)
│   │   │   ├── service/                         # Service interfaces
│   │   │   │   ├── AuthenticationService.java
│   │   │   │   ├── UserService.java
│   │   │   │   ├── BookingService.java
│   │   │   │   └── ...
│   │   │   ├── service/impl/                    # Service implementations
│   │   │   │   ├── AuthenticationServiceImpl.java
│   │   │   │   ├── UserServiceImpl.java
│   │   │   │   ├── BookingServiceImpl.java
│   │   │   │   └── ...
│   │   │   ├── repository/                      # JPA Repositories
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── BookingRepository.java
│   │   │   │   ├── RoomRepository.java
│   │   │   │   └── ... (27 repositories)
│   │   │   ├── entity/                          # JPA Entities
│   │   │   │   ├── User.java
│   │   │   │   ├── Booking.java
│   │   │   │   ├── Room.java
│   │   │   │   ├── Branch.java
│   │   │   │   ├── Payment.java
│   │   │   │   └── ... (27 entities)
│   │   │   ├── dto/                             # Data Transfer Objects
│   │   │   │   ├── request/                     # Request DTOs
│   │   │   │   ├── response/                    # Response DTOs
│   │   │   │   └── ...
│   │   │   ├── mapper/                          # MapStruct Mappers
│   │   │   │   ├── UserMapper.java
│   │   │   │   ├── BookingMapper.java
│   │   │   │   └── ...
│   │   │   ├── exception/                       # Custom Exceptions
│   │   │   │   ├── GlobalExceptionHandler.java  # Global error handler
│   │   │   │   ├── AppException.java
│   │   │   │   ├── ErrorCode.java
│   │   │   │   └── ...
│   │   │   ├── util/                            # Utility classes
│   │   │   │   ├── JwtUtil.java
│   │   │   │   ├── DateUtil.java
│   │   │   │   └── ...
│   │   │   ├── constant/                        # Constants
│   │   │   │   ├── PredefinedRole.java
│   │   │   │   ├── PredefinedPermission.java
│   │   │   │   └── ...
│   │   │   ├── enums/                           # Enumerations
│   │   │   │   ├── BookingStatus.java
│   │   │   │   ├── RoomStatus.java
│   │   │   │   ├── PaymentStatus.java
│   │   │   │   └── ...
│   │   │   ├── converter/                       # JPA Converters
│   │   │   └── socket/                          # WebSocket handlers
│   │   └── resources/
│   │       ├── application.yml                  # Main configuration
│   │       ├── application-dev.yml              # Dev profile
│   │       ├── application-prod.yml             # Production profile
│   │       ├── db/                              # Database scripts
│   │       │   ├── init-auto/                   # Auto-run scripts
│   │       │   │   ├── init-roles-permissions.sql
│   │       │   │   ├── init-vector-store.sql
│   │       │   │   └── fix-email-verified.sql
│   │       │   └── init.sql                     # Manual init script
│   │       ├── templates/                       # Email templates
│   │       │   └── email/
│   │       │       ├── booking-confirmation.html
│   │       │       └── ...
│   │       ├── docs/                            # Static documentation
│   │       └── images/                          # Static images
│   └── test/                                    # Test classes
│       └── java/com/aurora/backend/
│           └── ... (test packages)
├── target/                                      # Build output
├── postman/                                     # Postman collections
│   ├── Aurora Hotel Management System.postman_collection.json
│   ├── Aurora_Hotel_Authentication_Tests.postman_collection.json
│   └── Cloudinary API Test Collection.postman_collection.json
├── .env                                         # Environment variables (gitignored)
├── .env.example                                 # Environment template
├── .gitignore                                   # Git ignore rules
├── docker-compose.yml                           # Docker Compose config
├── Dockerfile                                   # Docker image definition
├── mvnw                                         # Maven wrapper (Unix)
├── mvnw.cmd                                     # Maven wrapper (Windows)
├── pom.xml                                      # Maven configuration
├── railway.json                                 # Railway deployment config
└── README.md                                    # This file
```

---

## 🔑 Key Technologies

### Spring Boot 3.5.5
- **Auto-configuration** - Convention over configuration
- **Embedded server** - Tomcat embedded by default
- **Production-ready** - Actuator, metrics, health checks
- **Spring Boot Starter** - Simplified dependency management

### Java 21 Features
- **Virtual Threads** - Lightweight concurrency
- **Pattern Matching** - Enhanced switch expressions
- **Records** - Immutable data classes
- **Sealed Classes** - Restricted inheritance
- **Text Blocks** - Multi-line strings

### Hibernate & JPA
- **Object-Relational Mapping** - Entity to table mapping
- **Lazy Loading** - Performance optimization
- **Caching** - First and second level cache
- **Batch Operations** - Bulk inserts/updates
- **Criteria API** - Type-safe queries

### Redis Integration
- **Token Management** - JWT refresh token storage
- **Session Storage** - User session data
- **Caching** - Application-level caching
- **Pub/Sub** - Real-time messaging (future)

### Langchain4j & AI
- **LLM Integration** - Google Gemini AI
- **Vector Store** - pgvector for embeddings
- **Document Processing** - Apache Tika parser
- **RAG Pattern** - Retrieval-Augmented Generation
- **Streaming** - Real-time AI responses

### MapStruct Benefits
- **Compile-time** - Type-safe mapping
- **High Performance** - No reflection overhead
- **IDE Support** - Auto-completion and refactoring
- **Lombok Integration** - Works with @Builder, @Data

### Security Features
- **JWT Tokens** - Stateless authentication
- **Method Security** - @PreAuthorize annotations
- **CORS** - Cross-Origin Resource Sharing
- **CSRF** - Protection for state-changing operations
- **Password Encoding** - BCrypt hashing

---

## 🛠️ Development Guidelines

### Code Style

- Follow **Java Code Conventions**
- Use **Lombok** annotations to reduce boilerplate
- Implement **MapStruct** for entity-DTO mapping
- Add **@Slf4j** for logging
- Use **@Validated** for input validation
- Document public APIs with **Javadoc**

### Entity Guidelines

```java
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    // ... other fields
}
```

### Service Layer

```java
@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return userMapper.toResponse(user);
    }
}
```

### Controller Layer

```java
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    
    @GetMapping("/{id}")
    @PreAuthorize("hasPermission('USER:VIEW')")
    public ApiResponse<UserResponse> getUserById(@PathVariable Long id) {
        return ApiResponse.success(userService.getUserById(id));
    }
}
```

### Exception Handling

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<Void>> handleAppException(AppException e) {
        return ResponseEntity
            .status(e.getErrorCode().getHttpStatus())
            .body(ApiResponse.error(e.getErrorCode()));
    }
}
```

### DTO Validation

```java
@Data
@Builder
public class CreateUserRequest {
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50)
    private String username;
    
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
}
```

### Logging Best Practices

```java
@Slf4j
public class BookingService {
    public Booking createBooking(BookingRequest request) {
        log.info("Creating booking for user: {}", request.getUserId());
        try {
            // Business logic
            log.debug("Booking created successfully: {}", booking.getId());
            return booking;
        } catch (Exception e) {
            log.error("Error creating booking", e);
            throw new AppException(ErrorCode.BOOKING_CREATION_FAILED);
        }
    }
}
```

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run with coverage
mvn clean test jacoco:report
```

### Test Structure

```java
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Test
    void testGetUserById() throws Exception {
        // Arrange
        UserResponse user = UserResponse.builder()
            .id(1L)
            .username("testuser")
            .build();
        when(userService.getUserById(1L)).thenReturn(user);
        
        // Act & Assert
        mockMvc.perform(get("/api/v1/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data.username").value("testuser"));
    }
}
```

### Testing Best Practices

- Write unit tests for services
- Integration tests for repositories
- API tests for controllers
- Use **@MockBean** for dependencies
- Use **@DataJpaTest** for repository tests
- Use **@WebMvcTest** for controller tests
- Maintain test coverage > 80%

---

## 🚀 Deployment

### Supported Platforms

- **Docker** - Containerized deployment
- **Railway** - Configured with `railway.json`
- **AWS Elastic Beanstalk** - Java application hosting
- **Heroku** - Cloud platform
- **Google Cloud Run** - Serverless containers
- **Azure App Service** - Managed hosting
- **Self-hosted** - Traditional servers with Tomcat/standalone

### Production Checklist

- ✅ Set `SPRING_PROFILES_ACTIVE=prod`
- ✅ Configure production database with connection pooling
- ✅ Set strong JWT_SIGNER_KEY
- ✅ Enable HTTPS/SSL
- ✅ Configure CORS for frontend domains
- ✅ Set up Redis for session management
- ✅ Configure email service (Mailjet)
- ✅ Set up Cloudinary for production
- ✅ Enable application monitoring (Spring Boot Actuator)
- ✅ Configure logging (ELK, Splunk, or similar)
- ✅ Set up database backups
- ✅ Configure rate limiting
- ✅ Enable security headers
- ✅ Set up CI/CD pipeline

### Environment Variables for Production

```env
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:postgresql://prod-db-host:5432/aurora_hotel
DB_USERNAME=prod_user
DB_PASSWORD=strong_secure_password
REDIS_HOST=prod-redis-host
JWT_SIGNER_KEY=strong-random-256-bit-production-key
ALLOWED_ORIGINS=https://yourdomain.com
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'feat: add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Commit Convention

Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Test additions or changes
- `chore:` - Build process or auxiliary tool changes
- `perf:` - Performance improvements

### Code Review Process

1. All PRs require code review
2. Ensure tests pass
3. Update documentation if needed
4. Follow code style guidelines
5. Add tests for new features

---

## 👥 Team

| Name | Role | GitHub |
|------|------|--------|
| **Nguyễn Trần Gia Sĩ** | Team Lead & Backend Developer | [@giasinguyen](https://github.com/giasinguyen) |
| **Nguyễn Văn Minh** | Frontend Developer | [@nvminh162](https://github.com/nvminh162) |
| **Nguyễn Trung Nguyên** | Backend Developer | [@NguyenNguyen0](https://github.com/NguyenNguyen0) |
| **Nguyễn Duy Khải** | Frontend Developer | [@NguyenDuyKhai2](https://github.com/NguyenDuyKhai2) |

---

## 📝 License

This project is part of the *Lập Trình WWW* course at **Industrial University of Ho Chi Minh City (IUH)**.

---

## 🔗 Related Projects

- **[Aurora Frontend](../aurora-frontend/)** - React 19 web application
- **[Aurora Documentation](../docs/)** - System documentation and diagrams


---

## 🙏 Acknowledgments

- **Industrial University of Ho Chi Minh City (IUH)** - Academic support
- **Spring Framework Team** - Excellent framework and documentation
- **Langchain4j Team** - AI integration framework
- **PostgreSQL & pgvector** - Powerful database with vector search
- **Open Source Community** - Amazing libraries and tools

---

**Built with ❤️ by the Aurora Hotel Team**
