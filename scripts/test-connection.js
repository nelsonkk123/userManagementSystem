const { createClient } = require('@supabase/supabase-js');

// 从 .env.local 读取配置
const supabaseUrl = 'https://iefoubiowpqopjmbhcoc.supabase.co';
const supabaseAnonKey = 'sb_publishable_QQx6F6Xca1L1vik92SRGSg_5nfbHWFv';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('测试 Supabase 连接...\n');
  console.log('URL:', supabaseUrl);
  console.log('Anon Key:', supabaseAnonKey.substring(0, 20) + '...\n');

  // 测试连接
  try {
    // 尝试查询用户表
    console.log('1. 测试查询 users 表...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    if (usersError) {
      console.log('   失败:', usersError.message);
      console.log('   错误详情:', usersError);
    } else {
      console.log('   成功! 找到', users.length, '条记录');
    }
  } catch (e) {
    console.log('   异常:', e.message);
  }

  // 测试查询模板表
  try {
    console.log('\n2. 测试查询 templates 表...');
    const { data: templates, error: templatesError } = await supabase
      .from('templates')
      .select('*')
      .limit(1);

    if (templatesError) {
      console.log('   失败:', templatesError.message);
    } else {
      console.log('   成功! 找到', templates.length, '条记录');
    }
  } catch (e) {
    console.log('   异常:', e.message);
  }

  // 测试查询任务表
  try {
    console.log('\n3. 测试查询 render_tasks 表...');
    const { data: tasks, error: tasksError } = await supabase
      .from('render_tasks')
      .select('*')
      .limit(1);

    if (tasksError) {
      console.log('   失败:', tasksError.message);
    } else {
      console.log('   成功! 找到', tasks.length, '条记录');
    }
  } catch (e) {
    console.log('   异常:', e.message);
  }

  // 获取表列表
  try {
    console.log('\n4. 尝试获取数据库信息...');
    // 这个查询可能失败，取决于权限
    const { data, error } = await supabase
      .rpc('get_tables'); // 这个函数可能不存在

    if (error) {
      console.log('   无法获取表列表 (可能需要 service_role 权限)');
    }
  } catch (e) {
    console.log('   跳过表列表查询');
  }

  console.log('\n测试完成!');
  console.log('\n如果看到 "Failed" 或错误，请检查:');
  console.log('1. Supabase 中的表名是否与代码中的表名一致');
  console.log('2. Row Level Security (RLS) 策略是否允许 anon key 访问');
  console.log('3. 表是否在 public schema 中');
}

testConnection();
