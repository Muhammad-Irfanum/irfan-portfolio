"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { assets, workData } from "../../../assets/assets";

const ProjectCard = ({ project, index, activeProject, setActiveProject }) => {
  const isActive = activeProject === index;
  
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
      <div className="absolute inset-0">
        <Image 
          src={project.image} 
          alt={project.title}
          className="object-cover w-full h-full transition-transform duration-700 ease-out"
          width={800}
          height={600}
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800/50 dark:from-black/90 via-gray-500/30 dark:via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-400/20 dark:from-blue-600/20 to-purple-400/20 dark:to-purple-600/20 mix-blend-overlay"
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <motion.div 
        className="relative z-10 h-full flex flex-col justify-end p-8"
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
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-500/30 text-blue-800 dark:text-blue-200 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              {project.category}
            </motion.span>
            {isActive && (
              <motion.span 
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-green-100/80 dark:bg-green-500/30 text-green-800 dark:text-green-200 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                Featured
              </motion.span>
            )}
          </div>
          
          <motion.h3 
            className={`font-bold text-gray-900 dark:text-white ${isActive ? "text-3xl" : "text-xl"}`}
            layout
          >
            {project.title}
          </motion.h3>
          
          {isActive && (
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-base leading-relaxed line-clamp-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {project.description}
            </motion.p>
          )}
          
          <motion.div 
            className="flex flex-wrap items-center gap-2 mt-4"
            layout
          >
            {project.technologies.map((tech, idx) => (
              <motion.span 
                key={idx}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/90 backdrop-blur-sm
                  hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
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
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gray-800/10 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20
                  hover:bg-gray-800/20 dark:hover:bg-white/20 transition-all duration-300 text-gray-900 dark:text-white font-medium text-sm group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Live Demo
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
              
              <motion.a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-4 h-4" />
                Source Code
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const LatestWork = () => {
  const [activeProject, setActiveProject] = useState(0);
  const containerRef = useRef(null);
  
  // ... projects array remains the same ...
  const projects = [
    {
      title: "Affilito E-commerce Platform",
      category: "Web Development",
      image: "/work-1.png",
      description: "A full-stack Affilito platform with product listings, shopping cart, and payment processing. Built with Next.js, React, and Tailwind CSS, integrated with Stripe and MongoDB.",
      technologies: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
      demoLink: "https://affillato.vercel.app/",
      githubLink: "https://github.com/Muhammad-Irfanum"
    },
    {
      title: "HR Dashboard",
      category: "Web Application",
      image: "/work-2.png",
      description: "A comprehensive finance dashboard for tracking investments, expenses, and income. Built with React and Chart.js, featuring real-time data visualization, budget planning, and financial goal tracking.",
      technologies: ["React", "Chart.js", "Firebase", "Material UI"],
      demoLink: "#",
      githubLink: "https://github.com/Muhammad-Irfanum"
    },
    {
      title: "AASANI APP",
      category: "Mobile App",
      image: "/work-3.png",
      description: "AASANI is a mobile application that connects travelers with clients to provide on-demand luggage storage and delivery services. Built with React Native, Expo, and Firebase.",
      technologies: ["React Native", "Expo", "Firebase", "Redux"],
      demoLink: "#",
      githubLink: "https://github.com/Muhammad-Irfanum"
    },
    {
      title: "Real Estate Platform",
      category: "Web Development",
      image: "/work-4.png",
      description: "A modern real estate platform with property listings, advanced filtering, virtual tours, and appointment scheduling. Built with Next.js and integrated with Google Maps API.",
      technologies: ["Next.js", "Google Maps API", "Prisma", "PostgreSQL"],
      demoLink: "#",
      githubLink: "https://github.com/Muhammad-Irfanum"
    },
    {
      title: "UI Design",
      category: "Figma Prototype",
      image: "/work-1.png", 
      description: "A mobile application prototype for a social networking platform. Features include user profiles, messaging, notifications, and news feed. Designed with Figma and prototyped with Framer.",
      technologies: ["Figma", "Framer", "UI/UX Design"],
      demoLink: "#",
      githubLink: "https://github.com/Muhammad-Irfanum"
    }
  ];


  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <motion.div 
        ref={containerRef}
        className="container mx-auto px-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-500/10 text-blue-800 dark:text-blue-300 px-5 py-2 rounded-full text-sm font-medium mb-6"
              whileHover={{ scale: 1.02 }}
            >
              Featured Work
            </motion.div>
            
            <h2 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Latest Projects
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-2xl">
              Explore my recent work showcasing innovative solutions across web development,
              mobile applications, and user experience design.
            </p>
          </motion.div>
          
          <motion.a 
            href="#"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-500 dark:hover:text-blue-300 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr"
          layout
        >
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
      </motion.div>
    </section>
  );
};

export default LatestWork;