"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Server, Database, Cpu, RefreshCw, AlertTriangle } from "lucide-react";

export default function MonitoringPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Mock monitoring data
  const systemHealth = {
    status: "healthy",
    uptime: "99.95%",
    responseTime: 45,
    errorRate: 0.02,
  };

  const serverStats = {
    cpu: 45,
    memory: 62,
    disk: 38,
    network: { in: 125, out: 89 },
  };

  const databaseStats = {
    connections: 45,
    queryTime: 12,
    cacheHit: 94.5,
    size: "2.3 GB",
  };

  const recentAlerts = [
    { id: "1", type: "warning", message: "API响应时间超过阈值", time: "5分钟前", resolved: true },
    { id: "2", type: "error", message: "数据库连接数接近上限", time: "15分钟前", resolved: true },
    { id: "3", type: "info", message: "系统自动备份完成", time: "1小时前", resolved: true },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">运维监控</h1>
            <p className="text-sm text-muted-foreground mt-1">
              系统健康状态和性能监控
            </p>
          </div>
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            刷新
          </Button>
        </div>

        {/* 系统健康状态 */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                系统状态
              </CardTitle>
              <Activity className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-lg font-semibold">运行中</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">正常运行时间 {systemHealth.uptime}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                响应时间
              </CardTitle>
              <Server className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemHealth.responseTime}ms</div>
              <p className="text-xs text-muted-foreground mt-1">平均响应时间</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                错误率
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemHealth.errorRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">过去24小时</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                活跃连接
              </CardTitle>
              <Database className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{databaseStats.connections}</div>
              <p className="text-xs text-muted-foreground mt-1">数据库连接数</p>
            </CardContent>
          </Card>
        </div>

        {/* 服务器资源 */}
        <Card>
          <CardHeader>
            <CardTitle>服务器资源</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>CPU使用率</span>
                <span>{serverStats.cpu}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${serverStats.cpu}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>内存使用率</span>
                <span>{serverStats.memory}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning transition-all"
                  style={{ width: `${serverStats.memory}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>磁盘使用率</span>
                <span>{serverStats.disk}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success transition-all"
                  style={{ width: `${serverStats.disk}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <div className="text-xs text-muted-foreground">网络入站</div>
                <div className="text-lg font-semibold">{serverStats.network.in} MB/s</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">网络出站</div>
                <div className="text-lg font-semibold">{serverStats.network.out} MB/s</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 数据库状态 */}
        <Card>
          <CardHeader>
            <CardTitle>数据库状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <div className="text-xs text-muted-foreground">查询时间</div>
                <div className="text-lg font-semibold">{databaseStats.queryTime}ms</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">缓存命中率</div>
                <div className="text-lg font-semibold">{databaseStats.cacheHit}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">活跃连接</div>
                <div className="text-lg font-semibold">{databaseStats.connections}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">数据库大小</div>
                <div className="text-lg font-semibold">{databaseStats.size}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 最近告警 */}
        <Card>
          <CardHeader>
            <CardTitle>最近告警</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        alert.type === "error"
                          ? "bg-destructive/10 text-destructive"
                          : alert.type === "warning"
                          ? "bg-warning/10 text-warning"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{alert.message}</div>
                      <div className="text-xs text-muted-foreground">{alert.time}</div>
                    </div>
                  </div>
                  <Badge variant={alert.resolved ? "outline" : "default"}>
                    {alert.resolved ? "已解决" : "处理中"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
