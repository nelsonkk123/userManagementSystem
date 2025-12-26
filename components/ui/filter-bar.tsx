"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, RotateCcw } from "lucide-react";
import { PAGE_SIZE_OPTIONS, DATE_RANGE_OPTIONS } from "@/lib/constants";

export interface FilterItem {
  key: string;
  label: string;
  type: "text" | "select" | "date" | "dateRange" | "number";
  placeholder?: string;
  options?: { label: string; value: string }[];
}

interface FilterBarProps {
  filters: FilterItem[];
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
  onReset: () => void;
  className?: string;
  showQuickFilters?: boolean;
  quickFilters?: { label: string; value: any }[];
  onSearch?: () => void;
}

// 防抖 Hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function FilterBar({
  filters,
  values,
  onChange,
  onReset,
  className,
  showQuickFilters = false,
  quickFilters = [],
  onSearch,
}: FilterBarProps) {
  const [localValues, setLocalValues] = React.useState<Record<string, any>>(values);

  // 本地值变化时更新
  React.useEffect(() => {
    setLocalValues(values);
  }, [values]);

  // 防抖后的值
  const debouncedValues = useDebounce(localValues, 100);

  // 防抖值变化时触发搜索
  React.useEffect(() => {
    if (JSON.stringify(debouncedValues) !== JSON.stringify(values)) {
      onChange(debouncedValues);
      onSearch?.();
    }
  }, [debouncedValues]);

  const updateFilter = (key: string, value: any) => {
    const newValues = { ...localValues, [key]: value };
    setLocalValues(newValues);
  };

  const hasActiveFilters = Object.keys(values).some(
    (key) => values[key] !== "" && values[key] !== undefined && values[key] !== null
  );

  return (
    <div className={cn("space-y-4", className)}>
      {/* 筛选条件 */}
      <div className="flex flex-wrap items-center gap-3">
        {filters.map((filter) => (
          <div key={filter.key} className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {filter.label}:
            </span>
            {renderFilterInput(filter, localValues[filter.key], updateFilter, true)}
          </div>
        ))}

        {/* 操作按钮 */}
        <div className="flex items-center gap-2 ml-auto">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              <RotateCcw className="h-4 w-4 mr-1" />
              重置
            </Button>
          )}
        </div>
      </div>

      {/* 快速筛选选项（如：今天、本周等） */}
      {showQuickFilters && quickFilters.length > 0 && (
        <div className="flex gap-2">
          {quickFilters.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              size="sm"
              onClick={() => updateFilter("dateRange", option.value)}
              className={
                localValues.dateRange === option.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : ""
              }
            >
              {option.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

function renderFilterInput(
  filter: FilterItem,
  value: any,
  onChange: (key: string, value: any) => void,
  debounce: boolean = false
) {
  switch (filter.type) {
    case "text":
      return (
        <Input
          placeholder={filter.placeholder}
          value={value || ""}
          onChange={(e) => onChange(filter.key, e.target.value)}
          className="h-9 w-48"
        />
      );

    case "number":
      return (
        <Input
          type="number"
          placeholder={filter.placeholder}
          value={value || ""}
          onChange={(e) => onChange(filter.key, e.target.value)}
          className="h-9 w-32"
        />
      );

    case "select":
      return (
        <select
          value={value || ""}
          onChange={(e) => onChange(filter.key, e.target.value)}
          className="h-9 w-36 rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">全部</option>
          {filter.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    case "date":
      return (
        <Input
          type="date"
          value={value || ""}
          onChange={(e) => onChange(filter.key, e.target.value)}
          className="h-9 w-36"
        />
      );

    case "dateRange":
      return (
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={value?.start || ""}
            onChange={(e) =>
              onChange(filter.key, { ...value, start: e.target.value })
            }
            className="h-9 w-36"
          />
          <span className="text-muted-foreground">至</span>
          <Input
            type="date"
            value={value?.end || ""}
            onChange={(e) =>
              onChange(filter.key, { ...value, end: e.target.value })
            }
            className="h-9 w-36"
          />
        </div>
      );

    default:
      return null;
  }
}

// 分页控制栏
interface PaginationControlProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  showSizeChanger?: boolean;
}

export function PaginationControl({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  showSizeChanger = true,
}: PaginationControlProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex items-center justify-center gap-6">
      {/* 记录总数 */}
      <div className="text-sm text-muted-foreground">
        共 {total} 条
      </div>

      {/* 分页按钮 */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          上一页
        </Button>

        {getPageNumbers(page, totalPages).map((p, index) => {
          if (p === "...") {
            return (
              <span key={index} className="px-2 text-muted-foreground">
                ...
              </span>
            );
          }
          return (
            <Button
              key={index}
              variant={page === p ? "default" : "outline"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onPageChange(p as number)}
            >
              {p}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || totalPages === 0}
        >
          下一页
        </Button>
      </div>

      {/* 每页条数 */}
      {showSizeChanger && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">每页</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 rounded border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-muted-foreground">条</span>
        </div>
      )}
    </div>
  );
}

// 生成页码数组
function getPageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");

  pages.push(total);

  return pages;
}
