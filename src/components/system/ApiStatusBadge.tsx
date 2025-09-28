"use client";
import { useEffect, useState } from "react";

type StatusPayload = {
  upstream: string;
  health: { ok: boolean; status: number | string; latencyMs: number };
  cards?: { ok: boolean; status: number | string; latencyMs: number };
  preview?: { name?: string; slug?: string; image?: string };
  timestamp: string;
};

export const ApiStatusBadge = () => {
  const [data, setData] = useState<StatusPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setError(null);
      const res = await fetch("/api/tarot/status", { cache: "no-store" });
      const json: StatusPayload = await res.json();
      setData(json);
    } catch (e: any) {
      setError(e?.message || "failed");
    }
  };

  useEffect(() => {
    fetchStatus();
    const id = setInterval(fetchStatus, 60_000);
    return () => clearInterval(id);
  }, []);

  const online = !!data?.health?.ok;
  const latency = data?.health?.latencyMs ?? null;

  return (
    <div className="w-full flex justify-center">
      <div
        className={
          `inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm border backdrop-blur-md ` +
          (online
            ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
            : "bg-rose-500/15 text-rose-300 border-rose-400/30 shadow-[0_0_20px_rgba(244,63,94,0.25)]")
        }
        aria-live="polite"
        title={online ? `Upstream: ${data?.upstream}` : (error || "API Offline")}
      >
        <span className={`h-2 w-2 rounded-full ` + (online ? "bg-emerald-400" : "bg-rose-400")} />
        {online ? (
          <span>
            API Online {typeof latency === "number" ? `(${latency}ms)` : ""}
          </span>
        ) : (
          <span>API Offline</span>
        )}
      </div>
    </div>
  );
};