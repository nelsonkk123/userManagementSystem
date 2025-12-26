"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { Bell, Plus, RefreshCw, Send } from "lucide-react";
import { formatDateTime } from "@/lib/format";

export default function PushMessagesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
    console.log("刷新消息推送数据");
    setTimeout(() => setLoading(false), 500);
  };

  // Mock data
  const data = [
    {
      id: "1",
      title: "系统升级通知",
      content: "系统将于今晚22:00进行升级维护",
      target_type: "all",
      send_count: 150,
      read_count: 120,
      status: "sent",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      sent_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      title: "新功能上线",
      content: "视频模板库新增100+模板",
      target_type: "vip",
      send_count: 50,
      read_count: 45,
      status: "sent",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      sent_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
  const total = 2;

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "title",
      header: "消息标题",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("title")}</div>
          <div className="text-xs text-muted-foreground truncate max-w-xs">
            {row.original.content}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "target_type",
      header: "推送对象",
      cell: ({ row }) => {
        const type = row.getValue("target_type") as string;
        const map: Record<string, { label: string; variant: any }> = {
          all: { label: "全部用户", variant: "default" },
          vip: { label: "VIP用户", variant: "secondary" },
          custom: { label: "自定义", variant: "outline" },
        };
        const config = map[type] || { label: type, variant: "outline" };
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
    {
      accessorKey: "send_count",
      header: "发送/阅读",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.getValue("send_count")}/{row.original.read_count}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "状态",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const map: Record<string, { label: string; variant: any }> = {
          draft: { label: "草稿", variant: "secondary" },
          pending: { label: "待发送", variant: "outline" },
          sent: { label: "已发送", variant: "default" },
          failed: { label: "失败", variant: "destructive" },
        };
        const config = map[status] || { label: status, variant: "outline" };
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
    {
      accessorKey: "sent_at",
      header: "发送时间",
      cell: ({ row }) => formatDateTime(row.getValue("sent_at")),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">消息推送</h1>
            <p className="text-sm text-muted-foreground mt-1">
              创建和管理系统消息推送
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新建推送
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>推送历史</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton rows={pageSize} columns={5} />
            ) : (
              <>
                <DataTable columns={columns} data={data} searchKey="title" />
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-muted-foreground">共 {total} 条记录</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
