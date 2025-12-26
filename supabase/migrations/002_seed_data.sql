-- ============================================
-- 思拓智媒 - Mock 测试数据
-- 覆盖所有功能和所有状态
-- ============================================

-- ============================================
-- 1. 模板分类数据
-- ============================================
INSERT INTO template_categories (id, name, parent_id, sort_order, icon_url, is_active) VALUES
('11111111-1111-1111-1111-111111111101', '企业宣传', NULL, 1, NULL, true),
('11111111-1111-1111-1111-111111111102', '产品介绍', NULL, 2, NULL, true),
('11111111-1111-1111-1111-111111111103', '社交媒体', NULL, 3, NULL, true),
('11111111-1111-1111-1111-111111111104', '教育培训', NULL, 4, NULL, true),
('11111111-1111-1111-1111-111111111105', '活动促销', NULL, 5, NULL, true),
('11111111-1111-1111-1111-111111111106', '企业形象', '11111111-1111-1111-1111-111111111101', 1, NULL, true),
('11111111-1111-1111-1111-111111111107', '产品展示', '11111111-1111-1111-1111-111111111102', 1, NULL, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. 素材分类数据
-- ============================================
INSERT INTO material_categories (id, name, parent_id, sort_order, is_active) VALUES
('21111111-1111-1111-1111-111111111101', '图片素材', NULL, 1, true),
('21111111-1111-1111-1111-111111111102', '视频素材', NULL, 2, true),
('21111111-1111-1111-1111-111111111103', '音频素材', NULL, 3, true),
('21111111-1111-1111-1111-111111111104', '商务场景', '21111111-1111-1111-1111-111111111101', 1, true),
('21111111-1111-1111-1111-211111111105', '生活场景', '21111111-1111-1111-1111-111111111101', 2, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 3. VIP套餐数据
-- ============================================
INSERT INTO packages (id, name, package_type, duration_type, duration_value, price, original_price, video_minutes, storage_gb, is_active, sort_order) VALUES
('31111111-1111-1111-1111-111111111101', '个人月卡', 'personal', 'month', 1, 29.90, 39.90, 100, 10, true, 1),
('31111111-1111-1111-1111-111111111102', '个人季卡', 'personal', 'quarter', 3, 79.90, 99.90, 300, 10, true, 2),
('31111111-1111-1111-1111-111111111103', '个人年卡', 'personal', 'year', 12, 299.90, 399.90, 1200, 10, true, 3),
('31111111-1111-1111-1111-111111111104', '团队月卡', 'team', 'month', 1, 99.90, 129.90, 500, 50, true, 4),
('31111111-1111-1111-1111-111111111105', '团队季卡', 'team', 'quarter', 3, 269.90, 329.90, 1500, 50, true, 5),
('31111111-1111-1111-1111-111111111106', '终身会员', 'lifetime', 'lifetime', 1, 999.90, 1999.90, 99999, 100, true, 6)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 4. 加油包数据
-- ============================================
INSERT INTO addons (id, name, addon_type, value, price, validity_days, max_purchase_limit, description, is_active, sort_order) VALUES
('41111111-1111-1111-1111-111111111101', '视频时长加油包-50分钟', 'minutes', 50, 19.90, 365, 10, '额外增加50分钟视频生成时长', true, 1),
('41111111-1111-1111-1111-111111111102', '视频时长加油包-100分钟', 'minutes', 100, 39.90, 365, 10, '额外增加100分钟视频生成时长', true, 2),
('41111111-1111-1111-1111-111111111103', '存储空间加油包-10GB', 'storage', 10, 9.90, 365, 10, '额外增加10GB存储空间', true, 3),
('41111111-1111-1111-1111-111111111104', '存储空间加油包-50GB', 'storage', 50, 39.90, 365, 5, '额外增加50GB存储空间', true, 4)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 5. 小程序用户数据 (所有角色和状态组合)
-- ============================================
INSERT INTO users (id, openid, nickname, avatar_url, phone, email, user_role, account_status, register_time, last_login_time, remaining_minutes, storage_used, storage_limit, vip_expire_time) VALUES
-- free 用户 - normal 状态
('51111111-1111-1111-1111-111111111101', 'free_normal_001', '小明同学', NULL, '13800001001', 'xiaoming@test.com', 'free', 'normal', NOW() - INTERVAL '90 days', NOW() - INTERVAL '1 day', 5, 104857600, 1073741824, NULL),
('51111111-1111-1111-1111-111111111102', 'free_normal_002', '小红花', NULL, '13800001002', 'xiaohong@test.com', 'free', 'normal', NOW() - INTERVAL '60 days', NOW() - INTERVAL '2 hours', 3, 52428800, 1073741824, NULL),
-- free 用户 - disabled 状态
('51111111-1111-1111-1111-111111111103', 'free_disabled_001', '已禁用用户A', NULL, '13800001003', 'disabled1@test.com', 'free', 'disabled', NOW() - INTERVAL '30 days', NOW() - INTERVAL '7 days', 0, 0, 1073741824, NULL),
-- free 用户 - blacklisted 状态
('51111111-1111-1111-1111-111111111104', 'free_blacklisted_001', '黑名单用户', NULL, '13800001004', 'blacklist@test.com', 'free', 'blacklisted', NOW() - INTERVAL '15 days', NOW() - INTERVAL '10 days', 0, 0, 1073741824, NULL),

-- personal 用户 - normal 状态
('51111111-1111-1111-1111-111111111105', 'personal_normal_001', '张三企业主', NULL, '13800001005', 'zhangsan@test.com', 'personal', 'normal', NOW() - INTERVAL '120 days', NOW() - INTERVAL '30 minutes', 45, 536870912, 10737418240, NOW() + INTERVAL '180 days'),
('51111111-1111-1111-1111-111111111106', 'personal_normal_002', '李四设计师', NULL, '13800001006', 'lisi@test.com', 'personal', 'normal', NOW() - INTERVAL '80 days', NOW() - INTERVAL '1 day', 120, 2147483648, 10737418240, NOW() + INTERVAL '90 days'),
-- personal 用户 - disabled 状态
('51111111-1111-1111-1111-111111111107', 'personal_disabled_001', '过期VIP用户', NULL, '13800001007', 'expired@test.com', 'personal', 'disabled', NOW() - INTERVAL '200 days', NOW() - INTERVAL '5 days', 0, 0, 10737418240, NOW() - INTERVAL '10 days'),

-- team 用户 - normal 状态
('51111111-1111-1111-1111-111111111108', 'team_normal_001', '科技公司A', NULL, '13800001008', 'teama@test.com', 'team', 'normal', NOW() - INTERVAL '150 days', NOW() - INTERVAL '2 hours', 350, 2147483648, 53687091200, NOW() + INTERVAL '365 days'),
('51111111-1111-1111-1111-111111111109', 'team_normal_002', '设计工作室B', NULL, '13800001009', 'teamb@test.com', 'team', 'normal', NOW() - INTERVAL '100 days', NOW() - INTERVAL '15 minutes', 280, 1073741824, 53687091200, NOW() + INTERVAL '60 days'),
-- team 用户 - normal 状态 (即将过期)
('51111111-1111-1111-1111-111111111110', 'team_normal_003', '创业团队C', NULL, '13800001010', 'teamc@test.com', 'team', 'normal', NOW() - INTERVAL '180 days', NOW() - INTERVAL '3 days', 0, 0, 53687091200, NOW() + INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 6. 模板数据 (所有类型和状态组合)
-- ============================================
INSERT INTO templates (id, name, description, category_id, template_type, thumbnail_url, video_url, duration, required_images, required_videos, export_ratios, status, usage_count, download_count, conversion_rate, sort_order, created_by, reviewed_by, reviewed_at) VALUES
-- free 模板 - active 状态
('61111111-1111-1111-1111-111111111101', '简约商务介绍', '适合中小企业宣传介绍', '11111111-1111-1111-1111-111111111101', 'free', 'https://picsum.photos/seed/tpl101/320/180', NULL, 30, 5, 0, '["16:9", "9:16"]', 'active', 1250, 890, 71.2, 1, NULL, NULL, NOW() - INTERVAL '50 days'),
('61111111-1111-1111-1111-111111111102', '产品展示卡片', '电商产品快速展示模板', '11111111-1111-1111-1111-111111111102', 'free', 'https://picsum.photos/seed/tpl102/320/180', NULL, 15, 3, 0, '["1:1", "9:16"]', 'active', 2300, 1650, 71.7, 2, NULL, NULL, NOW() - INTERVAL '45 days'),
('61111111-1111-1111-1111-111111111103', '社交媒体海报', '朋友圈/小红书通用模板', '11111111-1111-1111-1111-111111111103', 'free', 'https://picsum.photos/seed/tpl103/320/180', NULL, 10, 2, 0, '["9:16", "1:1"]', 'active', 3500, 2800, 80.0, 3, NULL, NULL, NOW() - INTERVAL '40 days'),
-- free 模板 - draft 状态
('61111111-1111-1111-1111-111111111104', '活动促销模板(草稿)', '待完善的活动促销模板', '11111111-1111-1111-1111-111111111105', 'free', 'https://picsum.photos/seed/tpl104/320/180', NULL, 20, 4, 0, '["16:9", "9:16"]', 'draft', 0, 0, 0, 10, NULL, NULL, NULL),

-- vip 模板 - active 状态
('61111111-1111-1111-1111-111111111105', '高端企业宣传片', '大型企业形象展示', '11111111-1111-1111-1111-111111111106', 'vip', 'https://picsum.photos/seed/tpl105/320/180', NULL, 60, 8, 2, '["16:9"]', 'active', 450, 380, 84.4, 4, NULL, NULL, NOW() - INTERVAL '35 days'),
('61111111-1111-1111-1111-111111111106', '3D产品展示', '炫酷3D效果产品展示', '11111111-1111-1111-1111-111111111107', 'vip', 'https://picsum.photos/seed/tpl106/320/180', NULL, 45, 6, 1, '["16:9", "9:16"]', 'active', 680, 590, 86.8, 5, NULL, NULL, NOW() - INTERVAL '30 days'),
('61111111-1111-1111-1111-111111111107', '动画教育课程', '在线教育课程宣传', '11111111-1111-1111-1111-111111111104', 'vip', 'https://picsum.photos/seed/tpl107/320/180', NULL, 90, 10, 3, '["16:9"]', 'active', 320, 280, 87.5, 6, NULL, NULL, NOW() - INTERVAL '25 days'),
-- vip 模板 - pending 状态
('61111111-1111-1111-1111-111111111108', 'AI智能客服介绍', '待审核的AI相关模板', '11111111-1111-1111-1111-111111111101', 'vip', 'https://picsum.photos/seed/tpl108/320/180', NULL, 40, 5, 1, '["16:9", "9:16"]', 'pending', 0, 0, 0, 20, NULL, NULL, NULL),
-- vip 模板 - inactive 状态
('61111111-1111-1111-1111-111111111109', '节日促销模板(已下架)', '暂时下架的节日模板', '11111111-1111-1111-1111-111111111105', 'vip', 'https://picsum.photos/seed/tpl109/320/180', NULL, 25, 4, 0, '["16:9", "9:16"]', 'inactive', 120, 95, 79.2, 30, NULL, NULL, NOW() - INTERVAL '20 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 7. 视频渲染任务数据 (所有状态组合)
-- ============================================
INSERT INTO render_tasks (id, user_id, template_id, task_status, progress, input_data, export_ratio, export_resolution, error_message, retry_count, created_at, started_at, completed_at) VALUES
-- pending 状态任务
('71111111-1111-1111-1111-111111111101', '51111111-1111-1111-1111-111111111101', '61111111-1111-1111-1111-111111111101', 'pending', 0, '{"images": ["img1.jpg", "img2.jpg"], "text": "企业介绍"}', '16:9', '1080p', NULL, 0, NOW() - INTERVAL '5 minutes', NULL, NULL),
('71111111-1111-1111-1111-111111111102', '51111111-1111-1111-1111-111111111102', '61111111-1111-1111-1111-111111111102', 'pending', 0, '{"images": ["img1.jpg"], "text": "产品介绍"}', '9:16', '1080p', NULL, 0, NOW() - INTERVAL '2 minutes', NULL, NULL),

-- processing 状态任务 (不同进度)
('71111111-1111-1111-1111-111111111103', '51111111-1111-1111-1111-111111111105', '61111111-1111-1111-1111-111111111105', 'processing', 25, '{"images": ["img1.jpg", "img2.jpg", "img3.jpg"], "videos": ["v1.mp4"], "text": "企业宣传"}', '16:9', '1080p', NULL, 0, NOW() - INTERVAL '3 minutes', NOW() - INTERVAL '2 minutes', NULL),
('71111111-1111-1111-1111-111111111104', '51111111-1111-1111-1111-111111105', '61111111-1111-1111-1111-111111111106', 'processing', 60, '{"images": ["img1.jpg", "img2.jpg"], "videos": ["v1.mp4"], "text": "产品展示"}', '16:9', '1080p', NULL, 0, NOW() - INTERVAL '5 minutes', NOW() - INTERVAL '4 minutes', NULL),
('71111111-1111-1111-1111-111111111105', '51111111-1111-1111-1111-111111111106', '61111111-1111-1111-1111-111111111107', 'processing', 85, '{"images": ["img1.jpg"], "videos": ["v1.mp4", "v2.mp4"], "text": "教育课程"}', '16:9', '1080p', NULL, 0, NOW() - INTERVAL '8 minutes', NOW() - INTERVAL '7 minutes', NULL),

-- completed 状态任务
('71111111-1111-1111-1111-111111111106', '51111111-1111-1111-1111-111111111101', '61111111-1111-1111-1111-111111111101', 'completed', 100, '{"images": ["img1.jpg", "img2.jpg"], "text": "企业介绍"}', '16:9', '1080p', NULL, 0, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days'),
('71111111-1111-1111-1111-111111111107', '51111111-1111-1111-1111-111111111102', '61111111-1111-1111-1111-111111111102', 'completed', 100, '{"images": ["img1.jpg"], "text": "产品卡片"}', '9:16', '1080p', NULL, 0, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day'),
('71111111-1111-1111-1111-111111111108', '51111111-1111-1111-1111-111111111105', '61111111-1111-1111-1111-111111111105', 'completed', 100, '{"images": ["img1.jpg", "img2.jpg", "img3.jpg"], "videos": ["v1.mp4"], "text": "企业宣传"}', '16:9', '1080p', NULL, 0, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days'),
('71111111-1111-1111-1111-111111111109', '51111111-1111-1111-1111-111111111108', '61111111-1111-1111-1111-111111111106', 'completed', 100, '{"images": ["img1.jpg", "img2.jpg"], "videos": ["v1.mp4"], "text": "3D产品展示"}', '16:9', '1080p', NULL, 0, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', NOW() - INTERVAL '20 hours'),

-- failed 状态任务
('71111111-1111-1111-1111-111111111110', '51111111-1111-1111-1111-111111111101', '61111111-1111-1111-1111-111111111101', 'failed', 45, '{"images": ["img1.jpg"], "text": "测试失败"}', '16:9', '1080p', '视频渲染超时', 1, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
('71111111-1111-1111-1111-111111111111', '51111111-1111-1111-1111-111111111105', '61111111-1111-1111-1111-111111111107', 'failed', 30, '{"images": ["img1.jpg", "img2.jpg"], "text": "素材格式错误"}', '16:9', '1080p', '不支持的图片格式', 2, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),

-- terminated 状态任务
('71111111-1111-1111-1111-111111111112', '51111111-1111-1111-1111-111111111102', '61111111-1111-1111-1111-111111111102', 'terminated', 15, '{"images": ["img1.jpg"], "text": "用户取消"}', '9:16', '1080p', '用户主动取消任务', 0, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 8. 公共素材库数据 (所有类型和状态组合)
-- ============================================
INSERT INTO materials (id, name, category_id, material_type, file_url, thumbnail_url, file_size, duration, width, height, tags, status, is_public, uploader_id, usage_count, download_count) VALUES
-- image 类型 - active 状态
('81111111-1111-1111-1111-111111111101', '商务会议场景', '21111111-1111-1111-1111-111111111104', 'image', 'https://picsum.photos/seed/mat101/1920/1080', 'https://picsum.photos/seed/mat101/320/180', 524288, NULL, 1920, 1080, '["商务", "会议", "办公室"]', 'active', true, NULL, 450, 320),
('81111111-1111-1111-1111-111111111102', '产品拍摄背景', '21111111-1111-1111-1111-211111111105', 'image', 'https://picsum.photos/seed/mat102/1920/1080', 'https://picsum.photos/seed/mat102/320/180', 314572, NULL, 1920, 1080, '["产品", "简约", "白色"]', 'active', true, NULL, 680, 490),
('81111111-1111-1111-1111-111111111103', '城市夜景', '21111111-1111-1111-1111-211111111105', 'image', 'https://picsum.photos/seed/mat103/1920/1080', 'https://picsum.photos/seed/mat103/320/180', 734003, NULL, 1920, 1080, '["城市", "夜景", "灯光"]', 'active', true, NULL, 320, 210),

-- image 类型 - pending 状态
('81111111-1111-1111-1111-111111111104', '风景照片(待审核)', '21111111-1111-1111-1111-211111111105', 'image', 'https://picsum.photos/seed/mat104/1920/1080', 'https://picsum.photos/seed/mat104/320/180', 624288, NULL, 1920, 1080, '["风景", "自然"]', 'pending', true, NULL, 0, 0),

-- video 类型 - active 状态
('81111111-1111-1111-1111-111111111105', '动态文字动画', '21111111-1111-1111-1111-111111111102', 'video', 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', 'https://picsum.photos/seed/mat105/320/180', 5242880, 10, 1280, 720, '["动画", "文字", "动态"]', 'active', true, NULL, 890, 650),
('81111111-1111-1111-1111-111111111106', '粒子特效视频', '21111111-1111-1111-1111-111111111102', 'video', 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4', 'https://picsum.photos/seed/mat106/320/180', 7340032, 15, 1280, 720, '["粒子", "特效", "背景"]', 'active', true, NULL, 560, 380),

-- video 类型 - pending 状态
('81111111-1111-1111-1111-111111111107', '转场视频(待审核)', '21111111-1111-1111-1111-111111111102', 'video', 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_3mb.mp4', 'https://picsum.photos/seed/mat107/320/180', 6242880, 8, 1280, 720, '["转场", "动画"]', 'pending', true, NULL, 0, 0),

-- audio 类型 - active 状态
('81111111-1111-1111-1111-111111111108', '轻快背景音乐', '21111111-1111-1111-1111-111111111103', 'audio', 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3', NULL, 2097152, 180, NULL, NULL, '["音乐", "轻快", "背景"]', 'active', true, NULL, 1200, 890),
('81111111-1111-1111-1111-111111111109', '企业宣传配音', '21111111-1111-1111-1111-111111111103', 'audio', 'https://sample-videos.com/audio/mp3/crowd-cheering2.mp3', NULL, 1572864, 120, NULL, NULL, '["配音", "企业", "专业"]', 'active', true, NULL, 780, 560),

-- inactive 状态素材
('81111111-1111-1111-1111-111111111110', '旧版素材(已下架)', '21111111-1111-1111-1111-111111111104', 'image', 'https://picsum.photos/seed/mat110/1920/1080', 'https://picsum.photos/seed/mat110/320/180', 424288, NULL, 1920, 1080, '["旧版"]', 'inactive', true, NULL, 50, 30),

-- rejected 状态素材
('81111111-1111-1111-1111-111111111111', '违规素材(已拒绝)', '21111111-1111-1111-1111-211111111105', 'image', 'https://picsum.photos/seed/mat111/1920/1080', 'https://picsum.photos/seed/mat111/320/180', 524288, NULL, 1920, 1080, '["违规"]', 'rejected', true, NULL, 0, 0)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 9. 订单数据 (所有类型和状态组合)
-- ============================================
INSERT INTO orders (id, order_no, user_id, order_type, total_amount, actual_amount, payment_method, payment_status, order_status, paid_at, refunded_at, refund_amount, refund_reason) VALUES
-- package 订单 - paid + completed
('91111111-1111-1111-1111-111111111101', 'ORD202501001001', '51111111-1111-1111-1111-111111111105', 'package', 39.90, 29.90, 'wechat', 'paid', 'completed', NOW() - INTERVAL '60 days', NULL, NULL, NULL),
('91111111-1111-1111-1111-111111111102', 'ORD202501002001', '51111111-1111-1111-1111-111111111106', 'package', 99.90, 79.90, 'alipay', 'paid', 'completed', NOW() - INTERVAL '50 days', NULL, NULL, NULL),
('91111111-1111-1111-1111-111111111103', 'ORD202501003001', '51111111-1111-1111-1111-111111111108', 'package', 399.90, 299.90, 'wechat', 'paid', 'completed', NOW() - INTERVAL '120 days', NULL, NULL, NULL),
-- package 订单 - unpaid + pending
('91111111-1111-1111-1111-111111111104', 'ORD202501004001', '51111111-1111-1111-1111-111111111101', 'package', 39.90, 29.90, NULL, 'unpaid', 'pending', NULL, NULL, NULL, NULL),
-- package 订单 - paid + pending (支付成功但订单未完成)
('91111111-1111-1111-1111-111111111105', 'ORD202501005001', '51111111-1111-1111-1111-111111111102', 'package', 99.90, 79.90, 'wechat', 'paid', 'pending', NOW() - INTERVAL '1 day', NULL, NULL, NULL),

-- addon 订单 - paid + completed
('91111111-1111-1111-1111-111111111106', 'ORD202501006001', '51111111-1111-1111-1111-111111111105', 'addon', 29.90, 19.90, 'alipay', 'paid', 'completed', NOW() - INTERVAL '30 days', NULL, NULL, NULL),
('91111111-1111-1111-1111-111111111107', 'ORD202501007001', '51111111-1111-1111-1111-111111111108', 'addon', 49.90, 39.90, 'wechat', 'paid', 'completed', NOW() - INTERVAL '20 days', NULL, NULL, NULL),

-- package 订单 - refunded + refunded
('91111111-1111-1111-1111-111111111108', 'ORD202501008001', '51111111-1111-1111-1111-111111111101', 'package', 39.90, 29.90, 'wechat', 'refunded', 'refunded', NOW() - INTERVAL '15 days', NOW() - INTERVAL '10 days', 29.90, '用户主动退款'),
-- addon 订单 - refunded + refunded
('91111111-1111-1111-1111-111111111109', 'ORD202501009001', '51111111-1111-1111-1111-111111111106', 'addon', 29.90, 19.90, 'alipay', 'refunded', 'refunded', NOW() - INTERVAL '8 days', NOW() - INTERVAL '5 days', 19.90, '误购退款'),

-- package 订单 - failed + cancelled
('91111111-1111-1111-1111-111111111110', 'ORD202501010001', '51111111-1111-1111-1111-111111111102', 'package', 99.90, 79.90, NULL, 'failed', 'cancelled', NULL, NULL, NULL, NULL),

-- addon 订单 - unpaid + cancelled
('91111111-1111-1111-1111-111111111111', 'ORD202501011001', '51111111-1111-1111-1111-111111111109', 'addon', 29.90, 19.90, NULL, 'unpaid', 'cancelled', NULL, NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 10. 订单明细数据
-- ============================================
INSERT INTO order_items (id, order_id, item_type, item_id, item_name, quantity, price) VALUES
('a1111111-1111-1111-1111-111111111101', '91111111-1111-1111-1111-111111111101', 'package', '31111111-1111-1111-1111-111111111102', '个人季卡', 1, 29.90),
('a1111111-1111-1111-1111-111111111102', '91111111-1111-1111-1111-111111111102', 'package', '31111111-1111-1111-1111-111111111103', '个人年卡', 1, 79.90),
('a1111111-1111-1111-1111-111111111103', '91111111-1111-1111-1111-111111111103', 'package', '31111111-1111-1111-1111-111111111106', '终身会员', 1, 299.90),
('a1111111-1111-1111-1111-111111111104', '91111111-1111-1111-1111-111111111104', 'package', '31111111-1111-1111-1111-111111111102', '个人季卡', 1, 29.90),
('a1111111-1111-1111-1111-111111111105', '91111111-1111-1111-1111-111111111105', 'package', '31111111-1111-1111-1111-111111111103', '个人年卡', 1, 79.90),
('a1111111-1111-1111-1111-111111111106', '91111111-1111-1111-1111-111111111106', 'addon', '41111111-1111-1111-1111-111111111102', '视频时长加油包-100分钟', 1, 19.90),
('a1111111-1111-1111-1111-111111111107', '91111111-1111-1111-1111-111111111107', 'addon', '41111111-1111-1111-1111-111111111104', '存储空间加油包-50GB', 1, 39.90),
('a1111111-1111-1111-1111-111111111108', '91111111-1111-1111-1111-111111111108', 'package', '31111111-1111-1111-1111-111111111102', '个人季卡', 1, 29.90),
('a1111111-1111-1111-1111-111111111109', '91111111-1111-1111-1111-111111111109', 'addon', '41111111-1111-1111-1111-111111111102', '视频时长加油包-100分钟', 1, 19.90),
('a1111111-1111-1111-1111-111111111110', '91111111-1111-1111-1111-111111111110', 'package', '31111111-1111-1111-1111-111111111103', '个人年卡', 1, 79.90),
('a1111111-1111-1111-1111-111111111111', '91111111-1111-1111-1111-111111111111', 'addon', '41111111-1111-1111-1111-111111111101', '视频时长加油包-50分钟', 1, 19.90)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 11. 用户套餐关联数据
-- ============================================
INSERT INTO user_packages (id, user_id, package_id, order_id, start_time, expire_time, video_minutes_total, video_minutes_used, storage_gb_total, additional_minutes, additional_storage_gb, is_active) VALUES
('b1111111-1111-1111-1111-111111111101', '51111111-1111-1111-1111-111111111105', '31111111-1111-1111-1111-111111111102', '91111111-1111-1111-1111-111111111101', NOW() - INTERVAL '60 days', NOW() + INTERVAL '30 days', 300, 255, 10, 0, 0, true),
('b1111111-1111-1111-1111-111111111102', '51111111-1111-1111-1111-111111111106', '31111111-1111-1111-1111-111111111103', '91111111-1111-1111-1111-111111111102', NOW() - INTERVAL '50 days', NOW() + INTERVAL '40 days', 1200, 1080, 10, 0, 0, true),
('b1111111-1111-1111-1111-111111111103', '51111111-1111-1111-1111-111111111108', '31111111-1111-1111-1111-111111111106', '91111111-1111-1111-1111-111111111103', NOW() - INTERVAL '120 days', NOW() + INTERVAL '245 days', 99999, 350, 100, 0, 0, true),
('b1111111-1111-1111-1111-111111111104', '51111111-1111-1111-1111-111111111109', '31111111-1111-1111-1111-111111111105', '91111111-1111-1111-1111-111111111105', NOW() - INTERVAL '10 days', NOW() + INTERVAL '50 days', 1500, 1220, 50, 0, 0, true),
-- 即将过期的套餐
('b1111111-1111-1111-1111-111111111105', '51111111-1111-1111-1111-111111111110', '31111111-1111-1111-1111-111111111105', '91111111-1111-1111-1111-111111111108', NOW() - INTERVAL '87 days', NOW() + INTERVAL '3 days', 1500, 1500, 50, 0, 0, true),
-- 已过期的套餐
('b1111111-1111-1111-1111-111111111106', '51111111-1111-1111-1111-111111111107', '31111111-1111-1111-1111-111111111102', NULL, NOW() - INTERVAL '200 days', NOW() - INTERVAL '10 days', 300, 300, 10, 0, 0, false)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 12. 用户加油包购买记录
-- ============================================
INSERT INTO user_addons (id, user_id, addon_id, order_id, addon_type, value, value_used, expire_time, is_active) VALUES
('c1111111-1111-1111-1111-111111111101', '51111111-1111-1111-1111-111111111105', '41111111-1111-1111-1111-111111111102', '91111111-1111-1111-1111-111111111106', 'minutes', 100, 45, NOW() + INTERVAL '335 days', true),
('c1111111-1111-1111-1111-111111111102', '51111111-1111-1111-1111-111111111108', '41111111-1111-1111-1111-111111111104', '91111111-1111-1111-1111-111111111107', 'storage', 50, 12, NOW() + INTERVAL '345 days', true),
('c1111111-1111-1111-1111-111111111103', '51111111-1111-1111-1111-111111111109', '41111111-1111-1111-1111-111111111102', '91111111-1111-1111-1111-111111111109', 'minutes', 100, 100, NOW() + INTERVAL '355 days', true),
-- 已过期加油包
('c1111111-1111-1111-1111-111111111104', '51111111-1111-1111-1111-111111111101', '41111111-1111-1111-1111-111111111101', NULL, 'minutes', 50, 50, NOW() - INTERVAL '10 days', false)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 13. 退款申请数据 (所有状态组合)
-- ============================================
INSERT INTO refund_requests (id, order_id, user_id, refund_amount, reason, status, reviewed_by, reviewed_at, rejection_reason) VALUES
-- pending 状态
('d1111111-1111-1111-1111-111111111101', '91111111-1111-1111-1111-111111111105', '51111111-1111-1111-1111-111111111102', 79.90, '误购买，想更换套餐', 'pending', NULL, NULL, NULL),
('d1111111-1111-1111-1111-111111111102', '91111111-1111-1111-1111-111111111104', '51111111-1111-1111-1111-111111111101', 29.90, '不需要了', 'pending', NULL, NULL, NULL),

-- approved 状态
('d1111111-1111-1111-1111-111111111103', '91111111-1111-1111-1111-111111111108', '51111111-1111-1111-1111-111111111101', 29.90, '用户主动退款', 'approved', NULL, NOW() - INTERVAL '8 days', NULL),

-- rejected 状态
('d1111111-1111-1111-1111-111111111104', '91111111-1111-1111-1111-111111111107', '51111111-1111-1111-1111-111111111108', 39.90, '使用后不满意', 'rejected', NULL, NOW() - INTERVAL '3 days', '已使用部分权益，不符合退款条件'),

-- processing 状态
('d1111111-1111-1111-1111-111111111105', '91111111-1111-1111-1111-111111111109', '51111111-1111-1111-1111-111111111106', 19.90, '误购退款', 'processing', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 14. 用户素材审核数据 (所有状态组合)
-- ============================================
INSERT INTO user_materials (id, user_id, material_type, file_url, thumbnail_url, file_size, status, reviewed_by, reviewed_at, rejection_reason) VALUES
-- approved 状态
('e1111111-1111-1111-1111-111111111101', '51111111-1111-1111-1111-111111111101', 'image', 'https://picsum.photos/seed/usermat101/1920/1080', 'https://picsum.photos/seed/usermat101/320/180', 624288, 'approved', NULL, NOW() - INTERVAL '20 days', NULL),
('e1111111-1111-1111-1111-111111111102', '51111111-1111-1111-1111-111111111105', 'video', 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4', 'https://picsum.photos/seed/usermat102/320/180', 8388608, 'approved', NULL, NOW() - INTERVAL '15 days', NULL),

-- pending 状态
('e1111111-1111-1111-1111-111111111103', '51111111-1111-1111-1111-111111111102', 'image', 'https://picsum.photos/seed/usermat103/1920/1080', 'https://picsum.photos/seed/usermat103/320/180', 524288, 'pending', NULL, NULL, NULL),
('e1111111-1111-1111-1111-111111111104', '51111111-1111-1111-1111-111111111108', 'video', 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_6mb.mp4', 'https://picsum.photos/seed/usermat104/320/180', 7340032, 'pending', NULL, NULL, NULL),

-- rejected 状态
('e1111111-1111-1111-1111-111111111105', '51111111-1111-1111-1111-111111111101', 'image', 'https://picsum.photos/seed/usermat105/1920/1080', 'https://picsum.photos/seed/usermat105/320/180', 734003, 'rejected', NULL, NOW() - INTERVAL '10 days', '图片质量过低，无法使用'),
('e1111111-1111-1111-1111-111111111106', '51111111-1111-1111-1111-111111111106', 'audio', 'https://sample-videos.com/audio/mp3/crowd-cheering3.mp3', NULL, 2097152, 'rejected', NULL, NOW() - INTERVAL '5 days', '音频包含版权内容'),

-- violated 状态 (违规)
('e1111111-1111-1111-1111-111111111107', '51111111-1111-1111-1111-111111111103', 'image', 'https://picsum.photos/seed/usermat107/1920/1080', 'https://picsum.photos/seed/usermat107/320/180', 424288, 'violated', NULL, NOW() - INTERVAL '3 days', '上传违规内容')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 15. 系统配置数据
-- ============================================
INSERT INTO system_configs (id, config_key, config_value, config_type, description, is_public) VALUES
('f1111111-1111-1111-1111-111111111101', 'mini_program_name', '思拓智媒', 'string', '小程序名称', true),
('f1111111-1111-1111-1111-111111111102', 'mini_logo_url', 'https://picsum.photos/seed/logo/200/200', 'string', '小程序Logo', true),
('f1111111-1111-1111-1111-111111111103', 'api_timeout', '30000', 'number', 'API超时时间(ms)', false),
('f1111111-1111-1111-1111-111111111104', 'enable_registration', 'true', 'boolean', '是否开放注册', true),
('f1111111-1111-1111-1111-111111111105', 'max_video_duration', '180', 'number', '最大视频时长(秒)', false),
('f1111111-1111-1111-1111-111111111106', 'default_export_ratio', '16:9', 'string', '默认导出比例', true),
('f1111111-1111-1111-1111-111111111107', 'support_email', 'support@situo.com', 'string', '客服邮箱', true),
('f1111111-1111-1111-1111-111111111108', 'commission_rate', '0.15', 'number', '代理佣金比例', false)
ON CONFLICT (config_key) DO NOTHING;

-- ============================================
-- 16. 操作日志数据
-- ============================================
INSERT INTO operation_logs (id, operator_id, operator_name, operation_type, resource_type, resource_id, operation_detail, ip_address, user_agent, status) VALUES
('01111111-1111-1111-1111-111111111101', NULL, '系统管理员', 'CREATE', 'user', '51111111-1111-1111-1111-111111111101', '{"action": "创建用户"}', '127.0.0.1', 'Mozilla/5.0', 'success'),
('01111111-1111-1111-1111-111111111102', NULL, '系统管理员', 'UPDATE', 'template', '61111111-1111-1111-1111-111111111105', '{"action": "审核通过", "status": "active"}', '127.0.0.1', 'Mozilla/5.0', 'success'),
('01111111-1111-1111-1111-111111111103', NULL, '系统管理员', 'DELETE', 'material', '81111111-1111-1111-1111-111111111111', '{"action": "删除违规素材"}', '127.0.0.1', 'Mozilla/5.0', 'success'),
('01111111-1111-1111-1111-111111111104', NULL, '系统管理员', 'UPDATE', 'order', '91111111-1111-1111-1111-111111111108', '{"action": "处理退款"}', '127.0.0.1', 'Mozilla/5.0', 'success'),
('01111111-1111-1111-1111-111111111105', NULL, '系统管理员', 'CREATE', 'package', '31111111-1111-1111-1111-111111111106', '{"action": "新增套餐"}', '127.0.0.1', 'Mozilla/5.0', 'success')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 17. 用户行为日志数据
-- ============================================
INSERT INTO user_activity_logs (id, user_id, activity_type, activity_detail, page_url, ip_address) VALUES
('02111111-1111-1111-1111-111111111101', '51111111-1111-1111-1111-111111111101', 'LOGIN', '{"method": "wechat"}', '/pages/login', '192.168.1.100'),
('02111111-1111-1111-1111-111111111102', '51111111-1111-1111-1111-111111111101', 'CREATE_VIDEO', '{"template_id": "tpl001", "duration": 30}', '/pages/create', '192.168.1.100'),
('02111111-1111-1111-1111-111111111103', '51111111-1111-1111-1111-111111111105', 'PURCHASE', '{"package_id": "pkg002", "amount": 79.90}', '/pages/package', '192.168.1.101'),
('02111111-1111-1111-1111-111111111104', '51111111-1111-1111-1111-111111111108', 'VIEW_TEMPLATE', '{"template_id": "tpl005"}', '/pages/template/detail', '192.168.1.102'),
('02111111-1111-1111-1111-111111111105', '51111111-1111-1111-1111-111111111102', 'DOWNLOAD_VIDEO', '{"task_id": "task007"}', '/pages/my/videos', '192.168.1.100')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 完成
-- ============================================
-- 数据插入完成，共创建了：
-- 10 个用户（所有角色和状态组合）
-- 9 个模板（所有类型和状态组合）
-- 12 个渲染任务（所有状态）
-- 11 个素材（所有类型和状态组合）
-- 11 个订单（所有类型和状态组合）
-- 11 个订单明细
-- 6 个用户套餐关联
-- 4 个加油包购买记录
-- 5 个退款申请（所有状态）
-- 7 个用户素材审核（所有状态）
-- 7 个模板分类
-- 5 个素材分类
-- 6 个VIP套餐
-- 4 个加油包
-- 8 个系统配置
-- 5 条操作日志
-- 5 条用户行为日志
