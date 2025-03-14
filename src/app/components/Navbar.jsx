"use client"

import { useState, useEffect, useRef } from "react"
import { Moon, Sun, Menu, X, ChevronRight } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const navRef = useRef(null)
  const indicatorRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]")
      let current = ""
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.offsetHeight
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id")
        }
      })
      
      if (current && current !== activeSection) {
        setActiveSection(current)
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  // Animate the indicator position when activeSection changes
  useEffect(() => {
    updateIndicatorPosition()
  }, [activeSection])

  const updateIndicatorPosition = () => {
    if (!indicatorRef.current || !navRef.current) return
    
    const activeItem = navRef.current.querySelector(`[data-section="${activeSection}"]`)
    if (activeItem) {
      const navRect = navRef.current.getBoundingClientRect()
      const activeRect = activeItem.getBoundingClientRect()
      
      indicatorRef.current.style.width = `${activeRect.width}px`
      indicatorRef.current.style.transform = `translateX(${activeRect.left - navRect.left}px)`
    }
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const handleNavClick = (section) => {
    setActiveSection(section)
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: "Home", icon: "🏠" },
    { name: "About", icon: "👨‍💻" },
    { name: "Services", icon: "🛠️" },
    { name: "Work", icon: "🏆" },
    { name: "Contact", icon: "📧" },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo with animated dot */}
        <a href="/" className="relative group">
          <span className="text-2xl font-bold font-sora relative">
            IRFAN
            <span className="text-primary absolute -right-3 top-0 group-hover:animate-ping">.</span>
            <span className="text-primary absolute -right-3 top-0">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div ref={navRef} className="relative flex items-center gap-8">
            {/* Active indicator line */}
            <div 
              ref={indicatorRef}
              className="absolute bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-in-out" 
            />
            
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={`#${item.name.toLowerCase()}`}
                    data-section={item.name.toLowerCase()}
                    className={`relative text-sm font-medium transition-colors px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1
                      ${activeSection === item.name.toLowerCase() ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
                    onClick={() => handleNavClick(item.name.toLowerCase())}
                  >
                    <span className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                      {item.icon}
                    </span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme toggle with animation */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative overflow-hidden"
            aria-label="Toggle theme"
          >
            <div className="relative z-10">
              {isDark ? 
                <Sun className="w-5 h-5 text-yellow-500" /> : 
                <Moon className="w-5 h-5 text-blue-600" />
              }
            </div>
            <div className={`absolute inset-0 ${isDark ? 'bg-yellow-500/10' : 'bg-blue-600/10'} transform scale-0 rounded-full transition-transform duration-500 ${isDark ? 'scale-100' : ''}`}></div>
          </button>

          {/* Enhanced CTA button */}
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm
              hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300
              flex items-center gap-2 group"
          >
            Contact
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu with animation */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800
          transform transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
        style={{ visibility: isMenuOpen ? 'visible' : 'hidden' }}
      >
        <div className="container mx-auto px-6 py-4">
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={`#${item.name.toLowerCase()}`}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors
                    ${activeSection === item.name.toLowerCase() 
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                  onClick={() => handleNavClick(item.name.toLowerCase())}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? 
                <><Sun className="w-5 h-5 text-yellow-500" /> <span>Light Mode</span></> : 
                <><Moon className="w-5 h-5 text-blue-600" /> <span>Dark Mode</span></>
              }
            </button>
            
            <a
              href="#contact"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm
                hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar