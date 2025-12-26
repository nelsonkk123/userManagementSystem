"use client";

import * as React from "react";
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { FilterBar, PaginationControl } from "@/components/ui/filter-bar";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useOrders } from "@/hooks/use-table-data";
import { ColumnDef } from "@tanstack/react-table";
import {
  RefreshCw,
  Download,
} from "lucide-react";
import { formatDateTime, formatMoney } from "@/lib/format";
import {
  PAYMENT_STATUS,
  ORDER_STATUS,
  getStatusLabel,
  getStatusColor,
} from "@/lib/constants";

const orderFilters = [
  {
    key: "payment_status",
    label: "支付状态",
    type: "select" as const,
    options: PAYMENT_STATUS.map((s) => ({ label: s.label, value: s.value })),
  },
  {
    key: "order_type",
    label: "订单类型",
    type: "select" as const,
    options: [
      { label: "套餐购买", value: "package" },
      { label: "加油包", value: "addon" },
    ],
  },
  {
    key: "created_time",
    label: "创建时间",
    type: "dateRange" as const,
  },
];

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const { data, loading, error, total, refetch } = useOrders({
    page,
    pageSize,
    ...filters,
  });

  const handleRefresh = () => {
    refetch();
  };

  const handleExportClick = () => {
    setExportDialogOpen(true);
  };

  const handleExportConfirm = () => {
    console.log("导出订单数据");
    setExportDialogOpen(false);
    // TODO: 实现实际的导出功能
  };

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "order_no",
      header: "订单号",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("order_no")}</span>
      ),
    },
    {
      accessorKey: "users",
      header: "用户",
      cell: ({ row }) => {
        const user = row.original.users;
        return (
          <div>
            <div className="text-sm">{user?.nickname || "未知用户"}</div>
            <div className="text-xs text-muted-foreground">{user?.phone || ""}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "order_type",
      header: "类型",
      cell: ({ row }) => {
        const type = row.getValue("order_type");
        return (
          <Badge variant={type === "package" ? "default" : "secondary"}>
            {type === "package" ? "套餐" : "加油包"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "total_amount",
      header: "订单金额",
      cell: ({ row }) => formatMoney(row.getValue("total_amount")),
    },
    {
      accessorKey: "actual_amount",
      header: "实付金额",
      cell: ({ row }) => formatMoney(row.getValue("actual_amount")),
    },
    {
      accessorKey: "payment_status",
      header: "支付状态",
      cell: ({ row }) => {
        const status = row.getValue("payment_status") as string;
        return (
          <Badge variant={getStatusColor(status, PAYMENT_STATUS) as any}>
            {getStatusLabel(status, PAYMENT_STATUS)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "order_status",
      header: "订单状态",
      cell: ({ row }) => {
        const status = row.getValue("order_status") as string;
        return (
          <Badge variant={getStatusColor(status, ORDER_STATUS) as any}>
            {getStatusLabel(status, ORDER_STATUS)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "创建时间",
      cell: ({ row }) => formatDateTime(row.getValue("created_at")),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">
              订单管理
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              查询订单、处理退款和导出数据
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button variant="outline" onClick={handleExportClick}>
              <Download className="h-4 w-4 mr-2" />
              导出订单
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <FilterBar
              filters={orderFilters}
              values={filters}
              onChange={setFilters}
              onReset={() => setFilters({})}
            />
          </CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton rows={pageSize} columns={8} />
            ) : error ? (
              <div className="text-destructive text-center py-8">{error}</div>
            ) : (
              <>
                <DataTable columns={columns} data={data} searchKey="order_no" searchPlaceholder="搜索订单号" />
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
