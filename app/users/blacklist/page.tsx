"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { FilterBar, PaginationControl } from "@/components/ui/filter-bar";
import { ActionCell } from "@/components/ui/action-cell";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { Ban, Plus, RefreshCw } from "lucide-react";
import { formatDateTime } from "@/lib/format";

const blacklistFilters = [
  {
    key: "phone",
    label: "手机号",
    type: "text" as const,
    placeholder: "搜索手机号",
  },
  {
    key: "created_time",
    label: "拉黑时间",
    type: "dateRange" as const,
  },
];

export default function BlacklistPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
    console.log("刷新黑名单数据");
    setTimeout(() => setLoading(false), 500);
  };

  // Mock data - 替换为实际 API 调用
  const data = [
    {
      id: "1",
      user: { id: "101", nickname: "黑名单用户", phone: "13800001004" },
      reason: "多次违规操作",
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
  const total = 1;

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "user",
      header: "用户",
      cell: ({ row }) => {
        const user = row.original.user || row.original.users;
        return (
          <div>
            <div className="text-sm font-medium">{user?.nickname || "未知用户"}</div>
            <div className="text-xs text-muted-foreground">{user?.phone || ""}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "reason",
      header: "拉黑原因",
      cell: ({ row }) => <span className="text-sm">{row.getValue("reason") || "-"}</span>,
    },
    {
      accessorKey: "created_at",
      header: "拉黑时间",
      cell: ({ row }) => formatDateTime(row.getValue("created_at")),
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => (
        <ActionCell
          actions={[
            {
              label: "解除黑名单",
              onClick: () => console.log("解除黑名单", row.original.id),
              variant: "default",
            },
          ]}
          showQuickActions={1}
        />
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">黑名单管理</h1>
            <p className="text-sm text-muted-foreground mt-1">
              管理违规用户黑名单和解除操作
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
              filters={blacklistFilters}
              values={filters}
              onChange={setFilters}
              onReset={() => setFilters({})}
            />
          </CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton rows={pageSize} columns={4} />
            ) : (
              <>
                <DataTable columns={columns} data={data} />
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
