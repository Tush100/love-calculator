import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { ContactForm } from "@/components/contact-form"
import { FloatingHearts } from "@/components/floating-hearts"

export const metadata: Metadata = {
  title: "Contact Us - Tush Love Calculator",
  description:
    "Get in touch with the Tush Love Calculator team. Send us your feedback, suggestions, or questions about our love compatibility calculator and romantic features.",
  openGraph: {
    title: "Contact Us - Tush Love Calculator",
    description: "Get in touch with the Tush Love Calculator team. Send us your feedback, suggestions, or questions.",
    url: "https://tush-love-calculator.vercel.app/contact",
  },
  twitter: {
    title: "Contact Us - Tush Love Calculator",
    description: "Get in touch with the Tush Love Calculator team. Send us your feedback, suggestions, or questions.",
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 dark:from-pink-950 dark:to-purple-900 p-4 relative overflow-hidden">
      <FloatingHearts />
      <NavBar />
      <div className="max-w-2xl mx-auto pt-8 pb-16 relative z-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We'd love to hear from you! Send us your feedback, suggestions, or questions about our love calculator.
          </p>
        </header>

        <section aria-label="Contact Form">
          <ContactForm />
        </section>
      </div>
    </main>
  )
}
