"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { Zap, Plus, RefreshCw, Edit } from "lucide-react";
import { formatMoney } from "@/lib/format";

export default function AddonsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
    console.log("刷新加油包配置数据");
    setTimeout(() => setLoading(false), 500);
  };

  // Mock data
  const data = [
    {
      id: "1",
      name: "视频时长加油包-50分钟",
      addon_type: "minutes",
      value: 50,
      price: 19.9,
      validity_days: 365,
      max_purchase_limit: 10,
      is_active: true,
    },
    {
      id: "2",
      name: "视频时长加油包-100分钟",
      addon_type: "minutes",
      value: 100,
      price: 39.9,
      validity_days: 365,
      max_purchase_limit: 10,
      is_active: true,
    },
  ];
  const total = 2;

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "name",
      header: "加油包名称",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "addon_type",
      header: "类型",
      cell: ({ row }) => {
        const type = row.getValue("addon_type") as string;
        const map: Record<string, { label: string; icon: any }> = {
          minutes: { label: "时长", icon: "分钟" },
          storage: { label: "存储", icon: "GB" },
        };
        const config = map[type] || { label: type, icon: "" };
        return <Badge variant="outline">{config.label}</Badge>;
      },
    },
    {
      accessorKey: "value",
      header: "容量",
      cell: ({ row }) => {
        const type = row.original.addon_type;
        const unit = type === "minutes" ? "分钟" : "GB";
        return <span>{row.getValue("value")} {unit}</span>;
      },
    },
    {
      accessorKey: "price",
      header: "价格",
      cell: ({ row }) => <span className="font-medium">{formatMoney(row.getValue("price"))}</span>,
    },
    {
      accessorKey: "validity_days",
      header: "有效期",
      cell: ({ row }) => <span>{row.getValue("validity_days")} 天</span>,
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
      cell: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
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
            <h1 className="text-page-title font-bold text-foreground">加油包配置</h1>
            <p className="text-sm text-muted-foreground mt-1">
              管理视频时长和存储空间加油包
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新建加油包
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>加油包列表</CardTitle>
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
