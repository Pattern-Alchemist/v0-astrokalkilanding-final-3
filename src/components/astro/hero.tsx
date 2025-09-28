"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function Hero() {
  const waText = encodeURIComponent("Hi! I'd like a Quick Cosmic Clarity call (₹100).");
  const waLink = `https://wa.me/?text=${waText}`;

  const [card, setCard] = useState<{ name: string; description: string; image: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/tarot/status", { cache: "no-store" });
        const json = await res.json();
        if (!mounted) return;
        setApiOnline(!!json?.health?.ok);
      } catch {
        if (!mounted) return;
        setApiOnline(false);
      }
    };
    fetchStatus();
    const id = setInterval(fetchStatus, 60_000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const drawCard = async () => {
    try {
      setOpen(true);
      setLoading(true);
      setCard(null);
      const apiUrl = "/api/tarot";
      const res = await fetch(apiUrl, { headers: { Accept: "application/json" }, cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const data = json?.data;
      if (!data?.name) throw new Error("Invalid payload");
      setCard({ name: data.name, description: data.description, image: data.image });
      // document.querySelector("#tarot-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {
      console.error("Tarot draw error:", e);
      setCard({
        name: "Unable to draw a card",
        description: "Please try again in a moment. If this persists, your network or the Tarot API may be unavailable.",
        image: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="relative overflow-hidden w-full">
      {/* Cosmic background: deep space gradient + subtle stars */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b1020,40%,#15143a_70%,#0b1020)]" />
        {/* radial nebulas */}
        <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[32rem] w-[32rem] rounded-full bg-indigo-500/25 blur-3xl" />
        {/* starfield */}
        <svg className="absolute inset-0 h-full w-full opacity-60" aria-hidden="true">
          <defs>
            <radialGradient id="g" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* small scattered stars */}
          {Array.from({ length: 120 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 73) % 1200}
              cy={(i * 131) % 700}
              r={i % 7 === 0 ? 1.6 : 0.8}
              fill="white"
              opacity={(i % 5) / 10 + 0.2}
            />
          ))}
          {/* soft planetary glow near bottom-right */}
          <circle cx="92%" cy="96%" r="360" fill="url(#g)" opacity="0.25" />
        </svg>
      </div>
      <nav className="flex items-center justify-between py-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-xl text-white">
            AstroKalki
          </span>
          <span className="sr-only">AstroKalki</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <Button variant="outline" asChild className="border-white/30 text-white hover:bg-white/10 font-semibold">
            <Link href="#packages">
              <ArrowRight className="h-4 w-4 mr-2" />
              See Packages
            </Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              Book on WhatsApp
            </a>
          </Button>
        </div>
      </nav>

      <section className="grid gap-8 md:grid-cols-2 md:items-start md:gap-12 py-8 px-4 md:px-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white font-[var(--font-serif)]">
              AstroKalki
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-white font-[var(--font-serif)]">- Decoding Kaalchakra</h2>
          </div>

          <ul className="text-lg text-white leading-relaxed list-disc pl-5 space-y-2">
            <li>Transform confusion into Crystal Clear vision.</li>
            <li>Karma and Stars alignment.</li>
            <li>Unlocking Portal for 5th Dimension</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button size="lg" asChild className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-emerald-300/30">
              <Link href="#kundali">Get FREE Kundali</Link>
            </Button>
            <Button
              size="lg"
              onClick={drawCard}
              aria-disabled={apiOnline === false}
              title={apiOnline === false ? "API Offline – will use fallback if available" : undefined}
              className={`bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-fuchsia-300/30 ${apiOnline === false ? "opacity-60 cursor-not-allowed saturate-50" : ""}`}
            >
              {loading ? "Drawing..." : "FREE Tarot Reading"}
            </Button>
          </div>

          {/* Tarot Modal */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-[#0b1020]/80 backdrop-blur-md border-white/20 text-white sm:max-w-md min-h-[300px]">
              <DialogHeader>
                <DialogTitle className="text-center font-[var(--font-serif)] text-2xl">Your Tarot Card</DialogTitle>
              </DialogHeader>
              <div className="space-y-4" aria-live="polite">
                <div className="text-center font-bold text-xl text-white">
                  {loading ? "Shuffling the deck..." : (card?.name || "Drawing failed. Try again.")}
                </div>
                <div className="grid place-items-center">
                  {loading ? (
                    <div className="h-40 w-28 rounded-xl border border-white/20 bg-white/10 animate-pulse" />
                  ) : card?.image ? (
                    <img
                      src={card.image}
                      alt={card?.name || "Tarot card"}
                      className="max-h-[48vh] w-full max-w-xs rounded-xl border border-white/20 shadow-[0_12px_26px_rgba(0,0,0,0.45),0_0_24px_rgba(255,113,206,0.35),0_0_44px_rgba(93,76,255,0.28)]"
                    />
                  ) : (
                    <div className="h-40 w-28 rounded-xl border border-white/20 bg-white/5" />
                  )}
                </div>
                <div className="max-h-[30vh] overflow-auto rounded-lg border border-white/15 bg-white/5 p-3 text-sm leading-relaxed text-white/90">
                  {loading ? "Seeking cosmic guidance. Please wait." : (card?.description || "Tap 'Draw again' to retry.")}
                </div>
                <div className="flex justify-center gap-3 pt-1">
                  <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 text-white" onClick={drawCard} disabled={loading}>
                    {loading ? "Drawing..." : "Draw again"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Book WhatsApp Call
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10 font-semibold">
              <Link href="#packages">
                <ArrowRight className="h-4 w-4 mr-2" />
                See All Packages
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl blur-xl"></div>
          <div className="relative rounded-2xl overflow-hidden border-2 border-purple-200 shadow-2xl">
            <video
              className="w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              aria-label="AstroKalki service intro"
              poster={"/astrology-intro-video-poster.jpg"}
            >
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Whisk_ygn1imzzcjzyimnm1ynmvdotidnwqtlhzdzy0yn-zgnHxnxXAnM77NRNGRN4pv45SWa9MZ.mp4"
                type="video/mp4"
              />
            </video>

          </div>
        </div>
      </section>
    </header>
  );
}