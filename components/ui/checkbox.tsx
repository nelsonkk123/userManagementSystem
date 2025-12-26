"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type CheckedState = boolean | "indeterminate";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "checked" | "onChange"> {
  checked?: CheckedState;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, type = "checkbox", ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Handle refs properly
    React.useEffect(() => {
      if (typeof ref === "function") {
        ref(inputRef.current);
      } else if (ref) {
        ref.current = inputRef.current;
      }
    }, [inputRef, ref]);

    // Set indeterminate state on the input element
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = checked === "indeterminate";
      }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked);
    };

    // Convert "indeterminate" to false for the checked prop
    const checkedValue = checked === "indeterminate" ? false : checked;

    return (
      <input
        type={type}
        ref={inputRef}
        className={cn(
          "h-4 w-4 shrink-0 rounded border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary accent-primary",
          checked === "indeterminate" && "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary",
          className
        )}
        checked={checkedValue}
        onChange={handleChange}
        data-state={checked === "indeterminate" ? "indeterminate" : checked ? "checked" : "unchecked"}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
