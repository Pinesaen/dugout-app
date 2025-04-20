import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AppLayout } from "@/components/app-layout"
import Link from "next/link"

export default function ChatPage() {
  return (
    <AppLayout 
      headerTitle="Chat"
      rightAction={
        <Button variant="ghost" size="icon" className="text-dugout-beige hover:text-dugout-white">
          <Bell className="h-5 w-5" />
        </Button>
      }
    >
      <div className="max-w-2xl mx-auto px-4 py-4">
        <Tabs defaultValue="athletes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-dugout-navy border border-dugout-beige/20">
            <TabsTrigger 
              value="athletes" 
              className="data-[state=active]:bg-dugout-red/10 data-[state=active]:text-dugout-red"
            >
              Athletes
            </TabsTrigger>
            <TabsTrigger 
              value="teams"
              className="data-[state=active]:bg-dugout-red/10 data-[state=active]:text-dugout-red"
            >
              Teams & Groups
            </TabsTrigger>
          </TabsList>

          <TabsContent value="athletes" className="space-y-4">
            <div className="bg-dugout-navy/50 border border-dugout-beige/20 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-dugout-white mb-2">Channel Types</h3>
              <div className="flex flex-col space-y-2 text-sm">
                <div className="flex items-start">
                  <Badge variant="outline" className="mr-2 bg-dugout-red/10 text-dugout-red border-dugout-red/20 mt-0.5">
                    Basic
                  </Badge>
                  <p className="text-dugout-beige">
                    Observe athlete's daily routine and react with emojis only
                  </p>
                </div>
                <div className="flex items-start">
                  <Badge variant="outline" className="mr-2 bg-dugout-blue/10 text-dugout-blue border-dugout-blue/20 mt-0.5">
                    Premium
                  </Badge>
                  <p className="text-dugout-beige">
                    Exchange direct messages with athletes
                  </p>
                </div>
              </div>
            </div>

            <ChatPreview
              name="Kim Gwang-hyun"
              avatar="/images/teams/doosan-bears.png"
              lastMessage="Today's training is done! Ready for tomorrow's game."
              time="2h ago"
              isVerified={true}
              isPro={true}
              channelType="basic"
              emojiStats={[
                { emoji: "👏", count: 1243 },
                { emoji: "💪", count: 876 },
                { emoji: "❤️", count: 2105 },
              ]}
              href="/chat/conversation/basic"
            />

            <ChatPreview
              name="Yang Eui-ji"
              avatar="/images/teams/lg-twins.png"
              lastMessage="Thank you for your support. I'll do my best in today's game!"
              time="1d ago"
              isVerified={true}
              isPro={true}
              channelType="premium"
              userLevel={2}
              messageStatus="read"
              href="/chat/conversation/premium"
            />

            <ChatPreview
              name="Lee Jung-hoo"
              avatar="/images/teams/kiwoom-heroes.png"
              lastMessage="Subscribe to chat with Lee Jung-hoo"
              time=""
              isVerified={true}
              isPro={false}
              href="#"
            />

            <ChatPreview
              name="Park Chan-ho"
              avatar="/images/teams/hanwha-eagles.png"
              lastMessage="Thanks for all the reactions! Let's keep the energy high!"
              time="30m ago"
              isVerified={true}
              isPro={true}
              channelType="basic"
              emojiStats={[
                { emoji: "🔥", count: 789 },
                { emoji: "👊", count: 456 },
                { emoji: "🙌", count: 1023 },
              ]}
              href="/chat/conversation/basic"
            />
          </TabsContent>

          <TabsContent value="teams" className="space-y-4">
            <ChatPreview
              name="Doosan Bears Fan Club"
              avatar="/images/teams/doosan-bears.png"
              lastMessage="The game starts in 2 hours! Who's watching?"
              time="2h ago"
              isVerified={false}
              isPro={true}
              channelType="basic"
              members={1243}
              href="/chat/conversation/basic"
            />

            <ChatPreview
              name="Baseball Stats Group"
              avatar="/images/icons/stats-icon.png"
              lastMessage="Check out these amazing stats from yesterday's game!"
              time="5h ago"
              isVerified={false}
              isPro={true}
              channelType="basic"
              members={567}
              href="/chat/conversation/basic"
            />

            <ChatPreview
              name="KBO News"
              avatar="/images/icons/kbo-logo.png"
              lastMessage="Breaking: Trade deadline updates and analysis"
              time="1d ago"
              isVerified={true}
              isPro={true}
              channelType="basic"
              members={8976}
              href="/chat/conversation/basic"
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

interface ChatPreviewProps {
  name: string
  avatar: string
  lastMessage: string
  time: string
  isVerified: boolean
  isPro: boolean
  channelType?: "basic" | "premium"
  members?: number
  emojiStats?: { emoji: string; count: number }[]
  userLevel?: number
  messageStatus?: "read" | "unread"
  href: string
}

function ChatPreview({
  name,
  avatar,
  lastMessage,
  time,
  isVerified,
  isPro,
  channelType,
  members,
  emojiStats,
  userLevel,
  messageStatus,
  href,
}: ChatPreviewProps) {
  return (
    <Link
      href={isPro ? href : "#"}
      className={`flex items-center p-3 rounded-lg ${
        isPro ? "bg-dugout-navy border border-dugout-beige/20 hover:bg-dugout-navy/50" : "bg-dugout-navy/30"
      } transition-colors`}
    >
      <div className="relative">
        <img src={avatar || "/placeholder.svg"} alt={name} className="w-12 h-12 rounded-full mr-3" />
        {isVerified && (
          <div className="absolute bottom-0 right-2 bg-dugout-red rounded-full w-4 h-4 flex items-center justify-center border-2 border-dugout-navy">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-dugout-white truncate">{name}</h3>
          {time && <span className="text-xs text-dugout-beige">{time}</span>}
        </div>
        <p className="text-sm text-dugout-beige/80 truncate">{lastMessage}</p>
        {members && (
          <div className="flex items-center mt-1">
            <span className="text-xs text-dugout-beige">{members.toLocaleString()} members</span>
          </div>
        )}
        {emojiStats && (
          <div className="flex items-center space-x-2 mt-1">
            {emojiStats.map((stat, index) => (
              <span key={index} className="text-xs text-dugout-beige">
                {stat.emoji} {stat.count.toLocaleString()}
              </span>
            ))}
          </div>
        )}
        {userLevel && (
          <div className="flex items-center mt-1">
            <Badge variant="outline" className="text-xs bg-dugout-blue/10 text-dugout-blue border-dugout-blue/20">
              Level {userLevel}
            </Badge>
          </div>
        )}
      </div>
    </Link>
  )
}
