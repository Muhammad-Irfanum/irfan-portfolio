"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Award, Calendar, CheckCircle, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { assets } from "../../../assets/assets"
import { useTheme } from "next-themes"

const CertificateCard = ({ certificate, isActive }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <motion.div
      className={`relative h-full flex flex-col overflow-hidden rounded-2xl ${
        isActive
          ? "border-2 border-blue-500 dark:border-blue-500 shadow-xl shadow-blue-500/10"
          : "border border-gray-200 dark:border-gray-800"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: isActive ? 1 : 1.03 }}
    >
      {/* Certificate badge and decorative elements */}
      <div className="absolute -right-12 -top-12 w-24 h-24 bg-blue-500/10 rounded-full" />
      <motion.div
        className="absolute right-3 top-3 z-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <Award className={`w-6 h-6 ${isActive ? "text-blue-500" : "text-gray-400 dark:text-gray-600"}`} />
      </motion.div>

      {/* Animated gradient border for active card */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-20 animate-gradient-x"></div>
      )}

      {/* Certificate image */}
      <div className="p-4 relative">
        <motion.div
          className={`aspect-video rounded-lg overflow-hidden ${
            isActive ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20" : "bg-gray-100 dark:bg-gray-800"
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={certificate.image || "/placeholder.svg"}
            alt="Certificate"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            width={400}
            height={225}
          />

          {/* Overlay gradient */}
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-t from-gray-900/40 to-transparent"
                : "bg-gradient-to-t from-gray-100/40 to-transparent"
            } opacity-0 group-hover:opacity-100 transition-opacity`}
          ></div>
        </motion.div>
      </div>

      {/* Certificate info */}
      <div className="p-4 pt-0 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
            <Image
              src={certificate.issuerLogo || "/placeholder.svg"}
              alt="Issuer"
              className="w-6 h-6 object-contain"
              width={24}
              height={24}
            />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">{certificate.issuer}</span>
        </div>

        <motion.h3
          className={`text-lg font-bold mb-2 ${
            isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"
          }`}
          initial={false}
          animate={{ scale: isActive ? 1.02 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {certificate.name}
        </motion.h3>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <Calendar className="w-4 h-4" />
          <span>{certificate.date}</span>
        </div>

        {isActive && (
          <motion.ul
            className="mt-2 space-y-2 mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.4 }}
          >
            {certificate.skills.map((skill, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{skill}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}

        <div className="mt-auto pt-4">
          <motion.a
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium flex items-center gap-1 ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            } transition-colors group`}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            View Certificate <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

const certificates = [
  {
    name: "Advanced React and Redux",
    issuer: "Udemy",
    issuerLogo: assets.react,
    image: assets.react,
    date: "June 2023",
    skills: [
      "React Hooks & Context API",
      "Redux Toolkit & RTK Query",
      "Performance Optimization",
      "Testing with Jest & React Testing Library",
    ],
    link: "#",
  },
  {
    name: "Next.js & React - The Complete Guide",
    issuer: "Academind",
    issuerLogo: assets.react,
    image: assets.react,
    date: "April 2023",
    skills: [
      "Server-Side Rendering",
      "Static Site Generation",
      "API Routes & Full Stack Development",
      "Authentication & Authorization",
    ],
    link: "#",
  },
  {
    name: "UI/UX Design Specialization",
    issuer: "Coursera",
    issuerLogo: assets.react,
    image: assets.react,
    date: "January 2023",
    skills: ["User Research & Personas", "Wireframing & Prototyping", "Visual Design Principles", "Usability Testing"],
    link: "#",
  },
  {
    name: "Tailwind CSS Masterclass",
    issuer: "Frontend Masters",
    issuerLogo: assets.react,
    image: assets.react,
    date: "December 2022",
    skills: [
      "Responsive Design with Tailwind",
      "Custom Configurations",
      "Component Design Patterns",
      "Animation & Transitions",
    ],
    link: "#",
  },
  {
    name: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    issuerLogo: assets.react,
    image: assets.react,
    date: "October 2022",
    skills: ["Serverless Architecture", "AWS Lambda & API Gateway", "DynamoDB & S3", "IAM & Security Best Practices"],
    link: "#",
  },
  {
    name: "TypeScript Deep Dive",
    issuer: "egghead.io",
    issuerLogo: assets.react,
    image: assets.react,
    date: "August 2022",
    skills: [
      "Advanced Types & Type Guards",
      "Generics & Utility Types",
      "Module System & Namespaces",
      "Integration with React",
    ],
    link: "#",
  },
]

const Certifications = () => {
  const [activeCert, setActiveCert] = useState(0)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 2 })
  const containerRef = useRef(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Function to move to specific certificate
  const moveToCard = (index) => {
    setActiveCert(index)

    // Adjust visible range to keep active card in view
    const visibleCount = 3 // Number of cards visible at once

    if (index < visibleRange.start) {
      setVisibleRange({
        start: Math.max(0, index),
        end: Math.min(certificates.length - 1, index + visibleCount - 1),
      })
    } else if (index > visibleRange.end) {
      setVisibleRange({
        start: Math.max(0, index - visibleCount + 1),
        end: Math.min(certificates.length - 1, index),
      })
    }
  }

  // Navigation functions
  const handlePrev = () => {
    const newIndex = Math.max(0, activeCert - 1)
    moveToCard(newIndex)
  }

  const handleNext = () => {
    const newIndex = Math.min(certificates.length - 1, activeCert + 1)
    moveToCard(newIndex)
  }

  // Update visible range on window resize
  useEffect(() => {
    const handleResize = () => {
      let visibleCount = 3 // Default for desktop

      if (window.innerWidth < 768) {
        visibleCount = 1 // Mobile
      } else if (window.innerWidth < 1024) {
        visibleCount = 2 // Tablet
      }

      setVisibleRange({
        start: Math.min(activeCert, certificates.length - visibleCount),
        end: Math.min(activeCert + visibleCount - 1, certificates.length - 1),
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [activeCert])

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="max-w-3xl mx-auto mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Award className="w-4 h-4" />
            Credentials
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 font-Ovo">
            Professional Certifications
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400">
            Continuous learning and skill development through industry-recognized certifications
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation buttons */}
          <motion.div
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 md:-left-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={handlePrev}
              disabled={activeCert === 0}
              className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 backdrop-blur-lg border border-gray-100 dark:border-gray-700/50 flex items-center justify-center shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all hover:-translate-x-1"
              aria-label="Previous certificate"
              whileHover={{ scale: activeCert === 0 ? 1 : 1.1 }}
              whileTap={{ scale: activeCert === 0 ? 1 : 0.95 }}
            >
              <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </motion.div>

          <motion.div
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 md:-right-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={handleNext}
              disabled={activeCert === certificates.length - 1}
              className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 backdrop-blur-lg border border-gray-100 dark:border-gray-700/50 flex items-center justify-center shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all hover:translate-x-1"
              aria-label="Next certificate"
              whileHover={{ scale: activeCert === certificates.length - 1 ? 1 : 1.1 }}
              whileTap={{ scale: activeCert === certificates.length - 1 ? 1 : 0.95 }}
            >
              <ArrowRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </motion.div>

          {/* Cards container */}
          <div className="overflow-hidden px-2">
            <motion.div
              ref={containerRef}
              className="flex gap-6 transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(-${visibleRange.start * (100 / 3)}%)`,
              }}
              layout
            >
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 transition-all duration-500"
                  style={{
                    opacity: index >= visibleRange.start && index <= visibleRange.end ? 1 : 0.4,
                    transform: index === activeCert ? "scale(1.02)" : "scale(1)",
                  }}
                  layout
                >
                  <div onClick={() => moveToCard(index)} className="cursor-pointer h-full">
                    <CertificateCard certificate={cert} isActive={index === activeCert} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Pagination indicators */}
        <motion.div
          className="flex justify-center mt-10 gap-1.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {certificates.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => moveToCard(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeCert
                  ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                  : "w-3 bg-gray-300/50 dark:bg-gray-700/50 hover:bg-gray-400 dark:hover:bg-gray-600"
              }`}
              aria-label={`Go to certificate ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications

