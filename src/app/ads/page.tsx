import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Clock, MessageCircle, Star, CheckCircle, ArrowRight, Phone } from "lucide-react"

export default function AdsLandingPage() {
  const waText = encodeURIComponent("Hi! I'm interested in the ₹100 Quick Cosmic Clarity call from your Google ad.")
  const waLink = `https://wa.me/?text=${waText}`

  const benefits = [
    "Get instant clarity on your most pressing question",
    "No long consultations or confusing jargon",
    "Direct, practical answers you can act on immediately",
    "Expert astrologer with years of experience",
    "Satisfaction guaranteed or money back"
  ]

  const testimonials = [
    {
      name: "Priya S.",
      text: "Got the exact timing for my job interview. Landed the position!",
      rating: 5
    },
    {
      name: "Raj K.",
      text: "₹100 well spent! Finally understood why my relationships weren't working.",
      rating: 5
    },
    {
      name: "Anita M.",
      text: "Quick answer saved me from making a costly mistake. Thank you!",
      rating: 5
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200">
            ⚡ Limited Time Offer
          </Badge>

          <h1 className="text-3xl md:text-5xl font-bold text-balance bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Get Cosmic Clarity in 15 Minutes
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            One burning question? Get a direct, practical answer from our expert astrologer.
            <strong className="text-purple-600"> No fluff, just clarity.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="text-4xl md:text-5xl font-bold text-purple-600">
              ₹100
            </div>
            <div className="text-lg text-gray-600">
              <Clock className="inline h-4 w-4 mr-1" />
              15-minute call
            </div>
          </div>

          <Button size="lg" asChild className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              Book WhatsApp Call Now
            </a>
          </Button>

          <p className="text-sm text-gray-600 mt-3">
            ⏰ <strong>Limited slots today</strong> • 💬 WhatsApp booking • ✅ 100% satisfaction guarantee
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 md:py-12 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            What You'll Get
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/80 border border-purple-100">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            What Our Clients Say
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 border-purple-100">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-3 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-purple-600">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Ready to Get Your Answer?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Don't let uncertainty hold you back. Get the clarity you need right now.
          </p>

          <Button size="lg" asChild className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              <Phone className="h-5 w-5 mr-2" />
              Book Your ₹100 Call
            </a>
          </Button>

          <p className="text-sm mt-4 opacity-80">
            📱 WhatsApp only • ⚡ Instant booking • 💯 Money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <p className="font-semibold">AstroKalki™ — Cosmic Services Reimagined</p>
          <p className="text-sm mt-1">Professional astrology services • Licensed practitioner</p>
        </div>
      </footer>
    </main>
  )
}
