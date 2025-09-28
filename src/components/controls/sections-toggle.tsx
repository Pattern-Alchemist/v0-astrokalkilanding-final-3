"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SlidersHorizontal } from "lucide-react"

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "services", label: "Services" },
  { id: "packages", label: "Packages / Pricing" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "final-cta", label: "Final CTA" },
  { id: "site-footer", label: "Footer" },
] as const

type SectionKey = typeof SECTIONS[number]["id"]

type VisibilityState = Record<SectionKey, boolean>

const defaultState: VisibilityState = SECTIONS.reduce((acc, s) => {
  acc[s.id] = true
  return acc
}, {} as VisibilityState)

export const SectionsToggle = () => {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<VisibilityState>(defaultState)

  // Load saved state on mount
  useEffect(() => {
    const raw = localStorage.getItem("sections-visibility")
    if (raw) {
      try {
        const saved = JSON.parse(raw) as Partial<VisibilityState>
        setState((prev) => ({ ...prev, ...saved }))
      } catch {}
    }
  }, [])

  // Apply DOM visibility when state changes
  useEffect(() => {
    // Persist
    localStorage.setItem("sections-visibility", JSON.stringify(state))
    // Apply to DOM by toggling `hidden` class on section IDs
    for (const key of Object.keys(state) as SectionKey[]) {
      const el = document.getElementById(key)
      if (!el) continue
      if (state[key]) {
        el.classList.remove("hidden")
      } else {
        el.classList.add("hidden")
      }
    }
  }, [state])

  const allOn = useMemo(() => Object.values(state).every(Boolean), [state])

  const setAll = (value: boolean) => {
    const next: VisibilityState = { ...state }
    for (const k of Object.keys(next) as SectionKey[]) next[k] = value
    setState(next)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle sections</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-black/60 backdrop-blur-md border-white/10">
        <div className="mx-auto w-full max-w-md p-4">
          <DrawerHeader>
            <DrawerTitle className="text-white font-[var(--font-serif)]">Sections</DrawerTitle>
          </DrawerHeader>

          <div className="flex items-center justify-between mb-4">
            <Label className="text-white">Show all</Label>
            <Switch checked={allOn} onCheckedChange={(val) => setAll(val)} />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {SECTIONS.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-md border border-white/10 px-3 py-2">
                <Label htmlFor={`sw-${s.id}`} className="text-white/90">{s.label}</Label>
                <Switch
                  id={`sw-${s.id}`}
                  checked={!!state[s.id]}
                  onCheckedChange={(val) => setState((prev) => ({ ...prev, [s.id]: val }))}
                />
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

// Named export as required
export default SectionsToggle