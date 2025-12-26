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
import { FileText, Download, RefreshCw } from "lucide-react";
import { formatMoney, formatDateTime } from "@/lib/format";

const invoiceFilters = [
  {
    key: "status",
    label: "开票状态",
    type: "select" as const,
    options: [
      { label: "待开票", value: "pending" },
      { label: "已开票", value: "completed" },
      { label: "已作废", value: "cancelled" },
    ],
  },
];

export default function InvoicesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
    console.log("刷新开票管理数据");
    setTimeout(() => setLoading(false), 500);
  };

  // Mock data
  const data = [
    {
      id: "1",
      invoice_no: "INV202501001",
      order: { order_no: "ORD202501001001", user: { nickname: "张三企业主" } },
      amount: 29.9,
      status: "completed",
      invoice_type: "电子普通发票",
      title: "个人",
      tax_number: "",
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      issued_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
  const total = 1;

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "invoice_no",
      header: "发票号",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue("invoice_no")}</span>
      ),
    },
    {
      accessorKey: "order",
      header: "订单信息",
      cell: ({ row }) => {
        const order = row.original.order || row.original.orders;
        return (
          <div>
            <div className="text-sm">{order?.order_no || "-"}</div>
            <div className="text-xs text-muted-foreground">{order?.user?.nickname || ""}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "金额",
      cell: ({ row }) => <span className="font-medium">{formatMoney(row.getValue("amount"))}</span>,
    },
    {
      accessorKey: "invoice_type",
      header: "发票类型",
      cell: ({ row }) => <span className="text-sm">{row.getValue("invoice_type")}</span>,
    },
    {
      accessorKey: "title",
      header: "发票抬头",
      cell: ({ row }) => <span className="text-sm">{row.getValue("title") || "-"}</span>,
    },
    {
      accessorKey: "status",
      header: "状态",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const map: Record<string, { label: string; variant: any }> = {
          pending: { label: "待开票", variant: "outline" },
          completed: { label: "已开票", variant: "default" },
          cancelled: { label: "已作废", variant: "secondary" },
        };
        const config = map[status] || { label: status, variant: "outline" };
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
    {
      accessorKey: "issued_at",
      header: "开票时间",
      cell: ({ row }) => formatDateTime(row.getValue("issued_at")),
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
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
            <h1 className="text-page-title font-bold text-foreground">开票管理</h1>
            <p className="text-sm text-muted-foreground mt-1">
              处理用户发票申请和管理开票记录
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
              filters={invoiceFilters}
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
                <DataTable columns={columns} data={data} searchKey="invoice_no" searchPlaceholder="搜索发票号" />
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
