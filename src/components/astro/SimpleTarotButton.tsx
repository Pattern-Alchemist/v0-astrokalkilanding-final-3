"use client";
import { useState } from "react";

type Card = {
  name: string;
  description: string;
  image?: string | null;
  slug?: string;
  position?: "past" | "present" | "future";
};

export const SimpleTarotButton = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState<Card | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setOpen(true);
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/tarot?mode=one", { cache: "no-store" });
      const j = await r.json();
      if (!j?.success) throw new Error("Tarot API returned an error");
      setCard(j.data as Card);
    } catch (e) {
      setError("Unable to draw a card. Please try again in a moment.");
      setCard(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="rounded-xl px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur text-white shadow-lg"
      >
        Free Tarot Reading
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setOpen(false)}
        >
          <div
            className="mx-4 max-w-md w-full rounded-2xl bg-white/10 backdrop-blur p-5 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {loading && <div className="py-10 text-center">Drawing a card…</div>}
            {!loading && error && <div className="text-red-300">{error}</div>}
            {!loading && card && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold">{card.name}</h3>
                {card.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full rounded-xl object-contain"
                  />
                ) : (
                  <div className="w-full h-48 rounded-xl bg-white/5 grid place-items-center">
                    <span className="opacity-70">No image available</span>
                  </div>
                )}
                <p className="max-h-40 overflow-auto leading-relaxed">{card.description}</p>
                <div className="text-right">
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-2 rounded-lg px-4 py-2 bg-white/15 hover:bg-white/25"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleTarotButton;