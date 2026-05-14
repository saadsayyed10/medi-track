"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

const FloatingOrb = ({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
    animate={{
      y: [0, -30, 0],
      scale: [1, 1.08, 1],
    }}
    transition={{
      duration: 7 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const LeafShape = ({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    animate={{ rotate: [0, 8, -4, 0], y: [0, -12, 0] }}
    transition={{
      duration: 9 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 110 C10 80 0 50 20 20 C30 5 50 5 60 20 C80 50 70 80 40 110Z"
        fill="currentColor"
        className="text-green-300"
        opacity="0.18"
      />
    </svg>
  </motion.div>
);

const PillIcon = () => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-7 h-7"
  >
    <rect
      x="6"
      y="18"
      width="36"
      height="12"
      rx="6"
      fill="currentColor"
      opacity="0.9"
    />
    <line x1="24" y1="18" x2="24" y2="30" stroke="#14532d" strokeWidth="1.5" />
  </svg>
);

const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.523 15.341a.733.733 0 0 1-.733-.733v-4.394a.733.733 0 0 1 1.466 0v4.394a.733.733 0 0 1-.733.733zm-11.046 0a.733.733 0 0 1-.733-.733v-4.394a.733.733 0 0 1 1.466 0v4.394a.733.733 0 0 1-.733.733zM8.211 7.03l-1.1-1.906a.2.2 0 0 1 .347-.2l1.113 1.928A6.87 6.87 0 0 1 12 6.077a6.87 6.87 0 0 1 3.43.775l1.113-1.928a.2.2 0 1 1 .346.2l-1.1 1.906A6.818 6.818 0 0 1 19 12.5H5a6.818 6.818 0 0 1 3.211-5.47zM10.5 10a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm3 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM5 13h14v3.5A2.5 2.5 0 0 1 16.5 19h-9A2.5 2.5 0 0 1 5 16.5V13z" />
  </svg>
);

const features = [
  {
    icon: "💊",
    title: "Prescription Scanner",
    desc: "Photograph any prescription or medicine label for instant AI analysis",
  },
  {
    icon: "🤖",
    title: "Intelligent Chatbot",
    desc: "Ask anything dosage, side effects, precautions in plain language",
  },
  {
    icon: "📋",
    title: "Medicine Tracker",
    desc: "Revisit past conversations and track your medicines over time",
  },
  {
    icon: "⚡",
    title: "Instant Answers",
    desc: "No waiting, no jargon clear, reliable healthcare guidance always",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="relative min-h-screen bg-green-900 overflow-hidden font-sans text-green-50">
      {/* ── Google Font import ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body   { font-family: 'DM Sans', sans-serif; }
        .glass {
          background: rgba(20, 83, 45, 0.35);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(134, 239, 172, 0.18);
        }
        .glass-card {
          background: rgba(21, 128, 61, 0.18);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(134, 239, 172, 0.14);
        }
        .btn-primary {
          background: linear-gradient(135deg, #d1fae5 0%, #6ee7b7 60%, #34d399 100%);
          color: #064e3b;
        }
        .btn-primary:hover { filter: brightness(1.08); transform: translateY(-2px); }
        .btn-outline { border: 1.5px solid rgba(134, 239, 172, 0.5); color: #d1fae5; }
        .btn-outline:hover { background: rgba(134,239,172,0.1); transform: translateY(-2px); }
        .noise::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; opacity: 0.4;
        }
      `}</style>

      {/* ── Background atmosphere ── */}
      <div className="noise fixed inset-0 pointer-events-none" />
      <FloatingOrb
        className="w-[600px] h-[600px] bg-green-400 top-[-200px] right-[-150px]"
        delay={0}
      />
      <FloatingOrb
        className="w-[400px] h-[400px] bg-emerald-300 bottom-[10%] left-[-100px]"
        delay={2}
      />
      <FloatingOrb
        className="w-[300px] h-[300px] bg-teal-400 top-[40%] right-[5%]"
        delay={4}
      />

      {/* Botanical leaves */}
      <LeafShape className="w-32 h-48 top-10 right-[8%]" delay={0} />
      <LeafShape className="w-20 h-32 bottom-[20%] left-[6%]" delay={3} />
      <LeafShape className="w-16 h-24 top-[55%] right-[15%]" delay={1.5} />

      {/* Subtle grid lines */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(134,239,172,1) 1px, transparent 1px), linear-gradient(90deg, rgba(134,239,172,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex justify-between items-center glass"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-green-300 text-green-900 flex items-center justify-center shadow-lg">
            <PillIcon />
          </div>
          <span className="font-display font-bold text-xl text-green-100 tracking-tight">
            MediTrack
          </span>
        </div>
        <motion.a
          href="https://shorturl.at/jmtsK"
          className="btn-primary font-body font-medium text-sm px-5 py-2 rounded-full shadow-lg transition-all duration-200 hidden sm:block"
          whileTap={{ scale: 0.97 }}
        >
          Get the App
        </motion.a>
      </motion.nav>

      {/* ── Hero ── */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative pt-32 pb-20 px-6 md:px-16 lg:px-28 min-h-screen flex flex-col justify-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6 inline-flex">
            <span className="glass-card text-green-300 font-body text-xs font-medium px-4 py-1.5 rounded-full tracking-widest uppercase">
              AI-Powered Healthcare
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.92] tracking-tight text-green-50 mb-6"
          >
            Medi
            <span className="italic text-green-300">Track</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="font-body font-light text-lg md:text-xl text-green-200 max-w-xl leading-relaxed mb-4"
          >
            Understand your prescriptions instantly. Upload a medicine label or
            doctor's note and let AI break it down dosage, side effects,
            precautions all in plain language.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="font-body font-light text-base md:text-lg text-green-300/80 max-w-lg leading-relaxed mb-12"
          >
            Track medicines, revisit past conversations, and get reliable
            healthcare guidance straight from your pocket.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4 items-center"
            id="download"
          >
            <motion.a
              href="https://shorturl.at/jmtsK"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary font-body font-semibold text-base px-8 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 transition-all duration-200"
            >
              <AndroidIcon />
              Download .apk
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline font-body font-medium text-base px-8 py-3.5 rounded-2xl flex items-center gap-2.5 transition-all duration-200"
            >
              <span className="text-lg"></span>
              iOS Demo
            </motion.a>
          </motion.div>

          {/* Small trust line */}
          <motion.p
            variants={fadeUp}
            className="mt-8 font-body text-sm text-green-500 tracking-wide"
          >
            Free to download · Android · iOS
          </motion.p>
        </motion.div>

        {/* Decorative large circle */}
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-green-500/10 hidden lg:block pointer-events-none" />
        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-green-400/08 hidden lg:block pointer-events-none" />
      </motion.section>

      {/* ── Features ── */}
      <section className="relative px-6 md:px-16 lg:px-28 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl text-green-100 mb-3">
            Everything you need,
            <br />
            <span className="italic text-green-400">nothing you don't.</span>
          </h2>
          <p className="font-body text-green-400 text-base max-w-sm">
            Built for patients who want clarity without complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card rounded-3xl p-6 flex flex-col gap-3 cursor-default transition-all duration-300"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-display text-lg text-green-100 leading-tight">
                {f.title}
              </h3>
              <p className="font-body text-sm text-green-400 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Download CTA band ── */}
      <section className="relative px-6 md:px-16 lg:px-28 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden relative"
        >
          {/* bg glow inside card */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-green-400 opacity-10 blur-3xl" />
          </div>

          <div className="relative z-10">
            <p className="font-body text-green-400 text-sm tracking-widest uppercase mb-2">
              Available Now
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-green-50 leading-tight mb-3">
              Take control of your
              <br />
              <span className="italic text-green-300">health today.</span>
            </h2>
            <p className="font-body text-green-300/70 text-sm max-w-sm">
              Download MediTrack for free on android.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-3 min-w-[200px]">
            <motion.a
              href="https://shorturl.at/jmtsK"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary font-body font-semibold text-base px-8 py-3.5 rounded-2xl shadow-2xl flex items-center justify-center gap-2.5 transition-all duration-200"
            >
              <AndroidIcon />
              Download .apk
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline font-body font-medium text-base px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2.5 transition-all duration-200"
            >
              <span className="text-base"></span>
              iOS Demo
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 md:px-16 lg:px-28 pb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-green-400 text-green-900 flex items-center justify-center">
            <PillIcon />
          </div>
          <span className="font-display text-green-500 text-sm">MediTrack</span>
        </div>
        <p className="font-body text-green-700 text-xs">
          © {new Date().getFullYear()} MediTrack · Saad Sayyed
        </p>
      </footer>
    </div>
  );
}
