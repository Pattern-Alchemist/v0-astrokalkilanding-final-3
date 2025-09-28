import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Clock, Phone, MessageCircle, FileText, Star } from "lucide-react"

type Plan = {
  name: string
  price: string
  duration: string
  bullets: string[]
  tagline: string
  features: string[]
  icon: React.ReactNode
  gradient: string
  popular?: boolean
}

const plans: Plan[] = [
  {
    name: "One Question",
    price: "₹100",
    duration: "7–8 mins",
    bullets: [
      "⚡ Lightning-fast clarity on one burning question",
      "Choose your focus: Relationship, Money, Career, or Other",
      "Direct answer with zero fluff or jargon"
    ],
    tagline: "Instant cosmic clarity when you need it most.",
    features: ["Audio Call", "Single Question"],
    icon: <Sparkles className="h-5 w-5" />,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "SILVER",
    price: "₹500",
    duration: "30 mins",
    bullets: [
      "✨ Three comprehensive questions answered",
      "Multi-tool analysis: Astrology + Tarot + Numerology",
      "Perfect for relationship or career guidance",
      "Clear, actionable insights you can use immediately"
    ],
    tagline: "Triple your clarity in one focused session.",
    features: ["Audio Call", "Three Questions", "Multi-Tool Analysis"],
    icon: <Star className="h-5 w-5" />,
    gradient: "from-gray-400 to-gray-600"
  },
  {
    name: "GOLD",
    price: "₹1,000",
    duration: "45 mins",
    bullets: [
      "🔮 Complete analysis with all four mystical tools",
      "Astrology + Numerology + Tarot + Palmistry reading",
      "Deep insights into your life patterns and timing",
      "Personalized guidance for major life decisions"
    ],
    tagline: "Transform confusion into crystal-clear direction.",
    features: ["Audio Call", "All Four Tools", "1 Free Follow-up Call", "30-day Support"],
    icon: <Phone className="h-5 w-5" />,
    gradient: "from-yellow-400 to-orange-500",
    popular: true
  },
  {
    name: "PLATINUM",
    price: "₹2,000",
    duration: "45–60 mins",
    bullets: [
      "👑 Premium session with complete cosmic toolkit",
      "Advanced analysis across all mystical disciplines",
      "WhatsApp support for ongoing questions",
      "Two complimentary follow-up calls included"
    ],
    tagline: "Premium guidance with ongoing support.",
    features: ["Audio Call", "WhatsApp Support", "2 Free Follow-up Calls", "Priority Access"],
    icon: <MessageCircle className="h-5 w-5" />,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "DIAMOND",
    price: "₹3,000",
    duration: "90 mins",
    bullets: [
      "💎 Ultimate transformation experience",
      "Karma Pattern & Soul Contract analysis",
      "Shadow Integration & Crystal healing guidance",
      "Comprehensive PDF summary + 4 follow-up calls"
    ],
    tagline: "Master your destiny with complete cosmic blueprint.",
    features: ["Audio Call", "PDF Summary", "4 Free Follow-up Calls", "1-Month WhatsApp Support"],
    icon: <FileText className="h-5 w-5" />,
    gradient: "from-emerald-400 to-teal-500"
  }
]

function waHrefFor(plan: string) {
  const text = `Hi! I'd like to book: ${plan} by AstroKalki.`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function Pricing() {
  return (
    <section id="packages" className="py-12 md:py-16">
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-balance text-white font-[var(--font-serif)]">
          Choose Your Cosmic Journey
        </h2>
        <p className="text-white text-pretty text-lg">
          From quick clarity to complete transformation — find your perfect guidance level
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 max-w-7xl mx-auto">
        {plans.map((p, index) => (
          <Card
            key={p.name}
            className={`relative flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/10 backdrop-blur-md border border-white/10 ${
              p.popular ? 'ring-2 ring-yellow-400/70 shadow-lg' : 'hover:shadow-lg'
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${p.gradient} flex items-center justify-center mx-auto mb-3 text-white`}>
                {p.icon}
              </div>
              <CardTitle className="text-xl font-bold text-white">{p.name}</CardTitle>
              <div className="mt-3">
                <div className="text-3xl font-bold text-white">
                  {p.price}
                </div>
                <div className="text-sm text-white flex items-center justify-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  {p.duration}
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col px-6">
              <ul className="mb-6 grid gap-3 text-sm">
                {p.bullets.map((b, i) => (
                  <li key={i} className="leading-relaxed text-white">
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mb-4">
                <p className="text-xs text-white mb-3 font-medium">{p.tagline}</p>
                <div className="flex flex-wrap gap-1">
                  {p.features.map((feature, i) => (
                    <Badge key={i} variant="secondary" className="text-xs bg-white/10 text-white border border-white/10">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                asChild
                className={`mt-auto transition-all duration-300 ${
                  p.popular
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                } text-white font-semibold`}
              >
                <a href={waHrefFor(p.name)} target="_blank" rel="noopener noreferrer">
                  Book on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-white">
          ✨ All sessions include: Direct guidance • No jargon • Practical steps • WhatsApp booking
        </p>
      </div>
    </section>
  )
}