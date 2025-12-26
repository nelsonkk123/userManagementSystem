-- ============================================
-- 思拓智媒后台管理系统 - 数据库表结构
-- ============================================

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. 用户与权限模块
-- ============================================

-- 后台角色表 (先创建，被 admin_users 引用)
CREATE TABLE IF NOT EXISTS admin_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '{}',
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 小程序用户表
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    openid VARCHAR(255) UNIQUE,
    unionid VARCHAR(255),
    nickname VARCHAR(100),
    avatar_url TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    user_role VARCHAR(20) DEFAULT 'free' CHECK (user_role IN ('free', 'personal', 'team')),
    account_status VARCHAR(20) DEFAULT 'normal' CHECK (account_status IN ('normal', 'disabled', 'blacklisted')),
    register_time TIMESTAMPTZ DEFAULT NOW(),
    last_login_time TIMESTAMPTZ,
    remaining_minutes INTEGER DEFAULT 0,
    storage_used BIGINT DEFAULT 0, -- 字节
    storage_limit BIGINT DEFAULT 1073741824, -- 默认 1GB
    vip_expire_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 后台管理员表 (依赖 admin_roles)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    real_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    avatar_url TEXT,
    role_id UUID REFERENCES admin_roles(id),
    is_active BOOLEAN DEFAULT true,
    last_login_time TIMESTAMPTZ,
    last_login_ip VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 黑名单表
CREATE TABLE IF NOT EXISTS blacklists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reason TEXT,
    operator_id UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- ============================================
-- 2. 模板管理模块
-- ============================================

-- 模板分类表
CREATE TABLE IF NOT EXISTS template_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    parent_id UUID REFERENCES template_categories(id),
    sort_order INTEGER DEFAULT 0,
    icon_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 模板标签表
CREATE TABLE IF NOT EXISTS template_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tag_name VARCHAR(30) UNIQUE NOT NULL,
    color VARCHAR(7) DEFAULT '#1E40AF',
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 模板表
CREATE TABLE IF NOT EXISTS templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES template_categories(id),
    template_type VARCHAR(20) DEFAULT 'free' CHECK (template_type IN ('free', 'vip')),
    vip_permission JSONB DEFAULT '[]', -- 可使用的VIP套餐
    thumbnail_url TEXT,
    video_url TEXT,
    duration INTEGER, -- 秒
    required_images INTEGER DEFAULT 3,
    required_videos INTEGER DEFAULT 0,
    required_text_length INTEGER DEFAULT 0,
    export_ratios JSONB DEFAULT '["16:9", "9:16", "1:1"]',
    allow_custom_logo BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'active', 'inactive')),
    usage_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,2) DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_by UUID REFERENCES admin_users(id),
    reviewed_by UUID REFERENCES admin_users(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 模板标签关联表
CREATE TABLE IF NOT EXISTS template_tags_relation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES template_tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(template_id, tag_id)
);

-- ============================================
-- 3. 任务管理模块
-- ============================================

-- 视频渲染任务表
CREATE TABLE IF NOT EXISTS render_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    template_id UUID REFERENCES templates(id),
    task_status VARCHAR(20) DEFAULT 'pending' CHECK (task_status IN ('pending', 'processing', 'completed', 'failed', 'terminated')),
    progress INTEGER DEFAULT 0,
    input_data JSONB, -- 用户输入的素材、文案等
    output_video_url TEXT,
    output_cover_url TEXT,
    export_ratio VARCHAR(10) DEFAULT '16:9',
    export_resolution VARCHAR(10) DEFAULT '1080p',
    error_message TEXT,
    error_stack TEXT,
    processing_log JSONB DEFAULT '[]',
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    terminated_at TIMESTAMPTZ
);

-- ============================================
-- 4. 素材管理模块
-- ============================================

-- 素材分类表
CREATE TABLE IF NOT EXISTS material_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    parent_id UUID REFERENCES material_categories(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 公共素材库表
CREATE TABLE IF NOT EXISTS materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    category_id UUID REFERENCES material_categories(id),
    material_type VARCHAR(20) CHECK (material_type IN ('image', 'video', 'audio')),
    file_url TEXT NOT NULL,
    thumbnail_url TEXT,
    file_size BIGINT,
    duration INTEGER, -- 视频/音频时长(秒)
    width INTEGER,
    height INTEGER,
    tags JSONB DEFAULT '[]',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'rejected')),
    is_public BOOLEAN DEFAULT true,
    uploader_id UUID REFERENCES admin_users(id),
    reviewed_by UUID REFERENCES admin_users(id),
    reviewed_at TIMESTAMPTZ,
    rejection_reason TEXT,
    usage_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用户素材审核表
CREATE TABLE IF NOT EXISTS user_materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    material_type VARCHAR(20) CHECK (material_type IN ('image', 'video', 'audio')),
    file_url TEXT NOT NULL,
    thumbnail_url TEXT,
    file_size BIGINT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'violated')),
    reviewed_by UUID REFERENCES admin_users(id),
    reviewed_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. 订单与商业化模块
-- ============================================

-- VIP套餐表
CREATE TABLE IF NOT EXISTS packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    package_type VARCHAR(20) CHECK (package_type IN ('personal', 'team', 'lifetime')),
    duration_type VARCHAR(20) CHECK (duration_type IN ('month', 'quarter', 'year', 'lifetime')),
    duration_value INTEGER DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    video_minutes INTEGER NOT NULL,
    storage_gb INTEGER NOT NULL,
    template_permission JSONB DEFAULT '[]',
    tool_limits JSONB DEFAULT '{}',
    export_permissions JSONB DEFAULT '{}',
    additional_benefits JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 加油包表
CREATE TABLE IF NOT EXISTS addons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    addon_type VARCHAR(20) CHECK (addon_type IN ('minutes', 'storage')),
    value INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    validity_days INTEGER DEFAULT 365,
    max_purchase_limit INTEGER DEFAULT 10,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 订单表
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_no VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    order_type VARCHAR(20) CHECK (order_type IN ('package', 'addon')),
    total_amount DECIMAL(10,2) NOT NULL,
    actual_amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20),
    payment_status VARCHAR(20) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'failed')),
    order_status VARCHAR(20) DEFAULT 'pending' CHECK (order_status IN ('pending', 'completed', 'cancelled', 'refunded')),
    paid_at TIMESTAMPTZ,
    refunded_at TIMESTAMPTZ,
    refund_amount DECIMAL(10,2),
    refund_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 订单明细表
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    item_type VARCHAR(20) CHECK (item_type IN ('package', 'addon')),
    item_id UUID NOT NULL,
    item_name VARCHAR(100),
    quantity INTEGER DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用户套餐关联表
CREATE TABLE IF NOT EXISTS user_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    package_id UUID REFERENCES packages(id),
    order_id UUID REFERENCES orders(id),
    start_time TIMESTAMPTZ DEFAULT NOW(),
    expire_time TIMESTAMPTZ NOT NULL,
    video_minutes_total INTEGER NOT NULL,
    video_minutes_used INTEGER DEFAULT 0,
    storage_gb_total INTEGER NOT NULL,
    additional_minutes INTEGER DEFAULT 0,
    additional_storage_gb INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用户加油包购买记录表
CREATE TABLE IF NOT EXISTS user_addons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    addon_id UUID REFERENCES addons(id),
    order_id UUID REFERENCES orders(id),
    addon_type VARCHAR(20) CHECK (addon_type IN ('minutes', 'storage')),
    value INTEGER NOT NULL,
    value_used INTEGER DEFAULT 0,
    expire_time TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 退款申请表
CREATE TABLE IF NOT EXISTS refund_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    user_id UUID REFERENCES users(id),
    refund_amount DECIMAL(10,2) NOT NULL,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'processing')),
    reviewed_by UUID REFERENCES admin_users(id),
    reviewed_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. 系统配置模块
-- ============================================

-- 系统配置表
CREATE TABLE IF NOT EXISTS system_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT,
    config_type VARCHAR(20) DEFAULT 'string' CHECK (config_type IN ('string', 'number', 'boolean', 'json')),
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 消息模板表
CREATE TABLE IF NOT EXISTS message_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_code VARCHAR(50) UNIQUE NOT NULL,
    template_name VARCHAR(100) NOT NULL,
    template_type VARCHAR(20) CHECK (template_type IN ('notification', 'email', 'sms', 'wx')),
    title VARCHAR(200),
    content TEXT NOT NULL,
    variables JSONB DEFAULT '[]',
    trigger_conditions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI模型配置表
CREATE TABLE IF NOT EXISTS ai_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_name VARCHAR(100) NOT NULL,
    model_code VARCHAR(50) UNIQUE NOT NULL,
    model_type VARCHAR(50),
    api_endpoint TEXT,
    daily_limit INTEGER DEFAULT 0,
    permission JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. 日志与审计模块
-- ============================================

-- 操作日志表
CREATE TABLE IF NOT EXISTS operation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    operator_id UUID REFERENCES admin_users(id),
    operator_name VARCHAR(100),
    operation_type VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    operation_detail JSONB DEFAULT '{}',
    ip_address VARCHAR(50),
    user_agent TEXT,
    status VARCHAR(20) DEFAULT 'success' CHECK (status IN ('success', 'failed')),
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用户行为日志表
CREATE TABLE IF NOT EXISTS user_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    activity_type VARCHAR(50) NOT NULL,
    activity_detail JSONB DEFAULT '{}',
    page_url TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 索引创建
-- ============================================

-- 用户表索引
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(user_role);
CREATE INDEX idx_users_status ON users(account_status);
CREATE INDEX idx_users_register_time ON users(register_time);

-- 任务表索引
CREATE INDEX idx_tasks_user_id ON render_tasks(user_id);
CREATE INDEX idx_tasks_status ON render_tasks(task_status);
CREATE INDEX idx_tasks_created_at ON render_tasks(created_at);

-- 模板表索引
CREATE INDEX idx_templates_category ON templates(category_id);
CREATE INDEX idx_templates_type ON templates(template_type);
CREATE INDEX idx_templates_status ON templates(status);

-- 订单表索引
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- 操作日志索引
CREATE INDEX idx_logs_operator ON operation_logs(operator_id);
CREATE INDEX idx_logs_created_at ON operation_logs(created_at);

-- ============================================
-- 初始化默认数据
-- ============================================

-- 默认后台角色
INSERT INTO admin_roles (role_name, role_code, description, permissions) VALUES
('超级管理员', 'super_admin', '拥有所有权限', '{"all": true}'),
('运营管理员', 'operation_admin', '负责用户、内容、消息管理', '{"users": {"read": true, "write": true}, "content": {"read": true, "write": true}, "messages": {"read": true, "write": true}}'),
('内容管理员', 'content_admin', '负责模板和素材管理', '{"templates": {"read": true, "write": true}, "materials": {"read": true, "write": true}}'),
('数据分析师', 'data_analyst', '仅查看数据统计', '{"analytics": {"read": true}}')
ON CONFLICT (role_code) DO NOTHING;

-- 默认超级管理员 (密码: admin123, 需要生产环境修改)
INSERT INTO admin_users (username, password_hash, real_name, email, role_id)
SELECT
    'admin',
    '$2b$10$YourHashedPasswordHere', -- 实际部署时需替换
    '系统管理员',
    'admin@situo.com',
    id
FROM admin_roles WHERE role_code = 'super_admin'
ON CONFLICT (username) DO NOTHING;

-- 默认系统配置
INSERT INTO system_configs (config_key, config_value, config_type, description) VALUES
('mini_program_name', '思拓智媒', 'string', '小程序名称'),
('mini_logo_url', '', 'string', '小程序Logo'),
('api_timeout', '30000', 'number', 'API超时时间(ms)'),
('enable_registration', 'true', 'boolean', '是否开放注册')
ON CONFLICT (config_key) DO NOTHING;

-- ============================================
-- 触发器：自动更新 updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为需要的表添加触发器
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_configs_updated_at BEFORE UPDATE ON system_configs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
