"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/onboarding")
  }, [router])

  return null
}
