"use client"

import { useState, useRef } from "react"
import { Camera, Upload, X } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState("record")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)

    // Simulate recording time increase
    recordingTimeoutRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 60) {
          handleStopRecording()
          return 60
        }
        return prev + 1
      })
    }, 1000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    if (recordingTimeoutRef.current) {
      clearInterval(recordingTimeoutRef.current)
    }
    // Simulate recorded video preview
    setPreviewUrl("/placeholder.svg?height=800&width=450&text=Recorded+Video")
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleClearPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <AppLayout headerTitle="새 콘텐츠 만들기 (Create)">
      <div className="max-w-md mx-auto px-4 py-6">
        {!previewUrl ? (
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-dugout-navy border border-dugout-beige/20">
              <TabsTrigger 
                value="record"
                className="data-[state=active]:bg-dugout-beige/10"
              >
                녹화 (Record)
              </TabsTrigger>
              <TabsTrigger 
                value="upload"
                className="data-[state=active]:bg-dugout-beige/10"
              >
                업로드 (Upload)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="record" className="mt-6">
              <div className="aspect-[9/16] bg-dugout-navy rounded-lg border border-dugout-beige/20 flex items-center justify-center relative">
                {isRecording ? (
                  <div className="absolute top-4 right-4 bg-dugout-red px-2 py-1 rounded-full flex items-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse mr-1"></div>
                    <span className="text-xs text-white">{formatTime(recordingTime)}</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="h-16 w-16 mx-auto text-dugout-beige mb-4" />
                    <p className="text-dugout-beige">녹화 버튼을 눌러 시작하세요</p>
                    <p className="text-dugout-beige/50 text-sm">(Press record to start)</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  className={`w-16 h-16 rounded-full ${
                    isRecording 
                      ? "bg-dugout-beige hover:bg-dugout-beige/90" 
                      : "bg-dugout-red hover:bg-dugout-red/90"
                  } flex items-center justify-center`}
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                >
                  <div className={`${isRecording ? "w-6 h-6 bg-dugout-navy rounded" : "w-6 h-6 rounded-full bg-white"}`}></div>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="mt-6">
              <div
                className="aspect-[9/16] bg-dugout-navy rounded-lg border border-dugout-beige/20 flex items-center justify-center cursor-pointer hover:bg-dugout-beige/10 transition-colors"
                onClick={handleUploadClick}
              >
                <div className="text-center">
                  <Upload className="h-16 w-16 mx-auto text-dugout-beige mb-4" />
                  <p className="text-dugout-beige">갤러리에서 선택하기</p>
                  <p className="text-dugout-beige/50 text-sm">(Select from gallery)</p>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="video/*,image/*"
                  onChange={handleFileSelect}
                />
              </div>

              <div className="mt-6">
                <p className="text-sm text-dugout-beige/50">지원 형식: MP4, MOV, JPG, PNG</p>
                <p className="text-sm text-dugout-beige/50">최대 길이: 60초</p>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="relative">
            <div className="aspect-[9/16] bg-dugout-navy rounded-lg border border-dugout-beige/20 overflow-hidden">
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={450}
                  height={800}
                  className="w-full h-full object-cover"
                />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-dugout-navy/80 text-dugout-beige hover:text-dugout-white hover:bg-dugout-navy"
                onClick={handleClearPreview}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
