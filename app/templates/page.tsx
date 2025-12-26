"use client";

import * as React from "react";
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { FilterBar, PaginationControl } from "@/components/ui/filter-bar";
import { ActionCell, getTemplateActions } from "@/components/ui/action-cell";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useTemplates } from "@/hooks/use-table-data";
import { ColumnDef } from "@tanstack/react-table";
import {
  FileVideo,
  Eye,
  Edit,
  Download,
  Plus,
  RefreshCw,
  Upload,
} from "lucide-react";
import { formatDateTime, formatDuration } from "@/lib/format";
import {
  TEMPLATE_TYPES,
  TEMPLATE_STATUS,
  getStatusLabel,
  getStatusColor,
} from "@/lib/constants";

// 筛选条件定义
const templateFilters = [
  {
    key: "template_type",
    label: "模板类型",
    type: "select" as const,
    options: TEMPLATE_TYPES.map((t) => ({ label: t.label, value: t.value })),
  },
  {
    key: "status",
    label: "审核状态",
    type: "select" as const,
    options: TEMPLATE_STATUS.map((s) => ({ label: s.label, value: s.value })),
  },
];

export default function TemplatesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // 获取模板数据
  const { data, loading, error, total, refetch } = useTemplates({
    page,
    pageSize,
    ...filters,
  });

  // 操作处理
  const handleView = (templateId: string) => {
    console.log("查看模板:", templateId);
  };

  const handleEdit = (templateId: string) => {
    console.log("编辑模板:", templateId);
  };

  const handleToggleStatus = (currentStatus: string) => {
    console.log("切换状态:", currentStatus);
  };

  // 表格列定义
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "thumbnail_url",
      header: "封面",
      cell: ({ row }) => (
        <div className="h-16 w-24 bg-muted rounded flex items-center justify-center">
          {row.getValue("thumbnail_url") ? (
            <img
              src={row.getValue("thumbnail_url")}
              alt=""
              className="h-full w-full object-cover rounded"
            />
          ) : (
            <FileVideo className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "模板名称",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-xs text-muted-foreground">
            分类: {row.original.template_categories?.name || "未分类"}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "template_type",
      header: "类型",
      cell: ({ row }) => {
        const type = row.getValue("template_type") as string;
        return (
          <Badge variant={type === "vip" ? "default" : "secondary"}>
            {getStatusLabel(type, TEMPLATE_TYPES)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "duration",
      header: "时长",
      cell: ({ row }) => {
        const duration = row.getValue("duration") as number | null;
        return <span className="text-sm">{formatDuration(duration)}</span>;
      },
    },
    {
      accessorKey: "usage_count",
      header: "使用次数",
      cell: ({ row }) => (
        <span className="text-sm">{row.getValue("usage_count")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "状态",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={getStatusColor(status, TEMPLATE_STATUS) as any}>
            {getStatusLabel(status, TEMPLATE_STATUS)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "创建时间",
      cell: ({ row }) => formatDateTime(row.getValue("created_at")),
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => (
        <ActionCell
          actions={getTemplateActions(
            () => handleView(row.original.id),
            () => handleEdit(row.original.id),
            () => handleToggleStatus(row.original.status),
            row.original.status
          )}
          showQuickActions={2}
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
              模板管理
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              管理视频模板、配置权限和上下架
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              上传模板
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新建模板
            </Button>
          </div>
        </div>

        {/* 筛选和表格 */}
        <Card>
          <CardHeader className="pb-4">
            <FilterBar
              filters={templateFilters}
              values={filters}
              onChange={setFilters}
              onReset={() => setFilters({})}
            />
          </CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton rows={pageSize} columns={8} />
            ) : error ? (
              <div className="text-destructive text-center py-8">
                加载失败: {error}
              </div>
            ) : (
              <>
                <DataTable columns={columns} data={data} searchKey="name" searchPlaceholder="搜索模板名称" />
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
