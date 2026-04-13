"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Linkedin,
  Github,
  Mail,
  Phone,
  Code,
  Brain,
  Server,
  TrendingUp,
  GraduationCap,
  MapPin,
  Calendar,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react"

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const cursorRef = useRef(null)
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  }

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      for (const section in sectionRefs) {
        const element = sectionRefs[section as keyof typeof sectionRefs].current as HTMLElement | null
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const skills = [
    { name: "Python", level: 90, category: "Language" },
    { name: "JavaScript", level: 88, category: "Language" },
    { name: "React.js", level: 92, category: "Frontend" },
    { name: "Node.js/Express", level: 90, category: "Backend" },
    { name: "Next.js", level: 88, category: "Frontend" },
    { name: "FastAPI", level: 85, category: "Backend" },
    { name: "MongoDB", level: 87, category: "Database" },
    { name: "Docker", level: 85, category: "Tools" },
    { name: "REST APIs", level: 90, category: "Backend" },
    { name: "LLMs/RAG", level: 88, category: "AI" },
    { name: "Git/GitHub", level: 90, category: "Tools" },
    { name: "SQL", level: 85, category: "Database" },
  ]

  const projects = [
    {
      title: "Food Rescue Chain",
      description:
        "Production-grade, real-time food redistribution platform connecting surplus food donors with NGOs within a 5km radius. Features live geo-matching via Leaflet.js, instant Socket.io notifications, role-based verification flows, and atomic claim locking.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Leaflet.js", "JWT", "Cloudinary"],
      image: "/images/food-rescue-network.png",
      github: "https://github.com/Dipak-coder-06/Food-Rescue-Chain",
    },
    {
      title: "Scan My Notes — AI Knowledge Retrieval",
      description:
        "Privacy-first document intelligence system for handwritten and typed notes. Implements a full RAG pipeline with Hybrid Search (BM25 + Semantic + RRF), spatial citations, 0–100% confidence scoring, hallucination suppression, MCQ quiz generation, and PDF export.",
      tech: ["Python", "Streamlit", "Ollama", "ChromaDB", "Google Vision OCR", "RAG", "BM25"],
      image: "/images/scan-my-notes.png",
      github: "https://github.com/Dipak-coder-06/Scan-my-notes",
    },
    {
      title: "AI Financial Manager",
      description:
        "AI-powered financial analysis dashboard delivering high-impact insights using Google Gemini 2.0 Flash. Features a composite 0–100 health score, automated risk quadrant categorization, interactive Plotly charts for budget tracking, and instant PDF report generation.",
      tech: ["Python", "Streamlit", "Google Gemini 2.0", "Plotly", "FPDF2"],
      image: "/images/ai-financial-manager.png",
      github: "https://github.com/Dipak-coder-06/AI-Financial-Manager-",
    },
    {
      title: "Diplomate — EdTech Platform",
      description:
        "Full-stack MERN platform for educators to upload videos, sell courses, and manage lectures — with an integrated AI chatbot for instant student query resolution and seamless course monetization.",
      tech: ["React", "Node.js", "Express", "MongoDB", "AI Chatbot", "JWT"],
      image: "/images/diplomate-platform.png",
      github: "https://github.com/Dipak-coder-06/Diplomate",
    },
    {
      title: "Study Planner — IV Semester",
      description:
        "Smart semester study planner tailored for college exam preparation. Helps students organize subjects, track study sessions, and plan revision schedules efficiently with a clean, intuitive interface.",
      tech: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
      image: "/images/study-planner.png",
      github: "https://github.com/Dipak-coder-06/StudyPlannerIVsem",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
    },
    button: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: "rgba(147, 51, 234, 0.3)",
      mixBlendMode: "difference" as const,
    },
    text: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      height: 150,
      width: 150,
      backgroundColor: "rgba(147, 51, 234, 0.1)",
      mixBlendMode: "difference" as const,
    },
  }

  const enterButton = () => setCursorVariant("button")
  const enterText = () => setCursorVariant("text")
  const leaveButton = () => setCursorVariant("default")
  const leaveText = () => setCursorVariant("default")

  const navItems = ["home", "about", "skills", "projects", "contact"]

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  }

  // Safe window dimensions for SSR
  const [windowSize, setWindowSize] = useState({ width: 1280, height: 800 })
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 1], opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 animate-spin opacity-75"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Code className="w-10 h-10 text-white" />
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute mt-32 text-white/60 text-sm tracking-widest uppercase"
        >
          Loading Portfolio...
        </motion.p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      {/* Custom Cursor */}
      {isMounted && (
        <motion.div
          ref={cursorRef}
          className="fixed top-0 left-0 w-8 h-8 rounded-full bg-purple-500 mix-blend-difference pointer-events-none z-50 hidden md:block"
          variants={cursorVariants}
          animate={cursorVariant}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      )}

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-40 bg-black/30 backdrop-blur-xl border-b border-white/10"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
            >
              Dipak Pote
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  whileHover={{ scale: 1.1 }}
                  className={`capitalize ${
                    activeSection === item ? "text-white font-medium" : "text-white/60 hover:text-white"
                  } transition-colors`}
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      layoutId="activeSection"
                      className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-1 rounded-full"
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 rounded-full bg-white/5 backdrop-blur-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 space-y-4 overflow-hidden"
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`block py-2 capitalize ${
                      activeSection === item
                        ? "text-white font-medium border-l-2 border-purple-500 pl-4"
                        : "text-white/60 hover:text-white pl-4"
                    } transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Floating Navigation Indicator */}
      <div className="fixed right-10 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block">
        <div className="flex flex-col items-center space-y-6">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} className="group relative">
              <div
                className={`w-3 h-3 rounded-full ${
                  activeSection === item ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-white/20"
                } transition-all duration-300`}
              />
              <span className="absolute left-0 transform -translate-x-full -translate-y-1/2 top-1/2 pr-4 opacity-0 group-hover:opacity-100 text-white text-sm capitalize transition-opacity">
                {item}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="home"
        ref={sectionRefs.home}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-12"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),rgba(0,0,0,0)_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.15),rgba(0,0,0,0)_50%)]" />
        </div>

        {/* Animated Particles — safely using state-derived window dimensions */}
        {isMounted && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-white/20"
                initial={{
                  x: Math.random() * windowSize.width,
                  y: Math.random() * windowSize.height,
                }}
                animate={{
                  x: Math.random() * windowSize.width,
                  y: Math.random() * windowSize.height,
                }}
                transition={{
                  duration: Math.random() * 10 + 20,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        )}

        <div className="text-center z-10 px-4 w-full mx-auto">


          {/* Animated text for "Software Developer" */}
          <div className="[overflow-y:hidden] mb-6">
            <motion.h1
              className="font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent inline-block whitespace-nowrap"
              style={{ fontSize: "clamp(1.4rem, 7vw, 5rem)" }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              onMouseEnter={enterText}
              onMouseLeave={leaveText}
            >
              {"Software Developer".split("").map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>


          <motion.p
            className="text-sm sm:text-base md:text-xl text-white/80 mb-4 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            onMouseEnter={enterText}
            onMouseLeave={leaveText}
          >
            {"Full-stack development with hands-on experience in backend engineering and AI-powered applications.".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.p
            className="text-sm sm:text-base md:text-xl text-white/80 mb-6 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            onMouseEnter={enterText}
            onMouseLeave={leaveText}
          >
            {"Building scalable systems, REST APIs, LLM-powered applications, and solving real-world engineering problems."
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  className="inline-block mr-1"
                >
                  {word}
                </motion.span>
              ))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
              {["Python", "JavaScript", "React", "Node.js", "MongoDB", "Docker", "LLMs", "FastAPI"].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 border border-white/20"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.0 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(147, 51, 234, 0.3)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="#projects">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 border-0 relative group overflow-hidden text-white font-semibold shadow-2xl"
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                >
                  <span className="relative z-10 flex items-center font-medium">
                    View My Work
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </motion.div>
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </a>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-semibold shadow-lg hover:border-white/50 transition-all duration-300 bg-transparent"
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                >
                  <span className="font-medium">Contact Me</span>
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="mt-12"
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown className="w-8 h-8 text-white/60 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={sectionRefs.about} className="py-16 md:py-32 px-4 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(147,51,234,0.15),rgba(0,0,0,0)_50%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              onMouseEnter={enterText}
              onMouseLeave={leaveText}
            >
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-md relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-white flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-purple-400" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/80 relative">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-white">B.Tech - Information Technology</h3>
                      <p className="text-purple-300">Vishwakarma Institute of Technology</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          2025 - Present
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Pune, India
                        </span>
                      </div>
                      <p className="text-white/60 text-sm mt-2">CGPA: 9.43</p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <h3 className="font-semibold text-lg text-white">Diploma - Computer Engineering</h3>
                      <p className="text-purple-300">Government Polytechnic</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          2022 - 2025
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Pune, India
                        </span>
                      </div>
                      <p className="text-white/60 text-sm mt-2">Score: 92.13%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { value: "5+", label: "Projects Built" },
                  { value: "12+", label: "Technical Skills" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="text-center p-4 bg-white/5 rounded-lg border border-white/10 relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                    <div className="relative">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-white/60">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="relative" onMouseEnter={enterText} onMouseLeave={leaveText}>
                <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed">
                  I'm a software developer with hands-on experience in full-stack development and backend engineering. Currently pursuing B.Tech in Information Technology at Vishwakarma Institute of Technology, I've completed internships and built several production-ready applications.
                </p>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent my-6 opacity-50"></div>

                <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed">
                  My expertise includes Python, JavaScript, MERN stack, REST APIs, Docker containerization, and AI systems using LLMs and RAG. I'm passionate about designing scalable backend systems, solving real-world engineering problems, and continuously learning new technologies.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-6">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="p-5 rounded-lg bg-gradient-to-br from-purple-900/40 to-cyan-900/40 backdrop-blur-sm border border-white/5"
                >
                  <Server className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="text-lg font-medium text-white mb-2">Backend Systems</h3>
                  <p className="text-white/70 text-sm">
                    Building scalable REST APIs and robust backend architectures with databases.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="p-5 rounded-lg bg-gradient-to-br from-cyan-900/40 to-purple-900/40 backdrop-blur-sm border border-white/5"
                >
                  <Brain className="w-8 h-8 text-cyan-400 mb-3" />
                  <h3 className="text-lg font-medium text-white mb-2">AI Applications</h3>
                  <p className="text-white/70 text-sm">Implementing LLMs, RAG systems, and intelligent document processing.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={sectionRefs.skills} className="py-16 md:py-32 px-4 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(45,212,191,0.15),rgba(0,0,0,0)_50%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              onMouseEnter={enterText}
              onMouseLeave={leaveText}
            >
              Skills &amp; Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="mb-20">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-white/5 backdrop-blur-md border border-white/10 flex-wrap h-auto">
                  {[
                    { value: "all", label: "All Skills" },
                    { value: "frontend", label: "Frontend" },
                    { value: "backend", label: "Backend" },
                    { value: "tools", label: "Tools & AI" },
                  ].map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {[
                { value: "all", filter: () => true },
                { value: "frontend", filter: (s: typeof skills[0]) => s.category === "Frontend" },
                { value: "backend", filter: (s: typeof skills[0]) => s.category === "Backend" || s.category === "Database" || s.category === "Language" },
                { value: "tools", filter: (s: typeof skills[0]) => s.category === "Tools" || s.category === "AI" },
              ].map(({ value, filter }) => (
                <TabsContent key={value} value={value} className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skills.filter(filter).map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-0 p-3 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">{skill.name}</span>
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white/80 border-0"
                          >
                            {skill.category}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: Code, title: "Full Stack Development", desc: "End-to-end web applications using MERN stack" },
              { icon: Server, title: "Backend Engineering", desc: "Scalable REST APIs and microservices" },
              { icon: Brain, title: "AI & LLM Systems", desc: "RAG pipelines and intelligent applications" },
              { icon: TrendingUp, title: "DevOps & Tools", desc: "Docker, Git, CI/CD workflows" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                <Card className="bg-white/5 border-white/10 backdrop-blur-md h-full relative">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={sectionRefs.projects} className="py-16 md:py-32 px-4 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.15),rgba(0,0,0,0)_50%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              onMouseEnter={enterText}
              onMouseLeave={leaveText}
            >
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden h-full relative flex flex-col">
                  <div className="relative overflow-hidden h-44 sm:h-56">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-base sm:text-xl font-bold text-white">{project.title}</h3>
                    </div>
                  </div>

                  <CardContent className="space-y-4 p-6 flex-1 flex flex-col">
                    <p className="text-white/90 flex-1 text-sm sm:text-base">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border-0 font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mt-2"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </motion.a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={sectionRefs.contact} className="py-16 md:py-32 px-4 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),rgba(0,0,0,0)_50%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              onMouseEnter={enterText}
              onMouseLeave={leaveText}
            >
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
            <p className="text-base md:text-xl text-white/80 mt-4 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's collaborate and create something amazing together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                { icon: Mail, label: "Email", value: "dppote37@gmail.com", href: "mailto:dppote37@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 9604276698", href: "tel:+919604276698" },
                { icon: MapPin, label: "Location", value: "Pune, India", href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.div key={label} whileHover={{ x: 5 }} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center relative group flex-shrink-0">
                    <Icon className="w-6 h-6 text-white relative z-10" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{label}</h3>
                    {href ? (
                      <a href={href} className="text-white/70 hover:text-purple-300 transition-colors">{value}</a>
                    ) : (
                      <p className="text-white/70">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <div className="flex gap-4 pt-4">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  href="https://www.linkedin.com/in/dipak-pote-9b8930307/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors relative group"
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                >
                  <Linkedin className="w-6 h-6 text-white relative z-10" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/50 to-cyan-500/50 blur opacity-0 group-hover:opacity-70 transition-opacity"></div>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href="https://github.com/Dipak-coder-06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors relative group"
                  onMouseEnter={enterButton}
                  onMouseLeave={leaveButton}
                >
                  <Github className="w-6 h-6 text-white relative z-10" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600/50 to-purple-500/50 blur opacity-0 group-hover:opacity-70 transition-opacity"></div>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
              <Card className="bg-white/5 border-white/10 backdrop-blur-md relative">
                <CardContent className="p-6">
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.open('https://wa.me/919604276698', '_blank'); }}>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        onMouseEnter={enterText}
                        onMouseLeave={leaveText}
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        onMouseEnter={enterText}
                        onMouseLeave={leaveText}
                      />
                    </div>
                    <div className="relative">
                      <textarea
                        rows={5}
                        placeholder="Your Message"
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        onMouseEnter={enterText}
                        onMouseLeave={leaveText}
                      />
                    </div>
                    <Button
                      size="lg"
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 border-0 relative group overflow-hidden text-white font-semibold shadow-2xl w-full"
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      <span className="relative z-10 flex items-center justify-center font-medium">
                        Send Message
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </motion.div>
                      </span>
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-16 px-4 border-t border-white/10 relative bg-black/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(45,212,191,0.1),rgba(0,0,0,0)_70%)]" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mt-4">Dipak Pote</h3>
                <p className="text-white/60 mt-2">Software Developer | Full-Stack | AI Systems</p>
              </motion.div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item}>
                    <motion.a
                      href={`#${item}`}
                      whileHover={{ x: 5 }}
                      className="text-white/60 hover:text-white transition-colors capitalize"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Expertise</h4>
              <ul className="space-y-2">
                {["Full-Stack Development", "Backend Systems", "REST APIs", "AI & LLMs", "Docker & DevOps"].map((item) => (
                  <li key={item}>
                    <a href="#skills" className="text-white/60 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-white/60">
                  <Mail className="w-4 h-4" /> dppote37@gmail.com
                </li>
                <li className="flex items-center gap-2 text-white/60">
                  <Phone className="w-4 h-4" /> +91 9604276698
                </li>
                <li className="flex items-center gap-2 text-white/60">
                  <MapPin className="w-4 h-4" /> Pune, India
                </li>
              </ul>

              <div className="flex gap-4 mt-4">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  href="https://www.linkedin.com/in/dipak-pote-9b8930307/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href="https://github.com/Dipak-coder-06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Github className="w-5 h-5 text-white" />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60">© 2025 Dipak Pote. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
