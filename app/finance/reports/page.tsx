"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Download, RefreshCw } from "lucide-react";
import { formatMoney } from "@/lib/format";

export default function FinancialReportsPage() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const handleRefresh = () => {
    console.log("刷新财务报表数据");
    // TODO: 重新获取统计数据
  };

  const handleExportClick = () => {
    setExportDialogOpen(true);
  };

  const handleExportConfirm = () => {
    console.log("导出财务报表");
    setExportDialogOpen(false);
    // TODO: 实现实际的导出功能
  };

  // Mock data
  const stats = {
    totalRevenue: 125890.5,
    revenueGrowth: 15.8,
    orderCount: 1234,
    orderGrowth: 12.3,
    avgOrderValue: 102.0,
    aovGrowth: -2.1,
    paidUsers: 456,
    userGrowth: 8.5,
    refundRate: 3.2,
    refundRateChange: -0.5,
  };

  const dailyRevenue = [
    { date: "2025-01-01", revenue: 3250, orders: 32 },
    { date: "2025-01-02", revenue: 4180, orders: 41 },
    { date: "2025-01-03", revenue: 3890, orders: 38 },
    { date: "2025-01-04", revenue: 5200, orders: 51 },
    { date: "2025-01-05", revenue: 4750, orders: 46 },
    { date: "2025-01-06", revenue: 6120, orders: 59 },
    { date: "2025-01-07", revenue: 5580, orders: 54 },
  ];

  const topProducts = [
    { name: "个人季卡", revenue: 45890, orders: 520 },
    { name: "个人年卡", revenue: 38250, orders: 128 },
    { name: "团队月卡", revenue: 25800, orders: 260 },
    { name: "100分钟加油包", revenue: 12680, orders: 318 },
    { name: "终身会员", revenue: 3269, orders: 3 },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">财务报表</h1>
            <p className="text-sm text-muted-foreground mt-1">
              查看收入统计和财务分析
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportClick}>
              <Download className="h-4 w-4 mr-2" />
              导出报表
            </Button>
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
          </div>
        </div>

        {/* 时间范围选择 */}
        <div className="flex gap-2">
          {[
            { value: "7d", label: "近7天" },
            { value: "30d", label: "近30天" },
            { value: "90d", label: "近90天" },
            { value: "1y", label: "近1年" },
          ].map((item) => (
            <Button
              key={item.value}
              variant={period === item.value ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod(item.value as any)}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* 核心指标 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                总收入
              </CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatMoney(stats.totalRevenue)}</div>
              <div className="flex items-center mt-2">
                {stats.revenueGrowth >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-success mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-danger mr-1" />
                )}
                <span
                  className={`text-xs ${
                    stats.revenueGrowth >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {stats.revenueGrowth > 0 ? "+" : ""}
                  {stats.revenueGrowth}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                订单数
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.orderCount}</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-success mr-1" />
                <span className="text-xs text-success">+{stats.orderGrowth}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                客单价
              </CardTitle>
              <Users className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatMoney(stats.avgOrderValue)}</div>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-danger mr-1" />
                <span className="text-xs text-danger">{stats.aovGrowth}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                退款率
              </CardTitle>
              <Users className="h-4 w-4 text-danger" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.refundRate}%</div>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-success mr-1" />
                <span className="text-xs text-success">{stats.refundRateChange}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 热销产品 */}
        <Card>
          <CardHeader>
            <CardTitle>热销产品排行</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index === 0
                          ? "bg-warning text-white"
                          : index === 1
                          ? "bg-muted-foreground text-white"
                          : index === 2
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {product.orders} 单
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatMoney(product.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 导出确认对话框 */}
      <ConfirmDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        title="确定导出所有数据为excel文件？"
        onConfirm={handleExportConfirm}
      />
    </MainLayout>
  );
}
