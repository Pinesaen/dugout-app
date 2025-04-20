"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface SafeAreaProps {
  children: React.ReactNode
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
}

export function SafeArea({ children, top = true, bottom = true, left = true, right = true }: SafeAreaProps) {
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  })

  useEffect(() => {
    // Get safe area insets from CSS environment variables
    const computedStyle = getComputedStyle(document.documentElement)

    const topInset = Number.parseInt(computedStyle.getPropertyValue("--sat") || "0", 10)
    const rightInset = Number.parseInt(computedStyle.getPropertyValue("--sar") || "0", 10)
    const bottomInset = Number.parseInt(computedStyle.getPropertyValue("--sab") || "0", 10)
    const leftInset = Number.parseInt(computedStyle.getPropertyValue("--sal") || "0", 10)

    setSafeAreaInsets({
      top: topInset,
      right: rightInset,
      bottom: bottomInset,
      left: leftInset,
    })

    // Set CSS variables for safe area insets
    document.documentElement.style.setProperty("--sat", `env(safe-area-inset-top, 0px)`)
    document.documentElement.style.setProperty("--sar", `env(safe-area-inset-right, 0px)`)
    document.documentElement.style.setProperty("--sab", `env(safe-area-inset-bottom, 0px)`)
    document.documentElement.style.setProperty("--sal", `env(safe-area-inset-left, 0px)`)
  }, [])

  const style = {
    paddingTop: top ? `max(${safeAreaInsets.top}px, 0px)` : 0,
    paddingRight: right ? `max(${safeAreaInsets.right}px, 0px)` : 0,
    paddingBottom: bottom ? `max(${safeAreaInsets.bottom}px, 0px)` : 0,
    paddingLeft: left ? `max(${safeAreaInsets.left}px, 0px)` : 0,
  }

  return <div style={style}>{children}</div>
}
