# 📐 Aurora Hotel System - Documentation

> System diagrams and database schemas for the Aurora Hotel Management System.

---

## 📋 Contents

This directory contains:
- **Class Diagram** - UML class diagram of the system entities
- **Database Diagram** - Entity-Relationship diagram (ERD)
- **Database Schema** - SQL schema for database initialization

---

## 📊 Class Diagram

**File:** `class-diagram.puml`

### Description
UML class diagram showing all entity classes in the Aurora Hotel System with their:
- Attributes and data types
- Relationships and cardinalities
- Inheritance hierarchies
- Key constraints

### Entities Included
- User, Role, Permission
- Branch, Room, RoomType, RoomCategory
- Booking, BookingRoom, Payment
- Service, ServiceCategory, ServiceBooking
- Amenity, Facility
- News, Promotion, Document
- WorkShift, StaffShiftAssignment, ShiftCheckIn
- And more...

### How to View

#### Option 1: PlantText (Online)
1. Copy the contents of `class-diagram.puml`
2. Go to **[https://www.planttext.com/](https://www.planttext.com/)**
3. Paste the PlantUML code in the editor
4. Click **Refresh** or press `Ctrl+Enter`
5. The diagram will be rendered automatically
6. You can download as PNG, SVG, or other formats

#### Option 2: VS Code (Local)
1. Install **PlantUML** extension in VS Code
2. Open `class-diagram.puml`
3. Press `Alt+D` to preview the diagram
4. Or use command palette: `PlantUML: Preview Current Diagram`

#### Option 3: IntelliJ IDEA (Local)
1. Install **PlantUML Integration** plugin
2. Open `class-diagram.puml`
3. The diagram will render in the editor automatically
4. Right-click to export in various formats

---

## 🗄️ Database Diagram

**File:** `database-diagram.puml`

### Description
Entity-Relationship Diagram (ERD) showing the database structure with:
- All tables and their columns
- Primary keys (PK) and foreign keys (FK)
- Relationships and constraints
- Data types and nullability
- Indexes and unique constraints

### How to View

#### Option 1: PlantText (Online)
1. Copy the contents of `database-diagram.puml`
2. Go to **[https://www.planttext.com/](https://www.planttext.com/)**
3. Paste the PlantUML code
4. Click **Refresh** to render
5. Export as needed

#### Option 2: VS Code / IntelliJ IDEA
Same as Class Diagram instructions above.

---

## 🔧 Database Schema SQL

**File:** `database-schema.sql`

### Description
Complete SQL schema for creating the Aurora Hotel database with:
- Table definitions with all columns
- Primary key constraints
- Foreign key relationships
- Indexes for performance
- Default values and constraints
- Audit columns (created_at, updated_at, etc.)

### Database Platform
The schema is written for **SQL Server** syntax but can be adapted for:
- **PostgreSQL** (currently used in the project)
- **MySQL**
- **Oracle**
- Other RDBMS

### How to Use

#### For PostgreSQL (Project Default)
The application uses **JPA/Hibernate** to automatically create tables. This SQL file serves as:
- Reference documentation
- Manual database setup if needed
- Schema migration baseline

To convert to PostgreSQL syntax:
```sql
-- Change data types:
DATETIME2 → TIMESTAMP
VARCHAR(36) → UUID (for IDs)
BIT → BOOLEAN
NEWID() → gen_random_uuid()
GETDATE() → CURRENT_TIMESTAMP
```

#### For SQL Server
```bash
# Using sqlcmd
sqlcmd -S localhost -U sa -P YourPassword -i database-schema.sql

# Using SQL Server Management Studio (SSMS)
1. Open SSMS
2. Connect to your server
3. Open database-schema.sql
4. Execute the script
```

#### For dbdiagram.io (Visual Editor)

**[dbdiagram.io](https://dbdiagram.io/)** is an online database diagram tool.

1. Go to **[https://dbdiagram.io/](https://dbdiagram.io/)**
2. Click **Go to App** (no login required for basic use)
3. Clear the default example

**Convert SQL to DBML:**

You can convert the SQL schema to DBML (Database Markup Language) format used by dbdiagram.io:

**Manual conversion example:**
```dbml
Table amenities {
  id varchar(36) [pk]
  created_at timestamp [not null, default: `now()`]
  updated_at timestamp [not null, default: `now()`]
  created_by varchar(100)
  updated_by varchar(100)
  version bigint [not null, default: 0]
  deleted boolean [not null, default: false]
  name varchar(100) [not null, unique]
  type varchar(30)
  description varchar(500)
  icon varchar(200)
  active boolean [default: true]
  display_order int
}

Table users {
  id varchar(36) [pk]
  username varchar(50) [not null, unique]
  email varchar(100) [not null, unique]
  password_hash varchar(255) [not null]
  // ... other fields
  branch_id varchar(36) [ref: > branches.id]
}

Table branches {
  id varchar(36) [pk]
  name varchar(100) [not null]
  // ... other fields
}
```

**Or use an online converter:**
- **[SQL to DBML Converter](https://dbml.dbdiagram.io/home/)** (if available)
- Or manually create tables using dbdiagram.io syntax

**Benefits of dbdiagram.io:**
- Visual database design
- Export to SQL, PNG, PDF
- Share diagrams with team
- Collaborative editing

---

## 📚 Additional Documentation

### Database Tables Overview

| Table | Purpose | Key Relationships |
|-------|---------|------------------|
| `users` | System users | → `branches`, `roles` |
| `roles` | User roles (Admin, Manager, Staff, etc.) | → `permissions` |
| `permissions` | Granular permissions (70+ permissions) | ← `roles` |
| `branches` | Hotel branches | ← `users`, `rooms`, `bookings` |
| `rooms` | Hotel rooms | → `room_types`, `branches` |
| `room_types` | Room type definitions | → `room_categories`, `amenities` |
| `bookings` | Guest bookings | → `users`, `branches` |
| `booking_rooms` | Booked rooms | → `bookings`, `rooms` |
| `payments` | Payment transactions | → `bookings` |
| `services` | Hotel services | → `service_categories` |
| `service_bookings` | Service bookings | → `bookings`, `services` |
| `amenities` | Room amenities | ← `room_types` |
| `facilities` | Branch facilities | → `branches` |
| `news` | News and events | → `branches` |
| `promotions` | Promotional offers | → `room_types` |
| `work_shifts` | Work shift definitions | → `branches` |
| `staff_shift_assignments` | Staff shift assignments | → `users`, `work_shifts` |
| `shift_check_ins` | Shift attendance | → `staff_shift_assignments` |
| `documents` | Document storage | - |
| `invalidated_tokens` | JWT token blacklist | - |

### Key Features in Schema

- **UUID Primary Keys** - Distributed system friendly
- **Soft Delete** - `deleted` column for data retention
- **Audit Columns** - `created_at`, `updated_at`, `created_by`, `updated_by`
- **Optimistic Locking** - `version` column for concurrency control
- **Indexes** - Optimized queries on frequently accessed columns
- **Constraints** - Data integrity with FK, UK, CHECK constraints

---

## 🛠️ Tools & Resources

### Recommended Tools

| Tool | Purpose | Link |
|------|---------|------|
| **PlantText** | View PlantUML diagrams online | [planttext.com](https://www.planttext.com/) |
| **dbdiagram.io** | Visual database design | [dbdiagram.io](https://dbdiagram.io/) |
| **PlantUML** | UML diagram generation | [plantuml.com](https://plantuml.com/) |
| **VS Code PlantUML** | VS Code extension | [Marketplace](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml) |
| **pgAdmin** | PostgreSQL management | [pgadmin.org](https://www.pgadmin.org/) |
| **DBeaver** | Universal database tool | [dbeaver.io](https://dbeaver.io/) |

### VS Code Extensions

For the best documentation experience:

```bash
# PlantUML Preview
code --install-extension jebbs.plantuml

# Database Client (for SQL files)
code --install-extension cweijan.vscode-database-client2

# SQL Formatter
code --install-extension adpyke.vscode-sql-formatter
```

---

## 📝 Maintenance

### Updating Diagrams

When making changes to the database schema:

1. **Update Entity Classes** - Make changes in Java entities
2. **Update Class Diagram** - Modify `class-diagram.puml` to reflect entity changes
3. **Update Database Diagram** - Update `database-diagram.puml` with new tables/columns
4. **Update SQL Schema** - Modify `database-schema.sql` accordingly
5. **Test Changes** - Verify diagrams render correctly
6. **Document Changes** - Update this README if needed

### Diagram Best Practices

- Keep diagrams synchronized with actual code
- Use clear naming conventions
- Document complex relationships
- Update version numbers in comments
- Export diagrams as images for presentations

---

## 🔗 Related Documentation

- **[Backend README](../aurora-backend/README.md)** - Backend API documentation
- **[Frontend README](../aurora-frontend/README.md)** - Frontend application guide
- **[Main README](../README.md)** - Project overview

---

## 👥 Team

| Name | Role | GitHub |
|------|------|--------|
| **Nguyễn Trần Gia Sĩ** | Team Lead & Backend Developer | [@giasinguyen](https://github.com/giasinguyen) |
| **Nguyễn Văn Minh** | Frontend Developer | [@nvminh162](https://github.com/nvminh162) |
| **Nguyễn Trung Nguyên** | Backend Developer | [@NguyenNguyen0](https://github.com/NguyenNguyen0) |
| **Nguyễn Duy Khải** | Frontend Developer | [@NguyenDuyKhai2](https://github.com/NguyenDuyKhai2) |

---

**Aurora Hotel Management System** - Industrial University of Ho Chi Minh City (IUH)
