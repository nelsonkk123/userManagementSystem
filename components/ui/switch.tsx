import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

// 带内部状态文字的开关组件
interface SwitchWithStatusProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const SwitchWithStatus = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchWithStatusProps
>(({ checked, onCheckedChange, disabled }, ref) => (
  <button
    ref={ref}
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => !disabled && onCheckedChange(!checked)}
    className={cn(
      "relative inline-flex h-6 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 active:scale-95",
      checked ? "bg-primary" : "bg-input"
    )}
  >
    {/* 开启状态文字 - 白色，在左侧 */}
    <span
      className={cn(
        "absolute left-2 flex items-center text-[10px] font-medium transition-all duration-300 ease-in-out pointer-events-none select-none z-0",
        checked ? "opacity-100 text-white scale-100" : "opacity-0 scale-75"
      )}
    >
      已启用
    </span>

    {/* 关闭状态文字 - 深色，在右侧 */}
    <span
      className={cn(
        "absolute right-2 flex items-center text-[10px] font-medium transition-all duration-300 ease-in-out pointer-events-none select-none z-0",
        !checked ? "opacity-100 text-foreground scale-100" : "opacity-0 scale-75"
      )}
    >
      已禁用
    </span>

    {/* 滑块 - 镜像对称：左右两侧距离边缘相同 */}
    <span
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-all duration-300 ease-in-out z-10",
        checked ? "translate-x-11 scale-105" : "translate-x-0 scale-100"
      )}
    />
  </button>
));
SwitchWithStatus.displayName = "SwitchWithStatus";

export { Switch, SwitchWithStatus };
