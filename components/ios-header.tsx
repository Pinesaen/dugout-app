import type React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface IOSHeaderProps {
  title?: string
  leftAction?: React.ReactNode
  rightAction?: React.ReactNode
  className?: string
  showLogo?: boolean
}

export function IOSHeader({ 
  title, 
  leftAction, 
  rightAction, 
  className,
  showLogo = false 
}: IOSHeaderProps) {
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-10 bg-dugout-navy border-b border-dugout-beige/20 pt-safe shadow-sm",
      className
    )}>
      <div className="flex items-center justify-between px-4 h-14">
        <div className="w-20 flex justify-start">{leftAction}</div>
        {showLogo ? (
          <div className="flex items-center justify-center">
            <Image
              src="/dugout-logo.svg"
              alt="DUGOUT"
              width={28}
              height={28}
              className="rounded-md"
            />
          </div>
        ) : (
          <h1 className="font-heading text-lg font-bold flex-1 text-center text-dugout-white">
            {title}
          </h1>
        )}
        <div className="w-20 flex justify-end">{rightAction}</div>
      </div>
    </header>
  )
}
