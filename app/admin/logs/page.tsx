"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { FilterBar, PaginationControl } from "@/components/ui/filter-bar";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, RefreshCw } from "lucide-react";
import { formatDateTime } from "@/lib/format";

const logFilters = [
  {
    key: "operation_type",
    label: "操作类型",
    type: "select" as const,
    options: [
      { label: "CREATE", value: "CREATE" },
      { label: "UPDATE", value: "UPDATE" },
      { label: "DELETE", value: "DELETE" },
      { label: "LOGIN", value: "LOGIN" },
      { label: "LOGOUT", value: "LOGOUT" },
    ],
  },
  {
    key: "status",
    label: "状态",
    type: "select" as const,
    options: [
      { label: "成功", value: "success" },
      { label: "失败", value: "failed" },
    ],
  },
  {
    key: "created_time",
    label: "操作时间",
    type: "dateRange" as const,
  },
];

export default function LogsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
    console.log("刷新日志管理数据");
    setTimeout(() => setLoading(false), 500);
  };

  // Mock data
  const data = [
    {
      id: "1",
      operator_name: "系统管理员",
      operation_type: "CREATE",
      resource_type: "user",
      operation_detail: '{"action": "创建用户"}',
      ip_address: "192.168.1.100",
      status: "success",
      created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      operator_name: "系统管理员",
      operation_type: "UPDATE",
      resource_type: "template",
      operation_detail: '{"action": "审核通过", "status": "active"}',
      ip_address: "192.168.1.100",
      status: "success",
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      operator_name: "系统管理员",
      operation_type: "DELETE",
      resource_type: "material",
      operation_detail: '{"action": "删除违规素材"}',
      ip_address: "192.168.1.100",
      status: "success",
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      operator_name: "运营管理员",
      operation_type: "UPDATE",
      resource_type: "order",
      operation_detail: '{"action": "处理退款"}',
      ip_address: "192.168.1.101",
      status: "success",
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
  ];
  const total = 4;

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "operator_name",
      header: "操作人",
      cell: ({ row }) => <span className="text-sm font-medium">{row.getValue("operator_name")}</span>,
    },
    {
      accessorKey: "operation_type",
      header: "操作类型",
      cell: ({ row }) => {
        const type = row.getValue("operation_type") as string;
        const map: Record<string, { label: string; variant: any }> = {
          CREATE: { label: "创建", variant: "default" },
          UPDATE: { label: "更新", variant: "secondary" },
          DELETE: { label: "删除", variant: "destructive" },
          LOGIN: { label: "登录", variant: "outline" },
          LOGOUT: { label: "登出", variant: "outline" },
        };
        const config = map[type] || { label: type, variant: "outline" };
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
    {
      accessorKey: "resource_type",
      header: "资源类型",
      cell: ({ row }) => <span className="text-sm">{row.getValue("resource_type")}</span>,
    },
    {
      accessorKey: "operation_detail",
      header: "操作详情",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground font-mono max-w-xs truncate block">
          {row.getValue("operation_detail")}
        </span>
      ),
    },
    {
      accessorKey: "ip_address",
      header: "IP地址",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.getValue("ip_address")}</span>,
    },
    {
      accessorKey: "status",
      header: "状态",
      cell: ({ row }) => (
        <Badge variant={row.getValue("status") === "success" ? "default" : "destructive"}>
          {row.getValue("status") === "success" ? "成功" : "失败"}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "操作时间",
      cell: ({ row }) => formatDateTime(row.getValue("created_at")),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">日志管理</h1>
            <p className="text-sm text-muted-foreground mt-1">
              查看操作日志和审计记录
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <FilterBar
              filters={logFilters}
              values={filters}
              onChange={setFilters}
              onReset={() => setFilters({})}
            />
          </CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton rows={pageSize} columns={7} />
            ) : (
              <>
                <DataTable columns={columns} data={data} searchKey="operator_name" searchPlaceholder="搜索操作人" />
                <PaginationControl
                  page={page}
                  pageSize={pageSize}
                  total={total}
                  onPageChange={setPage}
                  onPageSizeChange={setPageSize}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
