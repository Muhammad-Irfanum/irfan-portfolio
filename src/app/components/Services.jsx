"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Check, ChevronRight, Code, Monitor, PenTool, Smartphone, Zap, FileText } from "lucide-react";
import { motion } from "framer-motion";

const ServicesCard = ({ icon: Icon, title, description, features, isActive, onClick }) => {
  return (
    <motion.div 
      className={`relative group rounded-3xl p-[2px] cursor-pointer transition-all duration-500 overflow-hidden ${
        isActive 
          ? "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" 
          : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:scale-[1.02]"
      }`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: isActive ? 1 : 1.02 }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      
      <div className={`relative z-10 p-8 h-full rounded-[22px] flex flex-col backdrop-blur-xl ${
        isActive 
          ? "bg-white/10" 
          : "bg-white dark:bg-gray-900"
      }`}>
        <motion.div 
          className={`w-20 h-20 rounded-2xl mb-8 flex items-center justify-center relative ${
            isActive 
              ? "bg-white/20" 
              : "bg-blue-50 dark:bg-blue-900/30"
          }`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className={`w-10 h-10 ${
            isActive 
              ? "text-white" 
              : "text-blue-600 dark:text-blue-400"
          }`} />
          
          {/* Decorative elements */}
          <div className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-70" />
          <div className="absolute -left-3 -bottom-3 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-50" />
        </motion.div>
        
        <motion.h3 
          className={`text-2xl font-bold mb-4 ${
            isActive ? "text-white" : "text-gray-900 dark:text-white"
          }`}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className={`mb-8 text-base leading-relaxed ${
            isActive ? "text-white/90" : "text-gray-600 dark:text-gray-400"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
        
        {isActive && (
          <motion.div 
            className="mt-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex items-start gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-white/90">{feature}</span>
              </motion.div>
            ))}
            
            <motion.a 
              href="#contact"
              className="mt-8 w-full py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium
                hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        )}
        
        {!isActive && (
          <motion.div 
            className="mt-auto pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`flex items-center text-sm font-medium ${
              isActive ? "text-white" : "text-blue-600 dark:text-blue-400"
            }`}>
              Learn More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const services = [
    {
      icon: PenTool,
      title: "UI/UX Design",
      description: "Crafting intuitive digital experiences through user-centered design principles and creative innovation.",
      features: [
        "User research and persona development",
        "Wireframing and prototyping",
        "Visual design and branding",
        "Interactive prototypes with animations"
      ]
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Building performant, scalable web applications with modern technologies and best practices.",
      features: [
        "React & Next.js development",
        "Custom animations and interactions",
        "Performance optimization",
        "SEO-friendly implementation"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Creating seamless mobile experiences that work flawlessly across all platforms.",
      features: [
        "React Native development",
        "Native-like performance",
        "Push notifications integration",
        "App store submission assistance"
      ]
    },
    {
      icon: FileText,
      title: "Technical Writing",
      description: "Transforming complex technical concepts into clear, accessible documentation.",
      features: [
        "API documentation",
        "Technical guides",
        "User manuals",
        "System architecture docs"
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [services.length]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('services');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
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
            <Zap className="w-4 h-4" />
            Expert Services
          </motion.div>
          
          <h2 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Transforming Ideas into Reality
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Leveraging cutting-edge technology and creative expertise to deliver exceptional digital solutions
            that drive growth and innovation.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServicesCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              isActive={activeService === index}
              onClick={() => setActiveService(index)}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-24 p-10 rounded-3xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border border-gray-100 dark:border-gray-800 max-w-5xl mx-auto shadow-xl shadow-blue-500/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Need a Custom Solution?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                Let's collaborate to create something extraordinary that perfectly aligns with your vision and objectives.
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium
                  hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start a Conversation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
            
            <div className="md:w-1/2 grid grid-cols-2 gap-6">
              {[Monitor, Code, PenTool, FileText].map((Icon, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center aspect-square shadow-lg shadow-blue-500/5 border border-gray-100 dark:border-gray-800"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Icon className="w-12 h-12 text-blue-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;