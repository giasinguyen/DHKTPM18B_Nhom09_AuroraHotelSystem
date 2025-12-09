# 🌌 Aurora Hotel Management System

> A comprehensive, enterprise-grade hotel management & booking system built with **Spring Boot 3.5.5**, **React 19**, and **PostgreSQL 16** with **pgvector**.  
> This project was developed as part of the *Lập Trình WWW* course at **Industrial University of Ho Chi Minh City (IUH)**.

---

## 🏷️ Tech Stack Badges

### Frontend
![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646cff?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-06b6d4?logo=tailwindcss&logoColor=white)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.9.0-764abc?logo=redux&logoColor=white)

### Backend
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-6db33f?logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-21-007396?logo=openjdk&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain4j-latest-00b4a9?logo=chainlink&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1?logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-7.2-dc382d?logo=redis&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-3.9-c71a36?logo=apachemaven&logoColor=white)


### Tools & DevOps
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ed?logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.40-000000?logo=jsonwebtokens&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-6.x-59666c?logo=hibernate&logoColor=white)
![Lombok](https://img.shields.io/badge/Lombok-1.18.36-bc2e24?logoColor=white)
![License](https://img.shields.io/badge/license-Educational-blue.svg)

---

## 👥 Team Members

| Name | Role | GitHub |
|------|------|--------|
| **Nguyễn Trần Gia Sĩ** | Team Lead & Backend Developer | [@giasinguyen](https://github.com/giasinguyen) |
| **Nguyễn Văn Minh** | Frontend Developer | [@nvminh162](https://github.com/nvminh162) |
| **Nguyễn Trung Nguyên** | Backend Developer | [@NguyenNguyen0](https://github.com/NguyenNguyen0) |
| **Nguyễn Duy Khải** | Frontend Developer | [@NguyenDuyKhai2](https://github.com/NguyenDuyKhai2) |

---

## 🚀 Tech Stack

### 🎨 Frontend
- ⚛️ **React 19** - Latest React with Compiler
- 🚀 **Vite 7.1.2** - Next generation frontend tooling
- 🎨 **TailwindCSS 4.1.13** - Utility-first CSS framework
- 📝 **TypeScript 5.8.3** - Type-safe JavaScript
- � **Redux Toolkit** - State management
- 🌐 **React Router v7** - Client-side routing
- 🎭 **Framer Motion** - Animation library
- �🛠️ **ESLint** - Code quality
- 🌍 **i18next** - Internationalization (Vietnamese/English)

### ⚙️ Backend
- ☕ **Java 21** - Latest LTS version with modern features
- 🍃 **Spring Boot 3.5.5** - Production-ready framework
- 🔐 **Spring Security** - Authentication & Authorization
- 🎫 **JWT (Nimbus JOSE)** - Token-based authentication
- 🗄️ **Spring Data JPA** - Data persistence with Hibernate
- ✅ **Spring Validation** - Input validation
- 🛠️ **Lombok 1.18.36** - Reduce boilerplate code
- 🔄 **MapStruct 1.6.3** - High-performance object mapping
- 🔍 **AOP (Aspect-Oriented Programming)** - Cross-cutting concerns
- 🔗 **Langchain4j** - AI framwork simplify integrating LLMs into Java applications
- 📊 **Slf4j + Logback** - Logging framework

### 🗄️ Database
- � **PostgreSQL 16** - Advanced open-source database
- 🔢 **pgvector** - Vector similarity search support
- 🐳 **Docker Compose** - Container orchestration
- 🔧 **pgAdmin 4** - Database management tool
- 📦 **HikariCP** - High-performance connection pool

### 🛠️ DevOps & Tools
- 🔄 **Git & GitHub** - Version control
- 📦 **Maven** - Dependency management & build tool
- � **Docker** - Containerization
- 📮 **Postman** - API testing & documentation
- 🔐 **dotenv-java** - Environment variable management
- 🚅 **railway** - Fullstack deploy platform

---

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ JWT-based authentication with refresh tokens
- ✅ Role-Based Access Control (RBAC) with 5 user roles
- ✅ Permission-based authorization with 70+ granular permissions
- ✅ AOP-based permission checking with AND/OR logic
- ✅ Token introspection & invalidation on logout
- ✅ Secure password hashing with BCrypt
- ✅ OAuth2 resource server integration

### 👥 User Management
- ✅ User registration & profile management
- ✅ Multi-role support (Admin, Manager, Staff, Customer, Guest)
- ✅ Branch assignment for staff and managers
- ✅ User search & pagination
- ✅ Soft delete functionality
- ✅ Audit trails (created/updated timestamps)

### 🏢 Multi-Branch System
- ✅ Multiple hotel branches support
- ✅ Branch-specific configurations (check-in/out times, operating hours)
- ✅ Branch manager assignment
- ✅ Geographic coordinates for map integration
- ✅ Branch status management (Active, Inactive, Maintenance)
- ✅ Branch-level statistics & reporting

### 🏨 Room Management
- ✅ Room types with flexible pricing (base, weekend, holiday)
- ✅ Room status tracking (Available, Occupied, Cleaning, Maintenance, etc.)
- ✅ Capacity management (adults, children, max occupancy)
- ✅ Bed type configurations
- ✅ Room amenities management
- ✅ Price override per room
- ✅ Room images & descriptions
- ✅ Multi-branch room management

### 📅 Booking System
- ✅ Multi-room booking support
- ✅ Booking status workflow (Pending → Confirmed → Checked-in → Completed)
- ✅ Auto-generated unique booking codes
- ✅ Deposit tracking
- ✅ Special requests handling
- ✅ Check-in/out time tracking
- ✅ Cancellation with reason tracking
- ✅ Email & SMS notification flags
- ✅ No-show handling

### 💳 Payment Integration
- ✅ Multiple payment methods (Cash, Card, Bank Transfer, VNPay, MoMo, ZaloPay)
- ✅ Payment status tracking
- ✅ Refund management (full & partial)
- ✅ Payment gateway integration ready
- ✅ Currency support
- ✅ Transaction history

### 🎟️ Promotions & Discounts
- ✅ Percentage & fixed amount discounts
- ✅ Date-based promotion validity
- ✅ Minimum booking amount conditions
- ✅ Usage limit tracking
- ✅ Room type specific promotions
- ✅ Branch-specific or global promotions
- ✅ Priority-based promotion stacking

### 🛎️ Additional Services
- ✅ Add-on services (Spa, Massage, Airport Transfer, etc.)
- ✅ Service booking with time slot management
- ✅ Service capacity & availability tracking
- ✅ Service pricing & duration management
- ✅ Service status workflow
- ✅ Special instructions support

### 🏊 Facilities Management
- ✅ Hotel facilities (Pool, Gym, Restaurant, Conference Rooms, etc.)
- ✅ Operating hours & policies
- ✅ Reservation requirements
- ✅ Capacity management
- ✅ Free vs. paid facilities
- ✅ Facility images & descriptions

### 🎯 Amenities
- ✅ Room amenities (TV, WiFi, Minibar, etc.)
- ✅ Categorized amenities (Room, Bathroom, Entertainment, Technology, etc.)
- ✅ Icon support for UI display
- ✅ Active/Inactive status
- ✅ Display order configuration

### 📊 Reporting & Analytics
- 🚧 Dashboard with key metrics (In Progress)
- 🚧 Booking analytics & trends (Planned)
- 🚧 Revenue reports (Planned)
- 🚧 Occupancy rate tracking (Planned)
- 🚧 Export to PDF/Excel (Planned)

### 🤖 AI-Powered Features (RAG Chatbot)
- ✅ Retrieval-Augmented Generation (RAG) chatbot
- ✅ Integration with Google Gemini AI (gemini-2.5-flash)
- ✅ Vector similarity search with pgvector
- ✅ Document-based question answering
- ✅ Context-aware intelligent responses
- ✅ Real-time streaming chat support
- ✅ Document parsing and text extraction (Apache Tika)
- ✅ Semantic search over hotel documentation
- ✅ Natural language hotel information retrieval
- ✅ Multi-language support (Vietnamese & English)

---

### 🔑 Key Features
- **15 Entities** with comprehensive relationships
- **Enum-based status management** for type safety
- **Soft delete** support across all entities
- **Audit trails** (createdAt, updatedAt) on all tables
- **Optimized indexes** for query performance
- **UUID primary keys** for security
- **RBAC** with 5 roles and 70+ granular permissions
- **AI-Powered RAG Chatbot** with Langchain4j & Google Gemini AI
- **Vector Search** with pgvector for semantic document retrieval

---

## 📖 Project Documentation

For detailed setup and development guides, please refer to:

- **[📱 Frontend Documentation](./aurora-frontend/README.md)** - React, TypeScript, Vite setup and development
- **[⚙️ Backend Documentation](./aurora-backend/README.md)** - Spring Boot, Java, PostgreSQL setup and API reference
- **[📐 System Diagrams](./docs/README.md)** - Class diagrams, database schemas, and ERD

---

## �🛠️ Quick Start Guide

### Prerequisites
- ☕ **Java 21** - [Download](https://www.oracle.com/java/technologies/downloads/)
- 📦 **Maven 3.9+** - Included in project (Maven Wrapper)
- 🐘 **PostgreSQL 16+** - [Download](https://www.postgresql.org/download/) or use Docker
- 📱 **Node.js 20+** - [Download](https://nodejs.org/)
- 🐳 **Docker & Docker Compose** - [Download](https://www.docker.com/) (Recommended)
- 🔧 **Git** - [Download](https://git-scm.com/)

> 💡 **Tip:** For detailed installation instructions, see [Backend Setup Guide](./aurora-backend/README.md#-installation) and [Frontend Setup Guide](./aurora-frontend/README.md#-installation)

### 🐘 Database Setup (Docker Compose - Recommended)

```bash
# Clone the repository
git clone https://github.com/giasinguyen/aurora-hotel-system.git
cd aurora-hotel-system/aurora-backend

# Start PostgreSQL + Redis + pgAdmin containers
docker-compose up -d

# Check container status
docker-compose ps

# Containers will be available:
# - PostgreSQL: localhost:5432
# - Redis: localhost:6379
# - pgAdmin: http://localhost:5050
#   - Email: admin@gmail.com
#   - Password: admin
```

**Database Credentials (Docker):**
- Host: `localhost`
- Port: `5432`
- Database: `aurora_hotel`
- Username: `admin`
- Password: `admin`

> 📚 **Detailed Instructions:** See [Backend Database Setup](./aurora-backend/README.md#-database-setup)_hotel`
- Username: `admin`
---tgres=# GRANT ALL PRIVILEGES ON DATABASE aurora_hotel TO aurora_user;
postgres=# \q
```

---

### ⚙️ Backend Setup (Spring Boot)

```bash
# Navigate to backend directory
cd aurora-backend

# Create .env file (copy from .env.example if exists)
touch .env

# Add environment variables to .env:
DB_URL=jdbc:postgresql://localhost:5432/aurora_hotel
DB_USERNAME=admin
DB_PASSWORD=admin
JWT_SIGNER_KEY=your_secret_key_min_32_characters_long_for_hs512_algorithm
JWT_VALID_DURATION=3600
JWT_REFRESHABLE_DURATION=86400
```

**Generate secure JWT key:**
```bash
# Generate a secure 64-character key
openssl rand -hex 32
```

### ⚙️ Backend Setup (Spring Boot)

```bash
# Navigate to backend directory
cd aurora-backend

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# Minimum required variables:
# - DB_URL=jdbc:postgresql://localhost:5432/aurora_hotel
# - DB_USERNAME=admin
# - DB_PASSWORD=admin
# - JWT_SIGNER_KEY=<generate-secure-key>
# - REDIS_HOST=localhost
# - REDIS_PORT=6379
# - REDIS_PASSWORD=admin
### 🎨 Frontend Setup (React + Vite)

```bash
# Navigate to frontend directory
cd aurora-frontend

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your configuration
# - VITE_API_BASE_URL=http://localhost:8080
# - VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
# - VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
### 🔙 Backend Commands

```bash
# Development mode with auto-reload
./mvnw spring-boot:run

# Build for production
./mvnw clean package -DskipTests

# Run tests
./mvnw test
```

> 📚 **More Commands:** See [Backend README](./aurora-backend/README.md#-running-the-application)

### 🎨 Frontend Commands

```bash
# Start development server (hot-reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

> 📚 **More Commands:** See [Frontend README](./aurora-frontend/README.md#-running-the-application) **Complete Frontend Guide:** See [Frontend README](./aurora-frontend/README.md) for:
> - Detailed setup instructions
> - Component architecture
> - State management with Redux
> - Styling with TailwindCSS
> - Building for production
> - Docker deployment
# Development mode with auto-reload
./mvnw spring-boot:run

# Run with specific profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# Build for production
./mvnw clean package -DskipTests

# Run tests
./mvnw test

# Run tests with coverage
./mvnw test jacoco:report

# Clean build
./mvnw clean

# Format code
./mvnw spotless:apply
```

### 🎨 Frontend Commands

```bash
# Start development server (hot-reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
---

## ⚙️ Configuration

### Environment Variables

Both frontend and backend require environment configuration:

**Backend (.env):**
```env
DB_URL=jdbc:postgresql://localhost:5432/aurora_hotel
DB_USERNAME=admin
DB_PASSWORD=admin
JWT_SIGNER_KEY=your-secure-key
REDIS_HOST=localhost
REDIS_PORT=6379
```

**Frontend (.env.local):**
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
```

> 📚 **Complete Configuration Guide:**
> - [Backend Configuration](./aurora-backend/README.md#-configuration)
> - [Frontend Configuration](./aurora-frontend/README.md#-configuration)

---ing:
  jpa:
    show-sql: true
    properties:
      hibernate:
        format_sql: true
logging:
  level:
    com.aurora.backend: DEBUG
```

**`application-prod.yml`** (Production)
```yaml
spring:
  jpa:
    show-sql: false
    hibernate:
      ddl-auto: validate
logging:
  level:
    com.aurora.backend: INFO
```

### Frontend Configuration

**`vite.config.ts`**
- Proxy API requests to backend
- Build optimization
- Path aliases configuration

**`tailwind.config.js`**
- Custom theme colors
- Responsive breakpoints
- Custom utilities

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/token` | Login & get JWT token | ❌ |
| POST | `/api/v1/auth/refresh` | Refresh access token | ❌ |
| POST | `/api/v1/auth/introspect` | Validate token | ❌ |
| POST | `/api/v1/auth/logout` | Logout & invalidate token | ❌ |
| POST | `/api/v1/users/register` | Register new customer | ❌ |

### User Management

| Method | Endpoint | Description | Permission Required |
|--------|----------|-------------|---------------------|
| GET | `/api/v1/users` | Get all users | `USER_CREATE` / `STAFF_VIEW` |
| GET | `/api/v1/users/paginated` | Get users with pagination | `USER_CREATE` / `STAFF_VIEW` |
| GET | `/api/v1/users/{id}` | Get user by ID | `PROFILE_VIEW` |
| POST | `/api/v1/users` | Create new user | `USER_CREATE` |
| PUT | `/api/v1/users/{id}` | Update user | `PROFILE_UPDATE` |
| DELETE | `/api/v1/users/{id}` | Delete user | `USER_DELETE` |

### Branch Management
## 📚 API Documentation

### Quick API Reference

**Key Endpoints:**
- 🔐 **Authentication:** `/auth/login`, `/auth/refresh`, `/auth/logout`
- 👥 **Users:** `/users`, `/users/{id}`, `/users/my-profile`
- 🏢 **Branches:** `/branches`, `/branches/{id}`
- 🏨 **Rooms:** `/rooms`, `/room-types`, `/room-categories`
- 📅 **Bookings:** `/bookings`, `/bookings/{id}`
- 💳 **Payments:** `/payments`, `/payments/vnpay`
- 🛎️ **Services:** `/services`, `/service-categories`
- 📰 **Content:** `/news`, `/promotions`, `/documents`
- 🤖 **AI Chatbot:** `/rag/chat`, `/rag/chat-stream` (RAG-powered Q&A)

**Postman Collections:**`, `/promotions`, `/documents`

**Postman Collections:**
- `postman/Aurora Hotel Management System.postman_collection.json`
- `postman/Aurora_Hotel_Authentication_Tests.postman_collection.json`

> 📚 **Complete API Documentation:** See [Backend API Reference](./aurora-backend/README.md#-api-documentation) for:
> - All endpoints with request/response examples
> - Authentication flow
> - Permission requirements
> - Error codes
> - Rate limiting


---

## 🎯 Design Patterns & Best Practices

### Applied Design Patterns
- ✅ **Repository Pattern** - Data access abstraction
- ✅ **Service Layer Pattern** - Business logic separation
- ✅ **DTO Pattern** - Request/Response data transfer
- ✅ **Builder Pattern** - Entity construction (Lombok)
- ✅ **Aspect-Oriented Programming** - Cross-cutting concerns
- ✅ **Dependency Injection** - Loose coupling
- ✅ **Factory Pattern** - Object creation

### Code Quality Measures
- ✅ **SOLID Principles** - Clean code architecture
- ✅ **DRY (Don't Repeat Yourself)** - Code reusability
- ✅ **Separation of Concerns** - Layered architecture
- ✅ **Type Safety** - Enums for status fields
- ✅ **Null Safety** - @NonNull annotations
- ✅ **Transaction Management** - @Transactional
- ✅ **Exception Handling** - Centralized error handling
- ✅ **Logging** - Comprehensive logging with Slf4j
- ✅ **Validation** - Input validation with Bean Validation
- ✅ **Security** - JWT, BCrypt, RBAC

### Database Best Practices
- ✅ **Indexes** - Query optimization
- ✅ **Lazy Loading** - Performance optimization
- ✅ **Batch Operations** - Bulk insert/update
- ✅ **Connection Pooling** - HikariCP
- ✅ **Soft Delete** - Data preservation
- ✅ **Audit Trail** - Created/Updated timestamps
- ✅ **UUID Keys** - Security & distributed systems

---

## 🚀 Deployment

### Production Checklist

#### Backend
- [ ] Change `ddl-auto` to `validate` in production
- [ ] Set `show-sql` to `false`
- [ ] Use strong JWT secret key (64+ characters)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up database backup schedule
- [ ] Configure log rotation
- [ ] Set up monitoring & alerting
- [ ] Enable rate limiting
- [ ] Configure firewall rules

#### Frontend
- [ ] Run production build: `npm run build`
- [ ] Configure environment variables
- [ ] Set up CDN for static assets
- [ ] Enable gzip compression
- [ ] Configure caching headers
- [ ] Minify JavaScript/CSS
- [ ] Optimize images
- [ ] Set up error tracking (e.g., Sentry)

### Deployment Options

**Backend:**
- AWS EC2 / Azure VM
- AWS Elastic Beanstalk
- Heroku / Railway
- Docker containers on any cloud

**Frontend:**
- Vercel (Recommended for Vite)
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps
- GitHub Pages

**Database:**
- AWS RDS PostgreSQL
- Azure Database for PostgreSQL
- Supabase
- Railway
- Self-hosted PostgreSQL

---

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
```bash
# Check Java version
java -version  # Should be 21+

# Check PostgreSQL connection
psql -h localhost -U admin -d aurora_hotel

# Check environment variables
cat .env

# Clean build
./mvnw clean install -U
```

**Database connection errors:**
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check credentials in `.env` file
- Ensure database `aurora_hotel` exists
- Check firewall rules for port 5432

**Frontend build errors:**
---

## 🚀 Deployment

### Docker Deployment (Recommended)

```bash
# Build backend Docker image
cd aurora-backend
docker build -t aurora-backend:latest .

# Build frontend Docker image
cd aurora-frontend
docker build -t aurora-frontend:latest .

# Run with Docker Compose (full stack)
docker-compose up -d
```

### Deployment Options

| Component | Recommended Platform | Alternative |
|-----------|---------------------|-------------|
| **Backend** | Railway, AWS Elastic Beanstalk | Heroku, Azure App Service, Google Cloud Run |
| **Frontend** | Vercel, Netlify | AWS S3 + CloudFront, Railway |
| **Database** | AWS RDS PostgreSQL, Supabase | Railway, Azure Database, Self-hosted |

> 📚 **Deployment Guides:**
> - [Backend Deployment](./aurora-backend/README.md#-docker-deployment)
> - [Frontend Deployment](./aurora-frontend/README.md#-docker-deployment)
> - Production checklists included in each guidere/AmazingFeature
   ```

6. **Open a Pull Request**
   - Provide clear description
   - Reference related issues
   - Wait for code review

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

### Code Style

**Backend (Java):**
- Follow Java naming conventions
- Use Lombok annotations appropriately
- Add Javadoc for public methods
- Keep methods small and focused

**Frontend (TypeScript):**
- Follow ESLint rules
- Use TypeScript types strictly
- Component-based architecture
- Meaningful variable names

---

## 📊 Project Status
### ✅ Completed Features
- [x] User authentication & authorization (JWT + RBAC)
- [x] Multi-branch management system
- [x] Room & room type management with pricing
- [x] Booking system with status workflow
- [x] Payment integration framework
- [x] Promotion system
- [x] Additional services management
- [x] Facilities & amenities
- [x] RAG chatbot with Langchain4j & Google Gemini AI
- [x] Vector similarity search with pgvector
- [x] Document management & semantic search
- [x] Database schema with 15 entities
- [x] RESTful API with 60+ endpoints
- [x] Comprehensive error handling
- [x] Audit trails & soft delete

### 🚧 In Progress
### 🚧 In Progress
- [ ] Frontend UI implementation
- [ ] Payment gateway integration (VNPay, MoMo)
- [ ] Email/SMS notifications
- [ ] Admin dashboard & reporting
- [ ] Search & filter optimization
- [ ] File upload (images)

### 📋 Planned Features
- [ ] Real-time availability checking
- [ ] Booking calendar view
- [ ] Customer reviews & ratings
- [ ] Loyalty program
- [ ] Multi-language support (full)
- [ ] Mobile responsive design
- [ ] Export reports (PDF/Excel)
- [ ] Automated backup system
- [ ] Analytics dashboard
- [ ] AI-powered recommendations

---

## 📚 Learning Resources

### Spring Boot
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Reference](https://docs.spring.io/spring-security/reference/)
- [Baeldung Spring Tutorials](https://www.baeldung.com/spring-boot)

### React & TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

### Database
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JPA & Hibernate Guide](https://hibernate.org/orm/documentation/)

---

## 📜 License

This project is developed for **educational purposes** as part of the **Lập Trình WWW (Web Programming)** course at **Industrial University of Ho Chi Minh City (IUH)**.

**© 2024-2025 Aurora Development Team. All Rights Reserved.**

---

## 📞 Contact & Support

### Development Team
- 👨‍💻 **Team Lead**: Nguyễn Trần Gia Sĩ - [@giasinguyen](https://github.com/giasinguyen)
- 📧 **Email**: [Contact via GitHub Issues](https://github.com/giasinguyen/aurora-hotel-system/issues)

### Repository
- 🔗 **GitHub**: [aurora-hotel-system](https://github.com/giasinguyen/aurora-hotel-system)
- 📝 **Issue Tracker**: [Report bugs or request features](https://github.com/giasinguyen/aurora-hotel-system/issues)
- 💬 **Discussions**: [Join community discussions](https://github.com/giasinguyen/aurora-hotel-system/discussions)

### Academic Information
- 🏫 **Institution**: Industrial University of Ho Chi Minh City (IUH)
- 📚 **Course**: Lập Trình WWW (Web Programming)
- 📅 **Academic Year**: 2025

---

## 🙏 Acknowledgments

- Spring Boot & Spring Framework teams
- React & TypeScript communities
- PostgreSQL development team
- All open-source contributors
- IUH Faculty of Information Technology
- Our course instructor and mentors

---

<div align="center">

### ⭐ Star this repository if you find it helpful! ⭐

**Made with ❤️ by Aurora Development Team**

**🌌 Building the future of hotel management, one commit at a time 🌌**

</div>


