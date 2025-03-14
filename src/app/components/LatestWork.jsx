"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, Github, Code, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

const ProjectCard = ({ project, index, activeProject, setActiveProject }) => {
  const { theme } = useTheme()
  const isActive = activeProject === index
  const isDark = theme === "dark"

  return (
    <motion.div
      className={`group relative rounded-3xl overflow-hidden transition-all duration-700 cursor-pointer ${
        isActive ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      }`}
      onClick={() => setActiveProject(index)}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: isActive ? 1 : 1.02 }}
    >
      {/* Animated border for active card */}
      {isActive && (
        <div className="absolute inset-0 z-10 rounded-3xl p-[2px] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-3xl opacity-70 animate-gradient-x"></div>
        </div>
      )}

      {/* Project Image */}
      <div className="absolute inset-0">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className={`object-cover w-full h-full transition-transform duration-700 ease-out ${
            isActive ? "scale-105" : "group-hover:scale-105"
          }`}
          width={800}
          height={600}
          priority={index === 0}
        />

        {/* Base overlay */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-t from-black/90 via-black/50 to-transparent"
              : "bg-gradient-to-t from-gray-900/90 via-gray-800/50 to-transparent"
          } 
          transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        />

        {/* Animated color overlay */}
        <motion.div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20"
              : "bg-gradient-to-br from-blue-500/30 to-purple-500/30"
          } mix-blend-overlay`}
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Decorative elements */}
        {isActive && (
          <>
            <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"></div>
          </>
        )}
      </div>

      {/* Project Info */}
      <motion.div
        className="relative z-20 h-full flex flex-col justify-end p-8"
        initial={false}
        animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col gap-4"
          initial={false}
          animate={{ y: isActive ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                isDark ? "bg-blue-500/30 text-blue-200" : "bg-blue-500/80 text-white"
              } backdrop-blur-sm flex items-center gap-1.5`}
              whileHover={{ scale: 1.05 }}
            >
              <Code className="w-3 h-3" />
              {project.category}
            </motion.span>
            {isActive && (
              <motion.span
                className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                  isDark ? "bg-green-500/30 text-green-200" : "bg-green-500/80 text-white"
                } backdrop-blur-sm flex items-center gap-1.5`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-3 h-3" />
                Featured
              </motion.span>
            )}
          </div>

          <motion.h3 className={`font-bold text-white ${isActive ? "text-3xl" : "text-xl"} drop-shadow-md`} layout>
            {project.title}
          </motion.h3>

          {isActive && (
            <motion.p
              className={`${isDark ? "text-gray-300" : "text-gray-100"} text-base leading-relaxed line-clamp-3 backdrop-blur-sm bg-black/5 rounded-xl p-3`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {project.description}
            </motion.p>
          )}

          <motion.div className="flex flex-wrap items-center gap-2 mt-4" layout>
            {project.technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                  isDark ? "bg-white/10 text-white/90" : "bg-white/20 text-white"
                } backdrop-blur-sm
                  hover:bg-white/20 transition-colors`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {isActive && (
            <motion.div
              className="flex items-center gap-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl ${
                  isDark
                    ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 border-white/10"
                    : "bg-gradient-to-r from-blue-500/90 to-purple-500/90 border-white/20"
                } backdrop-blur-sm border
                  hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 text-white font-medium text-sm group`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Live Demo
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white group"
                whileHover={{ scale: 1.05, x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-4 h-4" />
                Source Code
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Hover state for non-active cards */}
      {!isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
          initial={false}
          whileHover={{ opacity: 1 }}
        >
          <div className="text-white">
            <h4 className="text-lg font-medium">{project.title}</h4>
            <p className="text-sm text-white/80 mt-1">{project.category}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

const LatestWork = () => {
  const [activeProject, setActiveProject] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Sample projects with placeholder images
  const projects = [
    {
      title: "Modern E-commerce Platform",
      category: "Web Development",
      image: "/placeholder.svg?height=800&width=600",
      description:
        "A fully responsive e-commerce platform built with Next.js, Tailwind CSS, and integrated with Stripe payment processing. Features include product filtering, search, user authentication, and order tracking.",
      technologies: ["Next.js", "React", "Tailwind CSS", "Stripe", "MongoDB"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      title: "Finance Dashboard",
      category: "Web Application",
      image: "/placeholder.svg?height=800&width=600",
      description:
        "A comprehensive finance dashboard for tracking investments, expenses, and income. Built with React and Chart.js, featuring real-time data visualization, budget planning, and financial goal tracking.",
      technologies: ["React", "Chart.js", "Firebase", "Material UI"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      title: "Health & Fitness App",
      category: "Mobile App",
      image: "/placeholder.svg?height=800&width=600",
      description:
        "A cross-platform fitness application built with React Native. Features include workout tracking, nutrition planning, progress visualization, and social sharing capabilities.",
      technologies: ["React Native", "Expo", "Firebase", "Redux"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      title: "Real Estate Platform",
      category: "Web Development",
      image: "/placeholder.svg?height=800&width=600",
      description:
        "A modern real estate platform with property listings, advanced filtering, virtual tours, and appointment scheduling. Built with Next.js and integrated with Google Maps API.",
      technologies: ["Next.js", "Google Maps API", "Prisma", "PostgreSQL"],
      demoLink: "#",
      githubLink: "#",
    },
    {
      title: "AI-Powered Task Manager",
      category: "Web Application",
      image: "/placeholder.svg?height=800&width=600",
      description:
        "A smart task management application that uses AI to prioritize tasks, suggest time allocations, and provide productivity insights. Built with React and integrated with OpenAI's API.",
      technologies: ["React", "Node.js", "OpenAI API", "MongoDB"],
      demoLink: "#",
      githubLink: "#",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  // Auto-rotate active project every 5 seconds
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isInView, projects.length])

  return (
    <section
      id="work"
      className={`py-32 relative overflow-hidden ${
        isDark ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-gray-100 to-white"
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className={`absolute top-0 left-1/4 w-96 h-96 ${
            isDark ? "bg-blue-500/10" : "bg-blue-500/5"
          } rounded-full blur-3xl`}
        />
        <div
          className={`absolute bottom-0 right-1/4 w-96 h-96 ${
            isDark ? "bg-purple-500/10" : "bg-purple-500/5"
          } rounded-full blur-3xl`}
        />
      </div>

      <motion.div
        ref={containerRef}
        className="container mx-auto px-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className={`inline-flex items-center gap-2 ${
                isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-600"
              } px-6 py-2 rounded-full text-sm font-medium mb-6`}
              initial={{ scale: 0.9 }}
              animate={isInView ? { scale: 1 } : { scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Code className="w-4 h-4" />
              Featured Work
            </motion.div>

            <h2
              className={`text-5xl font-bold mb-6 ${
                isDark
                  ? "text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
                  : "text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
              } font-Ovo`}
            >
              Latest Projects
            </h2>

            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-lg leading-relaxed max-w-2xl`}>
              Explore my recent work showcasing innovative solutions across web development, mobile applications, and
              user experience design.
            </p>
          </motion.div>

          <motion.a
            href="#"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${
              isDark
                ? "bg-blue-900/20 text-blue-400 hover:bg-blue-900/30"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            } font-medium transition-colors group`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr" layout>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              activeProject={activeProject}
              setActiveProject={setActiveProject}
            />
          ))}
        </motion.div>

        {/* Project navigation indicators */}
        <motion.div
          className="flex justify-center mt-16 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveProject(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeProject
                  ? "w-10 bg-gradient-to-r from-blue-500 to-purple-500"
                  : "w-3 bg-gray-300/50 dark:bg-gray-700/50 hover:bg-gray-400 dark:hover:bg-gray-600"
              }`}
              aria-label={`Go to project ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default LatestWork

