# Outboard Dealership Database Design

## Overview
This document outlines the database design for the outboard motor dealership application, focusing on scalability, performance, and search optimization.

## Database Technology Recommendations

### Primary Database: PostgreSQL
- **Why**: ACID compliance, excellent performance, JSON support, full-text search capabilities
- **Version**: PostgreSQL 15+ for advanced features
- **Extensions**: pg_trgm (trigram search), pg_stat_statements (query monitoring)

### Search Engine: Elasticsearch (Optional)
- **Why**: Advanced search capabilities, faceted search, analytics
- **Use Case**: Product search, inventory filtering, analytics

### Caching: Redis
- **Why**: Fast in-memory caching, session storage, rate limiting
- **Use Cases**: Session data, frequently accessed product data, search results

## Core Data Models

### 1. Products Hierarchy

```sql
-- Products (parent table for all sellable items)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(20) NOT NULL CHECK (type IN ('motor', 'part', 'accessory')),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    brand VARCHAR(100) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    bestseller BOOLEAN DEFAULT false,
    weight_kg DECIMAL(8,2),
    warranty_months INTEGER,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Motors (specific to outboard motors)
CREATE TABLE motors (
    id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    horsepower INTEGER NOT NULL,
    motor_type VARCHAR(20) DEFAULT 'outboard' CHECK (motor_type IN ('outboard', 'inboard', 'sterndrive')),
    fuel_type VARCHAR(20) DEFAULT 'gasoline' CHECK (fuel_type IN ('gasoline', 'diesel', 'electric')),
    cylinders INTEGER,
    displacement_cc INTEGER,
    shaft_length VARCHAR(20) CHECK (shaft_length IN ('short', 'long', 'extra-long')),
    condition VARCHAR(20) DEFAULT 'new' CHECK (condition IN ('new', 'used', 'certified-preowned')),
    features JSONB DEFAULT '[]',
    specifications JSONB DEFAULT '{}',
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0
);

-- Parts (motor parts and accessories)
CREATE TABLE parts (
    id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    part_number VARCHAR(100) UNIQUE NOT NULL,
    category_id UUID REFERENCES part_categories(id),
    subcategory_id UUID REFERENCES part_categories(id),
    is_oem BOOLEAN DEFAULT false,
    min_order_quantity INTEGER DEFAULT 1,
    dimensions JSONB, -- {length, width, height}
    specifications JSONB DEFAULT '{}',
    tags JSONB DEFAULT '[]',
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0
);

-- Part Categories (hierarchical)
CREATE TABLE part_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES part_categories(id),
    image_url VARCHAR(500),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    part_count INTEGER DEFAULT 0, -- denormalized for performance
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Customer Management

```sql
-- Users (customers, dealers, admins)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT false,
    password_hash VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'CUSTOMER' CHECK (role IN ('CUSTOMER', 'DEALER', 'ADMIN', 'SERVICE_TECH', 'SALES_REP')),
    is_active BOOLEAN DEFAULT true,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP WITH TIME ZONE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Profiles (extended customer information)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    avatar_url VARCHAR(500),
    bio TEXT,
    company VARCHAR(200),
    loyalty_points INTEGER DEFAULT 0,
    loyalty_tier VARCHAR(20) DEFAULT 'BRONZE' CHECK (loyalty_tier IN ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM')),
    preferences JSONB DEFAULT '{
        "newsletter": true,
        "sms_notifications": false,
        "email_notifications": true,
        "marketing_emails": true,
        "service_reminders": true
    }',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Addresses (billing and shipping)
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) CHECK (type IN ('billing', 'shipping')),
    is_default BOOLEAN DEFAULT false,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company VARCHAR(200),
    street1 VARCHAR(255) NOT NULL,
    street2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'US',
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Boat Information (customer boats)
CREATE TABLE boats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    motor_id UUID REFERENCES motors(id),
    registration_number VARCHAR(50),
    length_ft DECIMAL(5,2),
    beam_ft DECIMAL(5,2),
    weight_lbs INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Order Management

```sql
-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED')),
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Payment Information
    payment_method VARCHAR(20) CHECK (payment_method IN ('credit_card', 'debit_card', 'financing', 'paypal', 'bank_transfer')),
    payment_status VARCHAR(20) DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED')),
    payment_intent_id VARCHAR(255), -- Stripe payment intent ID
    
    -- Addresses
    shipping_address_id UUID REFERENCES addresses(id),
    billing_address_id UUID REFERENCES addresses(id),
    
    -- Shipping
    tracking_number VARCHAR(100),
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    product_type VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL, -- snapshot at time of order
    sku VARCHAR(100) NOT NULL, -- snapshot at time of order
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    warranty_id UUID REFERENCES warranties(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shopping Carts
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    session_id VARCHAR(255), -- for guest carts
    subtotal DECIMAL(10,2) DEFAULT 0,
    estimated_tax DECIMAL(10,2) DEFAULT 0,
    estimated_shipping DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '30 days'
);

-- Cart Items
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    selected_options JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Service Management

```sql
-- Service Appointments
CREATE TABLE service_appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    customer_name VARCHAR(200) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    
    -- Service Details
    service_type VARCHAR(30) CHECK (service_type IN ('ROUTINE_MAINTENANCE', 'REPAIR', 'WARRANTY', 'INSPECTION', 'WINTERIZATION', 'SPRING_PREP', 'EMERGENCY')),
    status VARCHAR(20) DEFAULT 'REQUESTED' CHECK (status IN ('REQUESTED', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW')),
    
    -- Motor Information
    motor_brand VARCHAR(100) NOT NULL,
    motor_model VARCHAR(100) NOT NULL,
    motor_year INTEGER,
    motor_serial_number VARCHAR(100),
    motor_hours INTEGER,
    last_service_date DATE,
    
    -- Scheduling
    requested_date DATE NOT NULL,
    confirmed_date DATE,
    time_slot_start TIME,
    time_slot_end TIME,
    
    -- Assignment and Costing
    technician_id UUID REFERENCES users(id),
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    labor_hours DECIMAL(5,2),
    
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service History (completed services)
CREATE TABLE service_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES service_appointments(id),
    motor_id UUID REFERENCES motors(id),
    service_date DATE NOT NULL,
    service_type VARCHAR(30) NOT NULL,
    technician_id UUID REFERENCES users(id),
    work_performed JSONB DEFAULT '[]',
    labor_hours DECIMAL(5,2) NOT NULL,
    labor_cost DECIMAL(10,2) NOT NULL,
    parts_cost DECIMAL(10,2) DEFAULT 0,
    total_cost DECIMAL(10,2) NOT NULL,
    is_warranty_work BOOLEAN DEFAULT false,
    next_service_due DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Parts Used
CREATE TABLE service_parts_used (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_history_id UUID REFERENCES service_history(id) ON DELETE CASCADE,
    part_id UUID REFERENCES parts(id),
    part_number VARCHAR(100) NOT NULL,
    part_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. Inventory Management

```sql
-- Inventory
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    location_id UUID REFERENCES warehouse_locations(id),
    quantity_on_hand INTEGER NOT NULL DEFAULT 0,
    quantity_reserved INTEGER NOT NULL DEFAULT 0, -- for pending orders
    quantity_available INTEGER GENERATED ALWAYS AS (quantity_on_hand - quantity_reserved) STORED,
    reorder_point INTEGER DEFAULT 0,
    max_stock_level INTEGER,
    last_restock_date DATE,
    last_count_date DATE,
    cost_per_unit DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT positive_quantities CHECK (quantity_on_hand >= 0 AND quantity_reserved >= 0)
);

-- Warehouse Locations
CREATE TABLE warehouse_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory Movements (audit trail)
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    location_id UUID REFERENCES warehouse_locations(id),
    movement_type VARCHAR(20) CHECK (movement_type IN ('RECEIVED', 'SOLD', 'RETURNED', 'ADJUSTED', 'TRANSFERRED', 'RESERVED', 'UNRESERVED')),
    quantity_change INTEGER NOT NULL,
    reference_id UUID, -- order_id, transfer_id, etc.
    reference_type VARCHAR(20), -- 'order', 'transfer', 'adjustment'
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Indexes for Performance

```sql
-- Product indexes
CREATE INDEX idx_products_type ON products(type);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_price ON products(base_price);
CREATE INDEX idx_products_search ON products USING gin(to_tsvector('english', name || ' ' || description));

-- Motor specific indexes
CREATE INDEX idx_motors_horsepower ON motors(horsepower);
CREATE INDEX idx_motors_year ON motors(year);
CREATE INDEX idx_motors_condition ON motors(condition);
CREATE INDEX idx_motors_fuel_type ON motors(fuel_type);

-- Parts specific indexes
CREATE INDEX idx_parts_category ON parts(category_id);
CREATE INDEX idx_parts_part_number ON parts(part_number);
CREATE INDEX idx_parts_oem ON parts(is_oem);

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);

-- Order indexes
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_orders_number ON orders(order_number);

-- Service indexes
CREATE INDEX idx_service_appointments_user ON service_appointments(user_id);
CREATE INDEX idx_service_appointments_status ON service_appointments(status);
CREATE INDEX idx_service_appointments_date ON service_appointments(confirmed_date);
CREATE INDEX idx_service_appointments_technician ON service_appointments(technician_id);

-- Inventory indexes
CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_inventory_location ON inventory(location_id);
CREATE INDEX idx_inventory_available ON inventory(quantity_available);
```

## Search Optimization Strategy

### 1. Full-Text Search (PostgreSQL)
```sql
-- Add search vectors for products
ALTER TABLE products ADD COLUMN search_vector tsvector;

-- Update search vector on insert/update
CREATE OR REPLACE FUNCTION update_product_search_vector() RETURNS trigger AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.brand, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_search_vector_trigger
    BEFORE INSERT OR UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_product_search_vector();

-- Create GIN index for search
CREATE INDEX idx_products_search_vector ON products USING gin(search_vector);
```

### 2. Faceted Search Support
```sql
-- Materialized view for faceted search
CREATE MATERIALIZED VIEW product_facets AS
SELECT 
    p.type,
    p.brand,
    m.horsepower,
    m.fuel_type,
    m.condition,
    pt.category_id,
    pt.is_oem,
    p.base_price,
    CASE 
        WHEN p.base_price < 1000 THEN '0-1000'
        WHEN p.base_price < 5000 THEN '1000-5000'
        WHEN p.base_price < 10000 THEN '5000-10000'
        WHEN p.base_price < 25000 THEN '10000-25000'
        ELSE '25000+'
    END as price_range,
    i.quantity_available > 0 as in_stock
FROM products p
LEFT JOIN motors m ON p.id = m.id
LEFT JOIN parts pt ON p.id = pt.id
LEFT JOIN inventory i ON p.id = i.product_id
WHERE p.is_active = true;

-- Refresh facets periodically
CREATE INDEX ON product_facets(type, brand, price_range, in_stock);
```

### 3. Search Performance Optimization
- **Elasticsearch Integration**: For advanced search features, complex filtering, and analytics
- **Redis Caching**: Cache frequent search queries and facet counts
- **Search Analytics**: Track search terms, popular filters, and conversion rates

## Scalability Considerations

### 1. Database Partitioning
```sql
-- Partition orders by date (monthly)
CREATE TABLE orders_2024_01 PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

-- Partition inventory movements by date
CREATE TABLE inventory_movements_2024_01 PARTITION OF inventory_movements
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

### 2. Read Replicas
- **Primary**: Write operations, real-time data
- **Read Replica 1**: Product catalog, search queries
- **Read Replica 2**: Reporting, analytics

### 3. Connection Pooling
- Use PgBouncer for connection pooling
- Configure appropriate pool sizes based on application load

### 4. Monitoring and Optimization
- **pg_stat_statements**: Track slow queries
- **EXPLAIN ANALYZE**: Regular query performance analysis
- **Automated VACUUM**: Keep tables optimized
- **Query timeout settings**: Prevent long-running queries

## Data Integrity and Constraints

```sql
-- Business rules enforcement
ALTER TABLE inventory ADD CONSTRAINT inventory_positive_stock 
CHECK (quantity_on_hand >= 0 AND quantity_reserved >= 0);

ALTER TABLE order_items ADD CONSTRAINT order_items_positive_quantity 
CHECK (quantity > 0 AND unit_price >= 0);

ALTER TABLE service_appointments ADD CONSTRAINT valid_appointment_dates
CHECK (confirmed_date >= requested_date);

-- Referential integrity
ALTER TABLE motors ADD CONSTRAINT motors_valid_year 
CHECK (year BETWEEN 1950 AND EXTRACT(YEAR FROM NOW()) + 1);

ALTER TABLE parts ADD CONSTRAINT parts_valid_min_order 
CHECK (min_order_quantity > 0);
```

## Backup and Recovery Strategy

### 1. Automated Backups
- **Daily full backups** with point-in-time recovery
- **WAL archiving** for continuous backup
- **Cross-region backup storage** for disaster recovery

### 2. Testing
- **Monthly restore testing** to verify backup integrity
- **Recovery time objective (RTO)**: 4 hours
- **Recovery point objective (RPO)**: 15 minutes

## Security Considerations

### 1. Data Encryption
- **Encryption at rest**: Database-level encryption
- **Encryption in transit**: SSL/TLS for all connections
- **Application-level encryption**: Sensitive PII data

### 2. Access Control
- **Row-level security**: Users can only access their own data
- **Role-based permissions**: Different access levels for different user types
- **Audit logging**: Track all data modifications

### 3. PII Protection
- **Data anonymization**: For development/testing environments
- **GDPR compliance**: Right to be forgotten, data portability
- **Data retention policies**: Automatic cleanup of old data

This database design provides a solid foundation for the outboard dealership application with considerations for scalability, performance, and maintainability.