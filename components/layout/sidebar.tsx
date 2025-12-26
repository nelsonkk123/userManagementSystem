"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Users,
  UserCircle,
  FileVideo,
  FolderOpen,
  Clapperboard,
  Palette,
  Image,
  ShoppingBag,
  Receipt,
  ShoppingCart,
  CreditCard,
  Settings,
  Sliders,
  Shield,
  KeyRound,
  FileText,
  ScrollText,
  Activity,
  ListChecks,
  Monitor,
  Bell,
  Tag,
  Bot,
  Cpu,
  Database,
  BarChart3,
} from "lucide-react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

export interface NavItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
  defaultOpen?: boolean;
}

// 导航结构 - 按 PRD 定义
const navGroups: { title?: string; items: NavItem[] }[] = [
  {
    title: "仪表盘",
    items: [
      {
        title: "数据概览",
        href: "/",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "运营管理",
    items: [
      {
        title: "用户管理",
        icon: Users,
        children: [
          { title: "用户列表", href: "/users", icon: UserCircle },
          { title: "黑名单", href: "/users/blacklist", icon: Shield },
        ],
        defaultOpen: true,
      },
      {
        title: "内容管理",
        icon: FolderOpen,
        children: [
          { title: "模板管理", href: "/templates", icon: Palette },
          { title: "素材管理", href: "/materials", icon: Image },
          { title: "任务管理", href: "/tasks", icon: ListChecks },
        ],
        defaultOpen: true,
      },
      {
        title: "消息推送",
        href: "/messages",
        icon: Bell,
      },
    ],
  },
  {
    title: "配置中心",
    items: [
      {
        title: "功能配置",
        icon: Sliders,
        children: [
          { title: "套餐配置", href: "/config/packages", icon: Tag },
          { title: "加油包配置", href: "/config/addons", icon: Receipt },
          { title: "AI 模型", href: "/config/ai-models", icon: Cpu },
        ],
      },
      {
        title: "系统配置",
        href: "/config/system",
        icon: Settings,
      },
      {
        title: "支付配置",
        href: "/settings/payment",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "财务中心",
    items: [
      {
        title: "订单管理",
        href: "/orders",
        icon: ShoppingCart,
      },
      {
        title: "开票管理",
        href: "/finance/invoices",
        icon: ScrollText,
      },
      {
        title: "财务报表",
        href: "/finance/reports",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "系统管理",
    items: [
      {
        title: "权限管理",
        href: "/admin/roles",
        icon: KeyRound,
      },
      {
        title: "日志管理",
        href: "/admin/logs",
        icon: FileText,
      },
      {
        title: "运维监控",
        href: "/admin/monitoring",
        icon: Monitor,
      },
    ],
  },
];

interface SidebarProps {
  className?: string;
}

interface NavCollapseProps {
  item: NavItem;
  collapsed: boolean;
  pathname: string;
}

function NavCollapse({ item, collapsed, pathname }: NavCollapseProps) {
  const storageKey = `sidebar-${item.title}`;
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        return saved === "true";
      }
    }
    return item.defaultOpen || false;
  });
  const Icon = item.icon;
  const hasActiveChild = item.children?.some(
    (child) => child.href === pathname
  );

  // 保存菜单展开状态到 localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, String(isOpen));
    }
  }, [isOpen, storageKey]);

  if (!item.children || item.children.length === 0) {
    return (
      <Link
        href={item.href || "#"}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          pathname === item.href
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
        title={collapsed ? item.title : undefined}
      >
        <Icon className="h-[18px] w-[18px] shrink-0" />
        {!collapsed && <span>{item.title}</span>}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => !collapsed && setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          hasActiveChild
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
        title={collapsed ? item.title : undefined}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && <span>{item.title}</span>}
        </div>
        {!collapsed && (
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>
      {!collapsed && isOpen && (
        <ul className="ml-6 mt-1 space-y-1">
          {item.children.map((child) => {
            const ChildIcon = child.icon;
            return (
              <li key={child.href}>
                <Link
                  href={child.href || "#"}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    pathname === child.href
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <ChildIcon className="h-4 w-4 shrink-0" />
                  <span>{child.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar-collapsed");
      if (saved !== null) {
        return saved === "true";
      }
    }
    return false;
  });

  // 保存侧边栏折叠状态到 localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-collapsed", String(collapsed));
    }
  }, [collapsed]);

  // 保存和恢复侧边栏滚动位置（使用 useLayoutEffect 避免闪烁）
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // 恢复滚动位置（在浏览器绘制之前执行）
    const savedScroll = localStorage.getItem("sidebar-scroll");
    if (savedScroll) {
      nav.scrollTop = parseInt(savedScroll, 10);
    }

    // 监听滚动事件并保存位置
    const handleScroll = () => {
      localStorage.setItem("sidebar-scroll", String(nav.scrollTop));
    };

    nav.addEventListener("scroll", handleScroll);

    return () => {
      nav.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">思</span>
          </div>
          {!collapsed && (
            <span className="text-base font-semibold text-foreground">
              思拓智媒
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav ref={navRef} className="flex-1 overflow-y-auto py-4 px-3">
        {navGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            {!collapsed && group.title && (
              <p className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
                {group.title}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.title}>
                  <NavCollapse
                    item={item}
                    collapsed={collapsed}
                    pathname={pathname}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse Button */}
      <div className="border-t border-border p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          )}
          title={collapsed ? "展开侧边栏" : "收起侧边栏"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
}
