const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  // 从命令行参数获取数据库密码
  const dbPassword = process.argv[2];

  if (!dbPassword) {
    console.error('错误: 请提供数据库密码');
    console.error('使用方式: node scripts/run-migration.js <数据库密码>');
    process.exit(1);
  }

  // Supabase 项目引用
  const projectRef = 'iefoubiowpqopjmbhcoc';

  // 尝试所有可能的区域和连接格式
  const regions = [
    'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2',
    'us-east-1', 'us-west-1', 'us-west-2', 'eu-central-1', 'eu-west-1',
    'eu-west-2', 'ca-east-1', 'sa-east-1'
  ];

  const connectionAttempts = [];

  // 为每个区域生成连接尝试
  for (const region of regions) {
    // Pooler 连接 (Session mode - port 5432, 推荐 DDL)
    connectionAttempts.push(
      { user: `postgres.${projectRef}`, password: dbPassword, host: `aws-0-${region}.pooler.supabase.com`, port: 5432 },
    );
    // Pooler 连接 (Transaction mode - port 6543)
    connectionAttempts.push(
      { user: `postgres.${projectRef}`, password: dbPassword, host: `aws-0-${region}.pooler.supabase.com`, port: 6543 },
    );
    // GCP pooler (备用)
    connectionAttempts.push(
      { user: `postgres.${projectRef}`, password: dbPassword, host: `aws-0-${region}.gcp.supabase.com`, port: 5432 },
    );
  }

  // 直接连接格式 (备用)
  connectionAttempts.push(
    { user: 'postgres', password: dbPassword, host: 'db.iefoubiowpqopjmbhcoc.supabase.co', port: 5432 },
  );

  let client = null;
  let connected = false;
  let lastError = null;

  console.log(`尝试 ${connectionAttempts.length} 种连接方式...\n`);

  for (const attempt of connectionAttempts) {
    try {
      const connectionString = `postgresql://${attempt.user}:${attempt.password}@${attempt.host}:${attempt.port}/postgres`;
      console.log(`尝试: ${attempt.host}:${attempt.port}`);
      client = new Client({ connectionString, connectionTimeoutMillis: 5000 });
      await client.connect();
      connected = true;
      console.log('连接成功!\n');
      break;
    } catch (error) {
      console.log(`  失败: ${error.message}`);
      lastError = error;
      if (client) {
        try { client.end(); } catch (e) {}
        client = null;
      }
    }
  }

  if (!connected) {
    console.error('\n所有连接尝试均失败。');
    console.error('可能的原因:');
    console.error('1. 项目区域不在尝试列表中');
    console.error('2. 数据库密码不正确');
    console.error('3. 项目已暂停或删除');
    console.error('\n请检查 Supabase Dashboard 确认项目状态和区域。');
    process.exit(1);
  }

  try {
    // 读取 SQL 文件
    const sqlPath = path.join(__dirname, '../supabase/migrations/001_initial_schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('正在执行数据库迁移...');
    await client.query(sql);

    console.log('迁移执行成功!');
    console.log('数据库表结构已创建完成。');
  } catch (error) {
    console.error('迁移失败:', error.message);
    console.error('详细错误:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
