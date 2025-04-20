"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Info, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AppLayout } from "@/components/app-layout"

type Message = {
  id: number
  sender: "user" | "athlete" | "system"
  content: string
  timestamp: string
  media?: string
}

type EmojiCounts = {
  [key: string]: number
}

export default function ConversationPage() {
  const [channelType, setChannelType] = useState<"basic" | "premium">("basic")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "athlete",
      content: "Today's training is done! Ready for tomorrow's game.",
      timestamp: "10:30 AM",
      media: "/placeholder.svg?height=200&width=350&text=Training+Photo",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [userLevel, setUserLevel] = useState(1)
  const [characterLimit, setCharacterLimit] = useState(30)
  const [repliesLeft, setRepliesLeft] = useState(3)
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState<"active" | "inactive" | "expired">("active")
  const [emojiCounts, setEmojiCounts] = useState<EmojiCounts>({
    "👏": 1243, // Cheer/Applause
    "💪": 876, // Motivation
    "❤️": 2105, // Admiration
    "🙏": 543, // Gratitude
    "🔥": 789, // Praise
    "😮": 321, // Surprise
    "😢": 156, // Touched
    "🏆": 432, // Proud
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [showChannelInfo, setShowChannelInfo] = useState(false)

  useEffect(() => {
    // Set character limit based on user level
    switch (userLevel) {
      case 1:
        setCharacterLimit(30)
        break
      case 2:
        setCharacterLimit(40)
        break
      case 3:
        setCharacterLimit(50)
        break
      default:
        setCharacterLimit(30)
    }
  }, [userLevel])

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || repliesLeft <= 0 || subscriptionStatus !== "active") return

    const message: Message = {
      id: messages.length + 1,
      sender: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")
    setRepliesLeft(repliesLeft - 1)

    // Simulate athlete response after a delay
    if (repliesLeft === 1) {
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          sender: "athlete",
          content: "Thank you for your support! I'll show you a good performance in tomorrow's game. Please cheer for me!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        setMessages((prev) => [...prev, response])
        // Reset replies left when athlete sends a new message
        setRepliesLeft(3)
      }, 2000)
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji)
    // Update emoji count
    setEmojiCounts((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }))

    // Show feedback message
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        sender: "system",
        content: `You sent a ${emoji} reaction!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, response])
    }, 500)
  }

  return (
    <AppLayout
      headerTitle="Chat"
      leftAction={
        <Link href="/chat">
          <Button
            variant="ghost"
            size="icon"
            className="text-dugout-beige hover:text-dugout-white"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Chat</span>
          </Button>
        </Link>
      }
      rightAction={
        <Button
          variant="ghost"
          size="icon"
          className="text-dugout-beige hover:text-dugout-white"
          onClick={() => setShowChannelInfo(true)}
        >
          <Info className="h-5 w-5" />
          <span className="sr-only">Channel Information</span>
        </Button>
      }
    >
      <div className="flex h-[calc(100vh-4rem)] flex-col bg-dugout-navy">
        <div className="flex-1 overflow-hidden">
          <ScrollArea ref={scrollAreaRef} className="h-full">
            <div className="flex flex-col gap-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } items-start gap-2`}
                >
                  {message.sender === "athlete" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>AT</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-dugout-red text-dugout-white"
                        : message.sender === "system"
                        ? "bg-dugout-beige/20 text-dugout-beige"
                        : "bg-dugout-beige/20 text-dugout-white"
                    }`}
                  >
                    {message.content}
                    {message.media && (
                      <img
                        src={message.media}
                        alt="Media content"
                        className="mt-2 rounded-lg"
                        width={350}
                        height={200}
                      />
                    )}
                    <div className="mt-1 text-xs opacity-70">{message.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {channelType === "premium" ? (
          <div className="border-t border-dugout-beige/20 bg-dugout-navy/50 p-4">
            <div className="mb-4">
              <Tabs defaultValue="emoji" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-dugout-beige/10">
                  <TabsTrigger value="emoji" className="data-[state=active]:bg-dugout-red">
                    Reactions
                  </TabsTrigger>
                  <TabsTrigger value="message" className="data-[state=active]:bg-dugout-red">
                    Message
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {Object.entries(emojiCounts).map(([emoji, count]) => (
                <Button
                  key={emoji}
                  variant="outline"
                  className="flex flex-col items-center border-dugout-beige/20 bg-transparent text-dugout-beige hover:bg-dugout-beige/10"
                  onClick={() => handleEmojiSelect(emoji)}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-xs">{count}</span>
                </Button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                maxLength={characterLimit}
                className="bg-dugout-beige/10 text-dugout-white placeholder:text-dugout-beige/50"
              />
              <Button
                onClick={handleSendMessage}
                disabled={newMessage.trim() === "" || repliesLeft <= 0}
                className="bg-dugout-red text-dugout-white hover:bg-dugout-red/80"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-dugout-beige/70">
              <span>{`${newMessage.length}/${characterLimit} characters`}</span>
              <span>{`${repliesLeft} ${repliesLeft === 1 ? "reply" : "replies"} left`}</span>
            </div>
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex cursor-pointer items-center justify-center gap-2 border-t border-dugout-beige/20 bg-dugout-navy/50 p-4 text-dugout-beige hover:bg-dugout-beige/10">
                <Lock className="h-5 w-5" />
                <span>Subscribe to Premium to chat with athletes</span>
              </div>
            </DialogTrigger>
            <DialogContent className="bg-dugout-navy text-dugout-white">
              <DialogHeader>
                <DialogTitle>Premium Channel Access</DialogTitle>
                <DialogDescription className="text-dugout-beige">
                  Subscribe to unlock premium features and chat directly with athletes.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="rounded-lg border border-dugout-beige/20 p-4">
                  <h4 className="mb-2 font-semibold text-dugout-white">Premium Features</h4>
                  <ul className="space-y-2 text-sm text-dugout-beige">
                    <li>• Direct messaging with athletes</li>
                    <li>• Exclusive content and updates</li>
                    <li>• Priority access to events</li>
                    <li>• Ad-free experience</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-dugout-beige/20 p-4">
                  <h4 className="mb-2 font-semibold text-dugout-white">Subscription Plans</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-dugout-beige">Monthly</span>
                      <Badge variant="secondary" className="bg-dugout-red text-dugout-white">
                        ₩15,000/month
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-dugout-beige">Annual</span>
                      <Badge variant="secondary" className="bg-dugout-red text-dugout-white">
                        ₩150,000/year
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full bg-dugout-red text-dugout-white hover:bg-dugout-red/80">
                  Subscribe Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AppLayout>
  )
}
