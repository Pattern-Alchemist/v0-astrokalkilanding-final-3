import { NextRequest, NextResponse } from "next/server";

const DEFAULT_BASE = "https://api.astrokalki.com";

async function timedFetch(url: string, opts: RequestInit = {}, timeoutMs = 3000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();
  try {
    const res = await fetch(url, {
      ...opts,
      headers: { Accept: "application/json", ...(opts.headers || {}) },
      cache: "no-store",
      signal: controller.signal,
    });
    const latencyMs = Date.now() - started;
    clearTimeout(id);
    return { ok: res.ok, status: res.status, latencyMs, res } as const;
  } catch (e: any) {
    const latencyMs = Date.now() - started;
    clearTimeout(id);
    const status = e?.name === "AbortError" ? "timeout" : "network_error";
    return { ok: false, status, latencyMs, res: undefined } as const;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const deep = searchParams.get("deep") === "1";
  const upstream = process.env.TAROT_API_BASE || DEFAULT_BASE;

  // Fast health check
  const base = upstream.replace(/\/$/, "");
  const healthCheck = await timedFetch(`${base}/index.php?route=health`, {}, 3000);

  let cardsCheck: { ok: boolean; status: number | string; latencyMs: number } | undefined;
  let preview: { name?: string; slug?: string; image?: string } = {};

  if (deep) {
    const deepCheck = await timedFetch(`${base}/index.php?route=cards/onecard`, {}, 3000);
    cardsCheck = { ok: deepCheck.ok, status: deepCheck.status, latencyMs: deepCheck.latencyMs };
    if (deepCheck.ok && deepCheck.res) {
      try {
        const json = await deepCheck.res.json();
        const data = json?.data ?? json;
        preview = {
          name: data?.name,
          slug: data?.slug,
          image: data?.image || data?.image_url || undefined,
        };
      } catch {
        // ignore JSON errors for preview
      }
    }
  }

  const body = {
    upstream,
    health: {
      ok: healthCheck.ok,
      status: healthCheck.status,
      latencyMs: healthCheck.latencyMs,
    },
    ...(cardsCheck ? { cards: cardsCheck } : {}),
    preview,
    timestamp: new Date().toISOString(),
  };

  const statusCode = 200; // Always 200 with internal health details
  return NextResponse.json(body, { status: statusCode });
}