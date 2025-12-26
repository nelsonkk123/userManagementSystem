"use client";

import * as React from "react";
import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { FilterBar, PaginationControl } from "@/components/ui/filter-bar";
import { ActionCell, getMaterialReviewActions } from "@/components/ui/action-cell";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ColumnDef } from "@tanstack/react-table";
import {
  Image as ImageIcon,
  Video,
  Music,
  RefreshCw,
  Upload,
} from "lucide-react";
import { formatDateTime, formatFileSize } from "@/lib/format";
import {
  MATERIAL_TYPES,
  MATERIAL_STATUS,
  getStatusLabel,
  getStatusColor,
} from "@/lib/constants";

const materialFilters = [
  {
    key: "material_type",
    label: "素材类型",
    type: "select" as const,
    options: MATERIAL_TYPES.map((t) => ({ label: t.label, value: t.value })),
  },
  {
    key: "status",
    label: "审核状态",
    type: "select" as const,
    options: MATERIAL_STATUS.map((s) => ({ label: s.label, value: s.value })),
  },
];

export default function MaterialsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // TODO: 创建 useMaterials hook
  const data: any[] = [];
  const loading = false;
  const error = null;
  const total = 0;
  const refetch = () => {};

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "thumbnail_url",
      header: "预览",
      cell: ({ row }) => {
        const type = row.getValue("material_type");
        const Icon = type === "image" ? ImageIcon : type === "video" ? Video : Music;
        return (
          <div className="h-12 w-20 bg-muted rounded flex items-center justify-center">
            {row.getValue("thumbnail_url") ? (
              <img
                src={row.getValue("thumbnail_url")}
                alt=""
                className="h-full w-full object-cover rounded"
              />
            ) : (
              <Icon className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "素材名称",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-xs text-muted-foreground">
            {formatFileSize(row.getValue("file_size"))}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "material_type",
      header: "类型",
      cell: ({ row }) => {
        const type = row.getValue("material_type") as string;
        return (
          <Badge variant="outline">
            {getStatusLabel(type, MATERIAL_TYPES)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: "状态",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={getStatusColor(status, MATERIAL_STATUS) as any}>
            {getStatusLabel(status, MATERIAL_STATUS)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "上传时间",
      cell: ({ row }) => formatDateTime(row.getValue("created_at")),
    },
    {
      accessorKey: "usage_count",
      header: "使用次数",
      cell: ({ row }) => <span className="text-sm">{row.getValue("usage_count") || 0}</span>,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">
              素材管理
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              管理公共素材库和用户素材审核
            </p>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            上传素材
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <FilterBar
              filters={materialFilters}
              values={filters}
              onChange={setFilters}
              onReset={() => setFilters({})}
            />
          </CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton rows={pageSize} columns={7} />
            ) : error ? (
              <div className="text-destructive text-center py-8">{error}</div>
            ) : (
              <>
                <DataTable columns={columns} data={data} searchKey="name" searchPlaceholder="搜索素材名称" />
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
