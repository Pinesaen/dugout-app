"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import FeedPost from "@/components/feed-post"
import { Button } from "@/components/ui/button"
import { CircleDot, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const posts = [
    {
      username: "kbo_official",
      isVerified: true,
      avatar: "/images/icons/kbo-logo.png",
      timestamp: "2h ago",
      content: "오늘 두산 베어스와 LG 트윈스의 경기! 놀라운 투수전이 펼쳐졌습니다. 🔥\n\nToday's thrilling pitcher's duel between Doosan Bears and LG Twins! An incredible display of skill from both teams. Who were you rooting for? 🐻⚡️",
      image: "/images/highlights/bears-vs-twins.jpg",
      likes: 3267,
      comments: 189,
      tags: ["#KBO", "#DoosanBears", "#LGTwins", "#BaseballKorea"]
    },
    {
      username: "doosan_bears",
      isVerified: true,
      avatar: "/images/teams/doosan-bears.png",
      timestamp: "4h ago",
      content: "팬 여러분! 오늘 경기에서 보여주신 응원 감사합니다! 💙\n\nThank you to all our amazing fans for your support in today's game! Your energy keeps us going strong! 🐻✨",
      image: "/images/highlights/bears-fans.jpg",
      likes: 2842,
      comments: 156,
      tags: ["#DoosanBears", "#KBOLeague", "#ThankYouFans"]
    },
    {
      username: "lg_twins",
      isVerified: true,
      avatar: "/images/teams/lg-twins.png",
      timestamp: "5h ago",
      content: "트윈스 팬 여러분! 오늘도 잠실구장을 가득 채워주셔서 감사합니다. ⚾️\n\nLG Twins fans, thank you for filling Jamsil Baseball Stadium once again! Your support means everything to us! 🏟️💜",
      image: "/images/highlights/twins-celebration.jpg",
      likes: 3156,
      comments: 245,
      tags: ["#LGTwins", "#KBOLeague", "#JamsilStadium"]
    }
  ];

  return (
    <AppLayout showLogo>
      {/* Trending Section */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="bg-gradient-to-r from-dugout-navy/30 to-dugout-red/10 rounded-xl p-4 mb-6 border border-dugout-beige/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-dugout-red mr-2" />
              <h2 className="text-lg font-bold text-dugout-white">Trending Now</h2>
            </div>
            <Link href="/discover?section=trending">
              <Button variant="ghost" className="text-dugout-beige hover:text-dugout-white">
                See All
              </Button>
            </Link>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {["#KBOLeague", "#DoosanBears", "#LGTwins", "#BaseballKorea"].map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                className="flex-none bg-dugout-navy/40 border-dugout-beige/20 text-dugout-beige hover:text-dugout-white hover:bg-dugout-navy/60"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Live Games */}
        <div className="bg-gradient-to-r from-dugout-blue/10 to-dugout-navy/30 rounded-xl p-4 mb-6 border border-dugout-beige/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <CircleDot className="w-5 h-5 text-dugout-blue mr-2" />
              <h2 className="text-lg font-bold text-dugout-white">Live Games</h2>
            </div>
            <Link href="/discover?section=games">
              <Button variant="ghost" className="text-dugout-beige hover:text-dugout-white">
                View All
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between p-3 bg-dugout-navy/40 rounded-lg">
            <div className="flex items-center space-x-3">
              <img src="/images/teams/doosan-bears.png" alt="Doosan Bears" className="w-8 h-8" />
              <span className="text-dugout-white font-medium">Doosan Bears</span>
            </div>
            <div className="text-center">
              <div className="text-dugout-red font-bold">LIVE</div>
              <div className="text-dugout-white font-bold">2 - 1</div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-dugout-white font-medium">LG Twins</span>
              <img src="/images/teams/lg-twins.png" alt="LG Twins" className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <FeedPost key={index} {...post} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
