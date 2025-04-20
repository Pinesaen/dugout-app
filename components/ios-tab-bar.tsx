import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TabItem {
  href: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

interface IOSTabBarProps {
  tabs: TabItem[]
  className?: string
}

export function IOSTabBar({ tabs, className }: IOSTabBarProps) {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-dugout-navy border-t border-dugout-beige/20 pb-safe shadow-lg",
      className
    )}>
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            href={tab.href}
            className={cn(
              "flex flex-col items-center p-2 min-w-[60px] min-h-[44px]",
              tab.isActive 
                ? "text-dugout-red" 
                : "text-dugout-beige hover:text-dugout-white transition-colors",
            )}
          >
            {tab.icon}
            <span className="text-xs mt-1 font-medium">{tab.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
