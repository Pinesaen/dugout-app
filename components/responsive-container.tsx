import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

const maxWidthMap = {
  xs: "max-w-xs", // 320px - Good for very small components
  sm: "max-w-sm", // 384px - Good for iPhone SE
  md: "max-w-md", // 448px - Good for iPhone 13
  lg: "max-w-lg", // 512px
  xl: "max-w-xl", // 576px
  "2xl": "max-w-2xl", // 672px
  full: "max-w-full", // 100%
}

export function ResponsiveContainer({ children, className, maxWidth = "md" }: ResponsiveContainerProps) {
  return <div className={cn("w-full mx-auto px-4", maxWidthMap[maxWidth], className)}>{children}</div>
}
