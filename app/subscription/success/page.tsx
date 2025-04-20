"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Home, MessageCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import confetti from "canvas-confetti"

export default function SuccessPage() {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold text-blue-600">구독 완료 (Subscription Complete)</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-6 flex items-center justify-center">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">구독이 완료되었습니다!</CardTitle>
            <CardDescription>Your subscription has been successfully activated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-lg font-medium">김광현 (Kim Gwang-hyun)</p>
              <p className="text-gray-500">두산 베어스 (Doosan Bears)</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">구독 정보 (Subscription Details)</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>플랜 (Plan)</span>
                  <span>분기 구독 (Quarterly)</span>
                </div>
                <div className="flex justify-between">
                  <span>금액 (Amount)</span>
                  <span>₩25,900 / 3개월 (3 months)</span>
                </div>
                <div className="flex justify-between">
                  <span>시작일 (Start Date)</span>
                  <span>2023년 4월 17일</span>
                </div>
                <div className="flex justify-between">
                  <span>다음 결제일 (Next Billing)</span>
                  <span>2023년 7월 17일</span>
                </div>
                <div className="flex justify-between">
                  <span>현재 레벨 (Current Level)</span>
                  <span>레벨 2 (Level 2)</span>
                </div>
              </div>
            </div>

            <div className="text-center text-gray-500">
              {countdown > 0 ? (
                <p>
                  {countdown}초 후 채팅 페이지로 이동합니다...
                  <br />
                  (Redirecting to chat page in {countdown} seconds...)
                </p>
              ) : (
                <p>
                  지금 선수와 채팅을 시작하세요!
                  <br />
                  (Start chatting with your athlete now!)
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Link href="/subscription">
              <Button variant="outline">구독 관리 (Manage Subscription)</Button>
            </Link>
            <Link href="/chat/conversation">
              <Button>채팅 시작하기 (Start Chatting)</Button>
            </Link>
          </CardFooter>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t border-gray-200 py-2">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center p-2 text-gray-500">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center p-2 text-gray-500">
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs mt-1">Chat</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center p-2 text-blue-600">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
