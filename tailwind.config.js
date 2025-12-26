/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色调：特调蓝色
        primary: "#008BFF",
        "primary-foreground": "#ffffff",
        // 辅助色
        secondary: "#6B7280",
        "secondary-foreground": "#ffffff",
        // 绿色 - 成功状态
        success: "#10B981",
        // 橙色 - 提醒状态
        warning: "#F59E0B",
        // 红色 - 警告状态
        danger: "#EF4444",
        destructive: "#EF4444",
        "destructive-foreground": "#ffffff",
        // 中性色
        background: "#F3F4F6",
        foreground: "#1F2937",
        card: "#FFFFFF",
        "card-foreground": "#1F2937",
        muted: "#F3F4F6",
        "muted-foreground": "#6B7280",
        accent: "#F3F4F6",
        "accent-foreground": "#1F2937",
        border: "#E5E7EB",
        input: "#E5E7EB",
        ring: "#1E40AF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // 页面标题
        "page-title": ["18px", "bold"],
        // 模块标题
        "section-title": ["16px", "bold"],
        // 正文
        base: ["14px", "normal"],
        // 辅助文字
        xs: ["12px", "normal"],
      },
      spacing: {
        // 组件间距统一为 8px/16px/24px
        18: "4.5rem", // 72px
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};
