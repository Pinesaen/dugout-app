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
  Trophy,
  Users,
  Zap,
  DollarSign,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function FantasyPage() {
  const [activeTab, setActiveTab] = useState("my-team")

  const myTeamPlayers = [
    {
      id: 1,
      name: "김광현",
      team: "SSG 랜더스",
      position: "투수",
      stats: "ERA 2.31",
      points: 125,
      image: "/images/doosan-bears.png",
    },
    {
      id: 2,
      name: "양의지",
      team: "두산 베어스",
      position: "포수",
      stats: "AVG .320",
      points: 118,
      image: "/images/lg-twins.png",
    },
    {
      id: 3,
      name: "이정후",
      team: "키움 히어로즈",
      position: "외야수",
      stats: "AVG .349",
      points: 150,
      image: "/placeholder.svg?height=80&width=80&text=LJ",
    },
    {
      id: 4,
      name: "나성범",
      team: "NC 다이노스",
      position: "외야수",
      stats: "HR 28",
      points: 132,
      image: "/placeholder.svg?height=80&width=80&text=NS",
    },
    {
      id: 5,
      name: "박병호",
      team: "KT 위즈",
      position: "내야수",
      stats: "HR 33",
      points: 145,
      image: "/placeholder.svg?height=80&width=80&text=PB",
    },
  ]

  const availablePlayers = [
    {
      id: 6,
      name: "손아섭",
      team: "롯데 자이언츠",
      position: "외야수",
      stats: "AVG .310",
      price: 11500,
      image: "/placeholder.svg?height=80&width=80&text=SA",
    },
    {
      id: 7,
      name: "강백호",
      team: "KT 위즈",
      position: "내야수",
      stats: "AVG .325",
      price: 12800,
      image: "/placeholder.svg?height=80&width=80&text=KBH",
    },
    {
      id: 8,
      name: "최정",
      team: "SSG 랜더스",
      position: "내야수",
      stats: "HR 26",
      price: 13000,
      image: "/placeholder.svg?height=80&width=80&text=CJ",
    },
    {
      id: 9,
      name: "김재환",
      team: "두산 베어스",
      position: "외야수",
      stats: "HR 23",
      price: 12200,
      image: "/placeholder.svg?height=80&width=80&text=KJH",
    },
    {
      id: 10,
      name: "원종현",
      team: "NC 다이노스",
      position: "투수",
      stats: "ERA 2.95",
      price: 10500,
      image: "/placeholder.svg?height=80&width=80&text=WJH",
    },
  ]

  const leagueStandings = [
    {
      rank: 1,
      name: "야구의 신",
      owner: "baseball_master",
      points: 1250,
      teamImage: "/placeholder.svg?height=40&width=40&text=YS",
    },
    {
      rank: 2,
      name: "두산 팬클럽",
      owner: "doosan_forever",
      points: 1180,
      teamImage: "/placeholder.svg?height=40&width=40&text=DF",
    },
    {
      rank: 3,
      name: "KBO 챔피언",
      owner: "kbo_champ",
      points: 1120,
      teamImage: "/placeholder.svg?height=40&width=40&text=KC",
    },
    {
      rank: 4,
      name: "내 팀",
      owner: "나",
      points: 1050,
      teamImage: "/placeholder.svg?height=40&width=40&text=MT",
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: "타이거즈 매니아",
      owner: "tigers_fan",
      points: 980,
      teamImage: "/placeholder.svg?height=40&width=40&text=TM",
    },
  ]

  const missions = [
    {
      id: 1,
      title: "일일 출석",
      description: "앱에 로그인하고 코인을 받으세요",
      reward: 100,
      progress: 100,
      isComplete: true,
    },
    {
      id: 2,
      title: "3개의 동영상 시청",
      description: "KBO 하이라이트 동영상 시청",
      reward: 150,
      progress: 66,
      isComplete: false,
    },
    {
      id: 3,
      title: "친구 초대",
      description: "친구를 초대하고 코인을 받으세요",
      reward: 300,
      progress: 0,
      isComplete: false,
    },
    {
      id: 4,
      title: "팬타지 팀 완성",
      description: "9명의 선수로 팀 구성하기",
      reward: 500,
      progress: 55,
      isComplete: false,
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
            <h1 className="text-xl font-bold text-blue-600">KBO 판타지 리그</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
              <DollarSign className="h-4 w-4 text-yellow-600 mr-1" />
              <span className="font-bold text-yellow-700">12,500</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="my-team" className="flex flex-col items-center py-2">
              <Users className="h-4 w-4 mb-1" />
              <span className="text-xs">내 팀</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex flex-col items-center py-2">
              <DollarSign className="h-4 w-4 mb-1" />
              <span className="text-xs">이적 시장</span>
            </TabsTrigger>
            <TabsTrigger value="leagues" className="flex flex-col items-center py-2">
              <Trophy className="h-4 w-4 mb-1" />
              <span className="text-xs">리그</span>
            </TabsTrigger>
            <TabsTrigger value="missions" className="flex flex-col items-center py-2">
              <Zap className="h-4 w-4 mb-1" />
              <span className="text-xs">미션</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-team" className="space-y-6">
            {/* Team Summary */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>내 팀 (My Team)</CardTitle>
                  <Badge className="bg-blue-500">670 포인트</Badge>
                </div>
                <CardDescription>이번 주 순위: 4위 (상위 15%)</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">팀 완성도</span>
                  <span className="text-sm text-gray-500">5/9 선수</span>
                </div>
                <Progress value={55} className="h-2" />
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-1" />
                  경기 일정
                </Button>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  선수 추가
                </Button>
              </CardFooter>
            </Card>

            {/* My Players */}
            <div>
              <h2 className="text-lg font-bold mb-4">내 선수단 (My Players)</h2>
              <div className="space-y-3">
                {myTeamPlayers.map((player) => (
                  <Card key={player.id} className="hover:bg-gray-50">
                    <CardContent className="p-4 flex items-center">
                      <Image
                        src={player.image || "/placeholder.svg"}
                        alt={player.name}
                        width={48}
                        height={48}
                        className="rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{player.name}</h3>
                          <Badge className="bg-green-500">+{player.points} pts</Badge>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-500">
                            {player.team} • {player.position}
                          </p>
                          <p className="text-sm font-medium">{player.stats}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button>
                  <PlusCircle className="h-4 w-4 mr-1" />더 많은 선수 추가하기
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-blue-800">이적 시장 (Transfer Market)</h3>
                  <p className="text-sm text-blue-700">선수를 사고 팔아 최고의 팀을 만드세요!</p>
                </div>
                <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                  <DollarSign className="h-4 w-4 text-yellow-600 mr-1" />
                  <span className="font-bold text-yellow-700">12,500</span>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-bold">추천 선수 (Recommended Players)</h2>
            <div className="space-y-3">
              {availablePlayers.map((player) => (
                <Card key={player.id} className="hover:bg-gray-50">
                  <CardContent className="p-4 flex items-center">
                    <Image
                      src={player.image || "/placeholder.svg"}
                      alt={player.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{player.name}</h3>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          {player.price.toLocaleString()}C
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500">
                          {player.team} • {player.position}
                        </p>
                        <p className="text-sm font-medium">{player.stats}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline">모든 선수 보기 (View All Players)</Button>
            </div>
          </TabsContent>

          <TabsContent value="leagues" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>내 리그 (My Leagues)</CardTitle>
                <CardDescription>참여 중인 리그: KBO 팬 리그, 친구들과 함께</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                      <div>
                        <p className="font-medium">KBO 팬 리그</p>
                        <p className="text-xs text-gray-500">참가자: 1,245명</p>
                      </div>
                    </div>
                    <Badge>4위</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-blue-500 mr-2" />
                      <div>
                        <p className="font-medium">친구들과 함께</p>
                        <p className="text-xs text-gray-500">참가자: 8명</p>
                      </div>
                    </div>
                    <Badge>2위</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  새 리그 만들기 (Create New League)
                </Button>
              </CardFooter>
            </Card>

            <h2 className="text-lg font-bold mt-6 mb-4">리그 순위 (League Standings)</h2>
            <div className="space-y-3">
              {leagueStandings.map((team) => (
                <Card
                  key={team.rank}
                  className={team.isCurrentUser ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}
                >
                  <CardContent className="p-4 flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-500 mr-2">
                      {team.rank}
                    </div>
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={team.teamImage || "/placeholder.svg"} />
                      <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{team.name}</h3>
                        <Badge className={team.isCurrentUser ? "bg-blue-500" : "bg-gray-500"}>{team.points} pts</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{team.owner}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="missions" className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-blue-800">일일 미션 (Daily Missions)</h3>
                  <p className="text-sm text-blue-700">미션을 완료하고 코인을 획득하세요!</p>
                </div>
                <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                  <DollarSign className="h-4 w-4 text-yellow-600 mr-1" />
                  <span className="font-bold text-yellow-700">12,500</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {missions.map((mission) => (
                <Card key={mission.id} className={mission.isComplete ? "border-green-500 bg-green-50" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{mission.title}</h3>
                        <p className="text-sm text-gray-500">{mission.description}</p>
                      </div>
                      <Badge className={mission.isComplete ? "bg-green-500" : "bg-blue-500"}>
                        +{mission.reward} 코인
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{mission.isComplete ? "완료!" : `${mission.progress}% 완료`}</span>
                        {mission.isComplete && <Zap className="h-4 w-4 text-green-500" />}
                      </div>
                      <Progress value={mission.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button className="w-full mt-4">모든 미션 보기 (View All Missions)</Button>
          </TabsContent>
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
