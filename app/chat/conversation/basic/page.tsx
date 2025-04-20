"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppLayout } from "@/components/app-layout"
import Link from "next/link"

type Message = {
  id: number
  sender: "athlete" | "system"
  content: string
  timestamp: string
  media?: string
}

type EmojiCounts = {
  [key: string]: number
}

export default function BasicConversationPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "athlete",
      content: "Just finished today's bullpen session. My fastball is looking sharp for tomorrow's game! 🎯",
      timestamp: "10:30 AM",
      media: "/images/content/bullpen-training.jpg",
    },
  ])

  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
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
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

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
                  className="flex justify-start items-start gap-2"
                >
                  {message.sender === "athlete" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/images/teams/doosan-bears.png" alt="Kim Gwang-hyun" />
                      <AvatarFallback>KG</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "system"
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
        </div>
      </div>
    </AppLayout>
  )
} 