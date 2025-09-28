import { NextRequest, NextResponse } from "next/server";

const DEFAULT_BASE = "https://api.astrokalki.com";
// Lightweight rotating fallbacks to avoid repeating the same message
const FALLBACK_CARDS = [
  {
    name: "The Star (Fallback)",
    description:
      "Hope, guidance, and renewal. Trust your inner compass as the path clears ahead.",
    image: "",
  },
  {
    name: "The Sun (Fallback)",
    description:
      "Clarity and warmth are with you. Take confident steps—momentum is on your side.",
    image: "",
  },
  {
    name: "Strength (Fallback)",
    description:
      "Calm courage and compassion overcome obstacles. Lead with heart, not force.",
    image: "",
  },
  {
    name: "The Empress (Fallback)",
    description:
      "Nurture your ideas—abundance grows where you place gentle attention.",
    image: "",
  },
  {
    name: "Wheel of Fortune (Fallback)",
    description:
      "Change is turning in your favor. Align actions with opportunity as cycles shift.",
    image: "",
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode") === "three" ? "three" : "one";
  const base = (process.env.TAROT_API_BASE || DEFAULT_BASE).replace(/\/$/, "");
  const path = mode === "three" ? "spreads/three" : "cards/onecard";
  const url = `${base}/index.php?route=${path}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // Try to parse JSON even if status is not OK; upstream may return useful payloads with 5xx
    let json: any = null;
    try {
      json = await res.json();
    } catch {}

    if (mode === "three") {
      if (json) {
        return NextResponse.json(json, { status: 200 });
      }
      // ... fall through to three-card fallback below if json was not parseable
    }

    // Normalize one-card response across multiple possible upstream shapes
    const root: any = json ?? {};
    const firstCard = Array.isArray(root.cards) ? root.cards[0] : undefined;
    const candidates = [root.data, root.card, root.result, firstCard, root].filter(Boolean);
    const picked: any = candidates[0] ?? {};

    const data = {
      name:
        picked.name || picked.title || picked.card_name || picked.slug || root.name || root.title || undefined,
      image: picked.image || picked.img || picked.photo || root.image || undefined,
      description:
        picked.description ||
        picked.meaning ||
        picked.meaning_upright ||
        picked.meaning_short ||
        picked.summary ||
        picked.text ||
        picked.message ||
        root.description ||
        undefined,
    } as { name?: string; image?: string; description?: string };

    if (data.name || data.description || data.image) {
      return NextResponse.json({ data, meta: { upstream_status: res.status, ok: res.ok } }, { status: 200 });
    }

    // Upstream not OK or invalid -> fall back
    if (mode === "three") {
      return NextResponse.json(
        {
          data: [],
          meta: { source: "fallback", reason: `upstream_status_${(res as any)?.status ?? "unknown"}` },
        },
        { status: 200 }
      );
    }

    {
      const pick = FALLBACK_CARDS[Math.abs(Date.now()) % FALLBACK_CARDS.length];
      return NextResponse.json(
        {
          data: pick,
          meta: { source: "fallback", reason: `upstream_status_${(res as any)?.status ?? "unknown"}` },
        },
        { status: 200 }
      );
    }
  } catch (err: any) {
    // Network/timeout error -> fall back
    if (mode === "three") {
      return NextResponse.json(
        { data: [], meta: { source: "fallback", error: err?.message || "unknown_error" } },
        { status: 200 }
      );
    }

    {
      const pick = FALLBACK_CARDS[(Math.abs(Date.now()) + 1) % FALLBACK_CARDS.length];
      return NextResponse.json(
        {
          data: pick,
          meta: { source: "fallback", error: err?.message || "unknown_error" },
        },
        { status: 200 }
      );
    }
  }
}