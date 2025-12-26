"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { Cpu, Plus, RefreshCw, Edit } from "lucide-react";

export default function AIModelsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
    console.log("刷新AI模型配置数据");
    setTimeout(() => setLoading(false), 500);
  };

  // Mock data
  const data = [
    {
      id: "1",
      model_name: "GPT-4 Turbo",
      model_code: "gpt-4-turbo",
      model_type: "文本生成",
      api_endpoint: "https://api.openai.com/v1",
      daily_limit: 1000,
      is_active: true,
    },
    {
      id: "2",
      model_name: "Claude 3 Opus",
      model_code: "claude-3-opus",
      model_type: "多模态",
      api_endpoint: "https://api.anthropic.com/v1",
      daily_limit: 500,
      is_active: true,
    },
    {
      id: "3",
      model_name: "Stable Diffusion XL",
      model_code: "sdxl-1.0",
      model_type: "图像生成",
      api_endpoint: "https://api.stability.ai/v1",
      daily_limit: 200,
      is_active: false,
    },
  ];
  const total = 3;

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "model_name",
      header: "模型名称",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("model_name")}</div>
          <div className="text-xs text-muted-foreground">{row.original.model_code}</div>
        </div>
      ),
    },
    {
      accessorKey: "model_type",
      header: "类型",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("model_type")}</Badge>,
    },
    {
      accessorKey: "daily_limit",
      header: "日限额",
      cell: ({ row }) => <span>{row.getValue("daily_limit")} 次/天</span>,
    },
    {
      accessorKey: "is_active",
      header: "状态",
      cell: ({ row }) => (
        <Badge variant={row.getValue("is_active") ? "default" : "secondary"}>
          {row.getValue("is_active") ? "启用" : "禁用"}
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
            <h1 className="text-page-title font-bold text-foreground">AI模型配置</h1>
            <p className="text-sm text-muted-foreground mt-1">
              配置和管理AI模型接入
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              添加模型
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI模型列表</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <TableSkeleton rows={pageSize} columns={5} />
            ) : (
              <DataTable columns={columns} data={data} searchKey="model_name" />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
