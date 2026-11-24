"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TabsContextValue = { value?: string; setValue: (value: string) => void };
const TabsContext = React.createContext<TabsContextValue | null>(null);

function Tabs({ value: controlledValue, defaultValue, onValueChange, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { value?: string; defaultValue?: string; onValueChange?: (value: string) => void }) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;
  const setValue = (next: string) => {
    setUncontrolledValue(next);
    onValueChange?.(next);
  };
  return <TabsContext.Provider value={{ value, setValue }}><div className={cn("w-full", className)} {...props} /></TabsContext.Provider>;
}

function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className)} {...props} />;
}

function TabsTrigger({ value, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used inside Tabs");
  return <button type="button" data-state={context.value === value ? "active" : "inactive"} className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className)} onClick={() => context.setValue(value)} {...props} />;
}

function TabsContent({ value, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const context = React.useContext(TabsContext);
  if (!context || context.value !== value) return null;
  return <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
