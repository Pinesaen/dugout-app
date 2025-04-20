"use client"

import { useEffect, useState } from "react"
import { Cog, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AppLayout } from "@/components/app-layout"
import Link from "next/link"

export default function ProfilePage() {
  const [userName, setUserName] = useState<string>("")
  const [userBirthDate, setUserBirthDate] = useState<string>("")

  useEffect(() => {
    // Get user info from localStorage
    const storedName = localStorage.getItem("userName")
    const storedBirthDate = localStorage.getItem("userBirthDate")
    
    if (storedName) {
      setUserName(storedName)
    }
    if (storedBirthDate) {
      setUserBirthDate(storedBirthDate)
    }
  }, [])

  return (
    <AppLayout 
      headerTitle="Profile"
      rightAction={
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-dugout-beige hover:text-dugout-white">
            <Cog className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-dugout-beige hover:text-dugout-white"
            onClick={() => {
              // Clear user data and redirect to onboarding
              localStorage.clear()
              window.location.href = "/onboarding"
            }}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      }
    >
      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-dugout-navy/30 to-dugout-red/10 rounded-xl border border-dugout-beige/20 p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-dugout-navy/50 border-2 border-dugout-beige/20 flex items-center justify-center">
              <span className="text-4xl text-dugout-beige/60">
                {userName ? userName.charAt(0).toUpperCase() : "?"}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-dugout-white mb-1">
                {userName || "Guest User"}
              </h1>
              <p className="text-dugout-beige/80 mb-2">@{userName?.toLowerCase().replace(/\s+/g, '_') || "guest"}</p>
              {userBirthDate && (
                <p className="text-dugout-beige/60 text-sm mb-4">
                  Born {userBirthDate}
                </p>
              )}

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1 text-sm border-dugout-beige/20 text-dugout-beige hover:bg-dugout-beige/10 hover:text-dugout-white">
                  Edit Profile
                </Button>
                <Link href="/subscription" className="flex-1">
                  <Button variant="default" className="w-full text-sm bg-dugout-red hover:bg-dugout-red/90 text-dugout-white">
                    Upgrade to Pro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="bg-dugout-navy rounded-lg border border-dugout-beige/20 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-dugout-white">Subscription Status</h3>
            <Link href="/subscription">
              <Button variant="outline" size="sm" className="flex items-center border-dugout-beige/20 text-dugout-beige hover:bg-dugout-beige/10 hover:text-dugout-white">
                Manage
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-dugout-navy/50 rounded-lg border border-dugout-beige/20">
              <div className="flex items-center">
                <img
                  src="/images/doosan-bears.png"
                  alt="Kim Gwang-hyun"
                  className="w-10 h-10 rounded-full mr-3 border border-dugout-navy"
                />
                <div>
                  <p className="font-medium text-dugout-white">Kim Gwang-hyun</p>
                  <p className="text-xs text-dugout-beige">Quarterly • Level 2</p>
                </div>
              </div>
              <Badge className="bg-dugout-red/10 text-dugout-red border-dugout-red/20">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-dugout-navy/50 rounded-lg border border-dugout-beige/20">
              <div className="flex items-center">
                <img
                  src="/images/lg-twins.png"
                  alt="Yang Eui-ji"
                  className="w-10 h-10 rounded-full mr-3 border border-dugout-navy"
                />
                <div>
                  <p className="font-medium text-dugout-white">Yang Eui-ji</p>
                  <p className="text-xs text-dugout-beige">Quarterly • Level 3</p>
                </div>
              </div>
              <Badge className="bg-dugout-red/10 text-dugout-red border-dugout-red/20">Active</Badge>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-dugout-navy border border-dugout-beige/20">
            <TabsTrigger 
              value="posts" 
              className="data-[state=active]:bg-dugout-red/10 data-[state=active]:text-dugout-red"
            >
              My Posts
            </TabsTrigger>
            <TabsTrigger 
              value="favorites"
              className="data-[state=active]:bg-dugout-red/10 data-[state=active]:text-dugout-red"
            >
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="aspect-square relative bg-dugout-navy/50 rounded-sm overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=150&width=150&text=Post${i}`}
                    alt={`Post ${i}`}
                    className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="aspect-square relative bg-dugout-navy/50 rounded-sm overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=150&width=150&text=Fav${i}`}
                    alt={`Favorite ${i}`}
                    className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
