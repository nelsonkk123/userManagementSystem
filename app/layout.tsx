import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Management System",
  description: "用户管理、订单管理、运营数据分析",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
