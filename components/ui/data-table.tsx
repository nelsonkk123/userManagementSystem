"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  RowSelectionState,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  onRowSelectionChange?: (rows: RowSelectionState) => void;
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

// Tooltip 组件
function Tooltip({ children, content }: { children: React.ReactElement; content: string }) {
  const [show, setShow] = React.useState(false);
  const childRef = React.useRef<HTMLElement>(null);

  const handleMouseEnter = () => {
    const element = childRef.current;
    if (!element) return;

    // 检查内容是否溢出或过长
    const isOverflowing = element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
    const isTextTooLong = element.textContent && element.textContent.length > 30;

    // 如果内容本身较长（超过30字符）或显示被截断，则显示tooltip
    const contentIsLong = content.length > 30;

    if (isOverflowing || isTextTooLong || contentIsLong) {
      setShow(true);
    }
  };

  const clonedChild = React.cloneElement(children, {
    ref: childRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: () => setShow(false),
  });

  return (
    <div className="relative inline-block">
      {clonedChild}
      {show && (
        <div className="absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg whitespace-nowrap break-keep max-w-xs pointer-events-none left-0 top-full mt-1">
          {content}
        </div>
      )}
    </div>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "搜索...",
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const tableWrapperRef = React.useRef<HTMLDivElement>(null);

  // 本地搜索值
  const [localSearchValue, setLocalSearchValue] = React.useState("");

  // 防抖后的搜索值
  const debouncedSearchValue = useDebounce(localSearchValue, 100);

  // 防抖值变化时更新表格过滤器
  React.useEffect(() => {
    if (searchKey) {
      setColumnFilters([{ id: searchKey, value: debouncedSearchValue }]);
    }
  }, [debouncedSearchValue, searchKey]);

  // 同步外部过滤器变化到本地搜索
  React.useEffect(() => {
    const searchFilter = columnFilters.find(f => f.id === searchKey);
    if (searchFilter && searchFilter.value !== localSearchValue) {
      setLocalSearchValue(searchFilter.value as string);
    }
  }, [columnFilters, searchKey]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(newSelection);
      onRowSelectionChange?.(newSelection);
    },
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  });

  // 横向滚动拖动处理
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = tableWrapperRef.current;
    if (!wrapper) return;

    // 只在点击表格内容区域时启用拖动
    const isTableArea = (e.target as HTMLElement).closest('table');
    if (!isTableArea) return;

    setIsDragging(true);
    setStartX(e.pageX - wrapper.offsetLeft);
    setScrollLeft(wrapper.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const wrapper = tableWrapperRef.current;
    if (!wrapper) return;

    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrapper.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 横向滚轮滚动
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const wrapper = tableWrapperRef.current;
    if (!wrapper) return;

    // 检查是否可以横向滚动
    const canScrollHorizontally = wrapper.scrollWidth > wrapper.clientWidth;

    if (canScrollHorizontally && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // 已经是横向滚动
      return;
    }

    if (canScrollHorizontally && Math.abs(e.deltaY) > 0) {
      // 将纵向滚动转换为横向滚动
      e.preventDefault();
      wrapper.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="space-y-4">
      {/* 搜索 */}
      {searchKey && table.getColumn(searchKey) && (
        <div className="flex items-center justify-between">
          <input
            placeholder={searchPlaceholder}
            value={localSearchValue}
            onChange={(event) => setLocalSearchValue(event.target.value)}
            className="max-w-sm h-9 w-64 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="text-sm text-muted-foreground">
            已选 {table.getFilteredSelectedRowModel().rows.length} /{" "}
            {table.getFilteredRowModel().rows.length} 行
          </div>
        </div>
      )}

      {/* 表格 */}
      <div
        ref={tableContainerRef}
        className="rounded-md border border-border overflow-hidden relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          ref={tableWrapperRef}
          className="overflow-x-auto"
        >
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b sticky top-0 bg-background z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <th className="h-10 px-4 w-12 sticky left-0 bg-background z-20">
                    <Checkbox
                      checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                      }
                      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                      aria-label="全选"
                    />
                  </th>
                  {headerGroup.headers.map((header) => {
                    const isActionsColumn = header.column.id === 'actions';
                    return (
                      <th
                        key={header.id}
                        className={cn(
                          "h-10 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap",
                          header.column.getCanSort() && "cursor-pointer hover:text-foreground select-none",
                          isActionsColumn && "sticky right-0 bg-background shadow-[-2px_0_0_0_rgba(0,0,0,0.05)] z-20"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="ml-2">
                            {{
                              asc: <ChevronUp className="inline h-4 w-4" />,
                              desc: <ChevronDown className="inline h-4 w-4" />,
                              false: (
                                <ChevronsUpDown className="inline h-4 w-4 opacity-20" />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 sticky left-0 bg-background z-10">
                      <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="选择行"
                      />
                    </td>
                    {row.getVisibleCells().map((cell) => {
                      const isActionsCell = cell.column.id === 'actions';
                      const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext());
                      // 获取原始值作为 tooltip 内容
                      const rawValue = cell.getValue();
                      const tooltipContent = rawValue !== undefined ? String(rawValue) : '';

                      return (
                        <td
                          key={cell.id}
                          className={cn(
                            "p-4 align-middle whitespace-nowrap",
                            isActionsCell && "sticky right-0 bg-background shadow-[-2px_0_0_0_rgba(0,0,0,0.05)] z-10"
                          )}
                        >
                          {tooltipContent && (
                            <Tooltip content={tooltipContent}>
                              <div className="overflow-hidden text-ellipsis max-w-[200px]">
                                {cellContent}
                              </div>
                            </Tooltip>
                          )}
                          {!tooltipContent && (
                            <div className="overflow-hidden text-ellipsis max-w-[200px]">
                              {cellContent}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="h-24 text-center text-muted-foreground"
                  >
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
