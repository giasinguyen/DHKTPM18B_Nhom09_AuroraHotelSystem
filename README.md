# 🌌 Aurora Hotel Management System

> A full-stack hotel management & booking system built with **Spring Boot 3.5.5**, **React 19**, and **MySQL**.  
> This project was developed as part of the *Lập Trình WWW* course at **Industrial University of Ho Chi Minh City (IUH)**.

---

## 👥 Team Members

- **Nguyễn Trần Gia Sĩ**  
- **Nguyễn Văn Minh**  
- **Nguyễn Trung Nguyên 🗿**  
- **Nguyễn Duy Khải**

---

## 🚀 Tech Stack

### Frontend
- ⚛️ **React 19** (with Vite)
- 🎨 **TailwindCSS 4.1.13**
- 📝 **TypeScript 5.8.3**
- 🛠️ **ESLint** for code quality

### Backend
- ☕ **Spring Boot 3.5.5** (Java 21)
- 🔐 **Spring Security** with OAuth2 Client
- 🗄️ **Spring Data JPA** (Hibernate)
- ✅ **Spring Validation**
- 🛠️ **Lombok** for boilerplate code reduction
- 🔄 **MapStruct 1.6.3** for object mapping

### Database
- 🐬 **MySQL 8** with Connector/J

### Dev Tools
- 🔄 **Git & GitHub**
- 📦 **Maven** for dependency management
- 🚀 **Vite 7.1.2** for fast development

---

## ✨ Features (Planned)

- 👤 User Authentication (Login/Register with Spring Security, OAuth2)  
- 🏨 Hotel & Room Management  
- 📅 Booking & Reservation System  
- 💳 Online Payment Integration  
- 🎟️ Promotion & Discount Codes  
- 📊 Admin Dashboard with Reporting  
- 🔎 Search, Filter, Availability Checking  

---

## 📁 Project Structure

```
aurora-hotel-system/
├── aurora-backend/          # Spring Boot REST API
│   ├── src/main/java/com/aurora/backend/
│   │   ├── config/         # Security & app configuration
│   │   ├── controller/     # REST controllers
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── exception/     # Global exception handling
│   │   ├── mapper/        # MapStruct mappers
│   │   ├── repository/    # JPA repositories
│   │   ├── service/       # Business logic
│   │   └── util/          # Utility classes
│   ├── src/main/resources/
│   │   └── application.yml # App configuration
│   └── pom.xml            # Maven dependencies
├── aurora-frontend/        # React TypeScript app
│   ├── src/
│   │   ├── assets/        # Static assets
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # App entry point
│   ├── package.json       # Node dependencies
│   ├── vite.config.ts     # Vite configuration
│   └── tailwind.config.js # TailwindCSS config
└── README.md              # Project documentation
```

---

## 🛠️ Setup & Installation

### Prerequisites
- **Java 21** or higher
- **Node.js 18+** and **npm**
- **MySQL 8+**
- **Git**

### Database Setup
1. Create a MySQL database:
```sql
CREATE DATABASE aurora_hotel;
```

2. Update database credentials in `aurora-backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/aurora_hotel
    username: your_username
    password: your_password
```

### Backend Setup (Spring Boot)
```bash
cd aurora-backend
./mvnw clean install
./mvnw spring-boot:run
```
The backend will run on `http://localhost:8080`

### Frontend Setup (React)
```bash
cd aurora-frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

---

## 🚀 Development Commands

### Backend
```bash
# Run in development mode
./mvnw spring-boot:run

# Build for production
./mvnw clean package

# Run tests
./mvnw test
```

### Frontend
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🔧 Configuration

### Backend Configuration (`application.yml`)
- **Server Port**: 8080
- **Database**: MySQL with JPA/Hibernate
- **JPA Settings**: 
  - DDL Auto: `update`
  - Show SQL: `true`
  - Format SQL: `true`

### Frontend Configuration
- **Vite**: Fast build tool with HMR
- **TailwindCSS**: Utility-first CSS framework
- **TypeScript**: Strong typing for better development experience

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is developed for educational purposes as part of the **Lập Trình WWW** course at **Industrial University of Ho Chi Minh City (IUH)**.

---

## 📞 Contact

For any questions or support, please contact the development team:
- **Repository**: [aurora-hotel-system](https://github.com/giasinguyen/aurora-hotel-system)
- **Course**: Lập Trình WWW
- **Institution**: Industrial University of Ho Chi Minh City (IUH)

---

**Made with ❤️ by the Aurora Development Team**


