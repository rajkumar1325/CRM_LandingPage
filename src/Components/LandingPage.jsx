import React, { useEffect, useState, useRef } from "react";
import LogoIcon from "../Assets/Icons/logoIcon.svg?react";

export default function LandingPage() {
  // ================================
  // STATE
  // ================================

  // parallax scroll value
  const [scrollY, setScrollY] = useState(0);

  // auth form mode: "signup" | "login"
  const [authMode, setAuthMode] = useState("signup");

  // which role is currently selected: "admin" | "manager" | "user" | null
  const [selectedRole, setSelectedRole] = useState(null);

  // highlight + zoom animation state for auth card
  const [authHighlight, setAuthHighlight] = useState(false);

  // reference to the auth card block (for scrolling)
  const authCardRef = useRef(null);



  // testimonial slider index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Auto slide option
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 4000); // slides every 4s

    return () => clearInterval(interval);
  }, [testimonialIndex]);




  // faq open index
  const [openFaq, setOpenFaq] = useState(null);



  // SCROLL LISTENER (PARALLAX)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || window.pageYOffset);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




  // P............................................Password Check 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shake, setShake] = useState(false);

  // password validation logic
  const passwordMatch = password === confirmPassword && password.length>0;
  const triggerShake =() => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 400);
  }




  // .........................................Pricing plans
  const [selectedPlan, setSelectedPlan] = useState('Growth');


  
  // ................................................Testimonials & FAQs
  const testimonials = [
    {
      name: "Tony Start",
      role: "Sales Lead, Stark Tower",
      text: "We moved from messy sheets to this CRM in a week. Our team finally has one clean view of every lead.",
      image: "/images/john.jpg" || "RK"

    },
    {
      name: "Elizabeth Olsen",
      role: "Founder, GrowthStack",
      text: "The dashboards are simple but powerful. The team loves the clarity on daily tasks and pipeline health.",
      image: "/images/john.jpg" || "RK"
    },
    {
      name: "Andrew Garfield",
      role: "Head of Customer Success, TrioSoft",
      text: "Follow-ups and renewals are now automated. Churn dropped and upsells increased in just two months.",
      image: "/images/john.jpg" || "RK"
    },
  ];

  const faqs = [
    {
      q: "Is this CRM good for small teams?",
      a: "Yes. You can start with 2–3 users and scale as your team grows. Pricing is per seat, no hidden charges.",
    },
    {
      q: "Do I need a credit card for the free trial?",
      a: "No. You can start a 14-day free trial with just your email and company name.",
    },
    {
      q: "Can I import my existing leads?",
      a: "Yes. You can import from CSV or Excel in a few clicks. Our wizard helps you map all fields correctly.",
    },
    {
      q: "Is there support available?",
      a: "We offer email and chat support for all paid plans, plus onboarding help for teams with more than 10 users.",
    },
  ];


  


  
  // AUTH CARD SCROLL + HIGHLIGHT
  const focusAuthCard = () => {
    // Scroll the auth card into view
    if (authCardRef.current) {
      authCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // Trigger zoom / highlight animation
    setAuthHighlight(true);
    setTimeout(() => setAuthHighlight(false), 700); // reset after animation duration
  };

  // PARALLAX CALCS
  const layer1 = scrollY * 0.1;
  const layer2 = scrollY * 0.2;

  // ......................................................MAIN File
  return (
    <div className="min-h-screen bg-[#050816] text-gray-100 relative overflow-x-hidden">
      {/* ================= GLOW BEAM (BACKGROUND FX) ================= */}
      <div className="glow-stream"></div>

      {/* ================= BACKGROUND LAYERS (PARALLAX) ================= */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-72 w-72 rounded-full bg-purple-600/40 blur-3xl"
        style={{ transform: `translateY(${layer1}px)` }}
      />

      {/* Bottom right bubble */}
      <div
        className="pointer-events-none absolute bottom-10 -right-40 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl"
        style={{ transform: `translateY(${layer2}px)` }}
      />

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0">
        <span
          className="absolute top-24 left-10 h-2 w-2 rounded-full bg-cyan-400/60"
          style={{ animation: "float-slow 10s ease-in-out infinite" }}
        />
        <span
          className="absolute top-1/3 right-16 h-1.5 w-1.5 rounded-full bg-purple-400/70"
          style={{ animation: "float-slower 12s ease-in-out infinite" }}
        />
        <span
          className="absolute bottom-20 left-1/2 h-2 w-2 rounded-full bg-emerald-400/60"
          style={{ animation: "float-slow 14s ease-in-out infinite" }}
        />
      </div>

      {/* ========================== PAGE CONTENT WRAPPER ================ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* ==================================== NAVBAR ================ */}
        <header className="flex items-center justify-between py-5">

          {/* ............Logo + name */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/40">
              CC
            </div>

            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-semibold text-sm sm:text-base">CuriumCRM</span>
              <span className="text-[10px] text-gray-400">Close more deals, faster.</span>
            </div>
          </div>

          {/* nav-items */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300 cursor-pointer">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#pricing" className="hover:text-white transition">
              Pricing
            </a>
            <a href="#testimonials" className="hover:text-white transition">
              Customers
            </a>
            <a href="#faq" className="hover:text-white transition">
              FAQ
            </a>
          </nav>

          {/* Top-right: Login / Start free trial */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* LOGIN: text button with active styling when authMode is "login" */}
            <button
              onClick={() => {
                setAuthMode("login");
                focusAuthCard();
              }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer 
                ${
                authMode === "login"
                ? "bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-black shadow-md shadow-cyan-500/40 hover:brightness-110"
                : "bg-white text-black shadow-lg shadow-white/20"
              }`}
            >
              Login
            </button>

            {/* START FREE TRIAL: pill button, styled active when authMode is "signup" */}
            <button
              onClick={() => {
                setAuthMode("signup");
                focusAuthCard();
              }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer
                ${
                  authMode === "signup"
                  ? "bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-black shadow-md shadow-cyan-500/40 hover:brightness-110"
                  : "bg-white text-black shadow-lg shadow-white/20"
                }`}
            >
              Start free trial
            </button>
          </div>
        </header>




        {/* ================= HERO SECTION ================= */}
        <section className="pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-20 fade-section">
          {/* -------- LEFT SIDE HERO TEXT -------- */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/5 px-3 py-1 text-[11px] sm:text-xs text-cyan-200 mb-4">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live pipeline, smart tasks, real-time sales health.
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug font-semibold tracking-tight text-white">
              Subscription CRM
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
                built for growing SaaS teams.
              </span>
            </h1>

            <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-300 max-w-xl">
              Track leads, automate follow-ups, and get a clear view of your recurring
              revenue — all in one simple, fast CRM designed for subscription
              businesses.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => {
                  setAuthMode('signup');
                  focusAuthCard();
                } }

                className={` px-26 rounded-full transition cursor-pointer ${
                    authMode === "signup"
                      ? "bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-black shadow-md shadow-cyan-500/40 hover:brightness-110"
                      : "bg-white text-black shadow-lg shadow-white/20"
                  }`}
              >
                Getting started
  
              </button>

              <button 
                className="px-4 py-2.5 rounded-full border border-gray-600 text-xs sm:text-sm text-gray-200 hover:border-cyan-400 hover:text-cyan-300 transition flex items-center gap-2"
                >
                  <a href="#!">Watch 3-min overview</a>
                <span className="text-[11px]">▶</span>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-[11px] sm:text-xs text-gray-400">
              <div>
                <span className="font-semibold text-gray-100">+24%</span> faster response
                time
              </div>
              <div>
                <span className="font-semibold text-gray-100">+18%</span> more closed
                deals
              </div>
              <div>
                <span className="font-semibold text-gray-100">14-day</span> free trial, no
                card
              </div>
            </div>
          </div>





          {/* -------------------------------- RIGHT SIDE --AUTH BLOCK -------- */}
          <div
            ref={authCardRef}
            className={`transition-all duration-500 rounded-2xl  ${
              authHighlight ? "scale-105 ring-2 ring-cyan-400/50 shadow-2xl bg-gray-700" : "scale-100"
            } w-full max-w-md lg:max-w-sm`}
          >
            <div className="rounded-2xl bg-[#050b17]/80 border border-gray-700/60 shadow-xl shadow-cyan-500/20 p-5 backdrop-blur-md">
              
              {/* ===== ROLE SELECTION ALWAYS VISIBLE ===== */}
              <h2 className="text-sm font-semibold mb-2">Choose your role</h2>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {["admin", "manager", "user"].map((role) => (
                  <div
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`cursor-pointer p-3 rounded-xl border text-center transition 
                      ${
                        selectedRole === role
                          ? "border-cyan-400 bg-cyan-400/10 shadow-md shadow-cyan-500/30"
                          : "border-gray-700 hover:border-cyan-400"
                      }`}
                    title={
                      role === "admin"
                        ? "Full access to settings, teams, and billing."
                        : role === "manager"
                        ? "Manage team pipelines and performance."
                        : "Focus on your own leads and tasks."
                    }
                  >
                    <span className="text-white font-medium capitalize">{role}</span>
                  </div>
                ))}
              </div>

              {/* Selected Role Indicator */}
              <p className="text-xs text-cyan-300 mb-3">
                Selected role:{" "}
                {selectedRole ? (
                  <strong className="uppercase">{selectedRole}</strong>
                ) : (
                  <span className="text-gray-500">None selected</span>
                )}
              </p>



              {/* ===== LOGIN / SIGNUP TOGGLE ===== */}
              <div className="flex mb-4 rounded-full bg-gray-800/70 p-1 text-xs sm:text-sm">
                <button
                  onClick={() => setAuthMode("signup")}
                  className={`flex-1 py-1.5 rounded-full transition ${
                    authMode === "signup"
                      ? "bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-black shadow-md shadow-cyan-500/40 hover:brightness-110"
                      : "bg-white text-black shadow-lg shadow-white/20"
                  }`}
                >
                  Sign up
                </button>

                <button
                  onClick={() => setAuthMode("login")}
                  className={`flex-1 py-1.5 rounded-full transition ${
                    authMode === "login"
                      ? "bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-black shadow-md shadow-cyan-500/40 hover:brightness-110"
                  : "bg-white text-black shadow-lg shadow-white/20"
                  }`}
                >
                  Login
                </button>
              </div>



              {/* ===== AUTH FORM CONTENT ===== */}
              <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-1">
                {authMode === "signup" ? "Create your workspace" : "Welcome back"}
              </h2>

              <p className="text-[11px] sm:text-xs text-gray-400 mb-4">
                {authMode === "signup"
                  ? "Start your free 14-day trial. No credit card needed."
                  : "Sign in to view your deals, tasks, and pipeline."}
              </p>


      {/* .......................................FORM ...................... */}
              <form className="space-y-3 text-[11px] sm:text-xs">

                  {/* company name */}  
                  <div className="space-y-1">
                    <label className="block text-gray-300">Company name</label>
                    <input
                      type="text"
                      className="w-full rounded-lg bg-[#050816] border border-gray-700 px-3 py-2 text-xs sm:text-sm text-gray-100 outline-none focus:border-cyan-400"
                      placeholder="Acme Inc."
                    />
                  </div>



                {/* Signup-only fields as we use && */}
                {authMode === "signup" && (
                  <>
                    {/* email input */}
                    <div className="space-y-1">
                      <label className="block text-gray-300">Work email</label>
                      <input
                        type="email"
                        className="w-full rounded-lg bg-[#050816] border border-gray-700 px-3 py-2 text-xs sm:text-sm text-gray-100 outline-none focus:border-cyan-400"
                        placeholder="you@company.com"
                      />
                    </div>
                  </>

                )}

                {/* password */}
                <div className="space-y-1">
                  <label className="block text-gray-300">Password</label>
                  <input
                    type="password"
                    value={password}

                    onChange={ (e)=> setPassword(e.target.value) }

                    className={`w-full rounded-lg bg-[#050816] border px-3 py-2 text-xs sm:text-sm text-gray-100 outline-none 
                        ${password && !passwordMatch ? "border-red-500" : "border-gray-700"} 
                        ${shake ? "input-shake" : ""}
                      `}

                    placeholder="••••••••"
                  />
                </div>


                {/* Confirm password */}
                <div className="space-y-1">
                  <label className="block text-gray-300">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    onBlur={() => {
                          if (!passwordMatch) triggerShake();
                        }}

                    
                    className={`w-full rounded-lg bg-[#050816] border px-3 py-2 text-xs sm:text-sm text-gray-100 outline-none 
                          ${confirmPassword && !passwordMatch ? "border-red-500" : "border-gray-700"} 
                          ${shake ? "input-shake" : ""}
                        `}
                    placeholder="••••••••"
                  />
                </div>


                {/* MATCH / ERROR MESSAGE */}
                {password && confirmPassword && (
                  <p className={`text-xs ${
                      passwordMatch ? "text-green-400" : "text-red-400"
                  }`}>
                    {passwordMatch ? "Passwords match " : "Passwords do not match "}
                  </p>
                )}


                {/* Submit button (you can hook real submit logic here later) */}
                <button
                  type="button"
                  disabled={!passwordMatch}
                  className={`w-full mt-2 rounded-lg text-xs sm:text-sm font-semibold py-2.5 transition
                    ${
                      passwordMatch
                        ? "bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-slate-900 shadow-md shadow-cyan-500/40 hover:brightness-110"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  Create account
                </button>

              </form>

              {/* Legal */}
              <p className="mt-3 text-[10px] sm:text-[11px] text-gray-500">
                By continuing, you agree to our{" "}

                <span className="text-cyan-300 cursor-pointer" 
                      onClick={(e)=> {
                        console.log(e);
                        alert("Terms and Conditions");
                        }
                      }>Terms</span> and{" "}

                <span className="text-cyan-300 cursor-pointer" 
                      onClick={ (e)=> {
                        console.log(e);
                        alert("Read our Privacy Policy") 
                      }
                      }>Privacy Policy</span>.
              </p>
            </div>
          </div>
        </section>






        {/* ================= FEATURES SECTION ================= */}
        <section id="features" className="py-10 sm:py-14 border-t border-gray-800/70">
          <div className="flex justify-between items-end mb-6 fade-section">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                Stay on top of every lead.
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-md">
                One workspace for leads, conversations, tasks, and revenue — designed so
                your team never misses a follow-up again.
              </p>
            </div>
            <p className="hidden sm:block text-[11px] text-gray-400">
              Realtime insights • Tasks • Team performance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* CARD 1 */}
            <div className="rounded-2xl border border-gray-800 bg-[#050b17]/90 p-4 shadow-sm shadow-cyan-500/10 card-hover fade-section fade-delay-1">
              <p className="text-[11px] text-cyan-300 mb-1 uppercase tracking-wide">
                Lead Inbox
              </p>
              <h3 className="text-sm sm:text-base font-semibold mb-2">
                Central lead timeline
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                View every touchpoint — emails, calls, notes — in one place.
              </p>
              <ul className="text-[11px] text-gray-400 space-y-1">
                <li>• Filter by status, owner, and source</li>
                <li>• Instant search by name, company, or email</li>
                <li>• One-click jump to deal details</li>
              </ul>
            </div>

            {/* CARD 2 */}
            <div className="rounded-2xl border border-gray-800 bg-[#050b17]/90 p-4 shadow-sm shadow-purple-500/10 card-hover fade-section fade-delay-2">
              <p className="text-[11px] text-purple-300 mb-1 uppercase tracking-wide">
                Tasks & Activities
              </p>
              <h3 className="text-sm sm:text-base font-semibold mb-2">
                Smart daily task list
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                Auto-built to-dos based on due follow-ups, new leads, and renewal dates.
              </p>
              <ul className="text-[11px] text-gray-400 space-y-1">
                <li>• Call, email, and meeting tasks</li>
                <li>• Overdue items highlighted gently</li>
                <li>• Personal & team-wide activity views</li>
              </ul>
            </div>

            {/* CARD 3 */}
            <div className="rounded-2xl border border-gray-800 bg-[#050b17]/90 p-4 shadow-sm shadow-emerald-500/10 card-hover fade-section fade-delay-3">
              <p className="text-[11px] text-emerald-300 mb-1 uppercase tracking-wide">
                Revenue Insights
              </p>
              <h3 className="text-sm sm:text-base font-semibold mb-2">
                Clean subscription analytics
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                Track MRR, churn, expansion, and win-rates with simple charts.
              </p>
              <ul className="text-[11px] text-gray-400 space-y-1">
                <li>• Plan-wise MRR breakdown</li>
                <li>• Pipeline by stage & owner</li>
                <li>• Weekly email reports</li>
              </ul>
            </div>
          </div>
        </section>
        



        {/* =================........................... PRICING SECTION ================= */}
        <section id="pricing" className="py-10 sm:py-14 border-t border-gray-800/70">
          <div className="text-center mb-8 fade-section">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
              Simple, transparent pricing.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Start free, upgrade only when your team is ready.
            </p>
          </div>

          {/* ====== PLAN TOGGLER ====== */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-800/60 rounded-full p-1 text-xs sm:text-sm shadow-inner border border-gray-700">
              {["Starter", "Growth", "Scale"].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan)}
                  className={`px-4 py-1.5 rounded-full transition-all font-medium
                    ${
                      selectedPlan === plan
                        ? "bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-black shadow-md shadow-cyan-500/40"
                        : "text-gray-300 hover:text-white"
                    }
                  `}
                >
                  {plan}
                </button>
              ))}
            </div>
          </div>

          {/* ================= CARDS ================= */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

            {/* Starter */}
            <div
              onClick={ ()=> setSelectedPlan('Starter')}
              className={`rounded-2xl border bg-[#050b17]/90 p-5 flex flex-col card-hover 
                fade-section fade-delay-1 transition-all
                ${
                  selectedPlan === "Starter"
                    ? "border-cyan-400 shadow-cyan-500/40 scale-[1.03]"
                    : "border-gray-800"
                }
              `}
            >
              <h3 className="text-sm sm:text-base font-semibold mb-1">Starter</h3>
              <p className="text-xs text-gray-400 mb-3">
                For solo founders and very small teams.
              </p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-xl sm:text-2xl font-semibold">$0</span>
                <span className="text-[11px] text-gray-400">/ user / mo</span>
              </div>
              <ul className="text-[11px] text-gray-400 space-y-1 mb-4 flex-1">
                <li>• Up to 100 active leads</li>
                <li>• 1 pipeline</li>
                <li>• Basic task management</li>
                <li>• Email support</li>
              </ul>
              <button 
                className="mt-auto w-full rounded-full border border-gray-600 text-xs sm:text-sm py-2 hover:border-cyan-400 hover:text-cyan-300 transition cursor-pointer"
                onClick={focusAuthCard}
                >
                Get started
              </button>
            </div>

            {/* Growth */}
            <div
              onClick={ ()=> setSelectedPlan("Growth") }
              className={`rounded-2xl border bg-[#050b17]/90 p-5 flex flex-col card-hover 
                fade-section fade-delay-2 transition-all
                ${
                  selectedPlan === "Growth"
                    ? "border-cyan-400 shadow-cyan-500/40 scale-[1.03]"
                    : "border-gray-800"
                }
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm sm:text-base font-semibold">Growth</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/60">
                  Most popular
                </span>
              </div>
              <p className="text-xs text-gray-300 mb-3">For growing SaaS teams.</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-xl sm:text-2xl font-semibold">$19</span>
                <span className="text-[11px] text-gray-400">/ user / mo</span>
              </div>
              <ul className="text-[11px] text-gray-200 space-y-1 mb-4 flex-1">
                <li>• Unlimited leads & pipelines</li>
                <li>• Tasks, reminders, automations</li>
                <li>• Dashboards & reports</li>
                <li>• Priority support</li>
              </ul>
              <button 
                className="mt-auto w-full rounded-full border border-gray-600 text-xs sm:text-sm py-2 hover:border-cyan-400 hover:text-cyan-300 transition cursor-pointer"
                onClick={focusAuthCard}
                >
                Start 14-day trial
              </button>
            </div>

            {/* Contact Scale */}
            <div  
              onClick={ () => setSelectedPlan("Scale")}
              className={`rounded-2xl border bg-[#050b17]/90 p-5 flex flex-col card-hover 
                fade-section fade-delay-3 transition-all
                ${
                  selectedPlan === "Scale"
                    ? "border-cyan-400 shadow-cyan-500/40 scale-[1.03]"
                    : "border-gray-800"
                }
              `}
            >
              <h3 className="text-sm sm:text-base font-semibold mb-1">Scale</h3>
              <p className="text-xs text-gray-400 mb-3">
                For large teams needing governance.
              </p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-xl sm:text-2xl font-semibold">Let's talk</span>
              </div>
              <ul className="text-[11px] text-gray-400 space-y-1 mb-4 flex-1">
                <li>• Roles & permissions</li>
                <li>• Custom workflows</li>
                <li>• Dedicated success manager</li>
                <li>• SSO & audit logs</li>
              </ul>
              <button 
                className="mt-auto w-full rounded-full border border-gray-600 text-xs sm:text-sm py-2 hover:border-purple-400 hover:text-purple-300 transition cursor-pointer"
                onClick={focusAuthCard}
                
                >
                Contact sales
              </button>
            </div>
          </div>
        </section>




        {/* ================= TESTIMONIALS SECTION ================= */}
        <section id="testimonials" className="py-10 sm:py-14 border-t border-gray-800/70">
          <div
            key={testimonialIndex}
            className="rounded-2xl border border-gray-800 bg-[#050b17]/90 p-5 sm:p-6 shadow-md shadow-purple-500/20
            animate-fade"
          >
            {/* PROFILE IMAGE */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={testimonials[testimonialIndex].image}
                alt={testimonials[testimonialIndex].name}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border border-gray-700"
              />
              <div>
                <p className="font-semibold text-gray-100 text-sm sm:text-base">
                  {testimonials[testimonialIndex].name}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-400">
                  {testimonials[testimonialIndex].role}
                </p>
              </div>
            </div>

            {/* TESTIMONIAL TEXT */}
            <p className="text-xs sm:text-sm text-gray-200 mb-4">
              “{testimonials[testimonialIndex].text}”
            </p>

            {/* DOT INDICATORS */}
            <div className="flex justify-end gap-1">
              {testimonials.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 w-3 rounded-full ${
                    idx === testimonialIndex ? "bg-cyan-400" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

        </section>



        {/* ================= FAQ SECTION ================= */}
        <section id="faq" className="py-10 sm:py-14 border-t border-gray-800/70">
          <div className="text-center mb-6 fade-section">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
              Answers to common questions.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Have something else in mind? Reach out anytime.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5">
            {faqs.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-800 bg-[#050b17]/90 p-3 sm:p-4 cursor-pointer card-hover fade-section"
                  onClick={() => setOpenFaq(open ? null : idx)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-100">
                      {item.q}
                    </p>
                    <span className="text-gray-400 text-xs">
                      {open ? "–" : "+"}
                    </span>
                  </div>

                  {open && (
                    <p className="mt-2 text-[11px] sm:text-xs text-gray-400">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>



        {/* ================= FOOTER ================= */}
        <footer className="py-6 border-t border-gray-800/70 text-[11px] sm:text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
            <p>© {new Date().getFullYear()} CuriumCRM. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#!" className="hover:text-gray-300">
                Privacy
              </a>
              <a href="#!" className="hover:text-gray-300">
                Terms
              </a>
              <a href="#!" className="hover:text-gray-300">
                Docs
              </a>
              <a href="#!" className="hover:text-gray-300">
                Status
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
