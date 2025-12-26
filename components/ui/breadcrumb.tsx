"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  children: React.ReactNode;
  className?: string;
}

export function Breadcrumb({ children, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm", className)}>
      {children}
    </nav>
  );
}

interface BreadcrumbListProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbList({ children, className }: BreadcrumbListProps) {
  return <ul className={cn("flex items-center space-x-1", className)}>{children}</ul>;
}

interface BreadcrumbItemProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbItem({ children, className }: BreadcrumbItemProps) {
  return <li className={cn("flex items-center", className)}>{children}</li>;
}

interface BreadcrumbLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  href: string;
  asChild?: boolean;
}

export function BreadcrumbLink({
  href,
  className,
  children,
  ...props
}: BreadcrumbLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

interface BreadcrumbPageProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbPage({ children, className }: BreadcrumbPageProps) {
  return (
    <span
      className={cn("font-medium text-foreground", className)}
      aria-current="page"
    >
      {children}
    </span>
  );
}

interface BreadcrumbSeparatorProps {
  className?: string;
}

export function BreadcrumbSeparator({ className }: BreadcrumbSeparatorProps) {
  return (
    <ChevronRight className={cn("h-4 w-4 text-muted-foreground", className)} />
  );
}

interface BreadcrumbEllipsisProps {
  className?: string;
}

export function BreadcrumbEllipsis({ className }: BreadcrumbEllipsisProps) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">更多</span>
    </span>
  );
}
