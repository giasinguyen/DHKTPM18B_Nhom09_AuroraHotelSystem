# 🌌 Aurora Hotel Management System - Frontend

> Modern, responsive, and feature-rich hotel management frontend built with **React 19**, **TypeScript**, **Vite**, and **TailwindCSS 4**.  
> Part of the Aurora Hotel Management System ecosystem.

![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646cff?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-06b6d4?logo=tailwindcss&logoColor=white)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.9.0-764abc?logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-7.9.4-ca4245?logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.12.2-5a29e4?logo=axios&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.24-0055ff?logo=framer&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4b32c3?logo=eslint&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-25.6.0-26a69a?logo=i18next&logoColor=white)
![License](https://img.shields.io/badge/license-Educational-blue.svg)

---

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Building for Production](#-building-for-production)
- [Docker Deployment](#-docker-deployment)
- [Project Structure](#-project-structure)
- [Key Technologies](#-key-technologies)
- [Development Guidelines](#-development-guidelines)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Introduction

Aurora Hotel Frontend is a comprehensive web application designed to manage all aspects of hotel operations, from room bookings and guest management to staff workflows and administrative tasks. Built with modern web technologies, it provides an intuitive, fast, and reliable user experience for hotel staff, managers, and guests.

### Key Highlights

- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 🌍 **Multi-language Support** - Vietnamese and English localization
- 🔐 **Secure Authentication** - JWT-based auth with role-based access control
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- ⚡ **Lightning Fast** - Powered by Vite for instant HMR and optimized builds
- 🎭 **Rich Interactions** - Framer Motion animations and smooth transitions
- 🧩 **Component Library** - Radix UI primitives with custom styling
- 📊 **Data Visualization** - Interactive charts and reports with Recharts
- 🤖 **AI Chat Support** - Integrated RAG-powered chat widget
- 📄 **Document Management** - PDF viewing, rich text editing with TipTap

---

## ✨ Features

### 🔐 Authentication & User Management
- JWT-based authentication with refresh tokens
- Role-based access control (Admin, Manager, Staff, Customer, Guest)
- User profile management with avatar upload
- Password reset and account recovery
- Session management and auto-logout

### 🏢 Multi-Branch Operations
- Branch selection and switching
- Branch-specific data filtering
- Geographic location support
- Operating hours and timezone management

### 🏨 Room & Booking Management
- Real-time room availability checking
- Multi-room booking support
- Interactive booking calendar
- Booking status tracking (Pending → Confirmed → Checked-in → Completed)
- Payment integration with VNPay
- Booking history and reports

### 📊 Dashboard & Analytics
- Executive dashboard with key metrics
- Interactive charts and visualizations
- Revenue tracking and analysis
- Occupancy rate monitoring
- Custom date range filtering

### 📰 Content Management
- News and events management
- Rich text editor with TipTap
- Image upload to Cloudinary
- Content localization support
- Gallery management

### 📄 Document Management
- PDF document viewer
- Document categorization
- Search and filter capabilities
- File upload and management

### 🛎️ Services & Amenities
- Service catalog management
- Service category organization
- Booking-specific service additions
- Amenity assignments to rooms

### 👔 Staff Management
- Shift scheduling and management
- Role and permission assignment
- Staff performance tracking
- Branch assignment

### 📈 Reports & Export
- Excel report generation
- PDF export functionality
- Custom report filtering
- Data visualization

### 🤖 AI-Powered Features
- RAG (Retrieval-Augmented Generation) chatbot
- Intelligent document search
- Context-aware assistance

---

## 🚀 Tech Stack

### Core Framework
- **React 19.1.1** - Latest React with improved performance
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.1.2** - Next-generation frontend tooling with instant HMR

### Styling & UI
- **TailwindCSS 4.1.14** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
  - Dialog, Dropdown, Popover, Tooltip, Select, Switch, Tabs, and more
- **Framer Motion 12.23.24** - Production-ready animation library
- **Lucide React** - Beautiful, consistent icon library
- **SASS** - CSS preprocessor for custom styles

### State Management
- **Redux Toolkit 2.9.0** - Modern Redux with simplified API
- **React Redux 9.2.0** - Official React bindings for Redux
- **Redux Persist 6.0.0** - Persist and rehydrate Redux store

### Routing
- **React Router v7.9.4** - Declarative routing for React

### Forms & Validation
- **React Hook Form 7.67.0** - Performant, flexible forms
- **Yup 1.7.1** - Schema validation
- **@hookform/resolvers** - Form validation resolvers

### Data Fetching & API
- **Axios 1.12.2** - Promise-based HTTP client
- Custom axios interceptors for authentication

### Rich Text Editing
- **TipTap 3.13.0** - Headless, framework-agnostic rich text editor
  - Highlight, Image, List, Typography extensions
  - Subscript, Superscript, Text align support
  - Horizontal rules and more

### PDF & Documents
- **@react-pdf-viewer** - PDF viewing and rendering
- **jsPDF** - Client-side PDF generation
- **jsPDF AutoTable** - Table plugin for jsPDF
- **html2canvas** - HTML to canvas conversion

### Data Visualization
- **Recharts 3.5.1** - Composable charting library

### Excel & Export
- **ExcelJS 4.4.0** - Excel spreadsheet manipulation
- **File Saver 2.0.5** - Client-side file saving

### Internationalization
- **i18next 25.6.0** - Internationalization framework
- **react-i18next 16.0.0** - React integration for i18next
- **i18next-browser-languagedetector** - Language detection plugin

### Utilities
- **date-fns 4.1.0** - Modern date utility library
- **class-variance-authority** - CSS class variance utility
- **clsx** - Conditional className utility
- **tailwind-merge** - Merge Tailwind classes intelligently
- **lodash.throttle** - Function throttling
- **ua-parser-js** - User agent string parser
- **html-to-text** - HTML to plain text conversion
- **slugify** - String slugification

### UI Components & Libraries
- **Sonner 2.0.7** - Toast notification library
- **Embla Carousel** - Lightweight carousel library
- **React File Icon** - File type icons
- **React Markdown** - Markdown rendering
- **React Hotkeys Hook** - Keyboard shortcuts

### Development Tools
- **ESLint 9** - Code linting
- **TypeScript ESLint** - TypeScript linting rules
- **Vite Plugin React SWC** - Fast refresh with SWC compiler

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.x (LTS recommended)
- **npm** >= 10.x or **yarn** >= 1.22.x
- **Git** for version control
- **Code Editor** (VS Code recommended)

### Optional
- **Docker** and **Docker Compose** (for containerized deployment)
- **Aurora Backend** running on port 8080 (default API endpoint)

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/giasinguyen/aurora-hotel-system.git
cd aurora-hotel-system/aurora-frontend
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080

# Cloudinary Configuration (for image uploads)
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080` | Yes |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image uploads | - | Yes |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary upload preset | - | Yes |
| `NODE_ENV` | Environment mode | `development` | No |

### Vite Configuration

The application uses Vite with the following configuration (`vite.config.ts`):

- **Port**: 3000 (development server)
- **Auto-open**: Browser opens automatically on start
- **Path aliases**: `@/` maps to `./src/`
- **Plugins**: React SWC for fast refresh, TailwindCSS for styling

### TypeScript Configuration

- **Strict mode** enabled for type safety
- **Path mapping** for clean imports (`@/components`, `@/utils`, etc.)
- **JSX**: React JSX transform

---

## 🏃 Running the Application

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

The dev server features:
- ⚡ Instant hot module replacement (HMR)
- 🔍 TypeScript type checking
- 🎨 TailwindCSS compilation
- 🔄 Auto-reload on file changes

### Preview Production Build

Build and preview the production build locally:

```bash
npm run build
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

---

## 🏗️ Building for Production

### Create Production Build

```bash
npm run build
```

This will:
1. Run TypeScript compiler (`tsc -b`)
2. Build optimized production bundle with Vite
3. Output static files to `dist/` directory

### Build Output

The `dist/` folder will contain:
- Minified JavaScript bundles
- Optimized CSS files
- Static assets (images, fonts, etc.)
- `index.html` entry point
- Chunk files for code splitting

### Build Optimizations

- ✅ Tree shaking for unused code elimination
- ✅ Code splitting for optimal loading
- ✅ Asset optimization (images, fonts)
- ✅ CSS minification
- ✅ JavaScript minification and compression
- ✅ Source maps for debugging (optional)

---

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t aurora-frontend:latest .
```

### Run Docker Container

```bash
docker run -d \
  -p 8080:8080 \
  -e VITE_API_BASE_URL=http://your-api-url:8080 \
  -e VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name \
  -e VITE_CLOUDINARY_UPLOAD_PRESET=your_preset \
  --name aurora-frontend \
  aurora-frontend:latest
```

### Docker Configuration

The Dockerfile uses a **multi-stage build**:

1. **Build Stage** (Node 20 Alpine)
   - Installs dependencies
   - Builds production bundle

2. **Production Stage** (Nginx Alpine)
   - Serves static files with Nginx
   - Includes runtime environment variable injection
   - Configures Nginx for SPA routing

### Environment Variables at Runtime

The Docker container supports runtime environment variable injection through `docker-entrypoint.sh`:

```bash
docker run -d \
  -p 8080:8080 \
  -e VITE_API_BASE_URL=https://production-api.com \
  aurora-frontend:latest
```

### Nginx Configuration

- Gzip compression enabled
- Security headers configured
- SPA routing support (fallback to index.html)
- Static asset caching
- Custom port support via `PORT` environment variable

---

## 📁 Project Structure

```
aurora-frontend/
├── public/                      # Static assets
│   └── env-config.template.js  # Runtime env config template
├── src/
│   ├── assets/                 # Images, fonts, videos
│   │   ├── fonts/
│   │   ├── images/
│   │   └── videos/
│   ├── components/             # React components
│   │   ├── booking/           # Booking-related components
│   │   ├── custom/            # Custom reusable components
│   │   ├── titap/             # TipTap editor components
│   │   └── ui/                # Radix UI components
│   ├── config/                # Configuration files
│   │   ├── axiosClient.ts     # Axios instance with interceptors
│   │   ├── publicAxiosClient.ts # Public axios (no auth)
│   │   ├── cloudinary.ts      # Cloudinary config
│   │   └── i18n.ts            # Internationalization config
│   ├── features/              # Redux features
│   │   ├── store.ts           # Redux store configuration
│   │   ├── slices/            # Redux slices
│   │   └── documents/         # Document-related state
│   ├── font/                  # Font configurations
│   ├── hooks/                 # Custom React hooks
│   │   ├── useDashboard.ts
│   │   ├── useReports.ts
│   │   ├── useRoomAvailability.ts
│   │   └── titap/             # TipTap editor hooks
│   ├── layouts/               # Layout components
│   │   ├── admin/             # Admin layout
│   │   ├── client/            # Client/guest layout
│   │   ├── manager/           # Manager layout
│   │   └── staff/             # Staff layout
│   ├── lib/                   # Utility libraries
│   │   ├── utils.ts           # General utilities
│   │   └── tiptap-utils.ts    # TipTap utilities
│   ├── locales/               # Translation files
│   │   ├── en/                # English translations
│   │   └── vi/                # Vietnamese translations
│   ├── mocks/                 # Mock data for development
│   ├── pages/                 # Page components
│   │   ├── admin/             # Admin pages
│   │   ├── auth/              # Authentication pages
│   │   ├── bookings/          # Booking pages
│   │   ├── branches/          # Branch management
│   │   ├── common/            # Common pages (404, etc.)
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── document/          # Document management
│   │   ├── landing/           # Public landing page
│   │   ├── news/              # News management
│   │   ├── promotion/         # Promotions
│   │   ├── reports/           # Reporting pages
│   │   ├── role/              # Role management
│   │   ├── rooms/             # Room management
│   │   ├── services/          # Service management
│   │   ├── shifts/            # Shift scheduling
│   │   └── user/              # User management
│   ├── router/                # React Router configuration
│   │   └── index.tsx          # Route definitions
│   ├── services/              # API service layer
│   │   ├── amenityApi.ts
│   │   ├── authApi.ts
│   │   ├── bookingApi.ts
│   │   ├── branchApi.ts
│   │   ├── dashboardApi.ts
│   │   ├── documentApi.ts
│   │   ├── newsApi.ts
│   │   ├── reportApi.ts
│   │   ├── roomApi.ts
│   │   ├── serviceApi.ts
│   │   ├── shiftApi.ts
│   │   ├── userApi.ts
│   │   └── vnpayService.ts
│   ├── styles/                # Global styles
│   │   ├── _keyframe-animations.scss
│   │   ├── _variables.scss
│   │   └── tiptap-content.scss
│   ├── types/                 # TypeScript type definitions
│   │   ├── apiResponse.d.ts
│   │   ├── booking.types.ts
│   │   ├── branch.types.ts
│   │   ├── dashboard.types.ts
│   │   ├── document.types.ts
│   │   ├── user.types.ts
│   │   └── ...
│   ├── utils/                 # Utility functions
│   └── validation/            # Form validation schemas
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global CSS imports
├── .dockerignore              # Docker ignore rules
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── components.json            # Radix UI components config
├── docker-entrypoint.sh       # Docker entrypoint script
├── Dockerfile                 # Docker image definition
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML template
├── nginx.conf                 # Nginx configuration
├── package.json               # Dependencies and scripts
├── railway.json               # Railway deployment config
├── tsconfig.json              # TypeScript configuration
├── tsconfig.app.json          # App-specific TS config
├── tsconfig.node.json         # Node-specific TS config
└── vite.config.ts             # Vite configuration
```

---

## 🔑 Key Technologies

### React 19 Features
- **Concurrent Rendering** - Improved performance and responsiveness
- **Automatic Batching** - Optimized state updates
- **Transitions** - Smooth UI state changes
- **Suspense** - Better loading states

### Redux Toolkit
- **Simplified Store Setup** - Less boilerplate code
- **Immer Integration** - Immutable state updates made easy
- **Redux DevTools** - Built-in debugging support
- **RTK Query Ready** - Can be extended with RTK Query

### TailwindCSS 4
- **JIT Compiler** - Lightning-fast build times
- **Arbitrary Values** - Ultimate flexibility
- **Modern CSS Features** - Container queries, cascade layers
- **Optimized Output** - Minimal CSS bundle size

### Vite Advantages
- ⚡ **Instant Server Start** - No bundling in development
- 🔥 **Lightning Fast HMR** - Updates in milliseconds
- 🎯 **Optimized Builds** - Rollup-powered production builds
- 🔌 **Plugin Ecosystem** - Rich plugin support

### Component Architecture
- **Atomic Design** - UI, custom, and feature components
- **Composition Pattern** - Flexible, reusable components
- **Headless UI** - Radix UI for accessibility
- **Custom Hooks** - Logic separation and reusability

---

## 🛠️ Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write descriptive variable and function names
- Add JSDoc comments for complex functions

### Component Guidelines

```typescript
// ✅ Good: Typed props, clear naming
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={cn(buttonVariants({ variant }))}
    >
      {label}
    </button>
  );
};
```

### State Management

- Use Redux for global state (auth, branch, etc.)
- Use local state for component-specific data
- Implement Redux Toolkit slices for features
- Use Redux Persist for critical state

### API Integration

```typescript
// Use axios instances with interceptors
import axiosClient from '@/config/axiosClient';

export const getUserProfile = async () => {
  const response = await axiosClient.get('/api/users/profile');
  return response.data;
};
```

### Routing

- Use lazy loading for route components
- Implement protected routes with auth guards
- Define route types for type safety

### Styling

- Use TailwindCSS utility classes
- Create custom components for reusable styles
- Use `cn()` utility for conditional classes
- Keep styles co-located with components

### Forms

```typescript
// Use React Hook Form with Yup validation
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
});
```

### Internationalization

```typescript
// Use i18next for translations
import { useTranslation } from 'react-i18next';

const { t } = useTranslation('common');
return <h1>{t('welcome')}</h1>;
```

---

## 🧪 Testing (Future Implementation)

The project is ready for testing integration with:

- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **Cypress** - E2E testing
- **MSW** - API mocking

---

## 🚀 Deployment

### Supported Platforms

- **Docker** - Containerized deployment
- **Railway** - Configured with `railway.json`
- **Vercel** - Static hosting
- **Nginx** - Traditional web server

### Production Checklist

- ✅ Set production environment variables
- ✅ Configure CORS on backend API
- ✅ Enable HTTPS/SSL
- ✅ Set up CDN for static assets
- ✅ Configure Cloudinary for image uploads
- ✅ Enable error tracking (Sentry, etc.)
- ✅ Set up analytics (Google Analytics, etc.)
- ✅ Configure monitoring and logging

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
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

- **[Aurora Backend](../aurora-backend/)** - Spring Boot REST API
- **[Aurora Documentation](../docs/)** - System documentation and diagrams

---

## 🙏 Acknowledgments

- **Industrial University of Ho Chi Minh City (IUH)** - Academic support
- **React Team** - Amazing framework
- **Vite Team** - Lightning-fast tooling
- **Radix UI Team** - Accessible components
- **Open Source Community** - Incredible libraries and tools

---

**Built with ❤️ by the Aurora Hotel Team**
