"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Home,
  Search,
  PlusCircle,
  MessageCircle,
  User,
  ArrowLeft,
  ShoppingBag,
  Filter,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "uniforms", name: "유니폼 (Uniforms)" },
    { id: "caps", name: "모자 (Caps)" },
    { id: "balls", name: "야구공 (Balls)" },
    { id: "accessories", name: "액세서리 (Accessories)" },
    { id: "mascots", name: "마스코트 (Mascots)" },
    { id: "digital", name: "디지털 상품 (Digital Items)" },
  ]

  const products = [
    {
      id: 1,
      name: "두산 베어스 홈 유니폼",
      price: "129,000원",
      image: "/placeholder.svg?height=200&width=200&text=Doosan+Jersey",
      team: "두산 베어스",
      category: "uniforms",
    },
    {
      id: 2,
      name: "KBO 공식 야구공",
      price: "25,000원",
      image: "/placeholder.svg?height=200&width=200&text=KBO+Ball",
      team: "KBO",
      category: "balls",
    },
    {
      id: 3,
      name: "LG 트윈스 모자",
      price: "35,000원",
      image: "/placeholder.svg?height=200&width=200&text=LG+Cap",
      team: "LG 트윈스",
      category: "caps",
    },
    {
      id: 4,
      name: "두산 베어스 마스코트 인형",
      price: "45,000원",
      image: "/placeholder.svg?height=200&width=200&text=Doosan+Mascot",
      team: "두산 베어스",
      category: "mascots",
    },
    {
      id: 5,
      name: "KBO 한정판 티셔츠",
      price: "39,000원",
      image: "/placeholder.svg?height=200&width=200&text=KBO+Shirt",
      team: "KBO",
      category: "uniforms",
    },
    {
      id: 6,
      name: "SSG 랜더스 응원 배트",
      price: "15,000원",
      image: "/placeholder.svg?height=200&width=200&text=SSG+Bat",
      team: "SSG 랜더스",
      category: "accessories",
    },
    {
      id: 7,
      name: "KBO 팬 프리미엄 이모티콘",
      price: "3,900원",
      image: "/placeholder.svg?height=200&width=200&text=KBO+Emojis",
      team: "KBO",
      category: "digital",
    },
    {
      id: 8,
      name: "키움 히어로즈 팔찌",
      price: "12,000원",
      image: "/placeholder.svg?height=200&width=200&text=Kiwoom+Bracelet",
      team: "키움 히어로즈",
      category: "accessories",
    },
  ]

  const digitalItems = [
    {
      id: 1,
      name: "두산 베어스 이모티콘 세트",
      price: "3,900원",
      image: "/placeholder.svg?height=150&width=150&text=Doosan+Emojis",
      type: "이모티콘",
    },
    {
      id: 2,
      name: "LG 트윈스 프로필 프레임",
      price: "2,500원",
      image: "/placeholder.svg?height=150&width=150&text=LG+Frame",
      type: "프로필 아이템",
    },
    {
      id: 3,
      name: "KBO 스페셜 스티커 팩",
      price: "4,900원",
      image: "/placeholder.svg?height=150&width=150&text=KBO+Stickers",
      type: "스티커",
    },
    {
      id: 4,
      name: "SSG 랜더스 채팅 효과",
      price: "5,900원",
      image: "/placeholder.svg?height=150&width=150&text=SSG+Effects",
      type: "채팅 효과",
    },
    {
      id: 5,
      name: "KBO 올스타 리액션 세트",
      price: "3,500원",
      image: "/placeholder.svg?height=150&width=150&text=KBO+Reactions",
      type: "리액션",
    },
    {
      id: 6,
      name: "키움 히어로즈 채팅 배지",
      price: "2,900원",
      image: "/placeholder.svg?height=150&width=150&text=Kiwoom+Badge",
      type: "배지",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/discover" className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-blue-600">KBO 스토어 (Store)</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="mt-3 flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="상품 검색... (Search products)"
              className="pl-10 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="ml-2">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex overflow-x-auto pb-2 mb-6 space-x-2">
            <TabsTrigger value="all" className="flex-shrink-0">
              전체 (All)
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex-shrink-0">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Featured Products */}
            <div>
              <h2 className="text-lg font-bold mb-4">추천 상품 (Featured Products)</h2>
              <div className="relative rounded-lg overflow-hidden">
                <div className="aspect-[2/1] relative">
                  <Image
                    src="/placeholder.svg?height=300&width=600&text=KBO+Official+Merchandise"
                    alt="Featured product"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-white font-bold text-lg">KBO 공식 상품 20% 할인</h3>
                  <p className="text-white text-sm">2023 시즌 한정판 상품을 만나보세요</p>
                  <Button className="mt-2 bg-white text-black hover:bg-gray-200">지금 구매하기 (Shop Now)</Button>
                </div>
              </div>
            </div>

            {/* Popular Products */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">인기 상품 (Popular Items)</h2>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  더 보기 (View All)
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {products.slice(0, 4).map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-3">
                      <Badge variant="outline" className="mb-1 text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {product.team}
                      </Badge>
                      <h3 className="font-medium text-sm truncate">{product.name}</h3>
                      <p className="text-sm text-blue-600 font-bold mt-1">{product.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Digital Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">디지털 아이템 (Digital Items)</h2>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  더 보기 (View All)
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {digitalItems.slice(0, 4).map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-3">
                      <Badge variant="outline" className="mb-1 text-xs bg-purple-50 text-purple-700 border-purple-200">
                        {item.type}
                      </Badge>
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <p className="text-sm text-blue-600 font-bold mt-1">{item.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Teams */}
            <div>
              <h2 className="text-lg font-bold mb-4">팀별 상품 (Shop by Team)</h2>
              <div className="space-y-2">
                {["두산 베어스", "LG 트윈스", "SSG 랜더스", "키움 히어로즈", "KT 위즈"].map((team, index) => (
                  <Card key={index} className="hover:bg-gray-50 cursor-pointer">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="font-bold text-xs">{team.substring(0, 2)}</span>
                        </div>
                        <span className="font-medium">{team}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <h2 className="text-lg font-bold">{category.name}</h2>
              <div className="grid grid-cols-2 gap-3">
                {products
                  .filter((product) => product.category === category.id)
                  .map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <Badge variant="outline" className="mb-1 text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {product.team}
                        </Badge>
                        <h3 className="font-medium text-sm truncate">{product.name}</h3>
                        <p className="text-sm text-blue-600 font-bold mt-1">{product.price}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t border-gray-200 py-2">
        <div className="flex justify-around items-center">
          <Link href="/home" className="flex flex-col items-center p-2 text-gray-500">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">홈</span>
          </Link>
          <Link href="/discover" className="flex flex-col items-center p-2 text-gray-500">
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">탐색</span>
          </Link>
          <Link href="/create" className="flex flex-col items-center p-2 text-gray-500">
            <PlusCircle className="h-8 w-8" />
            <span className="text-xs mt-1">만들기</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center p-2 text-gray-500">
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs mt-1">채널</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center p-2 text-gray-500">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">프로필</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
