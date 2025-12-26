"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { Package, Plus, RefreshCw, Edit, Power } from "lucide-react";
import { formatMoney } from "@/lib/format";

export default function PackagesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
    console.log("刷新套餐配置数据");
    setTimeout(() => setLoading(false), 500);
  };

  // Mock data
  const data = [
    {
      id: "1",
      name: "个人月卡",
      package_type: "personal",
      duration_type: "month",
      price: 29.9,
      original_price: 39.9,
      video_minutes: 100,
      storage_gb: 10,
      is_active: true,
      sort_order: 1,
    },
    {
      id: "2",
      name: "个人季卡",
      package_type: "personal",
      duration_type: "quarter",
      price: 79.9,
      original_price: 99.9,
      video_minutes: 300,
      storage_gb: 10,
      is_active: true,
      sort_order: 2,
    },
    {
      id: "3",
      name: "个人年卡",
      package_type: "personal",
      duration_type: "year",
      price: 299.9,
      original_price: 399.9,
      video_minutes: 1200,
      storage_gb: 10,
      is_active: true,
      sort_order: 3,
    },
  ];
  const total = 3;

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "name",
      header: "套餐名称",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "package_type",
      header: "类型",
      cell: ({ row }) => {
        const type = row.getValue("package_type") as string;
        const map: Record<string, { label: string; variant: any }> = {
          personal: { label: "个人", variant: "secondary" },
          team: { label: "团队", variant: "default" },
          lifetime: { label: "终身", variant: "outline" },
        };
        const config = map[type] || { label: type, variant: "outline" };
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
    {
      accessorKey: "price",
      header: "价格",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{formatMoney(row.getValue("price"))}</div>
          <div className="text-xs text-muted-foreground line-through">
            原价 {formatMoney(row.original.original_price)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "video_minutes",
      header: "视频时长",
      cell: ({ row }) => <span>{row.getValue("video_minutes")} 分钟</span>,
    },
    {
      accessorKey: "storage_gb",
      header: "存储空间",
      cell: ({ row }) => <span>{row.getValue("storage_gb")} GB</span>,
    },
    {
      accessorKey: "is_active",
      header: "状态",
      cell: ({ row }) => (
        <Badge variant={row.getValue("is_active") ? "default" : "secondary"}>
          {row.getValue("is_active") ? "上架" : "下架"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Power className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">套餐配置</h1>
            <p className="text-sm text-muted-foreground mt-1">
              管理VIP套餐价格和权益配置
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新建套餐
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>套餐列表</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton rows={pageSize} columns={7} />
            ) : (
              <DataTable columns={columns} data={data} searchKey="name" />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
