"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, RefreshCw } from "lucide-react";

export default function SystemConfigPage() {
  const [configs, setConfigs] = useState({
    mini_program_name: "思拓智媒",
    mini_logo_url: "",
    api_timeout: "30000",
    enable_registration: "true",
    max_video_duration: "180",
    default_export_ratio: "16:9",
    support_email: "support@situo.com",
    commission_rate: "0.15",
  });

  const handleSave = () => {
    console.log("保存配置", configs);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">功能配置</h1>
            <p className="text-sm text-muted-foreground mt-1">
              配置系统功能和参数
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              重置
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              保存配置
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>基础配置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">小程序名称</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={configs.mini_program_name}
                  onChange={(e) => setConfigs({ ...configs, mini_program_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">客服邮箱</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md"
                  value={configs.support_email}
                  onChange={(e) => setConfigs({ ...configs, support_email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">API超时时间(ms)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  value={configs.api_timeout}
                  onChange={(e) => setConfigs({ ...configs, api_timeout: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">最大视频时长(秒)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  value={configs.max_video_duration}
                  onChange={(e) => setConfigs({ ...configs, max_video_duration: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enable_registration"
                checked={configs.enable_registration === "true"}
                onChange={(e) => setConfigs({ ...configs, enable_registration: e.target.checked.toString() })}
              />
              <label htmlFor="enable_registration" className="text-sm">
                开放用户注册
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>业务配置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">默认导出比例</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={configs.default_export_ratio}
                  onChange={(e) => setConfigs({ ...configs, default_export_ratio: e.target.value })}
                >
                  <option value="16:9">16:9 (横屏)</option>
                  <option value="9:16">9:16 (竖屏)</option>
                  <option value="1:1">1:1 (方形)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">代理佣金比例</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md"
                  value={configs.commission_rate}
                  onChange={(e) => setConfigs({ ...configs, commission_rate: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
