"use client";

import { Bell, Search, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const router = useRouter();

  const handleNotificationClick = () => {
    // 打开通知抽屉或跳转到通知页面
    console.log("打开通知中心");
    // TODO: 实现通知中心功能
  };

  const handleLogout = () => {
    // 清除用户会话并跳转到登录页
    if (typeof window !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }
    router.push("/login");
  };

  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between border-b border-border bg-card px-6",
        className
      )}
    >
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="搜索..."
            className="h-9 w-64 rounded-lg border border-input bg-background pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={handleNotificationClick}
          title="通知"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
          </span>
        </Button>

        {/* User Menu with Dropdown */}
        <div className="group relative ml-2">
          <button className="flex items-center gap-3 pl-4 pr-2 py-1 hover:bg-muted/50 rounded-lg transition-colors">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium text-foreground">管理员</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors text-left"
              >
                <LogOut className="h-4 w-4" />
                退出登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
