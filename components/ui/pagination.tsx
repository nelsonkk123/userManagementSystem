"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showQuickJumper = false,
  showSizeChanger = false,
  pageSize = 10,
  onPageSizeChange,
}: PaginationProps) {
  const [jumpPage, setJumpPage] = React.useState("");

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const handleJump = () => {
    const page = parseInt(jumpPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setJumpPage("");
    }
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Page Info */}
      <div className="text-sm text-muted-foreground">
        共 {totalPages} 页，当前第 {currentPage} 页
      </div>

      {/* Page Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <Button variant="outline" size="icon" disabled>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Jumper & Size Changer */}
      <div className="flex items-center gap-4">
        {showQuickJumper && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">跳至</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJump()}
              className="h-8 w-16 rounded border border-input bg-background px-2 text-center text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <span className="text-muted-foreground">页</span>
            <Button variant="outline" size="sm" onClick={handleJump}>
              GO
            </Button>
          </div>
        )}

        {showSizeChanger && onPageSizeChange && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">每页</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-8 rounded border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-muted-foreground">条</span>
          </div>
        )}
      </div>
    </div>
  );
}
