"use client";

import * as React from "react";
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { FilterBar, PaginationControl } from "@/components/ui/filter-bar";
import { ActionCell, getTaskActions } from "@/components/ui/action-cell";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useRenderTasks } from "@/hooks/use-table-data";
import { ColumnDef } from "@tanstack/react-table";
import {
  Video,
  Clock,
  CheckCircle2,
  XCircle,
  Ban,
  RefreshCw,
} from "lucide-react";
import { formatDateTime } from "@/lib/format";
import {
  TASK_STATUS,
  getStatusLabel,
  getStatusColor,
} from "@/lib/constants";

// 筛选条件定义
const taskFilters = [
  {
    key: "task_status",
    label: "任务状态",
    type: "select" as const,
    options: TASK_STATUS.map((s) => ({ label: s.label, value: s.value })),
  },
  {
    key: "created_time",
    label: "创建时间",
    type: "dateRange" as const,
  },
];

export default function TasksPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const { data, loading, error, total, refetch } = useRenderTasks({
    page,
    pageSize,
    ...filters,
  });

  // 操作处理
  const handleView = (taskId: string) => {
    console.log("查看任务:", taskId);
  };

  const handleRetry = (taskId: string) => {
    console.log("重试任务:", taskId);
  };

  const handleTerminate = (taskId: string) => {
    console.log("终止任务:", taskId);
  };

  // 表格列定义
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "id",
      header: "任务ID",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{(row.getValue("id") as string)?.slice(0, 8)}...</span>,
    },
    {
      accessorKey: "users",
      header: "用户",
      cell: ({ row }) => {
        const user = row.original.users;
        return <span className="text-sm">{user?.nickname || "未知用户"}</span>;
      },
    },
    {
      accessorKey: "templates",
      header: "模板",
      cell: ({ row }) => {
        const template = row.original.templates;
        return <span className="text-sm">{template?.name || "未知模板"}</span>;
      },
    },
    {
      accessorKey: "task_status",
      header: "状态",
      cell: ({ row }) => {
        const status = row.getValue("task_status") as string;
        const statusConfig = TASK_STATUS.find((s) => s.value === status);
        return (
          <div className="flex items-center gap-2">
            {status === "processing" && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary animate-spin" />
                <span className="text-sm text-primary">
                  {row.getValue("progress")}%
                </span>
              </div>
            )}
            {status !== "processing" && (
              <Badge variant={getStatusColor(status, TASK_STATUS) as any}>
                {getStatusLabel(status, TASK_STATUS)}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "创建时间",
      cell: ({ row }) => formatDateTime(row.getValue("created_at")),
    },
    {
      accessorKey: "completed_at",
      header: "完成时间",
      cell: ({ row }) => formatDateTime(row.getValue("completed_at")),
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => (
        <ActionCell
          actions={getTaskActions(
            () => handleView(row.original.id),
            () => handleRetry(row.original.id),
            () => handleTerminate(row.original.id)
          )}
          showQuickActions={2}
        />
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">
              视频渲染任务
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              监控视频渲染任务状态和处理异常
            </p>
          </div>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <FilterBar
              filters={taskFilters}
              values={filters}
              onChange={setFilters}
              onReset={() => setFilters({})}
            />
          </CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton rows={pageSize} columns={7} />
            ) : error ? (
              <div className="text-destructive text-center py-8">
                加载失败: {error}
              </div>
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
