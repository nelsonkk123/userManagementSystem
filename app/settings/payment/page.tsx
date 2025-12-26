"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SwitchWithStatus } from "@/components/ui/switch";
import { CreditCard, Save, RefreshCw } from "lucide-react";

export default function PaymentConfigPage() {
  const [config, setConfig] = useState({
    wechat_enabled: true,
    wechat_mch_id: "",
    wechat_api_key: "",
    alipay_enabled: true,
    alipay_app_id: "",
    alipay_private_key: "",
    auto_refund: true,
    refund_days: 7,
  });

  const handleSave = () => {
    console.log("保存支付配置", config);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-page-title font-bold text-foreground">支付配置</h1>
            <p className="text-sm text-muted-foreground mt-1">
              配置支付渠道和退款策略
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

        {/* 微信支付 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>微信支付</CardTitle>
              <SwitchWithStatus
                checked={config.wechat_enabled}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, wechat_enabled: checked })
                }
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">商户号 (Mch ID)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={config.wechat_mch_id}
                  onChange={(e) => setConfig({ ...config, wechat_mch_id: e.target.value })}
                  placeholder="请输入微信支付商户号"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">API 密钥 (Key)</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                  value={config.wechat_api_key}
                  onChange={(e) => setConfig({ ...config, wechat_api_key: e.target.value })}
                  placeholder="请输入API密钥"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 支付宝 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>支付宝</CardTitle>
              <SwitchWithStatus
                checked={config.alipay_enabled}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, alipay_enabled: checked })
                }
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">应用 ID (App ID)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={config.alipay_app_id}
                  onChange={(e) => setConfig({ ...config, alipay_app_id: e.target.value })}
                  placeholder="请输入支付宝应用ID"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">应用私钥</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-md"
                  value={config.alipay_private_key}
                  onChange={(e) => setConfig({ ...config, alipay_private_key: e.target.value })}
                  placeholder="请输入应用私钥"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 退款策略 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>退款策略</CardTitle>
              <SwitchWithStatus
                checked={config.auto_refund}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, auto_refund: checked })
                }
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">自动退款期限 (天)</label>
              <input
                type="number"
                className="w-full md:w-64 px-3 py-2 border rounded-md"
                value={config.refund_days}
                onChange={(e) => setConfig({ ...config, refund_days: parseInt(e.target.value) || 0 })}
                min="1"
                max="30"
              />
              <p className="text-xs text-muted-foreground">
                订单完成后可申请退款的天数
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
