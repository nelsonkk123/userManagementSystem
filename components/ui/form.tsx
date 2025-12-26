"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  description?: string;
}

export function FormField({
  name,
  label,
  required,
  children,
  error,
  description,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {children}
      {description && !error && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
}

export function Form({ children, onSubmit, ...props }: FormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}

interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  description?: string;
}

export function FormInput({
  name,
  label,
  error,
  required,
  description,
  className,
  ...props
}: FormInputProps) {
  return (
    <FormField name={name} label={label} required={required} error={error} description={description}>
      <Input name={name} error={error} className={className} {...props} />
    </FormField>
  );
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  description?: string;
  options: { value: string; label: string }[];
}

export function FormSelect({
  name,
  label,
  error,
  required,
  description,
  options,
  className,
  ...props
}: FormSelectProps) {
  return (
    <FormField name={name} label={label} required={required} error={error} description={description}>
      <select
        name={name}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  description?: string;
}

export function FormTextarea({
  name,
  label,
  error,
  required,
  description,
  className,
  ...props
}: FormTextareaProps) {
  return (
    <FormField name={name} label={label} required={required} error={error} description={description}>
      <textarea
        name={name}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      />
    </FormField>
  );
}
