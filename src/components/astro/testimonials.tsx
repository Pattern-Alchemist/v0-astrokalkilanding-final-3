import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya • Mumbai",
    service: "DIAMOND Package",
    rating: 5,
    quote: "The DIAMOND session completely transformed my understanding of my life path. The PDF summary and follow-up calls have been invaluable for staying on track.",
    highlight: "Complete life transformation"
  },
  {
    name: "Rajesh • Delhi",
    service: "GOLD Package",
    rating: 5,
    quote: "GOLD tier gave me exactly what I needed - clear guidance on my career transition with perfect timing. The follow-up call was the cherry on top!",
    highlight: "Perfect career timing"
  },
  {
    name: "Ananya • Chennai",
    service: "One Question",
    rating: 5,
    quote: "Sometimes you just need one burning question answered. Got crystal clear guidance in 8 minutes that changed my relationship approach completely.",
    highlight: "Lightning-fast clarity"
  },
  {
    name: "Vikram • Pune",
    service: "PLATINUM Package",
    rating: 5,
    quote: "PLATINUM tier with WhatsApp support has been amazing. Having ongoing access to guidance during major life decisions made all the difference.",
    highlight: "Ongoing support system"
  },
  {
    name: "Kavita • Kolkata",
    service: "SILVER Package",
    rating: 5,
    quote: "SILVER package was perfect for my three main concerns. The multi-tool analysis gave me comprehensive insights I couldn't get elsewhere.",
    highlight: "Multi-tool analysis"
  },
  {
    name: "Arjun • Hyderabad",
    service: "DIAMOND Package",
    rating: 5,
    quote: "The 90-minute DIAMOND session felt like a complete life audit. The PDF summary and 4 follow-up calls keep me aligned with my goals.",
    highlight: "Complete life blueprint"
  }
]

export function Testimonials() {
  return (
    <section className="py-12 md:py-16">
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-balance text-white font-[var(--font-serif)]">
          Real Stories of Transformation
        </h2>
        <div className="mx-auto h-px w-16 bg-gradient-to-r from-fuchsia-400/70 via-white/70 to-indigo-400/70 rounded" />
        <p className="text-white/90 text-pretty text-lg">
          See how our clients found clarity, perfect timing, and life-changing guidance
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {testimonials.map((t, index) => (
          <Card key={t.name} className="relative bg-white/10 backdrop-blur-md border border-white/10 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src="/professional-client-avatar.png" alt="" className="h-12 w-12 rounded-full border-2 border-white/20" />
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <Badge variant="secondary" className="text-xs mt-1 bg-white/10 text-white border border-white/10">
                      {t.service}
                    </Badge>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="relative">
                <Quote className="h-6 w-6 text-white/50 absolute -top-2 -left-2" />
                <p className="text-sm leading-relaxed text-white italic pl-4">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <Badge className="bg-white/10 text-white border border-white/10">
                  ✨ {t.highlight}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-white">
          ⭐⭐⭐⭐⭐ Average rating from 500+ satisfied clients
        </p>
      </div>
    </section>
  )
}