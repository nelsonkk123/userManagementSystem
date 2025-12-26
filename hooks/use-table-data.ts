"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type {
  Tables,
  UserFilterParams,
  TemplateFilterParams,
  TaskFilterParams,
  OrderFilterParams,
  PaginationParams,
} from "@/lib/database.types";

interface UseTableDataOptions<T> extends PaginationParams {
  filter?: Partial<T>;
  enabled?: boolean;
}

interface UseTableDataResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  total: number;
  refetch: () => void;
}

// 通用分页查询 hook
export function useTableData<T extends keyof Tables>(
  tableName: T,
  options: UseTableDataOptions<any> = {}
): UseTableDataResult<Tables[T]["Row"]> {
  const { page = 1, pageSize = 10, sortBy, sortOrder = "desc", enabled = true } = options;

  const [data, setData] = useState<Tables[T]["Row"][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 计算分页
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      // 构建查询
      let query = supabase
        .from(tableName)
        .select("*", { count: "exact" })
        .range(from, to);

      // 排序
      if (sortBy) {
        query = query.order(sortBy, { ascending: sortOrder === "asc" });
      }

      const { data: fetchData, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      setData(fetchData as any || []);
      setTotal(count || 0);
    } catch (err: any) {
      setError(err.message || "加载数据失败");
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, sortBy, sortOrder, enabled]);

  return { data, loading, error, total, refetch: fetchData };
}

// 用户管理专用 hook
export function useUsers(params: UserFilterParams = {}) {
  const {
    page = 1,
    pageSize = 10,
    sortBy = "register_time",
    sortOrder = "desc",
    nickname,
    phone,
    user_role,
    account_status,
    register_time_start,
    register_time_end,
  } = params;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const fetchUsers = async (skipReadyCheck = false) => {
    if (!skipReadyCheck && !isReady) return;

    setLoading(true);
    setError(null);

    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("users")
        .select("*", { count: "exact" })
        .range(from, to)
        .order(sortBy, { ascending: sortOrder === "asc" });

      // 筛选条件
      if (nickname) query = query.ilike("nickname", `%${nickname}%`);
      if (phone) query = query.eq("phone", phone);
      if (user_role) query = query.eq("user_role", user_role);
      if (account_status) query = query.eq("account_status", account_status);
      if (register_time_start) query = query.gte("register_time", register_time_start);
      if (register_time_end) query = query.lte("register_time", register_time_end);

      const { data: fetchData, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      setData(fetchData as any || []);
      setTotal(count || 0);
    } catch (err: any) {
      setError(err.message);
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // 延迟初始化，避免组件挂载时的请求问题
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isReady) {
      fetchUsers();
    }
  }, [
    isReady,
    page,
    pageSize,
    sortBy,
    sortOrder,
    nickname,
    phone,
    user_role,
    account_status,
    register_time_start,
    register_time_end,
  ]);

  return { data, loading, error, total, refetch: () => fetchUsers(true) };
}

// 模板管理专用 hook
export function useTemplates(params: TemplateFilterParams = {}) {
  const {
    page = 1,
    pageSize = 10,
    sortBy = "created_at",
    sortOrder = "desc",
    name,
    category_id,
    template_type,
    status,
  } = params;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchTemplates = async () => {
    setLoading(true);
    setError(null);

    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("templates")
        .select("*, template_categories(name)", { count: "exact" })
        .range(from, to)
        .order(sortBy, { ascending: sortOrder === "asc" });

      if (name) query = query.ilike("name", `%${name}%`);
      if (category_id) query = query.eq("category_id", category_id);
      if (template_type) query = query.eq("template_type", template_type);
      if (status) query = query.eq("status", status);

      const { data: fetchData, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      setData(fetchData as any || []);
      setTotal(count || 0);
    } catch (err: any) {
      setError(err.message);
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [page, pageSize, sortBy, sortOrder, name, category_id, template_type, status]);

  return { data, loading, error, total, refetch: fetchTemplates };
}

// 任务管理专用 hook
export function useRenderTasks(params: TaskFilterParams = {}) {
  const {
    page = 1,
    pageSize = 10,
    sortBy = "created_at",
    sortOrder = "desc",
    task_status,
    user_id,
    template_id,
    created_time_start,
    created_time_end,
  } = params;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("render_tasks")
        .select("*, users(nickname), templates(name)", { count: "exact" })
        .range(from, to)
        .order(sortBy, { ascending: sortOrder === "asc" });

      if (task_status) query = query.eq("task_status", task_status);
      if (user_id) query = query.eq("user_id", user_id);
      if (template_id) query = query.eq("template_id", template_id);
      if (created_time_start) query = query.gte("created_at", created_time_start);
      if (created_time_end) query = query.lte("created_at", created_time_end);

      const { data: fetchData, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      setData(fetchData as any || []);
      setTotal(count || 0);
    } catch (err: any) {
      setError(err.message);
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [
    page,
    pageSize,
    sortBy,
    sortOrder,
    task_status,
    user_id,
    template_id,
    created_time_start,
    created_time_end,
  ]);

  return { data, loading, error, total, refetch: fetchTasks };
}

// 订单管理专用 hook
export function useOrders(params: OrderFilterParams = {}) {
  const {
    page = 1,
    pageSize = 10,
    sortBy = "created_at",
    sortOrder = "desc",
    payment_status,
    order_type,
    user_id,
    created_time_start,
    created_time_end,
  } = params;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("orders")
        .select("*, users(nickname, phone)", { count: "exact" })
        .range(from, to)
        .order(sortBy, { ascending: sortOrder === "asc" });

      if (payment_status) query = query.eq("payment_status", payment_status);
      if (order_type) query = query.eq("order_type", order_type);
      if (user_id) query = query.eq("user_id", user_id);
      if (created_time_start) query = query.gte("created_at", created_time_start);
      if (created_time_end) query = query.lte("created_at", created_time_end);

      const { data: fetchData, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      setData(fetchData as any || []);
      setTotal(count || 0);
    } catch (err: any) {
      setError(err.message);
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [
    page,
    pageSize,
    sortBy,
    sortOrder,
    payment_status,
    order_type,
    user_id,
    created_time_start,
    created_time_end,
  ]);

  return { data, loading, error, total, refetch: fetchOrders };
}

// 仪表盘统计数据 hook
export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    todayUsers: 0,
    activeUsers7d: 0,
    activeUsers30d: 0,
    totalTemplates: 0,
    todayTemplates: 0,
    totalVideos: 0,
    todayVideos: 0,
    totalOrders: 0,
    todayRevenue: 0,
    pendingMaterials: 0,
    pendingTemplates: 0,
    failedTasks: 0,
    refundRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);

    try {
      // 并行获取所有统计数据
      const [
        { count: totalUsers },
        { count: todayUsers },
        { count: totalTemplates },
        { count: todayTemplates },
        { count: totalVideos },
        { count: todayVideos },
        { count: totalOrders },
        { data: todayRevenueData },
        { count: pendingMaterials },
        { count: pendingTemplates },
        { count: failedTasks },
        { count: refundRequests },
      ] = await Promise.all([
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .gte("register_time", new Date().toISOString().split("T")[0]),
        supabase.from("templates").select("*", { count: "exact", head: true }),
        supabase
          .from("templates")
          .select("*", { count: "exact", head: true })
          .gte("created_at", new Date().toISOString().split("T")[0]),
        supabase.from("render_tasks").select("*", { count: "exact", head: true }),
        supabase
          .from("render_tasks")
          .select("*", { count: "exact", head: true })
          .gte("created_at", new Date().toISOString().split("T")[0]),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase
          .from("orders")
          .select("actual_amount")
          .eq("payment_status", "paid")
          .gte("paid_at", new Date().toISOString().split("T")[0]),
        supabase
          .from("materials")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("templates")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("render_tasks")
          .select("*", { count: "exact", head: true })
          .eq("task_status", "failed"),
        supabase
          .from("refund_requests")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending"),
      ]);

      const todayRevenue =
        (todayRevenueData as any)?.reduce((sum: number, order: any) => sum + (order.actual_amount || 0), 0) || 0;

      setStats({
        totalUsers: totalUsers || 0,
        todayUsers: todayUsers || 0,
        activeUsers7d: 0, // 需要额外计算
        activeUsers30d: 0, // 需要额外计算
        totalTemplates: totalTemplates || 0,
        todayTemplates: todayTemplates || 0,
        totalVideos: totalVideos || 0,
        todayVideos: todayVideos || 0,
        totalOrders: totalOrders || 0,
        todayRevenue,
        pendingMaterials: pendingMaterials || 0,
        pendingTemplates: pendingTemplates || 0,
        failedTasks: failedTasks || 0,
        refundRequests: refundRequests || 0,
      });
    } catch (err: any) {
      console.error("获取统计数据失败:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, refetch: fetchStats };
}
