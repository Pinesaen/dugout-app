"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams, useRouter } from "next/navigation"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plan = searchParams.get("plan") || "monthly"

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedAthlete, setSelectedAthlete] = useState("")

  const planDetails = {
    monthly: {
      name: "월간 구독 (Monthly)",
      price: "₩9,900",
      period: "월 (month)",
      athleteCount: 1,
      level: 1,
      charLimit: 30,
    },
    quarterly: {
      name: "분기 구독 (Quarterly)",
      price: "₩25,900",
      period: "3개월 (3 months)",
      athleteCount: 2,
      level: 2,
      charLimit: 40,
    },
    annual: {
      name: "연간 구독 (Annual)",
      price: "₩89,900",
      period: "년 (year)",
      athleteCount: 5,
      level: 3,
      charLimit: 50,
    },
  }[plan]

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      router.push("/subscription/success")
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <Link href="/subscription" className="mr-3">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-blue-600">결제 (Checkout)</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>주문 요약 (Order Summary)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{planDetails.name}</p>
                    <p className="text-sm text-gray-500">
                      {planDetails.price} / {planDetails.period}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                    {planDetails.athleteCount}명의 선수 선택 (Choose {planDetails.athleteCount} athlete
                    {planDetails.athleteCount > 1 ? "s" : ""})
                  </div>
                  <div className="flex items-start">
                    <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                    레벨 {planDetails.level}: {planDetails.charLimit}자 메시지 (Level {planDetails.level}:{" "}
                    {planDetails.charLimit} char messages)
                  </div>
                  {plan === "annual" && (
                    <div className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                      독점 라이브 Q&A 세션 (Exclusive live Q&A sessions)
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-medium">
                    <span>총 금액 (Total)</span>
                    <span>{planDetails.price}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Athlete Selection */}
          <Card>
            <CardHeader>
              <CardTitle>선수 선택 (Select Athlete)</CardTitle>
              <CardDescription>구독할 선수를 선택하세요 (Select the athlete you want to subscribe to)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="athlete">선수 (Athlete)</Label>
                  <Select value={selectedAthlete} onValueChange={setSelectedAthlete}>
                    <SelectTrigger id="athlete">
                      <SelectValue placeholder="선수를 선택하세요 (Select an athlete)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kim-gwang-hyun">김광현 (Kim Gwang-hyun) - 두산 베어스</SelectItem>
                      <SelectItem value="yang-eui-ji">양의지 (Yang Eui-ji) - 두산 베어스</SelectItem>
                      <SelectItem value="lee-jung-hoo">이정후 (Lee Jung-hoo) - 키움 히어로즈</SelectItem>
                      <SelectItem value="na-sung-bum">나성범 (Na Sung-bum) - NC 다이노스</SelectItem>
                      <SelectItem value="park-byung-ho">박병호 (Park Byung-ho) - KT 위즈</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {planDetails.athleteCount > 1 && (
                  <div className="text-sm text-blue-600">
                    * 결제 후 추가 선수를 선택할 수 있습니다. (You can select additional athletes after payment)
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>결제 방법 (Payment Method)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        신용카드 / 체크카드 (Credit/Debit Card)
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="cardNumber">카드 번호 (Card Number)</Label>
                          <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div>
                          <Label htmlFor="expiry">만료일 (Expiry Date)</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="name">카드 소유자 이름 (Cardholder Name)</Label>
                          <Input id="name" placeholder="홍길동 (Hong Gildong)" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isProcessing || !selectedAthlete}>
                  {isProcessing ? "처리 중... (Processing...)" : "결제하기 (Pay Now)"}
                </Button>
              </CardFooter>
            </Card>
          </form>

          <div className="text-sm text-gray-500">
            <p>
              * 구독은 선택한 기간이 끝날 때 자동으로 갱신됩니다. 언제든지 취소할 수 있습니다.
              <br />
              (Subscriptions auto-renew at the end of the selected period. You can cancel anytime.)
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
