"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppLayout } from "@/components/app-layout"
import Link from "next/link"

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

export default function PremiumConversationPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "athlete",
      content: "Thanks for joining my premium channel! As a catcher, I'm always happy to share insights about the game. What would you like to know about baseball strategy? 🎯⚾",
      timestamp: "10:30 AM",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [userLevel, setUserLevel] = useState(2)
  const [characterLimit, setCharacterLimit] = useState(40)
  const [repliesLeft, setRepliesLeft] = useState(3)
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
  const [emojiCounts, setEmojiCounts] = useState<EmojiCounts>({
    "👏": 1243,
    "💪": 876,
    "❤️": 2105,
    "🙏": 543,
    "🔥": 789,
    "😮": 321,
    "😢": 156,
    "🏆": 432,
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [showChannelInfo, setShowChannelInfo] = useState(false)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || repliesLeft <= 0) return

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
          content: "Thank you for your message! I'll do my best to show a great performance in the next game. Keep supporting me!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        setMessages((prev) => [...prev, response])
        setRepliesLeft(3) // Reset replies when athlete responds
      }, 2000)
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji)
    setEmojiCounts((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }))

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
                      <AvatarImage src="/images/teams/lg-twins.png" alt="Yang Eui-ji" />
                      <AvatarFallback>YE</AvatarFallback>
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

        <div className="border-t border-dugout-beige/20 bg-dugout-navy/50 p-4">
          <div className="mb-4">
            <Tabs defaultValue="message" className="w-full">
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

          <div className="grid grid-cols-4 gap-3">
            {Object.entries(emojiCounts).map(([emoji, count]) => (
              <Button
                key={emoji}
                variant="outline"
                className="flex h-16 w-full flex-col items-center justify-center gap-1 border-dugout-beige/20 bg-transparent p-2 text-dugout-beige hover:bg-dugout-beige/10"
                onClick={() => handleEmojiSelect(emoji)}
              >
                <span className="text-2xl leading-none">{emoji}</span>
                <span className="text-xs font-medium">{count.toLocaleString()}</span>
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
      </div>
    </AppLayout>
  )
} 