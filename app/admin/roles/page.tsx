"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { PaginationControl } from "@/components/ui/filter-bar";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { Shield, Plus, RefreshCw, Edit, Trash } from "lucide-react";
import { formatDateTime } from "@/lib/format";

export default function RolesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
    console.log("刷新角色管理数据");
    setTimeout(() => setLoading(false), 500);
  };

  // Mock data
  const data = [
    {
      id: "1",
      role_name: "超级管理员",
      role_code: "super_admin",
      description: "拥有所有权限",
      permissions: { all: true },
      is_system: true,
      user_count: 2,
      created_at: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      role_name: "运营管理员",
      role_code: "operation_admin",
      description: "负责用户、内容、消息管理",
      permissions: {
        users: { read: true, write: true },
        content: { read: true, write: true },
        messages: { read: true, write: true },
      },
      is_system: false,
      user_count: 5,
      created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      role_name: "内容管理员",
      role_code: "content_admin",
      description: "负责模板和素材管理",
      permissions: {
        templates: { read: true, write: true },
        materials: { read: true, write: true },
      },
      is_system: false,
      user_count: 3,
      created_at: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      role_name: "数据分析师",
      role_code: "data_analyst",
      description: "仅查看数据统计",
      permissions: {
        analytics: { read: true },
      },
      is_system: false,
      user_count: 2,
      created_at: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
  const total = 4;

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "role_name",
      header: "角色名称",
      cell: ({ row }) => <span className="font-medium">{row.getValue("role_name")}</span>,
    },
    {
      accessorKey: "description",
      header: "描述",
      cell: ({ row }) => <span className="text-sm">{row.getValue("description")}</span>,
    },
    {
      accessorKey: "permissions",
      header: "权限",
      cell: ({ row }) => {
        const permissions = row.getValue("permissions") as Record<string, any> | undefined;
        if (permissions?.all) {
          return <Badge variant="default">全部权限</Badge>;
        }
        const keys = Object.keys(permissions || {});
        return (
          <div className="flex flex-wrap gap-1">
            {keys.slice(0, 2).map((key) => (
              <Badge key={key} variant="outline" className="text-xs">
                {key}
              </Badge>
            ))}
            {keys.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{keys.length - 2}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "user_count",
      header: "用户数",
      cell: ({ row }) => <span className="text-sm">{row.getValue("user_count")}</span>,
    },
    {
      accessorKey: "is_system",
      header: "系统角色",
      cell: ({ row }) => (
        <Badge variant={row.getValue("is_system") ? "default" : "secondary"}>
          {row.getValue("is_system") ? "是" : "否"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" disabled={row.original.is_system}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" disabled={row.original.is_system}>
            <Trash className="h-4 w-4" />
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
            <h1 className="text-page-title font-bold text-foreground">角色管理</h1>
            <p className="text-sm text-muted-foreground mt-1">
              管理后台角色和权限配置
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新建角色
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <TableSkeleton rows={pageSize} columns={6} />
            ) : (
              <>
                <DataTable columns={columns} data={data} searchKey="role_name" searchPlaceholder="搜索角色名称" />
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
