/**
 * 业务常量配置
 */

import { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Ban,
  AlertCircle,
  PauseCircle,
} from "lucide-react";

// 用户角色
export const USER_ROLES = [
  { label: "免费用户", value: "free" },
  { label: "个人版", value: "personal" },
  { label: "团队版", value: "team" },
] as const;

export type UserRole = (typeof USER_ROLES)[number]["value"];

// 账户状态
export const ACCOUNT_STATUS = [
  { label: "正常", value: "normal", color: "success" },
  { label: "禁用", value: "disabled", color: "warning" },
  { label: "黑名单", value: "blacklisted", color: "danger" },
] as const;

export type AccountStatus = (typeof ACCOUNT_STATUS)[number]["value"];

// 模板类型
export const TEMPLATE_TYPES = [
  { label: "免费模板", value: "free" },
  { label: "VIP模板", value: "vip" },
] as const;

export type TemplateType = (typeof TEMPLATE_TYPES)[number]["value"];

// 模板状态
export const TEMPLATE_STATUS = [
  { label: "草稿", value: "draft", color: "secondary", icon: Clock },
  { label: "待审核", value: "pending", color: "warning", icon: AlertCircle },
  { label: "已上线", value: "active", color: "success", icon: CheckCircle2 },
  { label: "已下架", value: "inactive", color: "secondary", icon: XCircle },
] as const;

export type TemplateStatus = (typeof TEMPLATE_STATUS)[number]["value"];

// 任务状态
export const TASK_STATUS = [
  { label: "待处理", value: "pending", color: "secondary", icon: Clock },
  { label: "处理中", value: "processing", color: "primary", icon: PauseCircle },
  { label: "成功", value: "completed", color: "success", icon: CheckCircle2 },
  { label: "失败", value: "failed", color: "danger", icon: XCircle },
  { label: "已终止", value: "terminated", color: "secondary", icon: Ban },
] as const;

export type TaskStatus = (typeof TASK_STATUS)[number]["value"];

// 支付状态
export const PAYMENT_STATUS = [
  { label: "待支付", value: "unpaid", color: "warning" },
  { label: "已支付", value: "paid", color: "success" },
  { label: "已退款", value: "refunded", color: "danger" },
  { label: "支付失败", value: "failed", color: "danger" },
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[number]["value"];

// 订单状态
export const ORDER_STATUS = [
  { label: "待处理", value: "pending", color: "warning" },
  { label: "已完成", value: "completed", color: "success" },
  { label: "已取消", value: "cancelled", color: "secondary" },
  { label: "已退款", value: "refunded", color: "danger" },
] as const;

export type OrderStatus = (typeof ORDER_STATUS)[number]["value"];

// 素材类型
export const MATERIAL_TYPES = [
  { label: "图片", value: "image" },
  { label: "视频", value: "video" },
  { label: "音频", value: "audio" },
] as const;

export type MaterialType = (typeof MATERIAL_TYPES)[number]["value"];

// 素材状态
export const MATERIAL_STATUS = [
  { label: "待审核", value: "pending", color: "warning" },
  { label: "已通过", value: "active", color: "success" },
  { label: "已下架", value: "inactive", color: "secondary" },
  { label: "已驳回", value: "rejected", color: "danger" },
] as const;

export type MaterialStatus = (typeof MATERIAL_STATUS)[number]["value"];

// 退款状态
export const REFUND_STATUS = [
  { label: "待审核", value: "pending", color: "warning" },
  { label: "已批准", value: "approved", color: "success" },
  { label: "已拒绝", value: "rejected", color: "danger" },
  { label: "处理中", value: "processing", color: "primary" },
] as const;

export type RefundStatus = (typeof REFUND_STATUS)[number]["value"];

// 导出尺寸
export const EXPORT_RATIOS = [
  { label: "16:9 (横屏)", value: "16:9" },
  { label: "9:16 (竖屏)", value: "9:16" },
  { label: "1:1 (正方形)", value: "1:1" },
] as const;

// 导出分辨率
export const EXPORT_RESOLUTIONS = [
  { label: "720P", value: "720p" },
  { label: "1080P (FHD)", value: "1080p" },
  { label: "2K", value: "2k" },
  { label: "4K (UHD)", value: "4k" },
] as const;

// 后台角色
export const ADMIN_ROLES = [
  { label: "超级管理员", value: "super_admin" },
  { label: "运营管理员", value: "operation_admin" },
  { label: "内容管理员", value: "content_admin" },
  { label: "数据分析师", value: "data_analyst" },
] as const;

// 套餐类型
export const PACKAGE_TYPES = [
  { label: "个人版", value: "personal" },
  { label: "团队版", value: "team" },
  { label: "终身版", value: "lifetime" },
] as const;

export type PackageType = (typeof PACKAGE_TYPES)[number]["value"];

// 有效期类型
export const DURATION_TYPES = [
  { label: "月付", value: "month" },
  { label: "季付", value: "quarter" },
  { label: "年付", value: "year" },
  { label: "终身", value: "lifetime" },
] as const;

// 加油包类型
export const ADDON_TYPES = [
  { label: "时长加油包", value: "minutes" },
  { label: "存储加油包", value: "storage" },
] as const;

export type AddonType = (typeof ADDON_TYPES)[number]["value"];

// 每页条数选项
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

// 日期范围选项
export const DATE_RANGE_OPTIONS = [
  { label: "全部", value: "all" },
  { label: "今天", value: "today" },
  { label: "本周", value: "week" },
  { label: "本月", value: "month" },
  { label: "本年", value: "year" },
] as const;

// 状态颜色映射（用于 Badge）
export const STATUS_COLOR_MAP: Record<string, string> = {
  success: "success",
  warning: "warning",
  danger: "danger",
  primary: "default",
  secondary: "secondary",
};

// 获取状态标签
export function getStatusLabel(
  status: string,
  statusList: readonly { label: string; value: string }[]
): string {
  const item = statusList.find((item) => item.value === status);
  return item?.label || status;
}

// 获取状态颜色
export function getStatusColor(status: string, statusList: readonly { value: string; color?: string }[]): string {
  const item = statusList.find((item) => item.value === status);
  return item?.color || "secondary";
}
