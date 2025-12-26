/**
 * Supabase 客户端配置
 * 支持浏览器和服务端环境
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 浏览器客户端
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 服务端客户端（用于 API Routes）
export function createServerClient() {
  return createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,
      },
    }
  );
}

// 类型化的表引用
export type Tables = Database['public']['Tables'];
export type Users = Tables['users']['Row'];
export type AdminUsers = Tables['admin_users']['Row'];
export type Templates = Tables['templates']['Row'];
export type RenderTasks = Tables['render_tasks']['Row'];
export type Orders = Tables['orders']['Row'];
export type Packages = Tables['packages']['Row'];
export type Materials = Tables['materials']['Row'];

// 插入类型
export type UsersInsert = Tables['users']['Insert'];
export type TemplatesInsert = Tables['templates']['Insert'];
export type RenderTasksInsert = Tables['render_tasks']['Insert'];
export type OrdersInsert = Tables['orders']['Insert'];

// 更新类型
export type UsersUpdate = Tables['users']['Update'];
export type TemplatesUpdate = Tables['templates']['Update'];
export type RenderTasksUpdate = Tables['render_tasks']['Update'];
