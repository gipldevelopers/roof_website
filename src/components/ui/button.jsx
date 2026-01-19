import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "relative overflow-hidden font-semibold transition-all duration-300 bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-white/20 before:to-primary/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
    secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300",
    outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md hover:border-secondary hover:text-secondary transition-all duration-300 bg-transparent",
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
