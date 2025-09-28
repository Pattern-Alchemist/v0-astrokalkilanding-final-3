import { Hero } from "@/components/astro/hero"
import { Pricing } from "@/components/astro/pricing"
import { FAQ } from "@/components/astro/faq"
import { Testimonials } from "@/components/astro/testimonials"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Stars, Orbit, Sparkles, Hand, Gem } from "lucide-react"
import { ApiStatusBadge } from "@/components/system/ApiStatusBadge"

export default function Page() {
  const finalWaText = encodeURIComponent("Hi! I'm ready to book a session with AstroKalki.")
  const finalWaLink = `https://wa.me/?text=${finalWaText}`

  const services = [
    {
      icon: <Orbit className="h-6 w-6 text-amber-300" />,
      title: "Astrology & Birth Charts",
      desc: "Decode your cosmic DNA with detailed natal chart analysis"
    },
    {
      icon: <Moon className="h-6 w-6 text-slate-100" />,
      title: "Love & Relationships",
      desc: "Find your perfect match and understand relationship dynamics"
    },
    {
      icon: <Stars className="h-6 w-6 text-indigo-300" />,
      title: "Perfect Timing",
      desc: "Discover the best moments for major life decisions"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-fuchsia-300" />,
      title: "Tarot & Numerology",
      desc: "Unlock hidden insights with mystical card readings"
    },
    {
      icon: <Hand className="h-6 w-6 text-emerald-300" />,
      title: "Palmistry & Energy",
      desc: "Read your life's blueprint through palm analysis"
    },
    {
      icon: <Gem className="h-6 w-6 text-sky-300" />,
      title: "Karma & Soul Contracts",
      desc: "Understand your spiritual journey and life purpose"
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div id="hero">
        <Hero />
      </div>

      {/* API Status Badge */}
      <section className="py-2">
        <div className="container mx-auto px-4 md:px-6">
          <ApiStatusBadge />
        </div>
      </section>

      {/* Services - glass cards on dark bg */}
      <section id="services" className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance text-white mb-4 font-[var(--font-serif)]">
              Our Mystical Services
            </h2>
            <div className="mx-auto h-px w-16 bg-gradient-to-r from-fuchsia-400/70 via-white/70 to-indigo-400/70 rounded" />
            <p className="text-white text-lg max-w-2xl mx-auto">
              Experience the power of ancient wisdom combined with modern clarity
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/10 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-3">
                  <div className="w-12 h-12 rounded-full bg-white/5 ring-1 ring-white/10 shadow-[0_0_20px_rgba(255,255,255,0.06)] flex items-center justify-center mx-auto mb-3">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-white">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages / Pricing */}
      <section id="packages">
        <Pricing />
      </section>
      {/* Testimonials */}
      <section id="testimonials">
        <Testimonials />
      </section>
      {/* FAQ */}
      <section id="faq">
        <FAQ />
      </section>

      {/* Final CTA - glass panel on dark bg */}
      <section id="final-cta" className="py-12 md:py-16 text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-balance text-white mb-4 font-[var(--font-serif)]">
              Ready to Transform Your Life?
            </h3>
            <p className="text-white text-lg mb-6">
              Start with our most popular ₹100 Quick Cosmic Clarity call or choose the complete transformation package.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 shadow-[0_0_30px_0_rgba(232,121,249,0.2)] ring-1 ring-fuchsia-300/30">
                <a href={finalWaLink} target="_blank" rel="noopener noreferrer">
                  Book on WhatsApp
                </a>
              </Button>
              <Button variant="outline" asChild size="lg" className="border-white/20 text-white hover:bg-white/10 font-semibold">
                <a href="#packages">See All Packages</a>
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Priority callback</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="site-footer" className="py-8 border-t border-white/10 bg-transparent text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white">AstroKalki™</p>
              <p className="text-sm text-white mt-1">Clarity-first guidance. Practical steps. Timely action.</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <Badge variant="secondary" className="bg-white/10 text-white border border-white/10">⚡ Quick Response</Badge>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}