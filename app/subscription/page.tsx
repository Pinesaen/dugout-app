import Link from "next/link"
import { ArrowLeft, Check, Home, MessageCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <Link href="/profile" className="mr-3">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-blue-600">구독 관리 (Subscription)</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-6">
        <Tabs defaultValue="plans" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="plans">구독 플랜 (Plans)</TabsTrigger>
            <TabsTrigger value="active">내 구독 (My Subscriptions)</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">프리미엄 채널 혜택 (Premium Channel Benefits)</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  선수와 직접 메시지 교환 (Direct messaging with athletes)
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  구독 기간에 따라 메시지 길이 증가 (Increased message length based on subscription duration)
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  선수의 독점 콘텐츠 접근 (Access to exclusive athlete content)
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  우선 메시지 노출 (Priority message visibility)
                </li>
              </ul>
            </div>

            {/* Subscription Plans */}
            <div className="grid gap-4 md:grid-cols-3">
              {/* Monthly Plan */}
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">월간 구독 (Monthly)</CardTitle>
                  <CardDescription>매월 자동 갱신 (Auto-renews monthly)</CardDescription>
                  <div className="mt-1">
                    <span className="text-2xl font-bold">₩9,900</span>
                    <span className="text-sm text-gray-500">/월 (month)</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                      1명의 선수 선택 (Choose 1 athlete)
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                      레벨 1: 30자 메시지 (Level 1: 30 char messages)
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                      15일 후 레벨 2 (Level 2 after 15 days)
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/subscription/checkout?plan=monthly" className="w-full">
                    <Button className="w-full">구독하기 (Subscribe)</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Quarterly Plan */}
              <Card className="border-blue-400 bg-blue-50">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <CardTitle className="text-lg">분기 구독 (Quarterly)</CardTitle>
                    <Badge className="bg-blue-500">인기 (Popular)</Badge>
                  </div>
                  <CardDescription>3개월마다 자동 갱신 (Auto-renews every 3 months)</CardDescription>
                  <div className="mt-1">
                    <span className="text-2xl font-bold">₩25,900</span>
                    <span className="text-sm text-gray-500">/3개월 (3 months)</span>
                    <div className="text-sm text-green-600 font-medium">13% 할인 (Save 13%)</div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                      2명의 선수 선택 (Choose 2 athletes)
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                      레벨 2: 40자 메시지 (Level 2: 40 char messages)
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                      30일 후 레벨 3 (Level 3 after 30 days)
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/subscription/checkout?plan=quarterly" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">구독하기 (Subscribe)</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Annual Plan */}
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">연간 구독 (Annual)</CardTitle>
                  <CardDescription>매년 자동 갱신 (Auto-renews yearly)</CardDescription>
                  <div className="mt-1">
                    <span className="text-2xl font-bold">₩89,900</span>
                    <span className="text-sm text-gray-500">/년 (year)</span>
                    <div className="text-sm text-green-600 font-medium">24% 할인 (Save 24%)</div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                      5명의 선수 선택 (Choose 5 athletes)
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                      레벨 3: 50자 메시지 (Level 3: 50 char messages)
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                      독점 라이브 Q&A 세션 (Exclusive live Q&A sessions)
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/subscription/checkout?plan=annual" className="w-full">
                    <Button className="w-full">구독하기 (Subscribe)</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>
                * 구독은 선택한 기간이 끝날 때 자동으로 갱신됩니다. 언제든지 취소할 수 있습니다.
                <br />
                (Subscriptions auto-renew at the end of the selected period. You can cancel anytime.)
              </p>
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            {/* Active Subscriptions */}
            <Card>
              <CardHeader>
                <CardTitle>김광현 (Kim Gwang-hyun)</CardTitle>
                <CardDescription>두산 베어스 (Doosan Bears)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">분기 구독 (Quarterly Plan)</p>
                      <p className="text-sm text-gray-500">₩25,900 / 3개월 (3 months)</p>
                    </div>
                    <Badge className="bg-green-500">활성 (Active)</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>구독 시작일 (Start Date)</span>
                      <span>2023년 3월 15일</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>다음 결제일 (Next Billing)</span>
                      <span>2023년 6월 15일</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>현재 레벨 (Current Level)</span>
                      <span>레벨 2 (Level 2)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>메시지 길이 (Message Length)</span>
                      <span>40자 (40 characters)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>레벨 3 업그레이드 (Level 3 Upgrade)</span>
                      <span>15일 남음 (15 days left)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">구독 취소 (Cancel)</Button>
                <Button>구독 관리 (Manage)</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>양의지 (Yang Eui-ji)</CardTitle>
                <CardDescription>두산 베어스 (Doosan Bears)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">분기 구독 (Quarterly Plan)</p>
                      <p className="text-sm text-gray-500">₩25,900 / 3개월 (3 months)</p>
                    </div>
                    <Badge className="bg-green-500">활성 (Active)</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>구독 시작일 (Start Date)</span>
                      <span>2023년 2월 10일</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>다음 결제일 (Next Billing)</span>
                      <span>2023년 5월 10일</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>현재 레벨 (Current Level)</span>
                      <span>레벨 3 (Level 3)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>메시지 길이 (Message Length)</span>
                      <span>50자 (50 characters)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">구독 취소 (Cancel)</Button>
                <Button>구독 관리 (Manage)</Button>
              </CardFooter>
            </Card>

            <div className="mt-6 text-sm text-gray-500">
              <p>
                * 구독을 취소하면 결제 기간이 끝날 때까지 서비스를 이용할 수 있습니다.
                <br />
                (If you cancel, you can use the service until the end of the billing period.)
              </p>
            </div>
          </TabsContent>
        </Tabs>
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
