"use client";

import * as React from "react";
import { MoreHorizontal, Pencil, Eye, Trash2, Ban, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/ui/dialog";

export interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive";
  confirm?: string;
}

interface ActionCellProps {
  actions: Action[];
  showQuickActions?: number; // 直接显示的按钮数量，其余放入下拉菜单
}

export function ActionCell({ actions, showQuickActions = 2 }: ActionCellProps) {
  const [confirmAction, setConfirmAction] = React.useState<Action | null>(null);

  const handleAction = (action: Action) => {
    if (action.confirm) {
      setConfirmAction(action);
    } else {
      action.onClick();
    }
  };

  const quickActions = actions.slice(0, showQuickActions);
  const dropdownActions = actions.slice(showQuickActions);

  return (
    <>
      <div className="flex items-center gap-1">
        {/* 快速操作按钮 */}
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              handleAction(action);
            }}
          >
            {action.icon || <MoreHorizontal className="h-4 w-4" />}
          </Button>
        ))}

        {/* 下拉菜单 */}
        {dropdownActions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {dropdownActions.map((action, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(action);
                  }}
                  className={action.variant === "destructive" ? "text-destructive" : ""}
                >
                  {action.icon}
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* 确认对话框 */}
      {confirmAction && (
        <ConfirmDialog
          open={!!confirmAction}
          onOpenChange={() => setConfirmAction(null)}
          title="确认操作"
          description={confirmAction.confirm || "确定要执行此操作吗？"}
          onConfirm={() => {
            confirmAction.onClick();
            setConfirmAction(null);
          }}
          variant={confirmAction.variant === "destructive" ? "destructive" : "default"}
        />
      )}
    </>
  );
}

// 常用操作预设
export const commonActions = {
  view: (onClick: () => void) => ({
    label: "查看",
    icon: <Eye className="h-4 w-4 mr-2" />,
    onClick,
  }),
  edit: (onClick: () => void, confirm?: string) => ({
    label: "编辑",
    icon: <Pencil className="h-4 w-4 mr-2" />,
    onClick,
    confirm,
  }),
  delete: (onClick: () => void, confirm: string = "确定要删除吗？此操作无法撤销。") => ({
    label: "删除",
    icon: <Trash2 className="h-4 w-4 mr-2" />,
    onClick,
    confirm,
    variant: "destructive" as const,
  }),
  disable: (onClick: () => void, confirm: string = "确定要禁用吗？") => ({
    label: "禁用",
    icon: <Ban className="h-4 w-4 mr-2" />,
    onClick,
    confirm,
    variant: "destructive" as const,
  }),
  enable: (onClick: () => void, confirm?: string) => ({
    label: "启用",
    icon: <CheckCircle className="h-4 w-4 mr-2" />,
    onClick,
    confirm,
  }),
  approve: (onClick: () => void, confirm?: string) => ({
    label: "通过",
    icon: <CheckCircle className="h-4 w-4 mr-2" />,
    onClick,
    confirm,
  }),
  reject: (onClick: () => void, confirm?: string) => ({
    label: "驳回",
    icon: <XCircle className="h-4 w-4 mr-2" />,
    onClick,
    confirm,
    variant: "destructive" as const,
  }),
};

// 用户管理操作
export function getUserActions(
  onView: () => void,
  onEdit: () => void,
  onDisable: () => void,
  onBlacklist: () => void
): Action[] {
  return [
    { ...commonActions.view(onView) },
    { ...commonActions.edit(onEdit) },
    { ...commonActions.disable(onDisable, "确定要禁用该用户吗？") },
    { ...commonActions.delete(onBlacklist, "确定要将该用户加入黑名单吗？") },
  ];
}

// 模板管理操作
export function getTemplateActions(
  onView: () => void,
  onEdit: () => void,
  onToggleStatus: (status: string) => void,
  currentStatus: string
): Action[] {
  const isActive = currentStatus === "active";

  return [
    { ...commonActions.view(onView) },
    { ...commonActions.edit(onEdit) },
    {
      label: isActive ? "下架" : "上架",
      icon: isActive ? <XCircle className="h-4 w-4 mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />,
      onClick: () => onToggleStatus(currentStatus),
      confirm: isActive ? "确定要下架该模板吗？" : "确定要上架该模板吗？",
    },
  ];
}

// 任务管理操作
export function getTaskActions(
  onView: () => void,
  onRetry: () => void,
  onTerminate: () => void
): Action[] {
  return [
    { ...commonActions.view(onView) },
    {
      label: "重试",
      icon: <CheckCircle className="h-4 w-4 mr-2" />,
      onClick: onRetry,
      confirm: "确定要重试该任务吗？",
    },
    {
      label: "终止",
      icon: <XCircle className="h-4 w-4 mr-2" />,
      onClick: onTerminate,
      confirm: "确定要终止该任务吗？不扣除用户生成额度。",
      variant: "destructive",
    },
  ];
}

// 素材审核操作
export function getMaterialReviewActions(
  onApprove: () => void,
  onReject: () => void
): Action[] {
  return [
    { ...commonActions.approve(onApprove, "确定要审核通过该素材吗？") },
    { ...commonActions.reject(onReject, "确定要驳回该素材吗？") },
  ];
}
