"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

const GetInTouch = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        name: formState.name,
        email: formState.email,
        subject: formState.subject,
        message: formState.message,
        from_name: "Portfolio Contact Form",
        replyto: formState.email,
        botcheck: false
      }
      if (!formData.access_key || !/^[\w-]{36}$/.test(formData.access_key)) {
        throw new Error("Invalid API key configuration")
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.success) {
        setIsSubmitted(true)
        setFormState({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error(data.message || "Form submission failed")
      }
    } catch (error) {
      console.error("Submission error:", error)
      setError(error)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setIsSubmitted(false)
        setError(null)
      }, 5000)
    }
    
  }
  useEffect(() => {
    console.log("Web3Forms Key:", process.env.NEXT_PUBLIC_WEB3FORMS_KEY)
  }, [])

  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
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
            <Mail className="w-4 h-4" />
            Get In Touch
          </motion.div>

          <h2 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 font-Ovo">
            Let's Work Together
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you. Feel free to
            reach out using the form below or through my contact information.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h4>
                    <a
                      href="mailto:contact@irfan.dev"
                      className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      contact@irfan.dev
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</h4>
                    <a
                      href="tel:+923001234567"
                      className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      +92335 8419837
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</h4>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">Kohat, KPK, Pakistan</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700">
                <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Connect with me</h4>
                <div className="flex items-center gap-4">
                  {["github", "twitter", "linkedin", "instagram"].map((social, index) => (
                    <motion.a
                      key={social}
                      href={`#${social}`}
                      className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center
                        hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-xl">{["👨‍💻", "🐦", "👔", "📸"][index]}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Ready to start your project?</h3>
                <p className="mb-6 text-white/90">
                  I'm currently available for freelance work. Let's build something amazing together!
                </p>
                <motion.a
                  href="#schedule"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-600 font-medium
                    hover:bg-blue-50 transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule a Call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Message</h3>

            {isSubmitted ? (
              <motion.div
                className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">
                  Message Sent Successfully!
                </h4>
                <p className="text-green-700 dark:text-green-300">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : error ? (
              <motion.div
                className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">
                  Error Sending Message
                </h4>
                <p className="text-red-700 dark:text-red-300">
                  {error.message || 'Please try again later.'}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  checked={false}
                  onChange={() => {}}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Irfii"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="irfii@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-medium text-white
                    ${
                      isSubmitting
                        ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25"
                    } transition-all duration-300 flex items-center justify-center gap-2`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GetInTouch