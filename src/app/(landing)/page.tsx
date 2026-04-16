'use client';

import React, { useRef, ReactNode } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Camera, Scale, Trophy, Gavel, Heart, Zap, ShieldAlert } from 'lucide-react';

/**
 * Scrollytelling Neumorphic Design for Pawndora 🐾
 * Inspired by lusion.co:
 * 1. Smooth Scroll: Using Framer Motion for scroll-triggered reveals.
 * 2. Parallax Elements: Floating icons that move at different speeds.
 * 3. Neumorphic Depth: Soft 3D shadows that "press" and "pop".
 * 4. Narrative Flow: A "Court of Pets" story told through scrolling.
 */

const FloatingIcon = ({ children, delay = 0, xOffset = 0, yOffset = 0 }: { children: ReactNode; delay?: number; xOffset?: string | number; yOffset?: string | number }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    style={{ x: xOffset, y: yOffset }}
    className="absolute opacity-20 text-amber-500 pointer-events-none"
  >
    {children}
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, index }: { icon: React.ComponentType<{ size: number; strokeWidth: number }>; title: string; description: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
      className="bg-[#f0f0f0] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] rounded-[40px] p-10 flex flex-col items-center text-center space-y-6 cursor-default transition-shadow hover:shadow-[10px_10px_30px_#bebebe,-10px_-10px_30px_#ffffff]"
    >
      <div className="w-24 h-24 flex items-center justify-center rounded-3xl bg-[#f0f0f0] shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] text-amber-500">
        <Icon size={48} strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-black text-slate-800">{title}</h3>
      <p className="text-slate-600 font-medium leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default function LandingPage() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Neumorphic shadow classes
  const neuButton = "bg-[#f0f0f0] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all duration-200 rounded-2xl";
  const neuAccentButton = "bg-gradient-to-br from-amber-400 to-rose-400 text-white shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff] hover:scale-[1.05] active:scale-[0.95] transition-all duration-200 rounded-2xl";

  return (
    <main ref={containerRef} className="relative min-h-[300vh] bg-[#f0f0f0] text-slate-800 overflow-x-hidden font-sans">
      
      {/* Background Parallax Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingIcon delay={0} xOffset="10%" yOffset="20%"><Heart size={120} /></FloatingIcon>
        <FloatingIcon delay={1} xOffset="80%" yOffset="15%"><Zap size={100} /></FloatingIcon>
        <FloatingIcon delay={2} xOffset="15%" yOffset="70%"><ShieldAlert size={80} /></FloatingIcon>
        <FloatingIcon delay={3} xOffset="75%" yOffset="80%"><Gavel size={140} /></FloatingIcon>
      </div>

      {/* Hero Section - Sticky */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 z-10">
        <motion.div 
          style={{ scale, opacity, y }}
          className="max-w-4xl w-full p-12 md:p-20 text-center space-y-10 bg-[#f0f0f0] shadow-[30px_30px_80px_#bebebe,-30px_-30px_80px_#ffffff] rounded-[50px]"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-8 py-3 mb-4 text-sm font-black tracking-[0.2em] text-amber-600 uppercase bg-[#f0f0f0] shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] rounded-full"
          >
            The Court is in Session
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-slate-900"
          >
            Welcome to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">Pawndora 🐾</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-3xl text-slate-500 font-medium max-w-2xl mx-auto leading-tight"
          >
            Your pet deserves a verdict. <br/>
            <span className="text-slate-800">Let the jury decide their true nature.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-8 justify-center pt-10"
          >
            {isAuthenticated ? (
              <Link href="/home" className={`px-12 py-5 text-xl font-black ${neuAccentButton}`}>
                Enter the Court
              </Link>
            ) : (
              <>
                <button onClick={() => signIn('google', { callbackUrl: '/home' })} className={`px-12 py-5 text-xl font-black ${neuAccentButton}`}>
                  Sign In to Judge
                </button>
                <Link href="#features" className={`px-12 py-5 text-xl font-black text-slate-600 ${neuButton}`}>
                  Learn More
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center text-slate-400 font-bold tracking-widest text-xs"
        >
          SCROLL TO JUDGE
          <div className="w-1 h-12 bg-slate-200 rounded-full mt-4 overflow-hidden">
            <motion.div 
              style={{ height: "100%", scaleY: smoothProgress, originY: 0 }}
              className="w-full bg-amber-400"
            />
          </div>
        </motion.div>
      </section>

      {/* Narrative Section 1 */}
      <section className="relative h-screen flex items-center justify-center px-6 z-10">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-none">
              Chaos <br/> <span className="text-amber-500">Energy</span>
            </h2>
            <p className="text-2xl text-slate-600 font-medium leading-relaxed">
              Is your cat a secret mastermind? Does your dog have a hidden agenda? Our algorithm analyzes the "chaos metrics" that traditional pet forums ignore.
            </p>
          </motion.div>
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="aspect-square bg-[#f0f0f0] shadow-[30px_30px_80px_#bebebe,-30px_-30px_80px_#ffffff] rounded-[60px] flex items-center justify-center text-[150px]"
          >
            😼
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative min-h-screen py-32 px-6 z-10 flex flex-col items-center justify-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-center mb-24 text-slate-900"
        >
          The Verdict Process
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl w-full">
          <FeatureCard 
            index={0}
            icon={Camera}
            title="Upload & Judge"
            description="Submit your pet's photo and let the algorithm analyze their true nature. No fluff, just facts."
          />
          <FeatureCard 
            index={1}
            icon={Scale}
            title="Get a Verdict"
            description="Chaos energy, betrayal capacity, fluff factor—metrics that actually matter in the court of law."
          />
          <FeatureCard 
            index={2}
            icon={Trophy}
            title="Hall of Shame"
            description="Compete in tournaments and see where your pet ranks among the most chaotic legends."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative h-screen flex items-center justify-center px-6 z-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className={`w-full max-w-4xl p-16 md:p-24 text-center space-y-10 bg-[#f0f0f0] shadow-[40px_40px_100px_#bebebe,-40px_-40px_100px_#ffffff] rounded-[60px]`}
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900">Ready to judge?</h2>
          <p className="text-2xl text-slate-500 font-medium">The jury is waiting. Don't let the chaos go unpunished.</p>
          
          <div className="pt-10">
            {isAuthenticated ? (
              <Link href="/home" className={`inline-block px-16 py-6 text-2xl font-black ${neuAccentButton}`}>
                Go to Dashboard →
              </Link>
            ) : (
              <button onClick={() => signIn('google', { callbackUrl: '/home' })} className={`inline-block px-16 py-6 text-2xl font-black ${neuAccentButton}`}>
                Get Started →
              </button>
            )}
          </div>
        </motion.div>
      </section>
      
      <footer className="relative py-12 text-center text-slate-400 text-sm font-bold tracking-widest z-10">
        &copy; {new Date().getFullYear()} PAWNDORA 🐾 • THE COURT OF CHAOS
      </footer>
    </main>
  );
}
