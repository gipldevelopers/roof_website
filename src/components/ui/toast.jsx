"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Toast component for rendering individual toasts
export function Toast({ toast, dismiss }) {
  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all animate-in slide-in-from-top-full sm:slide-in-from-bottom-full",
        toast.variant === "destructive"
          ? "border-destructive bg-destructive text-destructive-foreground"
          : "border bg-background text-foreground"
      )}
    >
      <div className="grid gap-1 flex-1">
        {toast.title && (
          <div className="text-sm font-semibold">{toast.title}</div>
        )}
        {toast.description && (
          <div className="text-sm opacity-90">{toast.description}</div>
        )}
      </div>
      <button
        onClick={() => dismiss(toast.id)}
        className={cn(
          "absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
          toast.variant === "destructive"
            ? "text-red-300 hover:text-red-50"
            : "text-foreground/50 hover:text-foreground"
        )}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
