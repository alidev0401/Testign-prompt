import React, { useEffect, useMemo, useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const bg = {
  page: "#0A0B1E",
  sectionCard: "#1A1D4E",
  border: "#2D2F6E",
  announce: "#12163A",
  violet: "#7B61FF",
  teal: "#00D4AA",
  secondaryText: "#A0A8C8",
};

function clampNumber(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, n);
}

function formatMoney(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

function Starfield({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        backgroundImage: [
          "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.4) 0 1px, transparent 2px)",
          "radial-gradient(circle at 30% 80%, rgba(255,255,255,0.35) 0 1px, transparent 2px)",
          "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0 1px, transparent 2px)",
          "radial-gradient(circle at 90% 60%, rgba(255,255,255,0.4) 0 1px, transparent 2px)",
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0 1px, transparent 2px)",
        ].join(","),
      }}
    />
  );
}

function GlowBlobs() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-140px] top-[10%] h-[620px] w-[620px] rounded-full blur-[140px]"
        style={{ background: "rgba(0,212,170,0.08)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-180px] top-[18%] h-[720px] w-[720px] rounded-full blur-[160px]"
        style={{ background: "rgba(123,97,255,0.08)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[22%] top-[66%] h-[520px] w-[520px] rounded-full blur-[140px]"
        style={{ background: "rgba(0,212,170,0.06)" }}
      />
    </>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      ✕
    </span>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      ✓
    </span>
  );
}

function BeforeAfterSlider({
  beforeImg,
  afterImg,
  beforeLabel,
  afterLabel,
}: {
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative w-full">
      <div className="relative mx-auto h-[260px] w-full max-w-[860px] overflow-hidden rounded-[12px] border border-white/10 bg-black/20">
        <img
          src={beforeImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter:
              "grayscale(1) saturate(0.2) contrast(0.9) brightness(0.85)",
            transform: "scale(1.02)",
          }}
          draggable={false}
        />

        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - pos}% 0 0 round 12px)`,
          }}
          aria-hidden
        >
          <img
            src={afterImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "saturate(1.15) contrast(1.05)" }}
            draggable={false}
          />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"
        />

        <div
          aria-hidden
          className="absolute top-0 bottom-0"
          style={{ left: `${pos}%`, width: 1, background: "rgba(0,212,170,0.95)" }}
        />

        <div
          aria-hidden
          className="absolute top-1/2 h-[56px] w-[56px] -translate-y-1/2 rounded-full border border-[#00D4AA]/60 bg-[#0A0B1E]/50"
          style={{
            left: `calc(${pos}% - 28px)`,
            boxShadow: "0 0 30px rgba(0,212,170,0.18)",
          }}
        />

        <div className="absolute left-5 top-5 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white/85 border border-white/10">
          {beforeLabel}
        </div>
        <div className="absolute right-5 top-5 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white/85 border border-white/10">
          {afterLabel}
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to reveal before and after"
        className="mt-4 w-full accent-[#00D4AA]"
      />
    </div>
  );
}

function ExitIntentPopup({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const key = "startupsadvisory_exit_intent_v1";
    if (!window?.localStorage) return;
    if (window.localStorage.getItem(key)) return;

    let triggered = false;
    const handler = (e: MouseEvent) => {
      if (triggered) return;
      if (e.clientY <= 0) {
        triggered = true;
        window.localStorage.setItem(key, "1");
        setOpen(true);
      }
    };

    window.addEventListener("mouseleave", handler);
    return () => window.removeEventListener("mouseleave", handler);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" style={{ background: "rgba(10,11,30,0.9)" }} />
      <div
        className="relative w-full max-w-[480px] rounded-[20px] border border-[#2D2F6E] bg-[#1A1D4E] p-10"
        style={{ boxShadow: "0 0 0 1px rgba(0,212,170,0.08), 0 30px 80px rgba(0,0,0,0.6)" }}
      >
        <div className="text-white text-2xl font-extrabold">You were THIS close.</div>
        <div className="mt-3 text-[#A0A8C8] leading-relaxed">
          Don't let your competitor figure this out before you. Get 20% off your first month — this offer disappears when you close this.
        </div>

        <div className="mt-6">
          <Input
            placeholder="Email"
            type="email"
            className="border border-[#7B61FF]/70 bg-[#0A0B1E] text-white placeholder:text-white/35"
          />
        </div>

        <button
          className="mt-4 block w-full rounded-[8px] bg-[#00D4AA] px-6 py-3 text-black font-extrabold"
          onClick={() => {
            setOpen(false);
            onClose();
          }}
        >
          Claim 20% Off Now →
        </button>

        <button
          className="mt-3 text-sm text-[#A0A8C8] underline underline-offset-4 hover:text-white"
          onClick={() => {
            setOpen(false);
            onClose();
          }}
        >
          No thanks, I prefer paying full price
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [navOpen, setNavOpen] = useState(false);

  // Calculator
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000);
  const [conversionRate, setConversionRate] = useState(2);
  const [challenge, setChallenge] = useState<string>("Weak brand identity");
  const [result, setResult] = useState<number | null>(null);
  const [gain, setGain] = useState<number | null>(null);
  const [showCTA, setShowCTA] = useState(false);

  const moneyCalculated = useMemo(() => {
    const rev = clampNumber(monthlyRevenue);
    const cr = clampNumber(conversionRate);
    const monthlyLoss = (rev * (cr / 100)) * 0.15;
    const extra = rev * 0.01;
    return { monthlyLoss, extra };
  }, [monthlyRevenue, conversionRate]);

  const [pricingMode, setPricingMode] = useState<"monthly" | "quarterly">("monthly");
  const pricing = useMemo(() => {
    const factor = pricingMode === "quarterly" ? 0.8 : 1;
    return {
      starter: 299 * factor,
      growth: 599 * factor,
      scale: 999 * factor,
    };
  }, [pricingMode]);

  const slides = useMemo(
    () => [
      {
        beforeImg: "/assets/startupsadvisory-03.jpg",
        afterImg: "/assets/startupsadvisory-01.jpg",
        delivered: "Delivered in 48hrs for Startups",
        beforeLabel: "Before: faded trust",
        afterLabel: "After: brand clarity",
      },
      {
        beforeImg: "/assets/startupsadvisory-02.jpg",
        afterImg: "/assets/startupsadvisory-04.jpg",
        delivered: "Delivered in 48hrs for Creators",
        beforeLabel: "Before: low trust",
        afterLabel: "After: conversion-ready",
      },
      {
        beforeImg: "/assets/startupsadvisory-05.jpg",
        afterImg: "/assets/startupsadvisory-06.jpg",
        delivered: "Delivered in 48hrs for Agencies",
        beforeLabel: "Before: generic identity",
        afterLabel: "After: client magnet",
      },
    ],
    [],
  );

  const [slideIndex, setSlideIndex] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(t);
  }, [auto, slides.length]);

  const scrollToCalc = () => {
    document
      .getElementById("money-calculator")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleInactionScroll = () => {
    window.scrollTo({ top: window.scrollY + 200, behavior: "smooth" });
  };

  const [faqOpen, setFaqOpen] = useState<string | null>("q1");

  return (
    <div className="min-h-screen" style={{ background: bg.page }}>
      {/* Announcement bar */}
      <div
        className="relative z-[60] flex items-center justify-center gap-3 px-4 py-3"
        style={{ background: bg.announce }}
      >
        <div className="text-sm text-white font-semibold tracking-tight">
          🔥 48-Hour Delivery Guarantee — Or We Work Free Until You Love It
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <button
            className="rounded-[8px] bg-[#00D4AA] px-4 py-2 text-sm font-extrabold text-black"
            onClick={scrollToCalc}
          >
            Claim Your Spot →
          </button>
        </div>
      </div>

      {/* Sticky nav */}
      <div
        className="sticky top-0 z-[70]"
        style={{
          background: "rgba(10,11,30,0.9)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="text-white font-extrabold tracking-tight">
              Nexvora
            </div>
            <span
              aria-hidden
              className="h-2 w-2 rounded-full"
              style={{
                background: bg.teal,
                boxShadow: "0 0 22px rgba(0,212,170,0.35)",
              }}
            />
            <img
              src="/.dyad/media/startupsadvisory.svg"
              alt="Startupsadvisory.ai logo"
              className="h-7 w-7"
            />
          </div>

          <div className="hidden lg:flex items-center gap-7 text-sm text-white/85">
            {[
              "Results",
              "Services",
              "Pricing",
              "For Agencies",
              "Portfolio",
            ].map((t) => (
              <a key={t} href="#" className="hover:text-white transition-colors">
                {t}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden md:inline-flex text-sm text-white/60 hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToCalc();
              }}
            >
              ROI Calculator
            </a>
            <button
              className="hidden md:inline-flex items-center rounded-[40px] bg-[#00D4AA] px-5 py-2 text-sm font-extrabold text-black"
              onClick={scrollToCalc}
            >
              Hire Your Team →
            </button>
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-[10px] border border-white/10 bg-white/5 px-3 py-2 text-white"
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Open menu"
            >
              {navOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="lg:hidden border-t border-white/10">
            <div className="mx-auto max-w-[1280px] px-4 py-4 flex flex-col gap-3">
              {[
                "Results",
                "Services",
                "Pricing",
                "For Agencies",
                "Portfolio",
              ].map((t) => (
                <a
                  key={t}
                  href="#"
                  className="text-white/80 hover:text-white text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setNavOpen(false);
                  }}
                >
                  {t}
                </a>
              ))}
              <button
                className="mt-2 rounded-[40px] bg-[#00D4AA] px-5 py-2 text-sm font-extrabold text-black"
                onClick={() => {
                  setNavOpen(false);
                  scrollToCalc();
                }}
              >
                Hire Your Team →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 1 — HERO */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "calc(100vh - 60px)" }}
      >
        <Starfield className="absolute inset-0 opacity-70" />
        <div className="absolute inset-0" style={{ background: bg.page }} />
        <GlowBlobs />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,11,30,0.35) 0%, rgba(10,11,30,0.85) 100%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-[10] mx-auto max-w-[1280px] px-4 pt-10 pb-10">
          <div className="hidden md:block">
            <div className="relative flex h-[560px] items-stretch overflow-hidden">
              {/* LEFT HALF */}
              <div
                className="relative flex-1 overflow-hidden rounded-[18px]"
                style={{ background: "rgba(255,64,64,0.06)" }}
              >
                <img
                  src="/assets/startupsadvisory-03.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    filter:
                      "grayscale(1) saturate(0.25) contrast(0.85) brightness(0.72)",
                    transform: "scale(1.02)",
                  }}
                  draggable={false}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(10,11,30,0.86) 0%, rgba(10,11,30,0.46) 55%, rgba(10,11,30,0.76) 100%)",
                  }}
                />

                <div className="relative h-full p-8 flex flex-col">
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 w-fit">
                    Without Nexvora
                  </div>
                  <h1 className="mt-6 text-white/90 text-[44px] font-extrabold leading-none tracking-[-0.02em]">
                    Broken website. Generic logo. No clients.
                  </h1>

                  <div className="mt-6 space-y-4">
                    {[
                      "Freelancer ghosted after deposit",
                      "Website hasn't changed in 2 years",
                      "Competitor just rebranded and won your client",
                    ].map((t) => (
                      <div key={t} className="flex items-start gap-3">
                        <IconX className="mt-0.5 text-red-300 text-sm" />
                        <div
                          className="text-sm leading-relaxed"
                          style={{ color: "rgba(255,140,140,0.95)" }}
                        >
                          {t}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CENTER DIVIDER */}
              <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px">
                <div
                  className="absolute inset-0"
                  style={{ boxShadow: "0 0 0 1px rgba(0,212,170,0.18)" }}
                />
                <div
                  className="absolute left-0 top-0 bottom-0 w-[1px]"
                  style={{
                    background: bg.teal,
                    boxShadow: "0 0 35px rgba(0,212,170,0.35)",
                  }}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-2 text-xs font-semibold text-white/70 rounded-full border border-white/10 bg-black/45 backdrop-blur">
                  Which side are you on?
                </div>
              </div>

              {/* RIGHT HALF */}
              <div
                className="relative flex-1 overflow-hidden rounded-[18px]"
                style={{ background: "rgba(0,212,170,0.05)" }}
              >
                <img
                  src="/assets/startupsadvisory-01.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    filter:
                      "saturate(1.18) contrast(1.05) brightness(0.90)",
                    transform: "scale(1.02)",
                  }}
                  draggable={false}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(10,11,30,0.22) 0%, rgba(10,11,30,0.52) 55%, rgba(10,11,30,0.80) 100%)",
                  }}
                />

                <div className="relative h-full p-8 flex flex-col">
                  <div className="inline-flex items-center rounded-full border border-[#00D4AA]/30 bg-[#00D4AA]/10 px-3 py-1 text-xs font-semibold text-[#00D4AA] w-fit">
                    With Nexvora
                  </div>
                  <h1 className="mt-6 text-white text-[44px] font-extrabold leading-none tracking-[-0.02em]">
                    Live brand. 48hr delivery. Clients coming in.
                  </h1>

                  <div className="mt-6 space-y-4">
                    {[
                      "Full brand delivered this week",
                      "Website converting at 3x",
                      "You just won that client back",
                    ].map((t) => (
                      <div key={t} className="flex items-start gap-3">
                        <IconCheck className="mt-0.5 text-[#00D4AA] text-sm" />
                        <div
                          className="text-sm leading-relaxed"
                          style={{ color: "rgba(0,212,170,0.95)" }}
                        >
                          {t}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile stacked */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            <div className="rounded-[18px] border border-white/10 bg-black/30 p-6 relative overflow-hidden">
              <img
                src="/assets/startupsadvisory-03.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  filter:
                    "grayscale(1) saturate(0.25) contrast(0.85) brightness(0.72)",
                }}
                draggable={false}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,11,30,0.86) 0%, rgba(10,11,30,0.58) 55%, rgba(10,11,30,0.76) 100%)",
                }}
              />
              <div className="relative">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70 w-fit">
                  Without Nexvora
                </div>
                <h2 className="mt-4 text-white/90 text-[34px] font-extrabold leading-none tracking-[-0.02em]">
                  Broken website. Generic logo. No clients.
                </h2>
                <div className="mt-5 space-y-3">
                  {[
                    "Freelancer ghosted after deposit",
                    "Website hasn't changed in 2 years",
                    "Competitor just rebranded and won your client",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-3">
                      <span className="mt-1 text-red-300">✕</span>
                      <div
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(255,140,140,0.95)" }}
                      >
                        {t}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[18px] border border-white/10 bg-black/20 p-6 relative overflow-hidden">
              <img
                src="/assets/startupsadvisory-01.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: "saturate(1.18) contrast(1.05) brightness(0.90)" }}
                draggable={false}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,11,30,0.20) 0%, rgba(10,11,30,0.58) 55%, rgba(10,11,30,0.82) 100%)",
                }}
              />
              <div className="relative">
                <div className="inline-flex items-center rounded-full border border-[#00D4AA]/30 bg-[#00D4AA]/10 px-3 py-1 text-xs font-semibold text-[#00D4AA] w-fit">
                  With Nexvora
                </div>
                <h2 className="mt-4 text-white text-[34px] font-extrabold leading-none tracking-[-0.02em]">
                  Live brand. 48hr delivery. Clients coming in.
                </h2>
                <div className="mt-5 space-y-3">
                  {[
                    "Full brand delivered this week",
                    "Website converting at 3x",
                    "You just won that client back",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-3">
                      <span className="mt-1 text-[#00D4AA]">✓</span>
                      <div
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(0,212,170,0.95)" }}
                      >
                        {t}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Below split */}
          <div className="relative z-[20] -mt-2 flex flex-col items-center text-center">
            <button
              className="mt-10 rounded-[8px] bg-[#00D4AA] px-10 py-4 text-black text-lg font-extrabold"
              onClick={scrollToCalc}
            >
              I'm Ready to Win →
            </button>
            <button
              className="mt-4 text-[13px] text-[#A0A8C8] hover:text-white cursor-pointer underline-offset-4 hover:underline"
              onClick={handleInactionScroll}
            >
              I'll think about it (and fall further behind)
            </button>
            <div className="mt-3 text-sm text-white/70">
              No contracts. No risk. First draft in 48 hours.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Social proof ticker */}
      <section className="relative" style={{ background: bg.announce }}>
        <div className="mx-auto max-w-[1280px] px-4 py-10">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className="h-[52px] w-[52px] rounded-[16px] border border-white/10 bg-white/5 overflow-hidden"
                aria-hidden
              >
                <img
                  src="/assets/startupsadvisory-02.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ filter: "saturate(1.1) contrast(1.05) brightness(0.95)" }}
                  draggable={false}
                />
              </div>
              <div className="text-white/90 font-extrabold">
                Trusted by 50+ businesses worldwide
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-5 overflow-hidden w-[680px]">
                <div
                  className="flex animate-[marquee_18s_linear_infinite] gap-5"
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[40px] w-[120px] rounded-[8px] border border-white/10 bg-white/5 flex items-center justify-center"
                      style={{ color: "rgba(255,255,255,0.35)", fontWeight: 700 }}
                    >
                      Logo
                    </div>
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`b${i}`}
                      className="h-[40px] w-[120px] rounded-[8px] border border-white/10 bg-white/5 flex items-center justify-center"
                      style={{ color: "rgba(255,255,255,0.35)", fontWeight: 700 }}
                    >
                      Logo
                    </div>
                  ))}
                </div>
                <style>{`
                  @keyframes marquee_18s_linear_infinite { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                `}</style>
              </div>

              <div className="flex items-center gap-5 text-white/90">
                {["48hr avg delivery", "100% revision policy", "$2M+ client revenue generated"].map((s) => (
                  <div key={s} className="text-sm font-extrabold">
                    <span className="text-[#00D4AA]">•</span> {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — The money calculator */}
      <section id="money-calculator" className="relative" style={{ background: bg.announce }}>
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-flex rounded-full border border-[#00D4AA]/30 bg-[#00D4AA]/10 px-3 py-1 text-xs font-extrabold text-[#00D4AA]">
                The real cost of doing nothing
              </div>
              <h2 className="mt-5 text-white text-3xl md:text-4xl font-extrabold leading-tight">
                How much money are you losing <span style={{ color: bg.teal }}>every single month?</span>
              </h2>
              <p className="mt-4 text-[#A0A8C8] leading-relaxed">
                Bad design isn't free. Every month without a converting brand is revenue walking out the door. Find out exactly how much.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Takes 30 seconds",
                  "Uses your real numbers",
                  "Shows your Nexvora ROI instantly",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#00D4AA] font-extrabold">✓</span>
                    <div className="text-sm text-white/80">{t}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[16px] overflow-hidden border border-white/10 bg-black/20">
                <img
                  src="/assets/startupsadvisory-09.jpg"
                  alt=""
                  className="h-[240px] w-full object-cover"
                  style={{ filter: "saturate(1.1) contrast(1.05)" }}
                  draggable={false}
                />
              </div>
            </div>

            <div className="rounded-[16px] border border-[#2D2F6E] bg-[#1A1D4E] p-8 md:p-10">
              <div className="relative mb-5">
                <div className="text-white/90 text-sm font-extrabold">Calculator</div>
                <div className="mt-1 text-[#A0A8C8] text-sm">No guessing. Press calculate. Feel it.</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-white/80 text-sm font-bold">
                    Your monthly revenue ($)
                  </div>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50">$</div>
                    <Input
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                      inputMode="numeric"
                      placeholder="e.g. 10000"
                      className="pl-8 border border-[#7B61FF]/70 bg-[#0A0B1E] text-white placeholder:text-white/35"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-white/80 text-sm font-bold">
                    Your current conversion rate (%)
                  </div>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/50">%</div>
                    <Input
                      value={conversionRate}
                      onChange={(e) => setConversionRate(Number(e.target.value))}
                      inputMode="numeric"
                      placeholder="e.g. 2"
                      className="pl-8 border border-[#7B61FF]/70 bg-[#0A0B1E] text-white placeholder:text-white/35"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-white/80 text-sm font-bold">
                  Your biggest challenge
                </div>
                <div className="mt-2">
                  <Select value={challenge} onValueChange={setChallenge}>
                    <SelectTrigger className="w-full border border-[#7B61FF]/70 bg-[#0A0B1E] text-white">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Weak brand identity",
                        "Low website traffic",
                        "No social presence",
                        "Can't afford full team",
                      ].map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                className="mt-6 w-full rounded-[16px] bg-[#00D4AA] px-6 py-4 text-black font-extrabold"
                onClick={() => {
                  setResult(moneyCalculated.monthlyLoss);
                  setGain(moneyCalculated.extra);
                  setShowCTA(true);
                }}
              >
                Calculate My Loss →
              </button>

              {showCTA && (
                <div className="mt-6 rounded-[12px] border border-white/10 bg-black/20 p-6">
                  <div className="text-[34px] md:text-[42px] font-extrabold text-[#7B61FF]">
                    ${formatMoney(result ?? 0)} lost per month
                  </div>
                  <div className="mt-2 text-white/90 text-sm">
                    If Nexvora improves your conversion rate by just 1%, you gain ${formatMoney(gain ?? 0)} extra/month
                  </div>
                  <div className="mt-2 text-[#00D4AA] text-sm font-bold">
                    The Growth plan costs $599/mo. It pays for itself when just 1 new client signs.
                  </div>

                  <button
                    className="mt-4 w-full rounded-[8px] bg-[#00D4AA] px-6 py-3 text-black font-extrabold"
                    onClick={() => {
                      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Fix This Now →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Services */}
      <section style={{ background: bg.page }}>
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:py-20" id="services">
          <div>
            <div className="inline-flex rounded-full border border-[#00D4AA]/30 bg-[#00D4AA]/10 px-3 py-1 text-xs font-extrabold text-[#00D4AA]">
              What we fix
            </div>
            <h2 className="mt-5 text-white text-3xl md:text-4xl font-extrabold">
              Every service is built to <span style={{ color: bg.teal }}>solve one problem</span> your business has right now
            </h2>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="brand" className="w-full">
              <TabsList className="w-full justify-start gap-2 bg-transparent p-0 h-auto flex-wrap">
                {[
                  { id: "brand", label: "Brand & Identity" },
                  { id: "web", label: "Web & Digital" },
                  { id: "video", label: "Video & Motion" },
                  { id: "agents", label: "AI Agents" },
                  { id: "team", label: "Team Hire" },
                ].map((t) => (
                  <TabsTrigger
                    key={t.id}
                    value={t.id}
                    className="rounded-full border border-[#2D2F6E] bg-[#2D2F6E]/30 text-white px-5 py-2 text-sm font-extrabold data-[state=active]:bg-[#7B61FF] data-[state=active]:border-[#7B61FF] data-[state=active]:text-white"
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {[
                {
                  value: "brand",
                  problem: "The problem: Nobody takes you seriously",
                  problemTone: "#FF6B6B",
                  title: "Logo & Brand Identity",
                  desc: "We make your brand impossible to ignore — so clients choose you before you even speak.",
                  pills: [
                    "Logo design",
                    "Brand guidelines",
                    "Color palette",
                    "Typography",
                    "Business cards",
                    "Social kit",
                    "Brand strategy",
                  ],
                  cta: "Fix My Brand →",
                  img: "/assets/startupsadvisory-07.jpg",
                },
                {
                  value: "web",
                  problem: "The problem: Your website is costing you clients",
                  problemTone: "#FF6B6B",
                  title: "Website Design & Development",
                  desc: "Built to convert, not just look good. Every pixel earns its place.",
                  pills: [
                    "Landing pages",
                    "Next.js",
                    "React",
                    "CMS",
                    "eCommerce",
                    "SEO-ready",
                    "Speed optimization",
                  ],
                  cta: "Build My Site →",
                  img: "/assets/startupsadvisory-08.jpg",
                },
                {
                  value: "video",
                  problem: "The problem: Nobody watches your content",
                  problemTone: "#FF6B6B",
                  title: "Video & Motion Design",
                  pills: [
                    "Explainer videos",
                    "Logo animation",
                    "Reels",
                    "Product demo",
                    "Motion graphics",
                    "Brand video",
                  ],
                  desc: "Explainers, reels, demos — motion that makes people stop scrolling.",
                  cta: "Create My Video →",
                  img: "/assets/startupsadvisory-10.jpg",
                },
                {
                  value: "agents",
                  problem: "The problem: You're losing leads at 2am",
                  problemTone: "#FF6B6B",
                  title: "WhatsApp AI Agents",
                  pills: [
                    "WhatsApp automation",
                    "Lead capture",
                    "Auto-reply",
                    "Booking bot",
                    "Custom AI flows",
                  ],
                  desc: "Your business talks to clients 24/7 — even when you're asleep.",
                  cta: "Deploy My Agent →",
                  img: "/assets/startupsadvisory-04.jpg",
                },
                {
                  value: "team",
                  problem: "The problem: You need a team but can't afford one",
                  problemTone: "#FF6B6B",
                  title: "Hire Our Team as Yours",
                  pills: [
                    "Designer hire",
                    "Developer hire",
                    "Motion artist",
                    "Full team package",
                    "White-label ready",
                  ],
                  desc: "White-label. Dedicated. Inside your tools. Under your brand.",
                  cta: "Hire My Team →",
                  img: "/assets/startupsadvisory-05.jpg",
                },
              ].map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                  <div className="mt-6 rounded-[16px] border border-[#2D2F6E] bg-[#1A1D4E] p-10 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      <div>
                        <div className="text-xs font-extrabold" style={{ color: tab.problemTone }}>
                          {tab.problem}
                        </div>
                        <div className="mt-3 text-white text-3xl font-extrabold">{tab.title}</div>
                        <div className="mt-2 text-[#00D4AA] text-sm font-bold">{tab.desc}</div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {tab.pills.map((p) => (
                            <div
                              key={p}
                              className="rounded-full border border-[#7B61FF]/60 bg-[#7B61FF]/10 px-4 py-2 text-xs font-extrabold text-white/80"
                            >
                              {p}
                            </div>
                          ))}
                        </div>

                        <button
                          className="mt-7 rounded-[8px] bg-[#00D4AA] px-6 py-4 text-black font-extrabold"
                          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                        >
                          {tab.cta}
                        </button>
                      </div>

                      <div className="relative">
                        <div className="relative rounded-[16px] border border-white/10 overflow-hidden bg-black/20">
                          <img
                            src={tab.img}
                            alt=""
                            className="h-[320px] w-full object-cover"
                            style={{ filter: "saturate(1.15) contrast(1.05)" }}
                            draggable={false}
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(10,11,30,0.12) 0%, rgba(10,11,30,0.55) 65%, rgba(10,11,30,0.78) 100%)",
                            }}
                          />
                          <div className="absolute left-5 bottom-5 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-extrabold text-white/90 backdrop-blur">
                            48hr delivery • Teal-led execution
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Lead magnet #1 */}
      <section style={{ background: bg.announce }}>
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:py-20">
          <div className="mx-auto max-w-[780px] rounded-[16px] border-2 border-[#00D4AA] bg-[#1A1D4E] p-10 md:p-12">
            <div className="flex flex-col items-center text-center">
              <div
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full"
                style={{ background: bg.teal, boxShadow: "0 0 30px rgba(0,212,170,0.25)" }}
                aria-hidden
              >
                🔎
              </div>
              <h3 className="mt-5 text-white text-2xl md:text-3xl font-extrabold">
                Find out exactly how much your brand is costing you
              </h3>
              <p className="mt-3 text-[#A0A8C8] leading-relaxed">
                We'll audit your logo, website and social in 24 hours and tell you the 3 specific things killing your conversions — for free.
              </p>

              <div className="mt-7 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Name"
                  className="bg-[#0A0B1E] border border-[#7B61FF]/70 text-white placeholder:text-white/35"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  className="bg-[#0A0B1E] border border-[#7B61FF]/70 text-white placeholder:text-white/35"
                />
              </div>

              <button
                className="mt-5 w-full rounded-[8px] bg-[#00D4AA] px-6 py-4 text-black font-extrabold"
                onClick={() => console.log("free brand audit submit")}
              >
                Get My Free Brand Audit →
              </button>

              <div className="mt-3 text-sm text-[#A0A8C8]">
                24hr delivery · No sales call required · 100% free
              </div>

              <div className="mt-6 w-full overflow-hidden rounded-[14px] border border-white/10">
                <img
                  src="/assets/startupsadvisory-06.jpg"
                  alt=""
                  className="h-[180px] w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — The 48-hour dare */}
      <section style={{ background: bg.page }}>
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute left-1/2 top-[120px] h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[140px]"
            style={{ background: "rgba(0,212,170,0.14)" }}
          />

          <div className="mx-auto max-w-[1280px] px-4 py-14 md:py-20">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center rounded-full border border-[#00D4AA]/30 px-4 py-2 text-sm font-extrabold text-[#00D4AA]">
                Our promise to you
              </div>

              <h2 className="mt-6 text-white text-4xl md:text-6xl font-extrabold leading-none">
                Give us <span style={{ color: bg.teal }}>48 hours.</span>
                <br />
                If you don't love it — we work <span style={{ color: bg.violet }}>free</span> until you do.
              </h2>

              <p className="mt-4 text-[#A0A8C8] max-w-[580px] leading-relaxed">
                No other agency will say this. Because they can't back it up. We can — and we do, for every single client.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {[
                  { a: "48hrs", b: "Average first delivery" },
                  { a: "100%", b: "Revision satisfaction" },
                  { a: "0", b: "Refund requests this year" },
                ].map((s) => (
                  <div key={s.a} className="rounded-[12px] border border-white/10 bg-[#1A1D4E] p-6">
                    <div className="text-white font-extrabold text-3xl">{s.a}</div>
                    <div className="mt-2 text-[#A0A8C8] text-sm">{s.b}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 w-full">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-white/80 font-bold">Before / After reveal</div>
                  <div className="flex items-center gap-2">
                    <button
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:text-white"
                      onClick={() => setAuto(false)}
                    >
                      Drag
                    </button>
                    <button
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:text-white"
                      onClick={() => setAuto(true)}
                    >
                      Auto
                    </button>
                  </div>
                </div>

                <div
                  className="mt-4"
                  onMouseEnter={() => setAuto(false)}
                  onMouseLeave={() => setAuto(true)}
                >
                  <BeforeAfterSlider
                    beforeImg={slides[slideIndex].beforeImg}
                    afterImg={slides[slideIndex].afterImg}
                    beforeLabel={slides[slideIndex].beforeLabel}
                    afterLabel={slides[slideIndex].afterLabel}
                  />
                </div>

                <div className="mt-3 text-center text-sm font-extrabold text-[#A0A8C8]">
                  {slides[slideIndex].delivered}
                </div>

                <div className="mt-4 flex items-center justify-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className="h-2.5 w-8 rounded-full"
                      style={{
                        background:
                          i === slideIndex ? "#00D4AA" : "rgba(255,255,255,0.12)",
                        boxShadow:
                          i === slideIndex
                            ? "0 0 20px rgba(0,212,170,0.35)"
                            : "none",
                      }}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  className="mt-8 rounded-[8px] bg-[#00D4AA] px-8 py-4 text-black font-extrabold text-lg w-full md:w-auto"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Start My 48-Hour Project →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — Pricing */}
      <section id="pricing" style={{ background: bg.announce }}>
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:py-20">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-[#00D4AA]/30 bg-[#00D4AA]/10 px-3 py-1 text-xs font-bold text-[#00D4AA]">
              Not a cost. An investment.
            </div>
            <h2 className="mt-5 text-white text-3xl md:text-4xl font-extrabold">
              One client pays for <span style={{ color: bg.teal }}>6 months</span> of Nexvora.
            </h2>

            <div className="mt-6 flex items-center justify-center">
              <div className="rounded-full border border-white/10 bg-white/5 p-1 flex gap-1">
                <button
                  className={`rounded-full px-5 py-2 text-sm font-extrabold ${
                    pricingMode === "monthly" ? "bg-[#7B61FF]" : "bg-transparent text-white/70"
                  }`}
                  onClick={() => setPricingMode("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`rounded-full px-5 py-2 text-sm font-extrabold ${
                    pricingMode === "quarterly" ? "bg-[#7B61FF]" : "bg-transparent text-white/70"
                  }`}
                  onClick={() => setPricingMode("quarterly")}
                >
                  Quarterly
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Starter */}
            <div className="rounded-[16px] border border-[#2D2F6E] bg-[#1A1D4E] p-7 overflow-hidden">
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/80">
                For Startups
              </div>
              <div className="mt-4 text-white font-extrabold text-3xl">
                ${Math.round(pricing.starter)}/mo
              </div>
              <div className="mt-2 text-[#00D4AA] text-sm font-bold">
                = 1 new client per month covers this 3x over
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "Logo & brand refresh",
                  "Landing page design",
                  "48hr first delivery draft",
                  "Revision policy included",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#00D4AA]">✓</span>
                    <div className="text-sm text-white/80">{f}</div>
                  </div>
                ))}
              </div>

              <button
                className="mt-6 w-full rounded-[8px] bg-transparent border border-[#00D4AA] px-5 py-3 text-[#00D4AA] font-extrabold"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started →
              </button>

              <div className="mt-6 overflow-hidden rounded-[12px] border border-white/10">
                <img
                  src="/assets/startupsadvisory-04.jpg"
                  alt=""
                  className="h-[120px] w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>

            {/* Growth */}
            <div
              className="relative rounded-[16px] border border-[#7B61FF] bg-[#1A1D4E] p-7 overflow-hidden"
              style={{
                boxShadow:
                  "0 0 0 2px rgba(123,97,255,0.22), 0 0 50px rgba(123,97,255,0.10)",
              }}
            >
              <div className="rounded-full bg-[#7B61FF] px-4 py-2 text-xs font-extrabold text-white inline-flex items-center gap-2">
                Most Popular
              </div>

              <div className="mt-4 text-white font-extrabold text-3xl">
                ${Math.round(pricing.growth)}/mo
              </div>
              <div className="mt-2 text-[#00D4AA] text-sm font-bold">
                = Your first retainer client pays for 6 months
              </div>

              <div className="mt-5 space-y-3">
                {["Brand + site conversion pass", "Motion + video assets", "AI-ready onboarding", "Priority revision loop"].map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#00D4AA]">✓</span>
                    <div className="text-sm text-white/80">{f}</div>
                  </div>
                ))}
              </div>

              <button
                className="mt-6 w-full rounded-[8px] bg-[#00D4AA] px-5 py-3 text-black font-extrabold"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start Growing →
              </button>

              <div className="mt-6 overflow-hidden rounded-[12px] border border-white/10">
                <img
                  src="/assets/startupsadvisory-08.jpg"
                  alt=""
                  className="h-[120px] w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>

            {/* Scale */}
            <div className="rounded-[16px] border border-[#2D2F6E] bg-[#1A1D4E] p-7 overflow-hidden">
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/80">
                For Agencies
              </div>
              <div className="mt-4 text-white font-extrabold text-3xl">
                ${Math.round(pricing.scale)}/mo
              </div>
              <div className="mt-2 text-[#00D4AA] text-sm font-bold">
                = Replace $8,000/mo in-house costs
              </div>

              <div className="mt-5 space-y-3">
                {["White-label production", "Parallel deliveries", "Team hire under your brand", "48hr turnarounds"].map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#00D4AA]">✓</span>
                    <div className="text-sm text-white/80">{f}</div>
                  </div>
                ))}
              </div>

              <button
                className="mt-6 w-full rounded-[8px] bg-transparent border border-[#00D4AA] px-5 py-3 text-[#00D4AA] font-extrabold"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Scale Up →
              </button>

              <div className="mt-6 overflow-hidden rounded-[12px] border border-white/10">
                <img
                  src="/assets/startupsadvisory-10.jpg"
                  alt=""
                  className="h-[120px] w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* Agency math */}
          <div className="mt-6 rounded-[16px] border border-[#2D2F6E] bg-[#1A1D4E] p-7 md:p-8">
            <h3 className="text-white text-2xl font-extrabold">Agencies: the brutal math</h3>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse">
                <thead>
                  <tr>
                    {["", "In-House Designer", "Nexvora Team Member"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-sm font-extrabold"
                        style={{ background: "rgba(123,97,255,0.18)", color: "#EDEAFF" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { left: "Monthly cost", a: "$6,500", b: "$800" },
                    { left: "Tools included", a: "No ($400/mo extra)", b: "Yes" },
                    { left: "Notice period", a: "1 month", b: "Cancel anytime" },
                    { left: "Output speed", a: "1 task/day", b: "48hr delivery" },
                    { left: "White-label", a: "No", b: "Yes" },
                  ].map((r, i) => (
                    <tr key={r.left} style={{ background: i % 2 === 0 ? bg.page : bg.announce }}>
                      <td className="px-4 py-3 text-sm font-bold text-white/90" style={{ borderTop: "1px solid rgba(45,47,110,0.6)" }}>
                        {r.left}
                      </td>
                      <td className="px-4 py-3 text-sm text-white/70" style={{ borderTop: "1px solid rgba(45,47,110,0.6)" }}>
                        {r.a}
                      </td>
                      <td className="px-4 py-3 text-sm text-white/70" style={{ borderTop: "1px solid rgba(45,47,110,0.6)" }}>
                        {r.b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-[#A0A8C8] text-sm">
              The math makes the decision. We just show you the numbers.
            </div>

            <button
              className="mt-4 rounded-[8px] bg-[#7B61FF] px-7 py-3 text-white font-extrabold w-full md:w-auto"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Talk About Team Hire →
            </button>

            <div className="mt-6 text-center text-sm text-[#A0A8C8]">
              No contracts · Cancel anytime · 30-day satisfaction guarantee
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Portfolio */}
      <section style={{ background: bg.page }}>
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:py-20">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold">
            Results that <span style={{ color: bg.teal }}>speak louder</span> than promises
          </h2>

          <div className="mt-7 flex flex-wrap gap-2">
            {[
              { id: "all", label: "All" },
              { id: "branding", label: "Branding" },
              { id: "web", label: "Websites" },
              { id: "video", label: "Video" },
              { id: "agents", label: "AI Agents" },
            ].map((t, i) => (
              <div
                key={t.id}
                className={`rounded-full border px-5 py-2 text-sm font-extrabold ${
                  i === 0
                    ? "bg-[#7B61FF] border-[#7B61FF]"
                    : "border-[#2D2F6E] bg-transparent text-white/70"
                }`}
              >
                {t.label}
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => {
              const img = [
                "/assets/startupsadvisory-01.jpg",
                "/assets/startupsadvisory-02.jpg",
                "/assets/startupsadvisory-04.jpg",
                "/assets/startupsadvisory-05.jpg",
                "/assets/startupsadvisory-06.jpg",
                "/assets/startupsadvisory-08.jpg",
              ][i];

              return (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-[16px] border border-[#2D2F6E] bg-[#1A1D4E]"
                >
                  <div className="relative">
                    <img
                      src={img}
                      alt=""
                      className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      draggable={false}
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30" />

                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-extrabold text-white/85">
                        {i % 2 === 0 ? "Branding" : "Web"}
                      </div>

                      <div className="absolute left-4 right-4 bottom-4">
                        <div className="rounded-[12px] border border-transparent bg-black/35 backdrop-blur p-4 transition-colors group-hover:border-[#00D4AA]">
                          <div className="text-sm font-extrabold text-white/90">
                            {i % 3 === 0
                              ? "3x conversion"
                              : i % 3 === 1
                                ? "+42% leads"
                                : "48hr delivery"}
                          </div>
                          <div className="mt-2 text-xs font-bold text-[#00D4AA]">
                            Delivered in 48hrs
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 9 — Lead magnet #2 */}
      <section style={{ background: bg.announce }}>
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:py-20">
          <div className="mx-auto max-w-[640px] rounded-[16px] border border-[#00D4AA] bg-[#1A1D4E] p-10">
            <h3 className="text-white text-2xl md:text-3xl font-extrabold text-center">
              Free PDF: <span style={{ color: bg.teal }}>The Real Cost of Bad Design</span>
            </h3>
            <p className="mt-3 text-[#A0A8C8] text-center leading-relaxed">
              Most businesses lose $3,000–$15,000/month in lost conversions from weak branding. This PDF shows you exactly where it's happening — and how to stop it.
            </p>

            <div className="mt-7">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
                <Input
                  placeholder="Email"
                  type="email"
                  className="bg-[#0A0B1E] border border-[#7B61FF]/70 text-white placeholder:text-white/35"
                />
                <button
                  className="rounded-[8px] bg-[#00D4AA] px-6 py-4 text-black font-extrabold"
                  onClick={() => console.log("send pdf")}
                >
                  Send Me the PDF →
                </button>
              </div>
            </div>

            <div className="mt-3 text-sm text-[#A0A8C8] text-center">
              Instant download. No spam.
            </div>

            <div className="mt-6 overflow-hidden rounded-[14px] border border-white/10">
              <img
                src="/assets/startupsadvisory-10.jpg"
                alt=""
                className="h-[180px] w-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — Testimonials */}
      <section style={{ background: bg.page }}>
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:py-20">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold">
            Real Owners | <span style={{ color: bg.teal }}>Real Revenue</span>
          </h2>
          <div className="mt-2 text-[#A0A8C8]">We don't just deliver designs. We deliver outcomes.</div>

          <div className="mt-6 flex flex-wrap gap-3">
            {["Trustpilot", "Google", "Facebook"].map((r) => (
              <div
                key={r}
                className="rounded-full border border-white/10 bg-[#1A1D4E] px-4 py-2 text-sm font-extrabold text-white/80"
              >
                {r} · Rated <span style={{ color: bg.teal }}>4.4/5</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => {
              const featured = i === 3;
              return (
                <div
                  key={i}
                  className="rounded-[12px] border border-[#2D2F6E] bg-[#1A1D4E] p-6"
                  style={
                    featured
                      ? {
                          border: `2px solid ${bg.violet}`,
                          boxShadow: "0 0 60px rgba(123,97,255,0.12)",
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-[40px] w-[40px] rounded-full flex items-center justify-center text-white font-extrabold"
                      style={{ background: bg.violet }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div>
                      <div className="text-white font-extrabold">Owner {i + 1}</div>
                      <div className="text-[#A0A8C8] text-xs">Jan {i + 1}, 2026</div>
                    </div>
                  </div>

                  <div className="mt-4 text-[#00D4AA] font-extrabold">★★★★★</div>

                  <div className="mt-3 text-[#A0A8C8] leading-relaxed text-sm">
                    “Nexvora didn’t just fix our visuals. They made decisions feel obvious — and our pipeline finally moved.”
                  </div>

                  <div className="mt-5 text-[#00D4AA] font-extrabold text-sm">
                    {i % 2 === 0
                      ? "Landed 3 new clients in first month"
                      : "Doubled conversion rate in 14 days"}
                  </div>

                  <div className="mt-4 overflow-hidden rounded-[10px] border border-white/10">
                    <img
                      src={
                        [
                          "/assets/startupsadvisory-08.jpg",
                          "/assets/startupsadvisory-02.jpg",
                          "/assets/startupsadvisory-04.jpg",
                        ][i % 3]
                      }
                      alt=""
                      className="h-[120px] w-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 11 — FAQ */}
      <section style={{ background: bg.announce }}>
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:py-20">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold">
            You have questions. <span style={{ color: bg.teal }}>We have answers.</span>
          </h2>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Accordion
                type="single"
                collapsible
                value={faqOpen ?? undefined}
                onValueChange={(v) => setFaqOpen(v)}
              >
                <AccordionItem value="q1" className="border-white/10">
                  <AccordionTrigger className="text-white font-extrabold">
                    How fast do you actually deliver?
                  </AccordionTrigger>
                  <AccordionContent>
                    First draft in 48 hours. Not "up to 5 business days." 48 hours. We've done it 200+ times.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2" className="border-white/10">
                  <AccordionTrigger className="text-white font-extrabold">
                    What if I'm not happy with the work?
                  </AccordionTrigger>
                  <AccordionContent>
                    We revise until you love it. No cap. No extra charge. If you're still unhappy after revisions, you get a full refund. That's our promise, in writing.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3" className="border-white/10">
                  <AccordionTrigger className="text-white font-extrabold">
                    How does team hire work?
                  </AccordionTrigger>
                  <AccordionContent>
                    We assign a dedicated designer, developer or motion artist. They work inside your tools, under your brand. Your clients never know they're from Nexvora.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <Accordion
                type="single"
                collapsible
                value={faqOpen ?? undefined}
                onValueChange={(v) => setFaqOpen(v)}
              >
                <AccordionItem value="q4" className="border-white/10">
                  <AccordionTrigger className="text-white font-extrabold">
                    Can I cancel anytime?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. No contract. No lock-in. Cancel with one click. We earn your business every single month.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q5" className="border-white/10">
                  <AccordionTrigger className="text-white font-extrabold">
                    What's the difference between Nexvora and a freelancer?
                  </AccordionTrigger>
                  <AccordionContent>
                    A freelancer disappears. Nexvora delivers. You get a full team, not a single person with a laptop and excuses.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q6" className="border-white/10">
                  <AccordionTrigger className="text-white font-extrabold">
                    Do you work with agencies?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes — and we make agencies look incredible. We are your invisible production team. 73% of top agencies already outsource like this.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              className="rounded-[8px] bg-[#00D4AA] px-7 py-4 text-black font-extrabold"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ask Us Anything →
            </button>
          </div>

          <div className="mt-8 overflow-hidden rounded-[16px] border border-white/10">
            <img
              src="/assets/startupsadvisory-07.jpg"
              alt=""
              className="h-[220px] w-full object-cover"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* SECTION 12 — Contact */}
      <section id="contact" style={{ background: bg.page }}>
        <div className="mx-auto max-w-[1280px] px-4 py-14 md:py-20">
          <div className="mx-auto max-w-[1100px] rounded-[20px] border border-[#2D2F6E] bg-[#1A1D4E] p-10 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight">
                  Share what you're <span style={{ color: bg.teal }}>building</span> and what you want to <span style={{ color: bg.teal }}>fix</span>
                </h2>
                <div className="mt-4 text-[#A0A8C8] leading-relaxed">
                  Short. Direct. We’ll respond with next steps — fast.
                </div>

                <div className="mt-6 space-y-3">
                  {[{ k: "Phone", v: "+1 (555) 010-2026" }, { k: "Email", v: "hello@nexvora.com" }, { k: "WhatsApp", v: "+1 (555) 010-3036" }].map((r) => (
                    <div
                      key={r.k}
                      className="flex items-center gap-3 rounded-[12px] border border-white/10 bg-black/20 px-4 py-3"
                    >
                      <div
                        className="h-9 w-9 rounded-full"
                        style={{ background: "rgba(0,212,170,0.15)", border: "1px solid rgba(0,212,170,0.35)" }}
                        aria-hidden
                      />
                      <div>
                        <div className="text-white/90 font-extrabold text-sm">{r.k}</div>
                        <div className="text-[#A0A8C8] text-sm">{r.v}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 overflow-hidden rounded-[16px] border border-white/10">
                  <img
                    src="/assets/startupsadvisory-09.jpg"
                    alt=""
                    className="h-[220px] w-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white text-2xl md:text-3xl font-extrabold">
                  Ready To <span style={{ color: bg.teal }}>Connect?</span>
                </h3>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("contact submit");
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Name" className="bg-[#0A0B1E] border border-[#7B61FF]/70 text-white placeholder:text-white/35" />
                    <Input placeholder="Email" type="email" className="bg-[#0A0B1E] border border-[#7B61FF]/70 text-white placeholder:text-white/35" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4">
                    <select className="h-10 rounded-[8px] border border-[#7B61FF]/70 bg-[#0A0B1E] text-white px-3" defaultValue="🇺🇸 +1">
                      <option>🇺🇸 +1</option>
                      <option>🇬🇧 +44</option>
                      <option>🇨🇦 +1</option>
                    </select>
                    <Input placeholder="Phone" className="bg-[#0A0B1E] border border-[#7B61FF]/70 text-white placeholder:text-white/35" />
                  </div>

                  <Input placeholder="Company" className="bg-[#0A0B1E] border border-[#7B61FF]/70 text-white placeholder:text-white/35" />

                  <Textarea placeholder="Message" className="min-h-[120px] bg-[#0A0B1E] border border-[#7B61FF]/70 text-white placeholder:text-white/35" />

                  <div className="rounded-[12px] border border-white/10 bg-black/20 px-4 py-3 text-xs text-[#A0A8C8]">
                    reCAPTCHA (demo)
                  </div>

                  <button type="submit" className="w-full rounded-[8px] bg-[#00D4AA] px-7 py-4 text-black font-extrabold">
                    Submit Your Query →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13 — Footer close (Two Paths) */}
      <section style={{ background: bg.announce, padding: "80px 0" }}>
        <div className="mx-auto max-w-[1280px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT PATH */}
            <div className="rounded-[20px] border border-white/10 bg-[#0A0B1E]/40 p-7 relative overflow-hidden">
              <div aria-hidden className="absolute -left-40 -top-40 h-[360px] w-[360px] rounded-full blur-[120px]" style={{ background: "rgba(255,64,64,0.12)" }} />
              <div className="relative">
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold text-white/70">
                  Without Nexvora
                </div>
                <div className="mt-4 space-y-3">
                  {["Generic brand nobody remembers", "Website that doesn't convert", "Freelancers with no accountability", "Competitor wins your next client", "Another year of we'll fix it soon"].map((t) => (
                    <div key={t} className="flex items-start gap-3 text-white/80">
                      <span className="mt-0.5 text-red-300">✕</span>
                      <div className="text-sm">{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER */}
            <div className="rounded-[20px] border border-[#2D2F6E] bg-[#1A1D4E] p-7 flex flex-col justify-between relative overflow-hidden">
              <div aria-hidden className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 30% 20%, rgba(0,212,170,0.18), transparent 45%), radial-gradient(circle at 80% 60%, rgba(123,97,255,0.16), transparent 55%)" }} />
              <div className="relative">
                <div className="text-white text-2xl font-extrabold">Choose Your Path →</div>
                <div className="mt-3 text-[#A0A8C8]">No contracts. 48hr delivery. Cancel anytime.</div>
              </div>
              <button
                className="relative mt-6 rounded-[8px] bg-[#00D4AA] px-8 py-4 text-black font-extrabold text-center"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Choose Your Path →
              </button>
            </div>

            {/* RIGHT PATH */}
            <div className="rounded-[20px] border border-white/10 bg-[#0A0B1E]/20 p-7 relative overflow-hidden">
              <div aria-hidden className="absolute -right-40 -top-40 h-[360px] w-[360px] rounded-full blur-[120px]" style={{ background: "rgba(0,212,170,0.12)" }} />
              <div className="relative">
                <div className="inline-flex rounded-full border border-[#00D4AA]/30 bg-[#00D4AA]/10 px-4 py-2 text-xs font-extrabold text-[#00D4AA]">
                  With Nexvora
                </div>
                <div className="mt-4 space-y-3">
                  {["Brand that commands attention", "Website converting 3x more", "Full team, 48hr delivery", "Agencies hiring your output", "Growing while competitors wonder how"].map((t) => (
                    <div key={t} className="flex items-start gap-3 text-white/80">
                      <span className="mt-0.5 text-[#00D4AA] font-extrabold">✓</span>
                      <div className="text-sm">{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Standard footer */}
          <div className="mt-10 rounded-[20px] border border-white/10 bg-[#0A0B1E]/40 p-7">
            <div className="flex flex-col lg:flex-row gap-8 lg:items-start lg:justify-between">
              <div>
                <div className="text-white font-extrabold text-lg">Nexvora</div>
                <div className="mt-3 flex gap-3">
                  {["Facebook", "Instagram", "X", "Pinterest", "LinkedIn"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-[#A0A8C8] inline-flex items-center justify-center hover:text-[#00D4AA] hover:border-[#00D4AA]/30"
                    >
                      {s[0]}
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  "Quick Links",
                  "Services",
                  "Legal",
                  "Contact",
                ].map((col) => (
                  <div key={col}>
                    <div className="text-xs font-extrabold text-[#00D4AA]">{col}</div>
                    <div className="mt-3 space-y-2">
                      {[
                        "Results",
                        "Pricing",
                        "Portfolio",
                        "FAQ",
                        "Contact",
                      ]
                        .slice(0, col === "Legal" ? 2 : 3)
                        .map((l) => (
                          <a key={l} href="#" className="block text-sm text-white/80 hover:text-[#00D4AA]">
                            {l}
                          </a>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm text-[#A0A8C8]">
              <div>© 2026 Nexvora</div>
              <div className="flex gap-5">
                <a href="#" className="hover:text-[#00D4AA]">Privacy</a>
                <a href="#" className="hover:text-[#00D4AA]">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating scroll-to-top */}
      <button
        className="fixed bottom-5 left-5 z-[80] h-12 w-12 rounded-full bg-[#00D4AA] text-black font-extrabold flex items-center justify-center"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        ↑
      </button>

      <ExitIntentPopup onClose={() => {}} />

      <style>{`html { scroll-behavior: smooth; }`}</style>
    </div>
  );
}
