"use client";

import * as React from "react";
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { FilterBar, PaginationControl } from "@/components/ui/filter-bar";
import { ActionCell, getUserActions } from "@/components/ui/action-cell";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useUsers } from "@/hooks/use-table-data";
import {
  ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import { User, Search, Download, Plus, RefreshCw } from "lucide-react";
import { formatDateTime, formatPhone, formatFileSize } from "@/lib/format";
import {
  USER_ROLES,
  ACCOUNT_STATUS,
  getStatusLabel,
  getStatusColor,
} from "@/lib/constants";

// 筛选条件定义
const userFilters = [
  {
    key: "phone",
    label: "手机号",
    type: "text" as const,
    placeholder: "搜索手机号",
  },
  {
    key: "user_role",
    label: "用户角色",
    type: "select" as const,
    options: USER_ROLES.map((r) => ({ label: r.label, value: r.value })),
  },
  {
    key: "account_status",
    label: "账户状态",
    type: "select" as const,
    options: ACCOUNT_STATUS.map((s) => ({ label: s.label, value: s.value })),
  },
  {
    key: "register_time",
    label: "注册时间",
    type: "dateRange" as const,
  },
];

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  // 获取用户数据
  const { data, loading, error, total, refetch } = useUsers({
    page,
    pageSize,
    nickname: filters.nickname,
    phone: filters.phone,
    user_role: filters.user_role,
    account_status: filters.account_status,
    register_time_start: filters.register_time?.start,
    register_time_end: filters.register_time?.end,
  });

  // 操作处理
  const handleView = (userId: string) => {
    console.log("查看用户:", userId);
    // 跳转到用户详情页
  };

  const handleEdit = (userId: string) => {
    console.log("编辑用户:", userId);
    // 打开编辑弹窗
  };

  const handleDisable = (userId: string) => {
    console.log("禁用用户:", userId);
    // 调用禁用 API
  };

  const handleBlacklist = (userId: string) => {
    console.log("加入黑名单:", userId);
    // 调用黑名单 API
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleExportClick = () => {
    setExportDialogOpen(true);
  };

  const handleExportConfirm = () => {
    console.log("导出用户数据");
    setExportDialogOpen(false);
    // TODO: 实现实际的导出功能
  };

  const handleAddUser = () => {
    console.log("新增用户");
    // TODO: 打开新增用户弹窗
  };

  // 表格列定义
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "id",
      header: "用户ID",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{(row.getValue("id") as string)?.slice(0, 8)}...</span>,
    },
    {
      accessorKey: "nickname",
      header: "用户名",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="font-medium">{row.getValue("nickname") || "未设置"}</div>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "手机号",
      cell: ({ row }) => (
        <span className="text-sm">{formatPhone(row.getValue("phone"))}</span>
      ),
    },
    {
      accessorKey: "user_role",
      header: "角色",
      cell: ({ row }) => {
        const role = row.getValue("user_role") as string;
        return (
          <Badge variant={role === "free" ? "secondary" : "default"}>
            {getStatusLabel(role, USER_ROLES)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "account_status",
      header: "状态",
      cell: ({ row }) => {
        const status = row.getValue("account_status") as string;
        return (
          <Badge variant={getStatusColor(status, ACCOUNT_STATUS) as any}>
            {getStatusLabel(status, ACCOUNT_STATUS)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "register_time",
      header: "注册时间",
      cell: ({ row }) => formatDateTime(row.getValue("register_time")),
    },
    {
      accessorKey: "last_login_time",
      header: "最后登录",
      cell: ({ row }) => formatDateTime(row.getValue("last_login_time")),
    },
    {
      accessorKey: "storage_used",
      header: "存储使用",
      cell: ({ row }) => (
        <span className="text-sm">{formatFileSize(row.getValue("storage_used"))}</span>
      ),
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => (
        <ActionCell
          actions={getUserActions(
            () => handleView(row.original.id),
            () => handleEdit(row.original.id),
            () => handleDisable(row.original.id),
            () => handleBlacklist(row.original.id)
          )}
          showQuickActions={3}
        />
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">
              用户管理
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              管理系统用户、角色配置和账户状态
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button variant="outline" onClick={handleExportClick}>
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
            <Button onClick={handleAddUser}>
              <Plus className="h-4 w-4 mr-2" />
              新增用户
            </Button>
          </div>
        </div>

        {/* 筛选和表格 */}
        <Card>
          <CardHeader className="pb-4">
            <FilterBar
              filters={userFilters}
              values={filters}
              onChange={setFilters}
              onReset={() => setFilters({})}
            />
          </CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton rows={pageSize} columns={9} />
            ) : error ? (
              <div className="text-destructive text-center py-8">
                加载失败: {error}
              </div>
            ) : (
              <>
                <DataTable
                  columns={columns}
                  data={data}
                  searchKey="nickname"
                  searchPlaceholder="搜索用户名"
                  onRowSelectionChange={setSelectedRows}
                />
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
