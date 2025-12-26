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
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
}

export function Table<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "搜索...",
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    {}
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      {searchKey && (
        <Input
          placeholder={searchPlaceholder}
          value={
            (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      )}

      {/* Table */}
      <div className="rounded-md border border-border">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
                        header.column.getCanSort() &&
                          "cursor-pointer hover:text-foreground select-none"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                  className="border-b border-border transition-colors hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Info */}
      <div className="flex items-center justify-end text-sm text-muted-foreground">
        选中 {table.getFilteredSelectedRowModel().rows.length} /{" "}
        {table.getFilteredRowModel().rows.length} 行
      </div>
    </div>
  );
}
