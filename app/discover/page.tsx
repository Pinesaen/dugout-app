"use client"

import { useState, useEffect } from "react"
import { Search, TrendingUp, Calendar, Trophy, ShoppingBag, CircleDot } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AppLayout } from "@/components/app-layout"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const section = searchParams.get("section")
    if (section) {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [searchParams])

  const trendingTopics = [
    {
      id: 1,
      title: "KBO Opening Day 2024",
      description: "Season kicks off with Doosan Bears vs LG Twins at Jamsil Stadium",
      image: "/images/icons/kbo-logo.png",
      category: "Games"
    },
    {
      id: 2,
      title: "KBO All-Star Game Voting",
      description: "Cast your vote for the 2024 KBO All-Star Game in Busan",
      image: "/images/icons/all-star.png",
      category: "Events"
    },
    {
      id: 3,
      title: "KBO Fantasy League",
      description: "Create your dream team and compete with friends",
      image: "/images/icons/fantasy-league.png",
      category: "Fantasy"
    },
    {
      id: 4,
      title: "New Season Merchandise",
      description: "Get your hands on the latest team jerseys and accessories",
      image: "/images/icons/shop.png",
      category: "Shop"
    }
  ]

  const upcomingGames = [
    {
      id: 1,
      homeTeam: {
        name: "Doosan Bears",
        logo: "/images/teams/doosan-bears.png",
        score: null
      },
      awayTeam: {
        name: "LG Twins",
        logo: "/images/teams/lg-twins.png",
        score: null
      },
      time: "18:30",
      date: "2024-03-23",
      stadium: "Jamsil Baseball Stadium"
    },
    {
      id: 2,
      homeTeam: {
        name: "SSG Landers",
        logo: "/images/teams/ssg-landers.png",
        score: null
      },
      awayTeam: {
        name: "Kiwoom Heroes",
        logo: "/images/teams/kiwoom-heroes.png",
        score: null
      },
      time: "18:30",
      date: "2024-03-23",
      stadium: "Incheon SSG Landers Field"
    },
    {
      id: 3,
      homeTeam: {
        name: "KIA Tigers",
        logo: "/images/teams/kia-tigers.png",
        score: null
      },
      awayTeam: {
        name: "Samsung Lions",
        logo: "/images/teams/samsung-lions.png",
        score: null
      },
      time: "18:30",
      date: "2024-03-23",
      stadium: "Gwangju-KIA Champions Field"
    }
  ]

  const fantasyPlayers = [
    {
      id: 1,
      name: "Kim Gwang-hyun",
      team: "SSG Landers",
      position: "Pitcher",
      stats: "ERA 2.31, 12W-6L",
      price: 12500,
      image: "/images/players/kim-gwang-hyun.jpg",
    },
    {
      id: 2,
      name: "Yang Eui-ji",
      team: "Doosan Bears",
      position: "Catcher",
      stats: "AVG .320, 25HR, 85RBI",
      price: 11800,
      image: "/images/players/yang-eui-ji.jpg",
    },
    {
      id: 3,
      name: "Lee Jung-hoo",
      team: "Kiwoom Heroes",
      position: "Outfield",
      stats: "AVG .349, 23HR, 113RBI",
      price: 15000,
      image: "/images/players/lee-jung-hoo.jpg",
    },
    {
      id: 4,
      name: "Na Sung-bum",
      team: "NC Dinos",
      position: "Outfield",
      stats: "AVG .305, 28HR, 95RBI",
      price: 13200,
      image: "/images/players/na-sung-bum.jpg",
    },
    {
      id: 5,
      name: "Park Byung-ho",
      team: "KT Wiz",
      position: "Infield",
      stats: "AVG .280, 33HR, 98RBI",
      price: 14500,
      image: "/images/players/park-byung-ho.jpg",
    }
  ]

  const shopItems = [
    {
      id: 1,
      name: "Doosan Bears 2024 Home Jersey",
      price: "129,000₩",
      image: "/images/shop/doosan-jersey.jpg",
    },
    { 
      id: 2, 
      name: "KBO Official Game Ball", 
      price: "25,000₩", 
      image: "/images/shop/kbo-baseball.jpg" 
    },
    { 
      id: 3, 
      name: "LG Twins 2024 Season Cap", 
      price: "35,000₩", 
      image: "/images/shop/lg-cap.jpg" 
    },
    {
      id: 4,
      name: "KBO Team Mascot Collection",
      price: "45,000₩",
      image: "/images/shop/mascot-plush.jpg",
    },
    {
      id: 5,
      name: "KBO 40th Anniversary T-Shirt",
      price: "39,000₩",
      image: "/images/shop/kbo-tshirt.jpg",
    },
    {
      id: 6,
      name: "Pro Baseball Glove",
      price: "89,000₩",
      image: "/images/shop/baseball-glove.jpg",
    }
  ]

  return (
    <AppLayout headerTitle="Discover">
      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* Search Bar */}
        <div className="sticky top-[calc(3.5rem+env(safe-area-inset-top))] pt-4 pb-2 bg-gradient-to-b from-dugout-navy via-dugout-navy to-transparent z-10">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dugout-beige/70" />
            <Input
              placeholder="Search teams, players, or games..."
              className="pl-10 pr-4 py-2 w-full bg-dugout-navy/30 border-dugout-beige/10 text-dugout-white placeholder:text-dugout-beige/50 focus:border-dugout-red/50 focus:ring-dugout-red/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 mb-6">
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="w-full h-16 grid grid-cols-4 bg-dugout-navy/20 rounded-xl p-1.5 gap-1">
              <TabsTrigger 
                value="trending" 
                className="rounded-lg flex flex-col items-center justify-center h-full transition-all
                  data-[state=active]:bg-dugout-red data-[state=active]:text-white
                  data-[state=inactive]:text-dugout-beige hover:text-white
                  data-[state=inactive]:hover:bg-dugout-navy/40"
              >
                <TrendingUp className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Trending</span>
              </TabsTrigger>
              <TabsTrigger 
                value="games"
                className="rounded-lg flex flex-col items-center justify-center h-full transition-all
                  data-[state=active]:bg-dugout-red data-[state=active]:text-white
                  data-[state=inactive]:text-dugout-beige hover:text-white
                  data-[state=inactive]:hover:bg-dugout-navy/40"
              >
                <Calendar className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Games</span>
              </TabsTrigger>
              <TabsTrigger 
                value="fantasy"
                className="rounded-lg flex flex-col items-center justify-center h-full transition-all
                  data-[state=active]:bg-dugout-red data-[state=active]:text-white
                  data-[state=inactive]:text-dugout-beige hover:text-white
                  data-[state=inactive]:hover:bg-dugout-navy/40"
              >
                <Trophy className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Fantasy</span>
              </TabsTrigger>
              <TabsTrigger 
                value="shop"
                className="rounded-lg flex flex-col items-center justify-center h-full transition-all
                  data-[state=active]:bg-dugout-red data-[state=active]:text-white
                  data-[state=inactive]:text-dugout-beige hover:text-white
                  data-[state=inactive]:hover:bg-dugout-navy/40"
              >
                <ShoppingBag className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Shop</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="mt-6 space-y-4">
              <div id="trending" className="space-y-6 mb-8">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-dugout-red mr-2" />
                  <h2 className="text-xl font-bold text-dugout-white">Trending Topics</h2>
                </div>
                <div className="space-y-3">
                  {trendingTopics.map((topic) => (
                    <Card key={topic.id} className="bg-dugout-navy/30 border-dugout-beige/10 hover:bg-dugout-navy/40 cursor-pointer transition-all">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-dugout-white">{topic.title}</h3>
                          <p className="text-sm text-dugout-beige/80">{topic.description}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-dugout-navy/30 p-1 flex items-center justify-center">
                          <Image
                            src={topic.image}
                            alt={topic.title}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="games" className="mt-6 space-y-4">
              <div id="games" className="space-y-6 mb-8">
                <div className="flex items-center">
                  <CircleDot className="w-5 h-5 text-dugout-blue mr-2" />
                  <h2 className="text-xl font-bold text-dugout-white">Upcoming Games</h2>
                </div>
                <div className="space-y-3">
                  {upcomingGames.map((game) => (
                    <Card key={game.id} className="bg-dugout-navy/30 border-dugout-beige/10 hover:bg-dugout-navy/40 cursor-pointer transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="bg-dugout-red/10 text-dugout-red border-dugout-red/20">
                            {game.time}
                          </Badge>
                          <span className="text-sm text-dugout-beige/80">{game.stadium}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-dugout-navy/30 p-1 flex items-center justify-center">
                              <Image
                                src={game.homeTeam.logo}
                                alt={game.homeTeam.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            </div>
                            <span className="font-medium text-dugout-white">{game.homeTeam.name}</span>
                          </div>
                          <span className="text-lg font-bold text-dugout-beige mx-4">VS</span>
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-dugout-white">{game.awayTeam.name}</span>
                            <div className="w-12 h-12 rounded-full bg-dugout-navy/30 p-1 flex items-center justify-center">
                              <Image
                                src={game.awayTeam.logo}
                                alt={game.awayTeam.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fantasy" className="mt-6 space-y-4">
              <div className="bg-gradient-to-br from-dugout-navy/30 to-dugout-red/10 border border-dugout-beige/10 rounded-xl p-4 mb-4">
                <h3 className="font-semibold text-dugout-white mb-2">KBO Fantasy League</h3>
                <p className="text-sm text-dugout-beige/80 mb-3">
                  Create your dream team and earn points based on real KBO game results!
                </p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm"
                    className="bg-dugout-red hover:bg-dugout-red/90 text-dugout-white"
                  >
                    Manage Team
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-dugout-beige/20 text-dugout-beige hover:bg-dugout-beige/10 hover:text-dugout-white"
                  >
                    League Rankings
                  </Button>
                </div>
              </div>

              <h2 className="text-lg font-bold text-dugout-white">Hot Players</h2>
              <div className="space-y-3">
                {fantasyPlayers.map((player) => (
                  <Card key={player.id} className="bg-dugout-navy/30 border-dugout-beige/10 hover:bg-dugout-navy/40 cursor-pointer transition-all">
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-full bg-dugout-navy/30 p-1 flex items-center justify-center shrink-0">
                        <Image
                          src={player.image}
                          alt={player.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-dugout-white truncate">{player.name}</h3>
                          <Badge className="bg-dugout-red/10 text-dugout-red border-dugout-red/20 ml-2 shrink-0">
                            {player.price.toLocaleString()}C
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-dugout-beige/80 truncate">
                            {player.team} • {player.position}
                          </p>
                          <p className="text-sm font-medium text-dugout-white ml-2 shrink-0">{player.stats}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button 
                  className="bg-dugout-red hover:bg-dugout-red/90 text-dugout-white w-full max-w-sm"
                >
                  Add to My Team
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="shop" className="mt-6 space-y-4">
              <h2 className="text-lg font-bold text-dugout-white mb-4">Official Store</h2>
              <div className="grid grid-cols-2 gap-4">
                {shopItems.map((item) => (
                  <Card key={item.id} className="bg-dugout-navy/30 border-dugout-beige/10 hover:bg-dugout-navy/40 cursor-pointer transition-all overflow-hidden">
                    <div className="aspect-square relative bg-dugout-navy/30">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm text-dugout-white truncate mb-1">{item.name}</h3>
                      <p className="text-sm text-dugout-red font-bold">{item.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button 
                  variant="outline"
                  className="border-dugout-beige/20 text-dugout-beige hover:bg-dugout-beige/10 hover:text-dugout-white w-full max-w-sm"
                >
                  View More
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  )
}
