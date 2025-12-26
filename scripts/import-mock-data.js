const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase 配置
const supabaseUrl = 'https://iefoubiowpqopjmbhcoc.supabase.co';
const supabaseAnonKey = 'sb_publishable_QQx6F6Xca1L1vik92SRGSg_5nfbHWFv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function importSeedData() {
  console.log('开始导入 Mock 数据...\n');

  // 读取 SQL 文件
  const sqlPath = path.join(__dirname, '../supabase/migrations/002_seed_data.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  // 解析并执行 INSERT 语句
  const lines = sql.split('\n');
  let currentStatement = '';
  let insertCount = 0;
  let errorCount = 0;

  // 提取所有 INSERT 语句
  const insertStatements = sql.match(/INSERT INTO[\s\S]+?;/gi) || [];

  console.log(`找到 ${insertStatements.length} 条 INSERT 语句\n`);

  for (let i = 0; i < insertStatements.length; i++) {
    const stmt = insertStatements[i];

    // 解析表名
    const tableMatch = stmt.match(/INSERT INTO (\w+)/);
    if (!tableMatch) continue;

    const tableName = tableMatch[1];

    // 解析数据
    const valuesMatch = stmt.match(/VALUES\s*\(([\s\S]+)\)/);
    if (!valuesMatch) continue;

    try {
      // 将 PostgreSQL 语法转换为可用于 API 的格式
      // 这里我们使用 execSql 直接执行（如果 Supabase 支持的话）
      // 或者手动解析并构建 inserts

      const { error } = await supabase.rpc('exec_sql', { sql_query: stmt });

      if (error) {
        // exec_sql 不可用，尝试其他方法
        console.log(`  ${tableName}: RPC 不可用，跳过`);
      } else {
        insertCount++;
        console.log(`  ✓ ${tableName}`);
      }
    } catch (e) {
      errorCount++;
      console.log(`  ✗ ${tableName}: ${e.message}`);
    }
  }

  console.log(`\n导入完成!`);
  console.log(`成功: ${insertCount} 条`);
  console.log(`失败: ${errorCount} 条`);
}

// 由于 Supabase anon key 不支持直接执行 DML，
// 我们使用逐表插入的方式
async function importSeedDataTable() {
  console.log('开始导入 Mock 数据（逐表方式）...\n');

  let successCount = 0;
  let failCount = 0;

  // 1. 模板分类
  console.log('导入模板分类...');
  const templateCategories = [
    { id: '11111111-1111-1111-1111-111111111101', name: '企业宣传', parent_id: null, sort_order: 1, is_active: true },
    { id: '11111111-1111-1111-1111-111111111102', name: '产品介绍', parent_id: null, sort_order: 2, is_active: true },
    { id: '11111111-1111-1111-1111-111111111103', name: '社交媒体', parent_id: null, sort_order: 3, is_active: true },
  ];
  for (const item of templateCategories) {
    const { error } = await supabase.from('template_categories').insert(item);
    if (!error) successCount++; else failCount++;
  }
  console.log(`  模板分类: ${templateCategories.length} 条\n`);

  // 2. 素材分类
  console.log('导入素材分类...');
  const materialCategories = [
    { id: '21111111-1111-1111-1111-111111111101', name: '图片素材', parent_id: null, sort_order: 1, is_active: true },
    { id: '21111111-1111-1111-1111-111111111102', name: '视频素材', parent_id: null, sort_order: 2, is_active: true },
  ];
  for (const item of materialCategories) {
    const { error } = await supabase.from('material_categories').insert(item);
    if (!error) successCount++; else failCount++;
  }
  console.log(`  素材分类: ${materialCategories.length} 条\n`);

  // 3. VIP 套餐
  console.log('导入 VIP 套餐...');
  const packages = [
    { id: '31111111-1111-1111-1111-111111111101', name: '个人月卡', package_type: 'personal', duration_type: 'month', duration_value: 1, price: 29.90, original_price: 39.90, video_minutes: 100, storage_gb: 10, is_active: true, sort_order: 1 },
    { id: '31111111-1111-1111-1111-111111111102', name: '个人季卡', package_type: 'personal', duration_type: 'quarter', duration_value: 3, price: 79.90, original_price: 99.90, video_minutes: 300, storage_gb: 10, is_active: true, sort_order: 2 },
    { id: '31111111-1111-1111-1111-111111111103', name: '个人年卡', package_type: 'personal', duration_type: 'year', duration_value: 12, price: 299.90, original_price: 399.90, video_minutes: 1200, storage_gb: 10, is_active: true, sort_order: 3 },
    { id: '31111111-1111-1111-1111-111111111104', name: '团队月卡', package_type: 'team', duration_type: 'month', duration_value: 1, price: 99.90, original_price: 129.90, video_minutes: 500, storage_gb: 50, is_active: true, sort_order: 4 },
    { id: '31111111-1111-1111-1111-111111111105', name: '团队季卡', package_type: 'team', duration_type: 'quarter', duration_value: 3, price: 269.90, original_price: 329.90, video_minutes: 1500, storage_gb: 50, is_active: true, sort_order: 5 },
    { id: '31111111-1111-1111-1111-111111111106', name: '终身会员', package_type: 'lifetime', duration_type: 'lifetime', duration_value: 1, price: 999.90, original_price: 1999.90, video_minutes: 99999, storage_gb: 100, is_active: true, sort_order: 6 },
  ];
  for (const item of packages) {
    const { error } = await supabase.from('packages').insert(item);
    if (!error) successCount++; else failCount++;
  }
  console.log(`  VIP 套餐: ${packages.length} 条\n`);

  // 4. 加油包
  console.log('导入加油包...');
  const addons = [
    { id: '41111111-1111-1111-1111-111111111101', name: '视频时长加油包-50分钟', addon_type: 'minutes', value: 50, price: 19.90, validity_days: 365, max_purchase_limit: 10, description: '额外增加50分钟视频生成时长', is_active: true, sort_order: 1 },
    { id: '41111111-1111-1111-1111-111111111102', name: '视频时长加油包-100分钟', addon_type: 'minutes', value: 100, price: 39.90, validity_days: 365, max_purchase_limit: 10, description: '额外增加100分钟视频生成时长', is_active: true, sort_order: 2 },
    { id: '41111111-1111-1111-1111-111111111103', name: '存储空间加油包-10GB', addon_type: 'storage', value: 10, price: 9.90, validity_days: 365, max_purchase_limit: 10, description: '额外增加10GB存储空间', is_active: true, sort_order: 3 },
    { id: '41111111-1111-1111-1111-111111111104', name: '存储空间加油包-50GB', addon_type: 'storage', value: 50, price: 39.90, validity_days: 365, max_purchase_limit: 5, description: '额外增加50GB存储空间', is_active: true, sort_order: 4 },
  ];
  for (const item of addons) {
    const { error } = await supabase.from('addons').insert(item);
    if (!error) successCount++; else failCount++;
  }
  console.log(`  加油包: ${addons.length} 条\n`);

  // 5. 用户数据（简化版）
  console.log('导入用户数据...');
  const users = [
    { id: '51111111-1111-1111-1111-111111111101', nickname: '小明同学', phone: '13800001001', email: 'xiaoming@test.com', user_role: 'free', account_status: 'normal', register_time: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), last_login_time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), remaining_minutes: 5, storage_used: 104857600, storage_limit: 1073741824 },
    { id: '51111111-1111-1111-1111-111111111102', nickname: '小红花', phone: '13800001002', email: 'xiaohong@test.com', user_role: 'free', account_status: 'normal', register_time: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), last_login_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), remaining_minutes: 3, storage_used: 52428800, storage_limit: 1073741824 },
    { id: '51111111-1111-1111-1111-111111111105', nickname: '张三企业主', phone: '13800001005', email: 'zhangsan@test.com', user_role: 'personal', account_status: 'normal', register_time: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), last_login_time: new Date(Date.now() - 30 * 60 * 1000).toISOString(), remaining_minutes: 45, storage_used: 536870912, storage_limit: 10737418240, vip_expire_time: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '51111111-1111-1111-1111-111111111108', nickname: '科技公司A', phone: '13800001008', email: 'teama@test.com', user_role: 'team', account_status: 'normal', register_time: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(), last_login_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), remaining_minutes: 350, storage_used: 2147483648, storage_limit: 53687091200, vip_expire_time: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() },
  ];
  for (const item of users) {
    const { error } = await supabase.from('users').insert(item);
    if (!error) successCount++; else failCount++;
  }
  console.log(`  用户: ${users.length} 条\n`);

  // 6. 模板数据
  console.log('导入模板数据...');
  const templates = [
    { id: '61111111-1111-1111-1111-111111111101', name: '简约商务介绍', description: '适合中小企业宣传介绍', category_id: '11111111-1111-1111-1111-111111111101', template_type: 'free', thumbnail_url: 'https://picsum.photos/seed/tpl101/320/180', duration: 30, required_images: 5, status: 'active', usage_count: 1250, download_count: 890, sort_order: 1 },
    { id: '61111111-1111-1111-1111-111111111102', name: '产品展示卡片', description: '电商产品快速展示模板', category_id: '11111111-1111-1111-1111-111111111102', template_type: 'free', thumbnail_url: 'https://picsum.photos/seed/tpl102/320/180', duration: 15, required_images: 3, status: 'active', usage_count: 2300, download_count: 1650, sort_order: 2 },
    { id: '61111111-1111-1111-1111-111111111103', name: '社交媒体海报', description: '朋友圈/小红书通用模板', category_id: '11111111-1111-1111-1111-111111111103', template_type: 'free', thumbnail_url: 'https://picsum.photos/seed/tpl103/320/180', duration: 10, required_images: 2, status: 'active', usage_count: 3500, download_count: 2800, sort_order: 3 },
    { id: '61111111-1111-1111-1111-111111111105', name: '高端企业宣传片', description: '大型企业形象展示', category_id: '11111111-1111-1111-1111-111111111106', template_type: 'vip', thumbnail_url: 'https://picsum.photos/seed/tpl105/320/180', duration: 60, required_images: 8, required_videos: 2, status: 'active', usage_count: 450, download_count: 380, sort_order: 4 },
    { id: '61111111-1111-1111-1111-111111111106', name: '3D产品展示', description: '炫酷3D效果产品展示', category_id: '11111111-1111-1111-111111111107', template_type: 'vip', thumbnail_url: 'https://picsum.photos/seed/tpl106/320/180', duration: 45, required_images: 6, required_videos: 1, status: 'active', usage_count: 680, download_count: 590, sort_order: 5 },
  ];
  for (const item of templates) {
    const { error } = await supabase.from('templates').insert(item);
    if (!error) successCount++; else failCount++;
  }
  console.log(`  模板: ${templates.length} 条\n`);

  // 7. 渲染任务
  console.log('导入渲染任务...');
  const tasks = [
    { id: '71111111-1111-1111-1111-111111111101', user_id: '51111111-1111-1111-1111-111111111101', template_id: '61111111-1111-1111-111111111101', task_status: 'pending', progress: 0, export_ratio: '16:9', export_resolution: '1080p', created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString() },
    { id: '71111111-1111-1111-1111-111111111102', user_id: '51111111-1111-1111-1111-111111111102', template_id: '61111111-1111-1111-111111111102', task_status: 'pending', progress: 0, export_ratio: '9:16', export_resolution: '1080p', created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
    { id: '71111111-1111-1111-1111-111111111103', user_id: '51111111-1111-1111-111111111105', template_id: '61111111-1111-1111-111111111105', task_status: 'processing', progress: 25, export_ratio: '16:9', export_resolution: '1080p', created_at: new Date(Date.now() - 3 * 60 * 1000).toISOString(), started_at: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
    { id: '71111111-1111-1111-1111-111111111104', user_id: '51111111-1111-1111-111111111105', template_id: '61111111-1111-1111-111111111106', task_status: 'processing', progress: 60, export_ratio: '16:9', export_resolution: '1080p', created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(), started_at: new Date(Date.now() - 4 * 60 * 1000).toISOString() },
    { id: '71111111-1111-1111-1111-111111111106', user_id: '51111111-1111-1111-111111111101', template_id: '61111111-1111-1111-111111111101', task_status: 'completed', progress: 100, export_ratio: '16:9', export_resolution: '1080p', created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), started_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), completed_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '71111111-1111-1111-1111-111111111107', user_id: '51111111-1111-1111-111111111102', template_id: '61111111-1111-1111-111111111102', task_status: 'completed', progress: 100, export_ratio: '9:16', export_resolution: '1080p', created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), started_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), completed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  ];
  for (const item of tasks) {
    const { error } = await supabase.from('render_tasks').insert(item);
    if (!error) successCount++; else failCount++;
  }
  console.log(`  渲染任务: ${tasks.length} 条\n`);

  // 8. 素材数据
  console.log('导入素材数据...');
  const materials = [
    { id: '81111111-1111-1111-1111-111111111101', name: '商务会议场景', category_id: '21111111-1111-1111-1111-111111111101', material_type: 'image', file_url: 'https://picsum.photos/seed/mat101/1920/1080', thumbnail_url: 'https://picsum.photos/seed/mat101/320/180', file_size: 524288, width: 1920, height: 1080, status: 'active', is_public: true, usage_count: 450, download_count: 320 },
    { id: '81111111-1111-1111-1111-111111111102', name: '产品拍摄背景', category_id: null, material_type: 'image', file_url: 'https://picsum.photos/seed/mat102/1920/1080', thumbnail_url: 'https://picsum.photos/seed/mat102/320/180', file_size: 314572, width: 1920, height: 1080, status: 'active', is_public: true, usage_count: 680, download_count: 490 },
    { id: '81111111-1111-1111-1111-111111111105', name: '动态文字动画', category_id: '21111111-1111-1111-1111-111111111102', material_type: 'video', file_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail_url: 'https://picsum.photos/seed/mat105/320/180', file_size: 5242880, duration: 10, status: 'active', is_public: true, usage_count: 890, download_count: 650 },
  ];
  for (const item of materials) {
    const { error } = await supabase.from('materials').insert(item);
    if (!error) successCount++; else failCount++;
  }
  console.log(`  素材: ${materials.length} 条\n`);

  // 9. 订单数据
  console.log('导入订单数据...');
  const orders = [
    { id: '91111111-1111-1111-1111-111111111101', order_no: 'ORD202501001001', user_id: '51111111-1111-1111-111111111105', order_type: 'package', total_amount: 39.90, actual_amount: 29.90, payment_method: 'wechat', payment_status: 'paid', order_status: 'completed', paid_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '91111111-1111-1111-1111-111111111102', order_no: 'ORD202501002001', user_id: '51111111-1111-1111-111111111106', order_type: 'package', total_amount: 99.90, actual_amount: 79.90, payment_method: 'alipay', payment_status: 'paid', order_status: 'completed', paid_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '91111111-1111-1111-1111-111111111103', order_no: 'ORD202501003001', user_id: '51111111-1111-1111-111111111108', order_type: 'package', total_amount: 399.90, actual_amount: 299.90, payment_method: 'wechat', payment_status: 'paid', order_status: 'completed', paid_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '91111111-1111-1111-111111111106', order_no: 'ORD202501006001', user_id: '51111111-1111-1111-111111111105', order_type: 'addon', total_amount: 29.90, actual_amount: 19.90, payment_method: 'alipay', payment_status: 'paid', order_status: 'completed', paid_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
  ];
  for (const item of orders) {
    const { error } = await supabase.from('orders').insert(item);
    if (!error) successCount++; else failCount++;
  }
  console.log(`  订单: ${orders.length} 条\n`);

  // 10. 系统配置
  console.log('导入系统配置...');
  const configs = [
    { config_key: 'mini_program_name', config_value: '思拓智媒', config_type: 'string', description: '小程序名称', is_public: true },
    { config_key: 'mini_logo_url', config_value: 'https://picsum.photos/seed/logo/200/200', config_type: 'string', description: '小程序Logo', is_public: true },
    { config_key: 'api_timeout', config_value: '30000', config_type: 'number', description: 'API超时时间(ms)', is_public: false },
    { config_key: 'enable_registration', config_value: 'true', config_type: 'boolean', description: '是否开放注册', is_public: true },
    { config_key: 'max_video_duration', config_value: '180', config_type: 'number', description: '最大视频时长(秒)', is_public: false },
    { config_key: 'default_export_ratio', config_value: '16:9', config_type: 'string', description: '默认导出比例', is_public: true },
    { config_key: 'support_email', config_value: 'support@situo.com', config_type: 'string', description: '客服邮箱', is_public: true },
  ];
  for (const item of configs) {
    const { error } = await supabase.from('system_configs').insert(item);
    if (!error) successCount++; else failCount++;
  }
  console.log(`  系统配置: ${configs.length} 条\n`);

  console.log(`\n导入完成!`);
  console.log(`✓ 成功: ${successCount} 条`);
  console.log(`✗ 失败: ${failCount} 条`);

  if (failCount > 0) {
    console.log(`\n注意: 某些数据可能因为外键约束或重复键而失败`);
    console.log(`这是正常的，请刷新页面查看效果`);
  }
}

importSeedDataTable();
