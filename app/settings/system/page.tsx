"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SwitchWithStatus } from "@/components/ui/switch";
import { Save, RefreshCw } from "lucide-react";

export default function SystemSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [settings, setSettings] = useState({
    // 系统配置
    systemName: "用户管理系统",
    systemLogo: "",
    allowRegistration: true,
    maintenanceMode: false,

    // 安全配置
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    passwordMinLength: 8,
    requireStrongPassword: true,

    // 存储配置
    maxStoragePerUser: 1073741824, // 1GB in bytes
    allowedFileTypes: [".jpg", ".jpeg", ".png", ".gif", ".mp4", ".pdf"],
    maxFileSize: 104857600, // 100MB in bytes
  });

  const handleSave = () => {
    setSaving(true);
    // TODO: 保存系统设置
    setTimeout(() => setSaving(false), 1000);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    console.log("刷新系统设置");
    // TODO: 重新加载系统设置
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">系统设置</h1>
            <p className="text-sm text-muted-foreground mt-1">
              配置系统参数和安全策略
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              保存设置
            </Button>
          </div>
        </div>

        {/* 基础配置 */}
        <Card>
          <CardHeader>
            <CardTitle>基础配置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="systemName">系统名称</Label>
              <Input
                id="systemName"
                value={settings.systemName}
                onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                placeholder="输入系统名称"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="systemLogo">系统Logo URL</Label>
              <Input
                id="systemLogo"
                value={settings.systemLogo}
                onChange={(e) => setSettings({ ...settings, systemLogo: e.target.value })}
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>允许用户注册</Label>
                <p className="text-sm text-muted-foreground">关闭后新用户无法自行注册</p>
              </div>
              <SwitchWithStatus
                checked={settings.allowRegistration}
                onCheckedChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>维护模式</Label>
                <p className="text-sm text-muted-foreground">开启后普通用户无法访问系统</p>
              </div>
              <SwitchWithStatus
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* 安全配置 */}
        <Card>
          <CardHeader>
            <CardTitle>安全配置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">会话超时时间（分钟）</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: Number(e.target.value) })}
                min={5}
                max={1440}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxLoginAttempts">最大登录尝试次数</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({ ...settings, maxLoginAttempts: Number(e.target.value) })}
                min={3}
                max={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lockoutDuration">锁定时长（分钟）</Label>
              <Input
                id="lockoutDuration"
                type="number"
                value={settings.lockoutDuration}
                onChange={(e) => setSettings({ ...settings, lockoutDuration: Number(e.target.value) })}
                min={5}
                max={1440}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordMinLength">密码最小长度</Label>
              <Input
                id="passwordMinLength"
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => setSettings({ ...settings, passwordMinLength: Number(e.target.value) })}
                min={6}
                max={32}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>强制强密码</Label>
                <p className="text-sm text-muted-foreground">要求密码包含大小写字母、数字和特殊字符</p>
              </div>
              <SwitchWithStatus
                checked={settings.requireStrongPassword}
                onCheckedChange={(checked) => setSettings({ ...settings, requireStrongPassword: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* 存储配置 */}
        <Card>
          <CardHeader>
            <CardTitle>存储配置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxStoragePerUser">用户存储空间上限（MB）</Label>
              <Input
                id="maxStoragePerUser"
                type="number"
                value={settings.maxStoragePerUser / 1024 / 1024}
                onChange={(e) => setSettings({ ...settings, maxStoragePerUser: Number(e.target.value) * 1024 * 1024 })}
                min={100}
                max={10240}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxFileSize">单文件大小上限（MB）</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize / 1024 / 1024}
                onChange={(e) => setSettings({ ...settings, maxFileSize: Number(e.target.value) * 1024 * 1024 })}
                min={1}
                max={500}
              />
            </div>

            <div className="space-y-2">
              <Label>允许的文件类型</Label>
              <div className="text-sm text-muted-foreground">
                {settings.allowedFileTypes.join(", ")}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
