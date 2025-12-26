"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDashboardStats } from "@/hooks/use-table-data";
import {
  Users,
  FileVideo,
  Video,
  ShoppingBag,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Image,
  Bell,
} from "lucide-react";
import { formatMoney, formatDateTime } from "@/lib/format";

// KPI 卡片组件
interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
  trendUp?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

function KPICard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendUp,
  loading = false,
  onClick,
}: KPICardProps) {
  return (
    <Card
      className={onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
            {trend !== undefined && (
              <div className="flex items-center mt-2">
                {trendUp ? (
                  <TrendingUp className="h-4 w-4 text-success mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-danger mr-1" />
                )}
                <span
                  className={`text-xs ${
                    trendUp ? "text-success" : "text-danger"
                  }`}
                >
                  {trend > 0 ? "+" : ""}
                  {trend}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  较昨日
                </span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

// 待办任务卡片
interface TodoItemProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  href?: string;
}

function TodoItem({ title, count, icon, color, href }: TodoItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors cursor-pointer`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">待处理</p>
        </div>
      </div>
      <Badge variant="secondary" className="text-lg font-semibold px-3 py-1">
        {count}
      </Badge>
    </div>
  );
}

export default function DashboardPage() {
  const { stats, loading, refetch } = useDashboardStats();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">
              数据概览
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              查看系统核心运营数据和待办事项
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            刷新
          </Button>
        </div>

        {/* 核心 KPI 卡片 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KPICard
            title="累计注册用户"
            value={stats.totalUsers.toLocaleString()}
            subtitle={`今日新增 ${stats.todayUsers}`}
            icon={<Users className="h-4 w-4 text-primary" />}
            trend={5.2}
            trendUp={true}
            loading={loading}
          />
          <KPICard
            title="活跃用户（7日）"
            value={stats.activeUsers7d.toLocaleString()}
            icon={<Users className="h-4 w-4 text-success" />}
            loading={loading}
          />
          <KPICard
            title="已上线模板"
            value={stats.totalTemplates}
            subtitle={`今日新增 ${stats.todayTemplates}`}
            icon={<FileVideo className="h-4 w-4 text-warning" />}
            trend={2}
            trendUp={true}
            loading={loading}
          />
          <KPICard
            title="视频生成量"
            value={stats.totalVideos.toLocaleString()}
            subtitle={`今日 ${stats.todayVideos}`}
            icon={<Video className="h-4 w-4 text-primary" />}
            trend={8.5}
            trendUp={true}
            loading={loading}
          />
          <KPICard
            title="订单金额"
            value={formatMoney(stats.todayRevenue)}
            subtitle={`今日订单 ${stats.totalOrders} 笔`}
            icon={<ShoppingBag className="h-4 w-4 text-success" />}
            trend={12.3}
            trendUp={true}
            loading={loading}
          />
          <KPICard
            title="转化率"
            value="68.5%"
            subtitle="模板→视频下载"
            icon={<TrendingUp className="h-4 w-4 text-primary" />}
            trend={3.2}
            trendUp={true}
            loading={loading}
          />
        </div>

        {/* 待办任务区 */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                内容待审核
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <TodoItem
                title="公共素材"
                count={stats.pendingMaterials}
                icon={<Image className="h-4 w-4 text-white" />}
                color="bg-warning"
                href="/materials"
              />
              <TodoItem
                title="模板审核"
                count={stats.pendingTemplates}
                icon={<FileVideo className="h-4 w-4 text-white" />}
                color="bg-primary"
                href="/templates"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                异常处理
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <TodoItem
                title="渲染失败"
                count={stats.failedTasks}
                icon={<XCircle className="h-4 w-4 text-white" />}
                color="bg-danger"
                href="/tasks"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                财务待办
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <TodoItem
                title="退款申请"
                count={stats.refundRequests}
                icon={<AlertCircle className="h-4 w-4 text-white" />}
                color="bg-warning"
                href="/orders"
              />
            </CardContent>
          </Card>
        </div>

        {/* 快捷操作 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">快捷操作</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <FileVideo className="h-4 w-4 mr-2" />
                上传模板
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                添加用户
              </Button>
              <Button variant="outline" size="sm">
                <ShoppingBag className="h-4 w-4 mr-2" />
                创建套餐
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                发送通知
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
