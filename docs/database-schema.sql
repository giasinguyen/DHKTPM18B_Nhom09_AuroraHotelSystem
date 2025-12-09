-- =============================================
-- Aurora Hotel System - SQL Server Database Schema
-- Generated from class diagram
-- =============================================

-- Drop existing tables in reverse dependency order
IF OBJECT_ID('user_roles', 'U') IS NOT NULL DROP TABLE user_roles;
IF OBJECT_ID('role_permissions', 'U') IS NOT NULL DROP TABLE role_permissions;
IF OBJECT_ID('user_disabled_permissions', 'U') IS NOT NULL DROP TABLE user_disabled_permissions;
IF OBJECT_ID('room_type_amenities', 'U') IS NOT NULL DROP TABLE room_type_amenities;
IF OBJECT_ID('promotion_room_types', 'U') IS NOT NULL DROP TABLE promotion_room_types;
IF OBJECT_ID('shift_check_ins', 'U') IS NOT NULL DROP TABLE shift_check_ins;
IF OBJECT_ID('staff_shift_assignments', 'U') IS NOT NULL DROP TABLE staff_shift_assignments;
IF OBJECT_ID('service_bookings', 'U') IS NOT NULL DROP TABLE service_bookings;
IF OBJECT_ID('payments', 'U') IS NOT NULL DROP TABLE payments;
IF OBJECT_ID('booking_rooms', 'U') IS NOT NULL DROP TABLE booking_rooms;
IF OBJECT_ID('bookings', 'U') IS NOT NULL DROP TABLE bookings;
IF OBJECT_ID('image_assets', 'U') IS NOT NULL DROP TABLE image_assets;
IF OBJECT_ID('news', 'U') IS NOT NULL DROP TABLE news;
IF OBJECT_ID('services', 'U') IS NOT NULL DROP TABLE services;
IF OBJECT_ID('service_categories', 'U') IS NOT NULL DROP TABLE service_categories;
IF OBJECT_ID('rooms', 'U') IS NOT NULL DROP TABLE rooms;
IF OBJECT_ID('room_types', 'U') IS NOT NULL DROP TABLE room_types;
IF OBJECT_ID('room_categories', 'U') IS NOT NULL DROP TABLE room_categories;
IF OBJECT_ID('facilities', 'U') IS NOT NULL DROP TABLE facilities;
IF OBJECT_ID('work_shifts', 'U') IS NOT NULL DROP TABLE work_shifts;
IF OBJECT_ID('promotions', 'U') IS NOT NULL DROP TABLE promotions;
IF OBJECT_ID('documents', 'U') IS NOT NULL DROP TABLE documents;
IF OBJECT_ID('users', 'U') IS NOT NULL DROP TABLE users;
IF OBJECT_ID('branches', 'U') IS NOT NULL DROP TABLE branches;
IF OBJECT_ID('amenities', 'U') IS NOT NULL DROP TABLE amenities;
IF OBJECT_ID('permissions', 'U') IS NOT NULL DROP TABLE permissions;
IF OBJECT_ID('roles', 'U') IS NOT NULL DROP TABLE roles;
IF OBJECT_ID('invalidated_tokens', 'U') IS NOT NULL DROP TABLE invalidated_tokens;
GO

-- =============================================
-- Core Tables
-- =============================================

-- Amenity Table
CREATE TABLE amenities (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    name VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(30) NOT NULL DEFAULT 'ROOM_DEFAULT',
    description VARCHAR(500),
    icon VARCHAR(200),
    active BIT NOT NULL DEFAULT 1,
    display_order INT NOT NULL DEFAULT 0
);
CREATE INDEX idx_amenity_name ON amenities(name);
CREATE INDEX idx_amenity_type ON amenities(type);

-- Role Table
CREATE TABLE roles (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(MAX)
);

-- Permission Table
CREATE TABLE permissions (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(MAX)
);

-- Branch Table
CREATE TABLE branches (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    name VARCHAR(200) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    address VARCHAR(300),
    ward VARCHAR(100),
    district VARCHAR(100),
    city VARCHAR(100),
    latitude FLOAT,
    longitude FLOAT,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    website VARCHAR(200),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    opening_date DATE,
    check_in_time TIME NOT NULL DEFAULT '14:00:00',
    check_out_time TIME NOT NULL DEFAULT '12:00:00',
    operating_hours VARCHAR(50) DEFAULT '24/7',
    total_rooms INT,
    available_rooms INT,
    description VARCHAR(2000),
    short_description VARCHAR(500),
    images TEXT,
    manager_id VARCHAR(36)
);
CREATE INDEX idx_branch_code ON branches(code);
CREATE INDEX idx_branch_status ON branches(status);
CREATE INDEX idx_branch_city ON branches(city);

-- User Table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    dob DATE,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    address VARCHAR(500),
    avatar_url VARCHAR(500),
    assigned_branch_id VARCHAR(36),
    active BIT NOT NULL DEFAULT 1,
    email_verified BIT NOT NULL DEFAULT 0,
    last_login_at DATETIME2,
    failed_login_attempts INT NOT NULL DEFAULT 0,
    locked_until DATETIME2,
    lock_reason VARCHAR(500),
    FOREIGN KEY (assigned_branch_id) REFERENCES branches(id)
);
CREATE INDEX idx_user_username ON users(username);
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_phone ON users(phone);

-- Add manager foreign key to branches
ALTER TABLE branches ADD FOREIGN KEY (manager_id) REFERENCES users(id);

-- Document Table
CREATE TABLE documents (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    doc_url VARCHAR(500) NOT NULL,
    public_id VARCHAR(255) NOT NULL,
    is_embed BIT NOT NULL DEFAULT 0,
    total_chunks INT,
    metadata TEXT,
    description TEXT,
    uploaded_by_id VARCHAR(36),
    FOREIGN KEY (uploaded_by_id) REFERENCES users(id)
);

-- InvalidatedToken Table
CREATE TABLE invalidated_tokens (
    id VARCHAR(36) PRIMARY KEY,
    expiry_time DATETIME2
);

-- News Table
CREATE TABLE news (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(500),
    is_public BIT NOT NULL DEFAULT 0,
    content_json NVARCHAR(MAX),
    content_html TEXT,
    status VARCHAR(20) NOT NULL,
    published_at DATETIME2,
    created_by_user_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (created_by_user_id) REFERENCES users(id)
);

-- ImageAsset Table
CREATE TABLE image_assets (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    public_id VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    width INT,
    height INT,
    size_bytes BIGINT,
    mime_type VARCHAR(100),
    alt_text VARCHAR(500),
    owner_type VARCHAR(100),
    usage_path VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'TEMP',
    news_id VARCHAR(36),
    FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
);

-- Promotion Table
CREATE TABLE promotions (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    start_at DATE NOT NULL,
    end_at DATE NOT NULL,
    active BIT NOT NULL DEFAULT 1,
    discount_type VARCHAR(20) NOT NULL DEFAULT 'FIXED_AMOUNT',
    percent_off DECIMAL(5,2),
    amount_off DECIMAL(10,2),
    min_booking_amount DECIMAL(10,2),
    min_nights INT,
    usage_limit INT,
    used_count INT NOT NULL DEFAULT 0,
    max_discount_amount DECIMAL(10,2),
    stackable BIT NOT NULL DEFAULT 0,
    exclusive_with_others BIT NOT NULL DEFAULT 0,
    description VARCHAR(1000),
    terms_and_conditions VARCHAR(2000),
    priority INT NOT NULL DEFAULT 0,
    branch_id VARCHAR(36),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);
CREATE INDEX idx_promotion_code ON promotions(code);
CREATE INDEX idx_promotion_dates ON promotions(start_at, end_at);
CREATE INDEX idx_promotion_active ON promotions(active);

-- WorkShift Table
CREATE TABLE work_shifts (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    color_code VARCHAR(7),
    active BIT NOT NULL DEFAULT 1,
    branch_id VARCHAR(36),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

-- Facility Table
CREATE TABLE facilities (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50),
    description VARCHAR(2000),
    location VARCHAR(100),
    opening_hours VARCHAR(100),
    policies VARCHAR(1000),
    requires_reservation BIT NOT NULL DEFAULT 0,
    active BIT NOT NULL DEFAULT 1,
    capacity INT,
    free_for_guests BIT NOT NULL DEFAULT 1,
    images TEXT,
    branch_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);
CREATE INDEX idx_facility_branch ON facilities(branch_id);
CREATE INDEX idx_facility_type ON facilities(type);
CREATE INDEX idx_facility_active ON facilities(active);

-- RoomCategory Table
CREATE TABLE room_categories (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL,
    description VARCHAR(1000),
    display_order INT,
    active BIT NOT NULL DEFAULT 1,
    image_url VARCHAR(500),
    branch_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    CONSTRAINT uq_category_branch_code UNIQUE (branch_id, code)
);
CREATE INDEX idx_category_branch ON room_categories(branch_id);
CREATE INDEX idx_category_code ON room_categories(code);

-- RoomType Table
CREATE TABLE room_types (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20),
    price_from DECIMAL(10,2) NOT NULL,
    capacity_adults INT NOT NULL,
    capacity_children INT,
    max_occupancy INT NOT NULL,
    size_m2 FLOAT,
    bed_type VARCHAR(50),
    number_of_beds INT,
    refundable BIT NOT NULL DEFAULT 1,
    smoking_allowed BIT NOT NULL DEFAULT 0,
    description VARCHAR(2000),
    short_description VARCHAR(500),
    image_url VARCHAR(500),
    branch_id VARCHAR(36) NOT NULL,
    category_id VARCHAR(36),
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (category_id) REFERENCES room_categories(id),
    CONSTRAINT uq_roomtype_branch_code UNIQUE (branch_id, code)
);
CREATE INDEX idx_roomtype_branch ON room_types(branch_id);
CREATE INDEX idx_roomtype_code ON room_types(code);

-- Room Table
CREATE TABLE rooms (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    room_number VARCHAR(20) NOT NULL,
    floor INT,
    status VARCHAR(20) NOT NULL DEFAULT 'READY',
    view_type VARCHAR(50),
    base_price DECIMAL(10,2) NOT NULL,
    sale_percent DECIMAL(5,2) DEFAULT 0,
    price_final DECIMAL(10,2),
    maintenance_notes VARCHAR(1000),
    last_cleaned DATETIME2,
    images TEXT,
    branch_id VARCHAR(36) NOT NULL,
    room_type_id VARCHAR(36),
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (room_type_id) REFERENCES room_types(id),
    CONSTRAINT uq_room_branch_number UNIQUE (branch_id, room_number)
);
CREATE INDEX idx_room_status ON rooms(status);
CREATE INDEX idx_room_branch ON rooms(branch_id);
CREATE INDEX idx_room_type ON rooms(room_type_id);

-- ServiceCategory Table
CREATE TABLE service_categories (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL,
    description VARCHAR(1000),
    display_order INT,
    active BIT NOT NULL DEFAULT 1,
    image_url VARCHAR(500),
    branch_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    CONSTRAINT uq_service_category_branch_code UNIQUE (branch_id, code)
);
CREATE INDEX idx_service_category_branch ON service_categories(branch_id);
CREATE INDEX idx_service_category_code ON service_categories(code);
CREATE INDEX idx_service_category_active ON service_categories(active);

-- Service Table
CREATE TABLE services (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(2000),
    base_price DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50),
    duration_minutes INT,
    max_capacity_per_slot INT,
    requires_booking BIT NOT NULL DEFAULT 1,
    active BIT NOT NULL DEFAULT 1,
    images TEXT,
    operating_hours VARCHAR(100),
    branch_id VARCHAR(36) NOT NULL,
    category_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (category_id) REFERENCES service_categories(id)
);
CREATE INDEX idx_service_branch ON services(branch_id);
CREATE INDEX idx_service_category ON services(category_id);
CREATE INDEX idx_service_active ON services(active);

-- Booking Table
CREATE TABLE bookings (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    booking_code VARCHAR(50) NOT NULL UNIQUE,
    guest_full_name VARCHAR(200),
    guest_email VARCHAR(100),
    guest_phone VARCHAR(20),
    checkin DATE NOT NULL,
    checkout DATE NOT NULL,
    discount_amount DECIMAL(10,2),
    subtotal_price DECIMAL(12,2),
    total_price DECIMAL(12,2),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    special_request VARCHAR(1000),
    cancelled_at DATETIME2,
    cancellation_reason VARCHAR(500),
    email_sent BIT NOT NULL DEFAULT 0,
    sms_sent BIT NOT NULL DEFAULT 0,
    actual_checkin_time DATETIME2,
    actual_checkout_time DATETIME2,
    checked_in_by VARCHAR(100),
    checked_out_by VARCHAR(100),
    branch_id VARCHAR(36) NOT NULL,
    customer_id VARCHAR(36),
    applied_promotion_id VARCHAR(36),
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (applied_promotion_id) REFERENCES promotions(id)
);
CREATE INDEX idx_booking_code ON bookings(booking_code);
CREATE INDEX idx_booking_branch ON bookings(branch_id);
CREATE INDEX idx_booking_customer ON bookings(customer_id);
CREATE INDEX idx_booking_dates ON bookings(checkin, checkout);
CREATE INDEX idx_booking_status ON bookings(status);

-- BookingRoom Table
CREATE TABLE booking_rooms (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    price_per_night DECIMAL(10,2) NOT NULL,
    nights INT NOT NULL,
    actual_adults INT,
    actual_children INT,
    early_checkin_charge DECIMAL(8,2),
    late_checkout_charge DECIMAL(8,2),
    total_amount DECIMAL(10,2),
    room_notes VARCHAR(500),
    booking_id VARCHAR(36) NOT NULL,
    room_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    CONSTRAINT uq_booking_room UNIQUE (booking_id, room_id)
);
CREATE INDEX idx_booking_room_booking ON booking_rooms(booking_id);
CREATE INDEX idx_booking_room_room ON booking_rooms(room_id);

-- Payment Table
CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    method VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'VND',
    provider_txn_id VARCHAR(200),
    provider_response VARCHAR(1000),
    paid_at DATETIME2,
    refund_amount DECIMAL(12,2),
    refunded_at DATETIME2,
    refund_reason VARCHAR(500),
    refund_txn_id VARCHAR(200),
    notes VARCHAR(1000),
    processed_by VARCHAR(100),
    vnpay_txn_ref VARCHAR(100) UNIQUE,
    vnpay_response_code VARCHAR(50),
    vnpay_bank_code VARCHAR(50),
    vnpay_secure_hash TEXT,
    vnpay_card_type VARCHAR(20),
    booking_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
CREATE INDEX idx_payment_booking ON payments(booking_id);
CREATE INDEX idx_payment_status ON payments(status);
CREATE INDEX idx_payment_method ON payments(method);
CREATE INDEX idx_payment_provider_txn ON payments(provider_txn_id);

-- ServiceBooking Table
CREATE TABLE service_bookings (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    service_date_time DATETIME2 NOT NULL,
    quantity INT NOT NULL,
    price_per_unit DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    special_instructions VARCHAR(1000),
    completed_at DATETIME2,
    completed_by VARCHAR(100),
    completion_notes VARCHAR(500),
    cancelled_at DATETIME2,
    cancellation_reason VARCHAR(500),
    booking_id VARCHAR(36),
    service_id VARCHAR(36) NOT NULL,
    customer_id VARCHAR(36),
    room_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);
CREATE INDEX idx_service_booking_booking ON service_bookings(booking_id);
CREATE INDEX idx_service_booking_service ON service_bookings(service_id);
CREATE INDEX idx_service_booking_customer ON service_bookings(customer_id);
CREATE INDEX idx_service_booking_room ON service_bookings(room_id);
CREATE INDEX idx_service_booking_status ON service_bookings(status);
CREATE INDEX idx_service_booking_datetime ON service_bookings(service_date_time);

-- StaffShiftAssignment Table
CREATE TABLE staff_shift_assignments (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    shift_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED',
    notes VARCHAR(500),
    cancelled_reason VARCHAR(500),
    user_id VARCHAR(36) NOT NULL,
    work_shift_id VARCHAR(36) NOT NULL,
    branch_id VARCHAR(36),
    assigned_by_id VARCHAR(36),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (work_shift_id) REFERENCES work_shifts(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (assigned_by_id) REFERENCES users(id),
    CONSTRAINT uq_staff_shift UNIQUE (user_id, shift_date, work_shift_id)
);
CREATE INDEX idx_shift_assignment_user_date ON staff_shift_assignments(user_id, shift_date);
CREATE INDEX idx_shift_assignment_date_status ON staff_shift_assignments(shift_date, status);

-- ShiftCheckIn Table
CREATE TABLE shift_check_ins (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    version BIGINT NOT NULL DEFAULT 0,
    deleted BIT NOT NULL DEFAULT 0,
    check_in_time DATETIME2 NOT NULL,
    check_out_time DATETIME2,
    status VARCHAR(20) NOT NULL DEFAULT 'CHECKED_IN',
    ip_address VARCHAR(50),
    device_info VARCHAR(255),
    location VARCHAR(255),
    notes VARCHAR(500),
    is_late BIT NOT NULL DEFAULT 0,
    is_early_departure BIT NOT NULL DEFAULT 0,
    late_minutes INT DEFAULT 0,
    early_departure_minutes INT DEFAULT 0,
    assignment_id VARCHAR(36) NOT NULL,
    staff_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (assignment_id) REFERENCES staff_shift_assignments(id),
    FOREIGN KEY (staff_id) REFERENCES users(id)
);
CREATE INDEX idx_checkin_assignment ON shift_check_ins(assignment_id);
CREATE INDEX idx_checkin_staff_date ON shift_check_ins(staff_id, check_in_time);

-- =============================================
-- Junction Tables (Many-to-Many Relationships)
-- =============================================

-- User - Roles
CREATE TABLE user_roles (
    user_id VARCHAR(36) NOT NULL,
    role_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Role - Permissions
CREATE TABLE role_permissions (
    role_id VARCHAR(36) NOT NULL,
    permission_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- User Disabled Permissions
CREATE TABLE user_disabled_permissions (
    user_id VARCHAR(36) NOT NULL,
    permission_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (user_id, permission_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- RoomType - Amenities
CREATE TABLE room_type_amenities (
    room_type_id VARCHAR(36) NOT NULL,
    amenity_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (room_type_id, amenity_id),
    FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);

-- Promotion - RoomTypes
CREATE TABLE promotion_room_types (
    promotion_id VARCHAR(36) NOT NULL,
    room_type_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (promotion_id, room_type_id),
    FOREIGN KEY (promotion_id) REFERENCES promotions(id) ON DELETE CASCADE,
    FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE
);

GO

-- =============================================
-- Sample Data (Optional)
-- =============================================

-- Insert sample permissions
INSERT INTO permissions (id, name, description) VALUES
(NEWID(), 'USER_READ', 'Read user information'),
(NEWID(), 'USER_CREATE', 'Create new user'),
(NEWID(), 'USER_UPDATE', 'Update user information'),
(NEWID(), 'USER_DELETE', 'Delete user'),
(NEWID(), 'BOOKING_READ', 'Read booking information'),
(NEWID(), 'BOOKING_CREATE', 'Create new booking'),
(NEWID(), 'BOOKING_UPDATE', 'Update booking information'),
(NEWID(), 'BOOKING_DELETE', 'Delete booking');

-- Insert sample roles
INSERT INTO roles (id, name, description) VALUES
(NEWID(), 'ADMIN', 'System administrator with full access'),
(NEWID(), 'MANAGER', 'Branch manager'),
(NEWID(), 'STAFF', 'Hotel staff member'),
(NEWID(), 'CUSTOMER', 'Regular customer');

GO

PRINT 'Aurora Hotel System Database Schema created successfully!';
