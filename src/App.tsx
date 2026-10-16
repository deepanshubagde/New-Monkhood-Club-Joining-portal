import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Smartphone,
  Globe,
  Upload,
  MousePointerClick,
  MessageCircle,
  Share2,
  Search,
  Compass,
  Users,
  Clock,
  TrendingUp,
  ShieldCheck,
  Video,
  MessageSquare,
  Flame,
  Heart,
  ArrowLeft,
  Zap
} from 'lucide-react';

/* --- Tactile Haptic & Micro-Audio Click Engine --- */
function playClickFeedback() {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(12);
    }
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    }
  } catch {
    // Silent fallback
  }
}

/* --- Lotus Sacred Geometry SVG Mandala (GPU Accelerated) --- */
function LotusMandala({ className = "w-[600px] h-[600px] opacity-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={`pointer-events-none transition-transform duration-1000 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      <defs>
        <radialGradient id="lotusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5d77f" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#d4af37" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#aa7c11" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill="url(#lotusGlow)" opacity="0.15" />
      <circle cx="200" cy="200" r="190" stroke="#f5d77f" strokeWidth="0.75" strokeDasharray="6 6" opacity="0.6" />
      <circle cx="200" cy="200" r="160" stroke="#d4af37" strokeWidth="0.75" opacity="0.6" />
      <circle cx="200" cy="200" r="120" stroke="#f5d77f" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
      <circle cx="200" cy="200" r="80" stroke="#d4af37" strokeWidth="0.75" opacity="0.6" />
      <circle cx="200" cy="200" r="40" stroke="#f5d77f" strokeWidth="0.75" opacity="0.6" />
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={`outer-${i}`} transform={`rotate(${i * 30} 200 200)`}>
          <path
            d="M200 40 C235 90 235 140 200 180 C165 140 165 90 200 40 Z"
            stroke="#f5d77f"
            strokeWidth="0.8"
            fill="rgba(245, 215, 127, 0.02)"
            opacity="0.6"
          />
          <circle cx="200" cy="30" r="2.5" fill="#f5d77f" opacity="0.7" />
        </g>
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={`inner-${i}`} transform={`rotate(${i * 30 + 15} 200 200)`}>
          <path
            d="M200 80 C220 115 220 145 200 170 C180 145 180 115 200 80 Z"
            stroke="#d4af37"
            strokeWidth="0.7"
            fill="rgba(212, 175, 55, 0.03)"
            opacity="0.5"
          />
        </g>
      ))}
      <circle cx="200" cy="200" r="8" fill="#f5d77f" opacity="0.8" />
      <circle cx="200" cy="200" r="4" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}

/* --- Optimized Lightweight Golden Particle Background --- */
function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let lastW = width;

    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) > 40) {
        lastW = window.innerWidth;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', onResize, { passive: true });

    // Mobile optimized: fewer particles for high 60/120fps refresh rates
    const particleCount = window.innerWidth < 640 ? 12 : 26;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.6,
      alpha: Math.random() * 0.35 + 0.1,
      speedY: -(Math.random() * 0.22 + 0.08),
      speedX: (Math.random() - 0.5) * 0.12,
      pulse: Math.random() * 0.02 + 0.008,
      color: Math.random() > 0.3 ? '#ffd740' : '#f5d77f'
    }));

    let frame = 0;
    let isVisible = true;

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(frame * 0.035) * p.pulse;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x | 0, p.y | 0, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.08, Math.min(0.45, p.alpha));
        ctx.fill();
      }
      frame++;
      animId = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animId);
      } else if (!isVisible) {
        isVisible = true;
        animId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility, { passive: true });
    render();

    return () => {
      isVisible = false;
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div id="ambient-background" className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 sm:opacity-20 pointer-events-none">
        <LotusMandala className="w-[450px] h-[450px] sm:w-[700px] sm:h-[700px] lg:w-[850px] lg:h-[850px] animate-spin-slow" />
      </div>
    </div>
  );
}

/* --- Hero Banner Section --- */
function HeroBanner() {
  return (
    <section id="hero-banner" className="relative pt-3 sm:pt-8 pb-1 sm:pb-3 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[280px] sm:h-[350px] bg-gradient-to-r from-amber-500/20 via-yellow-400/15 to-purple-600/10 blur-[80px] sm:blur-[100px] pointer-events-none -z-10 rounded-full" />
      <div className="relative group rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-amber-400/40 via-amber-600/25 to-purple-900/35 shadow-[0_0_40px_rgba(245,215,127,0.2)] border border-amber-500/40 overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/30 via-yellow-300/40 to-amber-600/30 blur-lg opacity-70 group-hover:opacity-100 transition duration-1000 -z-10 pointer-events-none" />
        <div className="relative rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#06040c] min-h-[160px] xs:min-h-[190px] sm:min-h-[320px]">
          <picture className="w-full h-auto">
            <source srcSet="/assets/mondkhud-EIrpCXOk.webp" type="image/webp" />
            <img
              id="hero-banner-image"
              src="/assets/mondkhud-EIrpCXOk.webp"
              alt="Monkhood Club Digital Sangha Banner"
              width={1672}
              height={941}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-auto object-cover object-center max-h-[640px] rounded-[18px] sm:rounded-[22px] transition-transform duration-700 hover:scale-[1.006]"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-[#040308] via-transparent to-transparent pointer-events-none opacity-30" />
        </div>
      </div>
    </section>
  );
}

/* --- Features lists for Monthly and Yearly Membership (from join.monkhoodclub.com) --- */
const monthlyFeatures = [
  "Daily Monk Morning Sangha Sessions",
  "Sunday Weekly Live Community Sessions",
  "Premium Recorded Courses",
  "Live Guest Expert Sessions",
  "Session Recordings",
  "Community Access",
  "Mindfulness & Meditation Library",
  "Buddha's Wisdom for Modern Life",
  "New Course Every Month"
];

const yearlyFeatures = [
  "Daily Monk Morning Sangha Sessions",
  "Sunday Weekly Live Community Sessions",
  "Premium Recorded Courses",
  "Live Guest Expert Sessions",
  "Session Recordings",
  "Community Access",
  "Mindfulness & Meditation Library",
  "Buddha's Wisdom for Modern Life",
  "New Course Every Month",
  "Early Access to Every New Course",
  "Priority Registration for Offline Events",
  "Members-only Surprise Sessions",
  "VIP Community Badge",
  "Gamification",
  "Monthly Challenges"
];

/* --- Pricing Section: Monthly & Yearly "MOST POPULAR" Stack --- */
function PricingSection({
  customMonthlyUrl = "https://learn.monkhoodclub.com/web/checkout/6a690eba258d6e22aee85fcf",
  customYearlyUrl = "https://learn.monkhoodclub.com/l/6dce3137f9"
}: {
  customMonthlyUrl?: string;
  customYearlyUrl?: string;
}) {
  return (
    <section id="pricing-section" className="relative py-6 sm:py-8 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 scroll-mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch pt-2">
        {/* Monthly Membership Card */}
        <div
          id="monthly-membership-card"
          className="relative group rounded-3xl p-5 sm:p-8 bg-[#0b0816]/90 border border-amber-500/35 hover:border-amber-400/80 backdrop-blur-xl shadow-[0_0_35px_rgba(212,175,55,0.15)] hover:shadow-[0_0_55px_rgba(212,175,55,0.3)] transition-all duration-300 flex flex-col justify-between overflow-visible scroll-mt-10"
        >
          <div>
            <h3 className="font-cinzel text-xl sm:text-3xl font-bold text-slate-100 tracking-wide mb-1 gold-text-gradient">
              Monthly Membership
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light mb-5 sm:mb-6">
              Perfect to begin your mindfulness journey.
            </p>
            <div className="mb-5 sm:mb-6 flex items-baseline space-x-1.5 border-b border-amber-500/20 pb-5 sm:pb-6">
              <span className="font-price text-5xl sm:text-6xl font-semibold gold-text-gradient tracking-tight">
                ₹51
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-normal">
                /month
              </span>
            </div>
            <div className="mb-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                INCLUDES
              </span>
            </div>
            <ul className="space-y-2.5 mb-6 sm:mb-8">
              {monthlyFeatures.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200">
                  <span className="w-4 h-4 rounded-full bg-[#181308] border border-amber-600/40 flex items-center justify-center text-amber-500/80 text-[10px] flex-shrink-0">
                    ✓
                  </span>
                  <span className="font-medium text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <a
              id="monthly-checkout-btn"
              href={customMonthlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={playClickFeedback}
              className="w-full block text-center py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase bg-gradient-to-r from-[#2a1b05] via-[#4d3209] to-[#2a1b05] hover:from-[#3d2808] hover:to-[#5e3d0a] text-amber-200 border border-amber-500/60 hover:border-amber-300 shadow-[0_0_25px_rgba(212,175,55,0.25)] btn-clicky cursor-pointer select-none"
            >
              Join Monthly
            </a>
            <p className="text-[11px] text-center text-slate-400 mt-2.5">
              Renews automatically every month.
            </p>
          </div>
        </div>

        {/* Yearly Membership Card - MOST POPULAR */}
        <div
          id="yearly-membership-card"
          className="relative group rounded-3xl p-5 sm:p-8 pt-8 sm:pt-9 bg-[#0d091e]/90 border-2 border-amber-400/80 hover:border-amber-300 backdrop-blur-xl shadow-[0_0_50px_rgba(245,215,127,0.35)] transition-all duration-300 flex flex-col justify-between overflow-visible scroll-mt-10"
        >
          {/* Most Popular Floating Pill */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
            <span
              id="yearly-badge"
              className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 px-5 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase shadow-[0_0_25px_rgba(245,215,127,0.9)] flex items-center space-x-1.5 border border-yellow-200 whitespace-nowrap"
            >
              <span>⚡</span>
              <span>MOST POPULAR</span>
            </span>
          </div>

          <div>
            <h3 className="font-cinzel text-xl sm:text-3xl font-bold text-slate-100 tracking-wide mb-1 pt-1 gold-text-gradient">
              Yearly Membership
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light mb-5 sm:mb-6">
              Pay once and enjoy the entire year.
            </p>
            <div className="mb-2 flex items-baseline space-x-2">
              <span className="line-through text-slate-500 font-price text-lg sm:text-xl font-normal">
                ₹612
              </span>
              <span className="font-price text-5xl sm:text-6xl font-semibold gold-text-gradient tracking-tight">
                ₹499
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-normal">
                /year
              </span>
            </div>
            <div className="mb-5 sm:mb-6 border-b border-amber-500/20 pb-5 sm:pb-6">
              <span className="text-[11px] font-bold tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/40 px-3 py-1 rounded-md shadow-[0_0_12px_rgba(245,215,127,0.25)]">
                SAVE 18% • YOU SAVE ₹113
              </span>
            </div>
            <div className="mb-4">
              <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                EVERYTHING IN MONTHLY, PLUS
              </span>
            </div>
            <ul className="space-y-2.5 mb-6 sm:mb-8">
              {yearlyFeatures.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200">
                  <span className="w-4 h-4 rounded-full bg-[#181308] border border-amber-600/40 flex items-center justify-center text-amber-500/80 text-[10px] flex-shrink-0">
                    ✓
                  </span>
                  <span className="font-medium text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <a
              id="yearly-checkout-btn"
              href={customYearlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={playClickFeedback}
              className="w-full block text-center py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:brightness-110 text-slate-950 shadow-[0_0_30px_rgba(245,215,127,0.5)] btn-clicky cursor-pointer select-none"
            >
              Join Yearly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Simple Onboarding Steps --- */
const onboardingSteps = [
  {
    number: "01",
    title: "Activate your Subscription",
    description: `Click on "Join Monthly" or "Join Yearly" to complete your secure registration (UPI, Cards, Net Banking, etc.).`,
    actionText: 'Instant Membership Setup',
    icon: MousePointerClick,
    badge: "Instant Setup"
  },
  {
    number: "02",
    title: "Check WhatsApp & Mail",
    description: "You will receive an instant confirmation message on your registered WhatsApp and Email with the App Download link.",
    actionText: "Get App Download Link",
    icon: Mail,
    badge: "Email & WhatsApp"
  },
  {
    number: "03",
    title: "Join Private Community",
    description: "Join the private WhatsApp community where you will get direct private messages and daily live sangha updates.",
    actionText: "Access Sangha Circle",
    icon: MessageCircle,
    badge: "Direct Access"
  }
];

function AccessGuideSection() {
  return (
    <section
      id="access-guide-section"
      className="py-8 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 relative scroll-mt-6"
      aria-label="How to Access Monkhood Club"
    >
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>Simple Onboarding</span>
        </div>
        <h2 className="font-cinzel text-xl sm:text-4xl font-bold tracking-wide text-slate-100 mb-2 sm:mb-3 gold-text-gradient">
          How to Access Monkhood Club
        </h2>
        <p className="text-xs sm:text-base text-slate-300 font-light leading-relaxed">
          Follow these 3 simple steps right after activating your membership to step into your daily digital sangha.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative">
        {onboardingSteps.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <div
              key={idx}
              id={`access-step-card-${idx + 1}`}
              className="relative group rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-[#0d091e]/85 border border-amber-500/30 hover:border-amber-400/70 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(245,215,127,0.25)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,215,127,0.2)] group-hover:scale-105 group-hover:border-amber-300 transition-all duration-300">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
                  </div>
                  <span className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-400/30 group-hover:text-amber-300/50 transition-colors">
                    {step.number}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-amber-400/90 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 mb-2">
                    Step {idx + 1}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-slate-100 mb-2 tracking-wide font-cinzel">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-5 sm:mb-6 whitespace-pre-line">
                  {step.description}
                </p>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-amber-500/15 flex items-center justify-between text-xs text-amber-300/90 font-medium">
                <span>{step.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* --- App Carousel Screens --- */
const appScreens = [
  {
    id: "feed",
    title: "Sangha Community Feed & Live Zoom Sessions",
    subtitle: "Sunday Live Session (28 likes • 50 comments • 407 views) + Monthly Course Releases",
    tabName: "Feed",
    fallbackFile: "/assets/1-Ifh3S0Q1.jpeg"
  },
  {
    id: "courses-1",
    title: "Mindful Transformation & Meditation Vault",
    subtitle: "Featuring Rahul Dongre & Deepanshu Bagde Masterclasses",
    tabName: "Courses (Vol. 1)",
    fallbackFile: "/assets/2-CTUCHkOa.jpeg"
  },
  {
    id: "courses-2",
    title: "Sunday Live Vault & Jataka Wisdom",
    subtitle: "Recorded 10 AM Sessions & Dr. Jasbir Chawala Wisdom Series",
    tabName: "Courses (Vol. 2)",
    fallbackFile: "/assets/3-MQObgK1L.jpeg"
  },
  {
    id: "courses-3",
    title: "Psychosomatic Healing & Mindful Mastery",
    subtitle: "Deepanshu Bagde & Dr. Sujit Bodhi Ancient Healing Series",
    tabName: "Courses (Vol. 3)",
    fallbackFile: "/assets/4-CCaxXfLy.jpeg"
  },
  {
    id: "messages",
    title: "Real-Time Communities & Live Rooms",
    subtitle: "Yearly & Monthly Members Sangha with Live Broadcast Alerts",
    tabName: "Messages",
    fallbackFile: "/assets/5-C2OjgkJp.jpeg"
  }
];

function AppShowcaseSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [customScreenshots, setCustomScreenshots] = useState<Record<number, string>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const totalSlides = appScreens.length;

  // Preload all carousel images immediately on mount for 0-lag switching
  useEffect(() => {
    appScreens.forEach((screen) => {
      const img = new Image();
      img.src = screen.fallbackFile;
    });
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(t);
  }, [toastMessage]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const diff = touchStartX - touchEndX;
    if (diff > 40) nextSlide();
    if (diff < -40) prevSlide();
  };

  const handleFileDrop = (files: FileList) => {
    if (files.length === 0) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setCustomScreenshots((prev) => ({ ...prev, [currentSlide]: url }));
    setToastMessage(`✓ Screenshot for "${appScreens[currentSlide].tabName}" loaded!`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const activeImage = customScreenshots[currentSlide] || appScreens[currentSlide].fallbackFile;

  return (
    <section
      id="app-showcase-section"
      className="pt-10 sm:pt-18 pb-2 sm:pb-3 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 relative overflow-hidden scroll-mt-6"
      aria-label="Monkhood Club Mobile App Showcase"
    >
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-2xl border border-yellow-200 animate-fadeIn">
          {toastMessage}
        </div>
      )}

      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <h2 className="font-cinzel text-xl sm:text-4xl font-bold tracking-wide text-slate-100 mb-2 sm:mb-3 gold-text-gradient">
          Get the Monkhood Club App
        </h2>
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(245,215,127,0.15)] mb-3 backdrop-blur-md">
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          <span>Android, iOS & Web</span>
          <Globe className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <p className="text-xs sm:text-base text-slate-300 font-light max-w-xl mx-auto">
          Access your digital sangha, live Sunday community sessions, meditation vault, and mastercourses across Android, iOS, and Web platforms.
        </p>
      </div>



      {/* Interactive App Carousel & Phone Mockup */}
      <div className="relative max-w-4xl mx-auto">
        {/* Fast Tab Buttons */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 mb-4">
          {appScreens.map((screen, idx) => (
            <button
              key={screen.id}
              onClick={() => setCurrentSlide(idx)}
              className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-medium tap-instant cursor-pointer ${
                currentSlide === idx
                  ? "bg-amber-400 text-slate-950 shadow-md font-semibold scale-105"
                  : "bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-amber-400/40 hover:text-amber-300"
              }`}
            >
              {screen.tabName}
            </button>
          ))}
        </div>

        {/* Phone Container */}
        <div className="relative flex items-center justify-center my-3 sm:my-6 px-1 sm:px-14">
          {/* Prev Button */}
          <button
            id="carousel-prev-btn"
            onClick={prevSlide}
            aria-label="Previous App Screen"
            className="absolute -left-1 sm:-left-4 md:-left-8 lg:-left-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-[#120f24]/90 border border-amber-400/60 hover:border-amber-300 text-amber-300 hover:text-amber-200 flex items-center justify-center backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.85),0_0_25px_rgba(245,215,127,0.25)] tap-instant group"
            title="Previous Screen (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Next Button */}
          <button
            id="carousel-next-btn"
            onClick={nextSlide}
            aria-label="Next App Screen"
            className="absolute -right-1 sm:-right-4 md:-right-8 lg:-right-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-[#120f24]/90 border border-amber-400/60 hover:border-amber-300 text-amber-300 hover:text-amber-200 flex items-center justify-center backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.85),0_0_25px_rgba(245,215,127,0.25)] tap-instant group"
            title="Next Screen (Right Arrow)"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Responsive Phone Frame for Mobile and Desktop */}
          <div className="relative mx-auto w-full max-w-[310px] xs:max-w-[340px] sm:max-w-[380px] md:max-w-[390px] select-none">
            {/* Volume & Power Button Accents */}
            <div className="absolute -left-[3.5px] top-[95px] w-[3.5px] h-[22px] bg-gradient-to-r from-[#2a2833] to-[#454350] rounded-l-[2px] shadow-sm z-10" />
            <div className="absolute -left-[3.5px] top-[135px] w-[3.5px] h-[46px] bg-gradient-to-r from-[#2a2833] to-[#454350] rounded-l-[2px] shadow-sm z-10" />
            <div className="absolute -left-[3.5px] top-[195px] w-[3.5px] h-[46px] bg-gradient-to-r from-[#2a2833] to-[#454350] rounded-l-[2px] shadow-sm z-10" />
            <div className="absolute -right-[3.5px] top-[140px] w-[3.5px] h-[64px] bg-gradient-to-l from-[#2a2833] to-[#454350] rounded-r-[2px] shadow-sm z-10" />
            <div className="absolute -right-[3px] top-[230px] w-[3px] h-[46px] bg-gradient-to-l from-[#201e28] to-[#363442] rounded-r-[2px] shadow-sm z-10 ring-[0.5px] ring-white/10" />

            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files) handleFileDrop(e.dataTransfer.files);
              }}
              className={`relative rounded-[44px] xs:rounded-[50px] sm:rounded-[56px] p-[3px] sm:p-[4px] bg-gradient-to-b from-[#565463] via-[#2c2b36] to-[#484654] shadow-[0_20px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(245,215,127,0.18)] transition-all ${
                isDragging ? "ring-4 ring-amber-400 scale-[1.01]" : "ring-1 ring-white/20"
              }`}
            >
              <div className="absolute inset-0 rounded-[44px] xs:rounded-[50px] sm:rounded-[56px] pointer-events-none ring-1 ring-inset ring-white/15" />
              <div className="relative rounded-[41px] xs:rounded-[47px] sm:rounded-[52px] p-[5px] sm:p-[7px] bg-[#000000]">
                {/* Speaker Grill */}
                <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-10 sm:w-14 h-[3px] bg-[#1a1924] rounded-full z-30 pointer-events-none" />

                {/* Inner Screen */}
                <div className="relative rounded-[36px] xs:rounded-[41px] sm:rounded-[46px] overflow-hidden bg-[#0a0714] min-h-[500px] xs:min-h-[580px] sm:min-h-[640px] aspect-[9/19.5] flex flex-col justify-start shadow-inner">
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 w-[90px] sm:w-[110px] h-[24px] sm:h-[28px] bg-black rounded-full flex items-center justify-between px-3 shadow-[0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none ring-1 ring-white/[0.08]">
                    <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#090f1d] ring-1 ring-[#1b253c]/70 relative flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#18284e]/60" />
                    </div>
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#050508] ring-1 ring-[#111118]" />
                  </div>

                  {/* Gloss glare overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.035] to-transparent pointer-events-none z-20" />

                  {/* Drag overlay */}
                  {isDragging && (
                    <div className="absolute inset-0 z-40 bg-slate-950/95 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-amber-400 rounded-[36px] sm:rounded-[46px] backdrop-blur-sm">
                      <Upload className="w-10 h-10 text-amber-400 animate-bounce mb-2" />
                      <p className="text-sm font-bold text-amber-200">Drop screenshot here</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Will attach to {appScreens[currentSlide].tabName}
                      </p>
                    </div>
                  )}

                  {/* Screenshot Image or Rich Fallback */}
                  {activeImage && !imageErrors[currentSlide] ? (
                    <div className="w-full min-h-[500px] xs:min-h-[580px] sm:min-h-[640px] aspect-[9/19.5] bg-black relative flex items-center justify-center overflow-hidden">
                      <img
                        src={activeImage}
                        alt={appScreens[currentSlide].title}
                        onError={() => setImageErrors((prev) => ({ ...prev, [currentSlide]: true }))}
                        className="w-full h-full object-cover object-top block select-none"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    /* Fallback Native Feed & Screen Render */
                    <div className="bg-white text-slate-900 overflow-hidden relative flex flex-col font-sans h-full">
                      <div className="px-4 pt-10 pb-2 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-black">Feed</h2>
                        <div className="flex items-center space-x-3.5 text-slate-800">
                          <span className="text-xl sm:text-2xl font-light cursor-pointer leading-none">+</span>
                          <span className="text-base sm:text-lg">🔔</span>
                        </div>
                      </div>
                      <div className="p-4 flex-1 overflow-y-auto space-y-4">
                        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                          <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Sunday Live Community Session</span>
                          </div>
                          <p className="text-xs text-slate-600">⏱ 01:27:06 • Hosted by Rahul Dongre</p>
                          <p className="text-xs text-slate-800 mt-2 font-medium">
                            💬 "Great experience thank you Sirji! Amazing feeling... Feeling like internal cleaning."
                          </p>
                          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                            <span>28 likes • 50 comments</span>
                            <span className="text-amber-700 font-semibold">407 views</span>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-slate-200 px-4 py-2.5 flex items-center justify-around text-slate-500 text-[11px] bg-white">
                        <div className="flex flex-col items-center text-amber-600 font-bold">
                          <Flame className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5" />
                          <span>Feed</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Video className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 text-slate-400" />
                          <span>Workshops</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 text-slate-400" />
                          <span>Courses</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5 text-slate-400" />
                          <span>Sangha</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Home Bar Indicator */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-[4px] bg-white/70 rounded-full z-30 pointer-events-none shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Info & Controls */}
        <div className="mt-3 sm:mt-6 text-center max-w-lg mx-auto px-3 sm:px-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-1.5 sm:mb-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Screen {currentSlide + 1} of {totalSlides} • {appScreens[currentSlide].tabName}</span>
          </div>
          <h3 className="text-sm sm:text-lg font-bold text-slate-100 mb-1 leading-snug">
            {appScreens[currentSlide].title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {appScreens[currentSlide].subtitle}
          </p>
        </div>

        {/* Carousel Prev/Dots/Next Controls */}
        <div className="flex items-center justify-center space-x-3 mt-3 sm:mt-4 mb-1">
          <button
            onClick={prevSlide}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1.5 tap-instant shadow-sm"
            title="Previous Screen (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4 text-amber-400" />
            <span>Prev</span>
          </button>
          <div className="flex items-center space-x-1.5 sm:space-x-2 px-1">
            {appScreens.map((_, idx) => (
              <button
                key={idx}
                id={`carousel-dot-${idx}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx
                    ? "w-6 sm:w-7 bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_12px_rgba(245,215,127,0.8)]"
                    : "w-2 bg-amber-400/20 hover:bg-amber-400/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1.5 tap-instant shadow-sm"
            title="Next Screen (Right Arrow)"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* --- Benefits Section with Fast Responsive Shiny Buttons & Pills --- */
const benefits = [
  { icon: Compass, label: "Daily Guided Meditation" },
  { icon: Users, label: "Supportive Community" },
  { icon: MessageSquare, label: "Premium Learning Library" },
  { icon: Clock, label: "Learn at Your Own Pace" },
  { icon: TrendingUp, label: "Continuous Personal Growth" },
  { icon: ShieldCheck, label: "Trusted by the Monkhood Community" },
  { icon: Video, label: "Weekly Sunday Live Sessions" },
  { icon: MessageCircle, label: "Interactive Community Feed Access" }
];

function BenefitsSection() {
  return (
    <section id="benefits-section" className="pt-1 sm:pt-2 pb-8 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 relative scroll-mt-6">
      <div className="flex flex-col items-center justify-center space-y-3.5 sm:space-y-4 mb-8 text-center w-full px-2">
        {/* Monthly Shiny Button - Direct Payment Checkout */}
        <a
          id="benefits-join-monthly-btn"
          href="https://learn.monkhoodclub.com/web/checkout/6a690eba258d6e22aee85fcf"
          target="_blank"
          rel="noopener noreferrer"
          onPointerDown={playClickFeedback}
          className="btn-clicky animate-gold-pulse group relative inline-flex items-center justify-center space-x-2.5 sm:space-x-3 w-full max-w-sm sm:w-auto px-6 sm:px-10 py-4 rounded-full font-black text-xs sm:text-sm tracking-widest uppercase bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 shadow-[0_0_35px_rgba(245,215,127,0.7)] hover:shadow-[0_0_65px_rgba(245,215,127,1)] cursor-pointer overflow-hidden border-2 border-yellow-200 select-none min-h-[52px]"
        >
          <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-12 animate-shimmer pointer-events-none" />
          <Sparkles className="w-4 h-4 text-slate-950 animate-pulse flex-shrink-0" />
          <span className="font-extrabold tracking-widest truncate">Join Monkhood Club 51 per month</span>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/20 border border-slate-950/25 text-slate-950 flex-shrink-0">
            ₹51/mo
          </span>
          <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </a>

        {/* Yearly Shiny Button - Direct Payment Checkout */}
        <a
          id="benefits-join-yearly-btn"
          href="https://learn.monkhoodclub.com/l/6dce3137f9"
          target="_blank"
          rel="noopener noreferrer"
          onPointerDown={playClickFeedback}
          className="btn-clicky animate-gold-pulse group relative inline-flex items-center justify-center space-x-2.5 sm:space-x-3 w-full max-w-sm sm:w-auto px-6 sm:px-10 py-4 rounded-full font-black text-xs sm:text-sm tracking-widest uppercase bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 shadow-[0_0_35px_rgba(245,215,127,0.7)] hover:shadow-[0_0_65px_rgba(245,215,127,1)] cursor-pointer overflow-hidden border-2 border-yellow-200 select-none min-h-[52px]"
        >
          <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-12 animate-shimmer pointer-events-none" />
          <Sparkles className="w-4 h-4 text-slate-950 animate-pulse flex-shrink-0" />
          <span className="font-extrabold tracking-widest truncate">Join Monkhood Club 499 per year</span>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950/20 border border-slate-950/25 text-slate-950 flex-shrink-0">
            ⚡ ₹499/yr
          </span>
          <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-3">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              id={`benefit-pill-${idx}`}
              className="flex items-center space-x-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#0d0a18]/60 border border-amber-500/30 hover:border-amber-400/70 backdrop-blur-md transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] group"
            >
              <div className="flex-shrink-0 text-amber-400 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-200 transition-colors truncate">
                {b.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* --- Need Help Section --- */
function NeedHelpSection() {
  return (
    <section id="help-section" className="py-6 sm:py-8 px-3 sm:px-6 lg:px-8 max-w-2xl mx-auto z-10 relative scroll-mt-6">
      <div
        id="help-card"
        className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-[#0a0714]/70 border border-amber-500/35 backdrop-blur-md text-center shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all"
      >
        <h4 className="text-[11px] font-extrabold tracking-[0.25em] text-slate-400 uppercase mb-3">
          NEED HELP?
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 sm:gap-y-3 text-xs sm:text-sm font-medium text-slate-200">
          <div className="inline-flex items-center space-x-2">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 font-normal">Call: </span>
            <a
              id="help-call-link"
              href="tel:+918080024707"
              className="font-bold text-slate-100 hover:text-amber-300 transition-colors py-1 px-2 rounded-lg tap-instant"
            >
              <span className="mr-1">+91</span>
              <span>8080024707</span>
            </a>
          </div>
          <div className="inline-flex items-center space-x-2">
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 font-normal">Email: </span>
            <a
              id="help-email-link"
              href="mailto:support@monkhoodclub.com"
              className="font-bold text-slate-100 hover:text-amber-300 transition-colors py-1 px-2 rounded-lg tap-instant"
            >
              support@monkhoodclub.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Floating Fast Mobile Action Bar (Mobile-Only Experience) --- */
function MobileFloatingActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero section
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sm:hidden fixed bottom-3 left-3 right-3 z-50 animate-fadeIn">
      <div className="bg-[#0b0816]/95 border border-amber-500/40 backdrop-blur-xl rounded-full p-1.5 pl-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(245,215,127,0.3)] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-100 leading-tight">Monkhood Club</span>
            <span className="text-[9px] text-amber-300/90 leading-tight font-medium">Digital Sangha</span>
          </div>
        </div>
        <div className="flex items-center space-x-1.5">
          <a
            href="https://learn.monkhoodclub.com/web/checkout/6a690eba258d6e22aee85fcf"
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={playClickFeedback}
            className="px-3.5 py-2 rounded-full text-[11px] font-bold bg-[#1d162b] text-amber-200 border border-amber-500/40 btn-clicky block text-center select-none"
          >
            Monthly ₹51
          </a>
          <a
            href="https://learn.monkhoodclub.com/l/6dce3137f9"
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={playClickFeedback}
            className="px-4 py-2 rounded-full text-[11px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,215,127,0.5)] btn-clicky flex items-center space-x-1 text-center select-none"
          >
            <Zap className="w-3 h-3 text-slate-950 fill-current" />
            <span>Yearly ₹499</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* --- Main Footer --- */
function MainFooter() {
  return (
    <footer id="main-footer" className="py-6 pb-20 sm:pb-6 border-t border-amber-500/10 text-center text-xs text-slate-400 relative z-10">
      <p className="font-medium text-slate-300">
        Made with <span className="text-amber-500">🧡</span> by Monkhood Club
      </p>
    </footer>
  );
}

/* --- Root App Component --- */
export default function App() {
  return (
    <div className="min-h-screen text-slate-100 font-['Outfit',sans-serif] selection:bg-amber-500/30 selection:text-amber-200 antialiased relative overflow-x-hidden bg-[#05040a]">
      {/* Sacred geometry & optimized ambient particle background */}
      <AmbientBackground />

      {/* Main Page Content */}
      <main className="space-y-2 relative z-10">
        {/* Hero Artwork Banner */}
        <HeroBanner />

        {/* Pricing Stack (Monthly & Yearly MOST POPULAR from join.monkhoodclub.com) */}
        <PricingSection
          customMonthlyUrl="https://learn.monkhoodclub.com/web/checkout/6a690eba258d6e22aee85fcf"
          customYearlyUrl="https://learn.monkhoodclub.com/l/6dce3137f9"
        />

        {/* Simple Onboarding (Step 1, 2, 3) */}
        <AccessGuideSection />

        {/* Get the Monkhood Club App & Interactive Carousel */}
        <AppShowcaseSection />

        {/* Benefits Pills & Shiny Buttons */}
        <BenefitsSection />

        {/* Need Help Card */}
        <NeedHelpSection />
      </main>

      {/* Floating 1-Tap Action Bar for Mobile Screens */}
      <MobileFloatingActionBar />

      {/* Footer */}
      <MainFooter />
    </div>
  );
}
