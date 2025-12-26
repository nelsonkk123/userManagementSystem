/**
 * 通用格式化工具函数
 */

/**
 * 格式化日期时间
 */
export function formatDateTime(dateStr: string | null, format: "datetime" | "date" | "time" = "datetime"): string {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return "-";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  if (format === "date") {
    return `${year}-${month}-${day}`;
  }
  if (format === "time") {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * 格式化相对时间（如：3分钟前）
 */
export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "刚刚";
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}月前`;
  return `${Math.floor(diffDays / 365)}年前`;
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (!bytes) return "-";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * 格式化金额
 */
export function formatMoney(amount: number | null): string {
  if (amount === null || amount === undefined) return "-";
  return "¥" + amount.toFixed(2);
}

/**
 * 格式化手机号（脱敏）
 */
export function formatPhone(phone: string | null): string {
  if (!phone) return "-";
  if (phone.length !== 11) return phone;
  return phone.slice(0, 3) + "****" + phone.slice(-4);
}

/**
 * 格式化时长（秒 -> 分钟:秒）
 */
export function formatDuration(seconds: number | null): string {
  if (seconds === null || seconds === undefined) return "-";
  if (seconds < 60) return seconds + "秒";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? mins + "分" + secs + "秒" : mins + "分钟";
}

/**
 * 获取日期范围（今天、本周、本月等）
 */
export function getDateRange(range: "today" | "week" | "month" | "year" | "all"): { start: string; end: string } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let start: Date;
  let end: Date;

  switch (range) {
    case "today":
      start = today;
      end = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      break;
    case "week":
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      start = weekStart;
      end = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      break;
    case "month":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      break;
    case "year":
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      break;
    default:
      start = new Date(2020, 0, 1);
      end = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  }

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

/**
 * 生成唯一 ID
 */
export function generateId(): string {
  return Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  let previous = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = wait - (now - previous);
    if (remaining <= 0) {
      clearTimeout(timeout);
      previous = now;
      func(...args);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        previous = Date.now();
        func(...args);
      }, remaining);
    }
  };
}
