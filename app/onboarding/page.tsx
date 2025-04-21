"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AppLayout } from "@/components/app-layout"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { CircleDot, ChevronRight, Mail, Star, Users, Trophy, Activity } from "lucide-react"
import { Input } from "@/components/ui/input"

const TEAMS = [
  { id: "doosan", name: "Doosan Bears", logo: "/images/teams/doosan-bears.png" },
  { id: "lg", name: "LG Twins", logo: "/images/teams/lg-twins.png" },
  { id: "kia", name: "KIA Tigers", logo: "/images/teams/kia-tigers.png" },
  { id: "samsung", name: "Samsung Lions", logo: "/images/teams/samsung-lions.png" },
]

const LOGIN_OPTIONS = [
  { 
    id: "kakao", 
    name: "Continue with KakaoTalk", 
    color: "#FEE500", 
    textColor: "#000000",
    icon: "/images/kakao-logo.svg"
  },
  { 
    id: "google", 
    name: "Continue with Google", 
    color: "#FFFFFF", 
    textColor: "#000000",
    icon: "/images/google-logo.svg"
  },
  { 
    id: "email", 
    name: "Continue with Email", 
    color: "#4A5568", 
    textColor: "#FFFFFF",
    icon: Mail
  },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const floatingIcons = [
  { icon: Star, delay: 0, position: "top-20 left-10" },
  { icon: Trophy, delay: 0.2, position: "top-40 right-10" },
  { icon: Users, delay: 0.4, position: "bottom-40 left-20" },
  { icon: Activity, delay: 0.6, position: "bottom-20 right-20" },
]

export default function OnboardingPage() {
  const [step, setStep] = useState<'welcome' | 'login' | 'personal' | 'teams'>('welcome')
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "",
    birthMonth: "",
    birthDay: "",
    birthYear: ""
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTeam = (teamId: string) => {
    setSelectedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    )
  }

  const getStepNumber = () => {
    switch (step) {
      case 'welcome': return 1
      case 'login': return 2
      case 'personal': return 3
      case 'teams': return 4
    }
  }

  const renderProgressBar = () => (
    <div className="w-full max-w-xs mx-auto mb-8">
      <div className="relative pt-1">
        <div className="flex items-center justify-between">
          {['welcome', 'login', 'personal', 'teams'].map((s, i) => (
            <div 
              key={s} 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                getStepNumber() > i + 1 
                  ? 'bg-dugout-red' 
                  : getStepNumber() === i + 1 
                    ? 'bg-dugout-red' 
                    : 'bg-dugout-beige/20'
              }`}
            >
              {getStepNumber() > i + 1 ? (
                <ChevronRight className="w-5 h-5 text-white" />
              ) : (
                <span className="text-sm text-white">{i + 1}</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex-1 w-full bg-dugout-beige/20 h-2 absolute top-4 -z-10 rounded-full">
          <div 
            className="bg-dugout-red h-full rounded-full transition-all duration-300"
            style={{ width: `${((getStepNumber() - 1) / 3) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )

  const renderWelcome = () => (
    <motion.div 
      className="min-h-[80vh] relative flex flex-col items-center justify-center space-y-8 overflow-hidden"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-dugout-red/10 to-transparent" />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1.5, 
            opacity: 0.1,
            rotate: 360 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear" 
          }}
          style={{
            background: "radial-gradient(circle, var(--dugout-red) 0%, transparent 70%)"
          }}
        />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.position} text-dugout-beige/20`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            y: [0, -20, 0]
          }}
          transition={{
            delay: item.delay,
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <item.icon className="w-8 h-8" />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div 
        className="text-center space-y-8 relative z-10"
        variants={fadeIn}
      >
        {/* Logo Container */}
        <div className="relative">
          <motion.div 
            className="w-40 h-40 mx-auto relative"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/dugout-logo.svg"
              alt="DUGOUT"
              width={160}
              height={160}
              priority
              className="relative z-10"
            />
            <motion.div 
              className="absolute inset-0 bg-dugout-red/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>

          {/* Circular Text */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-[0_-120px] text-dugout-beige/30 text-sm"
                style={{
                  transform: `rotate(${i * (360 / 32)}deg) translateY(-120px)`
                }}
              >
                •
              </div>
            ))}
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <motion.h1 
            className="text-5xl font-bold text-dugout-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to{" "}
            <span className="text-dugout-red">DUGOUT</span>
          </motion.h1>
          <motion.p 
            className="text-dugout-beige text-lg max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your gateway to Korean baseball. Connect with players, share moments, and celebrate the game.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col items-center gap-6"
          variants={fadeIn}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            size="lg"
            className="bg-dugout-red text-dugout-white hover:bg-dugout-red/80 h-14 px-12 text-lg relative overflow-hidden group"
            onClick={() => setStep('login')}
          >
            <span className="relative z-10">Get Started</span>
            <motion.div 
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
              style={{ opacity: 0.2 }}
            />
          </Button>

          <div className="flex items-center gap-3 text-dugout-beige/60">
            <CircleDot className="w-4 h-4" />
            <span className="text-sm">Join thousands of baseball fans</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )

  const renderLogin = () => (
    <motion.div 
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="text-center space-y-4"
        variants={fadeIn}
      >
        <h1 className="text-4xl font-bold text-dugout-white">Choose how to continue</h1>
        <p className="text-dugout-beige text-lg">
          Select your preferred way to join DUGOUT
        </p>
      </motion.div>

      <motion.div 
        className="space-y-4"
        variants={staggerContainer}
      >
        {LOGIN_OPTIONS.map((option) => (
          <motion.div key={option.id} variants={fadeIn}>
            <Button 
              className="w-full h-14 text-base font-medium flex items-center gap-4 relative overflow-hidden group"
              style={{ 
                backgroundColor: option.color,
                color: option.textColor
              }}
              onClick={() => setStep('personal')}
            >
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {typeof option.icon === 'string' ? (
                <Image
                  src={option.icon}
                  alt={option.name}
                  width={24}
                  height={24}
                  className="flex-shrink-0"
                />
              ) : (
                <option.icon className="w-6 h-6 flex-shrink-0" />
              )}
              <span className="flex-1 text-center">{option.name}</span>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )

  const renderPersonalInfo = () => (
    <motion.div 
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="text-center space-y-4"
        variants={fadeIn}
      >
        <h1 className="text-4xl font-bold text-dugout-white">Tell us about you</h1>
        <p className="text-dugout-beige text-lg">
          Enter your name and birth date
        </p>
      </motion.div>

      <motion.div 
        className="space-y-6"
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn}>
          <label className="block text-sm font-medium text-dugout-beige mb-2">Name</label>
          <Input
            placeholder="Enter your name"
            className="bg-dugout-navy/30 border-dugout-beige/20 text-dugout-white placeholder:text-dugout-beige/50"
            value={userInfo.name}
            onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
          />
        </motion.div>

        <motion.div variants={fadeIn}>
          <label className="block text-sm font-medium text-dugout-beige mb-2">Birth Date</label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="MM"
                maxLength={2}
                className="bg-dugout-navy/30 border-dugout-beige/20 text-dugout-white placeholder:text-dugout-beige/50"
                value={userInfo.birthMonth}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 2)
                  if (parseInt(value) <= 12 || value === '')
                    setUserInfo(prev => ({ ...prev, birthMonth: value }))
                }}
              />
            </div>
            <div>
              <Input
                placeholder="DD"
                maxLength={2}
                className="bg-dugout-navy/30 border-dugout-beige/20 text-dugout-white placeholder:text-dugout-beige/50"
                value={userInfo.birthDay}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 2)
                  if (parseInt(value) <= 31 || value === '')
                    setUserInfo(prev => ({ ...prev, birthDay: value }))
                }}
              />
            </div>
            <div>
              <Input
                placeholder="YYYY"
                maxLength={4}
                className="bg-dugout-navy/30 border-dugout-beige/20 text-dugout-white placeholder:text-dugout-beige/50"
                value={userInfo.birthYear}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                  setUserInfo(prev => ({ ...prev, birthYear: value }))
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Button 
          className="w-full bg-dugout-red text-dugout-white hover:bg-dugout-red/80 h-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!userInfo.name || !userInfo.birthMonth || !userInfo.birthDay || !userInfo.birthYear}
          onClick={() => setStep('teams')}
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  )

  const renderTeamSelection = () => (
    <motion.div 
      className="space-y-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="text-center space-y-4"
        variants={fadeIn}
      >
        <h1 className="text-4xl font-bold text-dugout-white">Pick your teams</h1>
        <p className="text-dugout-beige text-lg">
          Select your favorite teams to get started
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={staggerContainer}
      >
        {TEAMS.map((team) => (
          <motion.div key={team.id} variants={fadeIn}>
            <Card 
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedTeams.includes(team.id)
                  ? "bg-dugout-red/10 border-dugout-red shadow-lg shadow-dugout-red/20"
                  : "bg-dugout-navy border-dugout-beige/20 hover:bg-dugout-navy/50"
              }`}
              onClick={() => toggleTeam(team.id)}
            >
              <CardContent className="p-6 flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-24 h-24 relative z-10"
                  />
                  {selectedTeams.includes(team.id) && (
                    <div className="absolute inset-0 bg-dugout-red/20 rounded-full blur-lg" />
                  )}
                </div>
                <h3 className="font-semibold text-dugout-white">{team.name}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="flex flex-col items-center gap-4"
        variants={fadeIn}
      >
        <Button 
          size="lg"
          className="w-full max-w-xs bg-dugout-red text-dugout-white hover:bg-dugout-red/80 h-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedTeams.length === 0}
          onClick={() => {
            // Store user info in localStorage
            localStorage.setItem("userName", userInfo.name)
            localStorage.setItem("userBirthDate", `${userInfo.birthMonth}/${userInfo.birthDay}/${userInfo.birthYear}`)
            localStorage.setItem("selectedTeams", JSON.stringify(selectedTeams))
            
            // Navigate to home page
            window.location.href = "/home"
          }}
        >
          Continue to Home
        </Button>

        <p className="text-center text-dugout-beige/60 text-sm flex items-center gap-2">
          <CircleDot className="w-4 h-4" />
          <span>You can always change your preferences later</span>
        </p>
      </motion.div>
    </motion.div>
  )

  if (!mounted) return null

  return (
    <AppLayout headerTitle={step === 'welcome' ? '' : 'DUGOUT'}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {step !== 'welcome' && renderProgressBar()}
        {step === 'welcome' && renderWelcome()}
        {step === 'login' && renderLogin()}
        {step === 'personal' && renderPersonalInfo()}
        {step === 'teams' && renderTeamSelection()}
      </div>
    </AppLayout>
  )
}
