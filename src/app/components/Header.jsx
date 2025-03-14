"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { assets } from "../../../assets/assets";
import Image from "next/image";
import { ArrowRight, Download, ChevronDown } from "lucide-react";

const Header = () => {
  const profileRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Animated entrance for elements
    const animate = (ref, delay) => {
      if (ref.current) {
        ref.current.style.opacity = "0";
        ref.current.style.transform = "translateY(30px)";
        
        setTimeout(() => {
          ref.current.style.transition = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
          ref.current.style.opacity = "1";
          ref.current.style.transform = "translateY(0)";
        }, delay);
      }
    };

    animate(profileRef, 300);
    animate(titleRef, 600);
    animate(subtitleRef, 900);
    animate(descRef, 1200);
    animate(buttonsRef, 1500);

    // Create particles effect
    if (particlesRef.current) {
      const canvas = particlesRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.2,
          direction: Math.random() * 360,
          color: `rgba(66, 153, 225, ${Math.random() * 0.5 + 0.1})`,
        });
      }
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          const radians = particle.direction * Math.PI / 180;
          particle.x += Math.cos(radians) * particle.speed;
          particle.y += Math.sin(radians) * particle.speed;
          
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
    }

    // Handle scroll indicator pulse
    const pulseInterval = setInterval(() => {
      const scrollIndicator = document.getElementById('scroll-indicator');
      if (scrollIndicator) {
        scrollIndicator.classList.add('pulse');
        setTimeout(() => {
          scrollIndicator.classList.remove('pulse');
        }, 1000);
      }
    }, 3000);

    return () => clearInterval(pulseInterval);
  }, []);
  
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background elements */}
      <canvas ref={particlesRef} className="absolute inset-0 -z-10"></canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-purple-50/80 dark:from-gray-900/90 dark:to-blue-900/90 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform -skew-y-6 -z-10"></div>
      
      <div className="container mx-auto px-6 min-h-screen flex flex-col justify-center items-center pt-20">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Profile image with glow effect */}
          <div ref={profileRef} className="relative w-40 h-40 mx-auto mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="absolute inset-0 border-4 border-white dark:border-gray-800 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-blue-500 rounded-full"></div>
            <Image
              src={assets.profile_image}
              alt="Profile"
              width={160}
              height={160}
              className="rounded-full object-cover w-full h-full"
              priority
            />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl">👋</span>
            </div>
          </div>

          {/* Title with gradient */}
          <div ref={titleRef} className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold font-sora bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Muhammad Irfan
            </h1>
          </div>

          {/* Animated subtitle */}
          <div ref={subtitleRef} className="mb-8 relative">
            <h2 className="text-3xl md:text-5xl font-sora text-gray-700 dark:text-gray-300 relative">
              <span className="relative">
                frontend web developer
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </span>
              <br />
              <span className="font-light">based in Pakistan.</span>
            </h2>
          </div>

          {/* Description with card effect */}
          <div ref={descRef} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl mb-12 max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              I am a passionate frontend developer from KPK, Pakistan with 4 years of experience crafting beautiful user interfaces and exceptional digital experiences.
            </p>
          </div>

          {/* Enhanced buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium
                shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 
                flex items-center justify-center gap-2 group"
            >
              Contact me
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#"
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700
                flex items-center justify-center gap-2 group"
            >
              Download CV
              <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div id="scroll-indicator" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Scroll down</span>
          <ChevronDown className="w-6 h-6 text-blue-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Header;