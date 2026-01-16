import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
    primary: "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300",
    secondary: "bg-accent text-primary hover:bg-accent/90 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300",
    tertiary: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-md transition-all duration-300",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  }

  // Check if custom classes override defaults
  const hasCustomHeight = className?.includes("h-")
  const hasCustomPadding = className?.includes("px-") || className?.includes("py-")
  const hasCustomRounded = className?.includes("rounded")
  const hasCustomText = className?.includes("text-")
  const hasCustomTransition = className?.includes("transition-")

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        !hasCustomHeight && !hasCustomPadding && sizes[size],
        !hasCustomRounded && "rounded-md",
        !hasCustomText && "text-sm",
        !hasCustomTransition && "transition-colors",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
