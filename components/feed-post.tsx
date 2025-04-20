"use client"

import { Heart, MessageCircle, Share2, Image as ImageIcon, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface FeedPostProps {
  username: string
  isVerified: boolean
  avatar: string
  timestamp: string
  content: string
  image?: string
  likes: number
  comments: number
  tags?: string[]
}

export default function FeedPost({
  username,
  isVerified,
  avatar,
  timestamp,
  content,
  image,
  likes: initialLikes,
  comments,
  tags = [],
}: FeedPostProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikes)
  const [saved, setSaved] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div className="bg-dugout-navy/30 rounded-xl border border-dugout-beige/10 overflow-hidden transition-all hover:bg-dugout-navy/40">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="w-11 h-11 rounded-full bg-dugout-navy/30 p-0.5 mr-3">
            <Image 
              src={avatar} 
              alt={username} 
              width={44} 
              height={44} 
              className="rounded-full" 
            />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-heading font-bold text-dugout-white">{username}</h3>
              {isVerified && (
                <Badge variant="outline" className="ml-1.5 bg-dugout-red/10 text-dugout-red border-dugout-red/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Badge>
              )}
            </div>
            <p className="text-dugout-beige/80 text-sm">{timestamp}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className={`text-dugout-beige hover:text-dugout-white ${saved ? 'text-dugout-blue' : ''}`}
          onClick={() => setSaved(!saved)}
        >
          <Bookmark className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-dugout-white whitespace-pre-line">{content}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span key={tag} className="text-dugout-blue hover:text-dugout-blue/80 text-sm cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Image or Placeholder */}
      {image ? (
        <div className="relative w-full aspect-video bg-dugout-navy/30">
          <Image 
            src={image} 
            alt="Post content" 
            fill
            className="object-cover hover:opacity-95 transition-opacity"
          />
        </div>
      ) : (
        <div className="relative w-full aspect-video bg-dugout-navy/30">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-dugout-navy/50 to-dugout-blue/30 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-dugout-beige/50" />
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-dugout-beige/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-1.5 hover:bg-dugout-red/10 ${
                liked ? "text-dugout-red" : "text-dugout-beige hover:text-dugout-red"
              }`}
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
              <span className="font-medium">{likeCount.toLocaleString()}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-1.5 text-dugout-beige hover:text-dugout-blue hover:bg-dugout-blue/10"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">{comments.toLocaleString()}</span>
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-dugout-beige hover:text-dugout-white hover:bg-dugout-beige/10"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
