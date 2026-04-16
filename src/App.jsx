import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';

import img1 from './img/d-1.png';
import img2 from './img/d-2.png';
import img3 from './img/d-3.png';
import bgMain from './img/background.jpg';
import downloadBg from './img/download.png';
import galWall from './img/gal_wall.jpg';
import gymBg from './img/gym-background.jpg';
import introPic from './img/intro-pic.png';
import pic1 from './img/2.jpg';
import pic2 from './img/pic2.jpg';
import pic3 from './img/pic3.jpg';

// Gallery Image Imports
import g1 from './img/1.jpg';
import g2 from './img/2.jpg';
import g3 from './img/3.jpg';
import g4 from './img/4.jpg';
import g5 from './img/5.jpg';
import g6 from './img/6.jpg';
import gPic1 from './img/pic1.jpg';

import w1 from './img/w1.png';
import w2 from './img/w2.png';
import w3 from './img/w3.png';
import w4 from './img/w4.png';
import w5 from './img/w5.png';
import w6 from './img/w6.png';

const images = [img1, img2, img3];

const content = [
  {
    tag: "HEALTH",
    title: "GROW YOUR",
    highlight: "STRENGTH",
    description: "Push your limits and redefine what's possible. Join our premium fitness community and build your dream physique.",
    bg: "bg-[#fe7300]",
    btnText: "Ask For Price",
  },
  {
    tag: "FITNESS",
    title: "TRANSFORM",
    highlight: "YOUR BODY",
    description: "Experience state-of-the-art equipment and expert guidance tailored to your personal goals.",
    bg: "bg-[#fe7300]",
    btnText: "Start Training",
  },
  {
    tag: "ENDURANCE",
    title: "MAXIMIZE",
    highlight: "YOUR ENERGY",
    description: "Train like a champion with our specialized high-intensity programs. Unstoppable energy starts here.",
    bg: "bg-[#fe7300]",
    btnText: "Join Now",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const galleryItemsData = [
  { num: "06", cat: "FITNESS", title: "FITNESS TRAINING FOR MAN", img: gPic1 },
  { num: "01", cat: "BOXING", title: "BOXING TRAINING SESSION", img: g1 },
  { num: "02", cat: "CARDIO TRAINING", title: "CARDIO TRAINING SESSION", img: g2 },
  { num: "03", cat: "BODYBUILDING", title: "BODYBUILDING TRAINING SESSION", img: g3 },
  { num: "04", cat: "BODYBUILDING", title: "PSYCHOLOGY OF TRAINING", img: g4 },
  { num: "05", cat: "YOGA", title: "YOGA TRAINING SESSION", img: g5 },
  { num: "07", cat: "CROSSFIT", title: "CROSSFIT TRAINING", img: g6 },
];
// Append copies for a looping track effect
const extendedGallery = [...galleryItemsData, ...galleryItemsData, ...galleryItemsData];

function GalleryTextBlock({ item }) {
  return (
    <div className="border-[0.5px] border-zinc-800 bg-[#0a0a0a] p-8 h-[220px] flex flex-col justify-end shadow-2xl hover:bg-zinc-900 transition-colors duration-500">
      <div className="flex items-center gap-3 mb-2">
        <span
          className="text-[65px] font-black text-transparent leading-none select-none"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
        >
          {item.num}
        </span>
        <span className="text-[#fe7300] font-black text-[11px] tracking-widest uppercase mt-4">
          {item.cat}
        </span>
      </div>
      <h3 className="text-white font-black text-[22px] uppercase leading-[1.15] tracking-tight">
        {item.title}
      </h3>
    </div>
  );
}

function GalleryImageBlock({ item }) {
  return (
    <div className="h-[300px] overflow-hidden bg-black shadow-2xl group cursor-pointer">
      <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
    </div>
  );
}

function Counter({ from = 0, to, duration = 2 }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value);
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  return <span ref={nodeRef}>{from}</span>;
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [logoIndex, setLogoIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [activeTrainer, setActiveTrainer] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => { touchStartX.current = e.changedTouches[0].clientX; };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const sectionIds = ['home', 'about', 'classes', 'contact'];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  const clientLogos = [w1, w2, w3, w4, w5, w6];
  // Extended logos for seamless loop
  const extendedLogos = [...clientLogos, ...clientLogos];

  const testimonials = [
    { name: "Rahul Sakaria", role: "Local Guide", stars: 5, text: "I have been working out here for a month now and the experience has been amazing. The gym has a very positive vibe and the trainers are very friendly, professional and attentive. They will help you in crafting a personalized diet and workout plan." },
    { name: "Pradiksha Devi", role: "Member", stars: 5, text: "Their training is very effective and coach Nandhini is very friendly, motivating and push me to my level best in workouts. I lost nearly 2 kgs in one month along with diet. Apart from weightloss I could see inch loss clearly, getting better posture and metabolism." },
    { name: "Sujith Kumar", role: "Local Guide", stars: 5, text: "Best place to workout, effective coaching and supportive trainers. Friendly Staff and Updated Equipment to Work out ON. Nice location with safe and good Parking space." },
  ];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-scroll for Client Logos
  useEffect(() => {
    const timer = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % clientLogos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [clientLogos.length]);

  // Main Hero Timer
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  // Gallery Timer
  const handleGalleryNext = () => {
    setGalleryIndex((prev) => (prev + 1) % (extendedGallery.length - 4));
  };
  const handleGalleryPrev = () => {
    setGalleryIndex((prev) => (prev - 1 + extendedGallery.length - 4) % (extendedGallery.length - 4));
  };

  useEffect(() => {
    const galleryTimer = setInterval(() => {
      handleGalleryNext();
    }, 4000);
    return () => clearInterval(galleryTimer);
  }, [galleryIndex]);

  const current = content[index];

  return (
    <div className="min-h-screen bg-white text-zinc-950 overflow-hidden flex flex-col font-sans selection:bg-zinc-200">

      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={bgMain}
          alt="background"
          className="w-full h-full object-cover grayscale opacity-[0.4] brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/95" />
      </div>

      {/* Header Container (Top Bar + Nav) */}
      <header className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-zinc-100">
        {/* Top Header Information */}
        <div className="w-full py-2 px-10 hidden md:flex justify-between items-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          <span>Mon - Sat : 9am to 7pm</span>
          <span>Ramalingam hospital, Ram Complex, No12, opp. Meyannur Roads, Salem, Tamil Nadu 636004</span>
        </div>

        {/* Navigation */}
        <nav className="w-full py-2 px-10 flex items-center justify-between text-zinc-950 h-16 overflow-visible">
          <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection('home')}>
            <img src="/corefitness-removebg-preview.png" alt="Core Fitness" className="h-40 w-auto object-contain transition-transform group-hover:scale-105 -my-10 relative z-10" />
          </div>

          <div className="hidden md:flex items-center gap-10 text-[13px] font-extrabold tracking-tight">
            {[
              { label: 'Home', id: 'home' },
              { label: 'About', id: 'about' },
              { label: 'Classes', id: 'classes' },
              { label: 'Contact', id: 'contact' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`hover:text-[#fe7300] transition-colors uppercase bg-transparent border-none cursor-pointer font-extrabold text-[13px] tracking-tight ${activeSection === id ? 'text-[#fe7300]' : ''
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <div className="h-8 w-[1px] bg-zinc-200 mx-6 hidden lg:block" />
            <button onClick={() => scrollToSection('contact-form')} className="relative px-9 py-3 bg-white font-black uppercase tracking-widest text-[12px] group overflow-hidden transition-colors border-y border-zinc-100">
              {/* Vertical Side Bars */}
              <div className="absolute left-0 inset-y-0 w-[2.5px] bg-zinc-950 z-20" />
              <div className="absolute right-0 inset-y-0 w-[2.5px] bg-zinc-950 z-20" />

              {/* Slow Orange Fill Animation */}
              <div className="absolute inset-0 bg-[#fe7300] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-0" />

              {/* Button Text */}
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                GET IN TOUCH
              </span>
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-[98] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-[64px] left-0 right-0 z-[99] md:hidden bg-white border-b border-zinc-200 shadow-2xl"
            >
              <div className="flex flex-col items-center gap-6 py-8 px-6">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'About', id: 'about' },
                  { label: 'Classes', id: 'classes' },
                  { label: 'Contact', id: 'contact' },
                ].map(({ label, id }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`text-lg font-black uppercase tracking-widest bg-transparent border-none cursor-pointer transition-colors py-2 ${activeSection === id ? 'text-[#fe7300]' : 'text-zinc-900'}`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('contact-form')}
                  className="mt-2 px-10 py-4 bg-[#fe7300] text-white font-black uppercase tracking-widest text-sm"
                >
                  GET IN TOUCH
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <main id="home" className="flex-1 relative flex items-center min-h-screen pt-20 lg:pt-32 pb-12 overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="container mx-auto px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-2 items-center z-10 relative">

          {/* Left Content */}
          <div className="flex flex-col items-start gap-3 h-full pt-8 lg:pt-48">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-col gap-0"
              >
                <motion.div variants={itemVariants}>
                  <span className="font-black tracking-widest text-[#fe7300] text-lg uppercase">
                    {current.tag}
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-6xl lg:text-[110px] font-black leading-[0.82] tracking-tighter uppercase text-zinc-900 mt-2"
                >
                  {current.title} <br />
                  <span className="text-zinc-900">{current.highlight}</span>
                </motion.h1>

                <motion.p variants={itemVariants} className="max-w-sm text-sm lg:text-[17px] text-zinc-500 font-semibold leading-relaxed mt-6">
                  {current.description}
                </motion.p>

                <motion.div variants={itemVariants} className="mt-10">
                  <button onClick={() => scrollToSection('contact-form')} className="px-10 py-5 bg-[#fe7300] text-white font-black uppercase tracking-widest text-[12px] hover:scale-105 transition-all shadow-xl shadow-[#fe7300]/20">
                    {current.btnText}
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Image - Prevent Overflowing Header */}
          <div className="relative h-[400px] lg:h-[75vh] w-full flex items-end justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: 300,
                  rotateY: -20,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                  scale: 1.35,
                }}
                exit={{
                  opacity: 0,
                  x: -300,
                  rotateY: 20,
                  scale: 0.9,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.16, 1, 0.3, 1],
                  type: "tween"
                }}
                className="absolute w-full h-full flex items-end justify-center lg:justify-end origin-bottom"
              >
                <img
                  src={images[index]}
                  alt="Gym Model"
                  className="h-[75%] lg:h-[80%] w-auto object-contain z-10 select-none pointer-events-none"
                  style={{
                    filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.2))",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>



        {/* Pagination Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-[#fe7300]' : 'w-4 bg-zinc-200'}`}
            />
          ))}
        </div>

      </main>

      {/* About Us Section */}
      <section id="about" className="bg-[#f9f9f9] pt-[120px] pb-[90px] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column: Image with Outline Text */}
            <div className="relative mb-[30px] flex justify-center lg:justify-center group">

              {/* Decorative Frame */}
              <div className="absolute -left-4 -top-4 w-full h-full border-[15px] border-[#fe7300] z-0 ml-10 mt-10" />

              <div className="relative z-10 bg-zinc-100 w-[90%]">
                <img src={introPic} alt="Gym Hero" className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 relative z-10" />

                {/* Outline Text Over Image */}
                <div className="absolute top-[35%] -right-[50%] lg:-right-[50%] text-[100px] lg:text-[145px] font-black text-transparent uppercase opacity-20 select-none pointer-events-none z-20 rotate-90 origin-center tracking-widest"
                  style={{ WebkitTextStroke: '8px #000' }}>
                  STRONG
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="mb-[30px]">
              <div className="flex flex-col gap-6">
                {/* Section Head */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-[2px] bg-[#fe7300]" />
                    <span className="text-[#fe7300] text-sm font-black tracking-widest uppercase">About US</span>
                  </div>
                  <h2 className="text-4xl lg:text-[55px] font-black text-zinc-950 leading-tight uppercase tracking-tighter">
                    Give A Shape of Your Body
                  </h2>
                  <p className="text-zinc-500 font-medium leading-relaxed max-w-xl">
                    This also meant we needed to provide a learning environment run by
                    experienced and successful coaches. However, our most important goal
                    was to create a welcoming atmosphere and community in which everyone
                    feels a sense of belonging.
                  </p>
                </div>

                {/* Feature List */}
                <div className="flex flex-col gap-6 mt-4">

                  {/* Feature 1 */}
                  <div className="flex items-center gap-6 group cursor-default">
                    <div className="w-[70px] h-[70px] bg-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-[#fe7300] group-hover:text-white transition-all duration-300">
                      <i className="fa-solid fa-dumbbell text-3xl"></i>
                    </div>
                    <div className="flex flex-col">
                      <h5 className="text-zinc-950 font-black uppercase text-lg group-hover:text-[#fe7300] transition-colors">Full-Body Strength</h5>
                      <p className="text-zinc-500 text-sm mt-1">Train with the best experts in bodybuilding field.</p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-center gap-6 group cursor-default">
                    <div className="w-[70px] h-[70px] bg-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-[#fe7300] group-hover:text-white transition-all duration-300">
                      <i className="fa-solid fa-bicycle text-3xl"></i>
                    </div>
                    <div className="flex flex-col">
                      <h5 className="text-zinc-950 font-black uppercase text-lg group-hover:text-[#fe7300] transition-colors">Lean Machines</h5>
                      <p className="text-zinc-500 text-sm mt-1">Our personal trainers will help you find a perfect workout.</p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-center gap-6 group cursor-default">
                    <div className="w-[70px] h-[70px] bg-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-[#fe7300] group-hover:text-white transition-all duration-300">
                      <i className="fa-solid fa-wand-magic-sparkles text-3xl"></i>
                    </div>
                    <div className="flex flex-col">
                      <h5 className="text-zinc-950 font-black uppercase text-lg group-hover:text-[#fe7300] transition-colors">Power Yoga</h5>
                      <p className="text-zinc-500 text-sm mt-1">Uniquely sequenced class work to heat and challenge the body </p>
                    </div>
                  </div>

                </div>

                <a href="#" className="mt-6 px-10 py-4 bg-[#fe7300] text-white font-black uppercase tracking-widest text-[12px] self-start inline-block hover:bg-zinc-900 transition-all shadow-xl shadow-[#fe7300]/20">
                  Learn More
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Facts Section */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-[2px] bg-[#fe7300]" />
                <span className="text-[#fe7300] text-sm font-black tracking-widest uppercase">Some Facts</span>
              </div>
              <h2 className="text-4xl lg:text-[50px] font-black text-zinc-950 leading-tight uppercase tracking-tighter">
                We always provide best fitness service for <span className="text-[#fe7300]">25 years</span>
              </h2>
            </motion.div>

            {/* Right Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: "fa-solid fa-dumbbell", num: 150, text: "Expert Trainer" },
                { icon: "fa-solid fa-building", num: 75, text: "Total Branch" },
                { icon: "fa-solid fa-users", num: 250, text: "Happy Clients" },
                { icon: "fa-solid fa-award", num: 18, text: "Experience" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 30 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  className="flex items-center gap-5 bg-white p-6 rounded-sm border border-zinc-100 shadow-[0_5px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <div className="text-zinc-600 flex-shrink-0">
                    <i className={`${stat.icon} text-3xl`}></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[40px] font-black text-[#fe7300] leading-none mb-1">
                      <Counter from={0} to={stat.num} duration={2.5} />
                    </span>
                    <span className="text-zinc-950 font-bold text-sm">{stat.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="relative py-32 overflow-hidden bg-white">
        {/* Background Image Setup (using download.png with 30% visibility) */}
        <div className="absolute inset-0 z-0">
          <img
            src={downloadBg}
            alt="Trainer Background"
            className="w-full h-full object-cover opacity-18 transition-opacity duration-700"
          />
        </div>

        <div className="container mx-auto px-6 lg:px-24 relative z-10">

          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-4 mb-20 animate-fade-in-up">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-[#fe7300]" />
              <span className="text-[#fe7300] text-sm font-black tracking-widest uppercase">Our Trainer</span>
              <div className="w-8 h-[2px] bg-[#fe7300]" />
            </div>
            <h2 className="text-4xl lg:text-[55px] font-black text-zinc-950 leading-tight uppercase tracking-tighter max-w-3xl">
              Team of Expert <br /> Coaches
            </h2>
          </div>

          {/* Trainers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: pic1, name: "WILLIAM DIXON" },
              { img: pic2, name: "JAMES SMITH" },
              { img: pic3, name: "MICHAEL JOHNSON" }
            ].map((trainer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative group overflow-hidden bg-zinc-100 cursor-pointer shadow-xl"
                onClick={() => setActiveTrainer(activeTrainer === i ? null : i)}
              >

                {/* Trainer Image */}
                <img
                  src={trainer.img}
                  alt={trainer.name}
                  className={`w-full h-auto aspect-[3/4] object-cover scale-[1.05] group-hover:translate-y-5 transition-transform duration-[1000ms] ease-out origin-top ${activeTrainer === i ? 'translate-y-5' : ''}`}
                />

                {/* Top Hover Banner (Orange) */}
                <div className={`absolute top-0 left-0 w-full bg-[#fe7300] py-5 px-8 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-center ${activeTrainer === i ? 'translate-y-0' : '-translate-y-full'} group-hover:translate-y-0`}>
                  <span className="text-zinc-950 font-black text-[11px] tracking-[0.2em] uppercase mb-1">Bodybuilding Coach</span>
                  <h4 className="text-white font-black text-3xl uppercase leading-none tracking-tight">
                    {trainer.name}
                  </h4>
                </div>

                {/* Bottom Hover Banner (Socials) */}
                <div className={`absolute bottom-5 left-0 w-[80%] bg-[#111111]/95 py-4 px-6 flex items-center justify-start gap-6 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${activeTrainer === i ? 'translate-x-0' : '-translate-x-full'} group-hover:translate-x-0`}>
                  <div className="absolute right-0 top-0 w-1 h-full bg-[#fe7300]" />
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors ml-2">
                    <i className="fa-brands fa-facebook-f text-lg"></i>
                  </a>
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                    <i className="fa-brands fa-x-twitter text-lg"></i>
                  </a>
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                    <i className="fa-brands fa-linkedin-in text-lg"></i>
                  </a>
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                    <i className="fa-brands fa-instagram text-lg"></i>
                  </a>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery Carousel Section */}
      <section className="bg-black py-24 overflow-hidden relative">
        <div className="container mx-auto px-6 lg:px-24 mb-16 relative">

          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between gap-6 text-center md:text-left">
            <div className="flex flex-col gap-3 items-center md:items-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-[2px] bg-[#fe7300]" />
                <span className="text-[#fe7300] text-sm font-black tracking-widest uppercase">Find Your Exercise</span>
                <div className="w-8 h-[2px] bg-[#fe7300] md:hidden" />
              </div>
              <h2 className="text-4xl lg:text-[50px] font-black text-white leading-tight uppercase tracking-tighter">
                New Exclusive <br className="hidden md:block" /> Workouts
              </h2>
            </div>

            <div className="flex gap-2 relative z-20">
              <button
                onClick={handleGalleryPrev}
                className="w-12 h-12 bg-[#fe7300] hover:bg-white hover:text-black transition-colors flex items-center justify-center text-white"
              >
                <i className="fa-solid fa-chevron-left text-lg"></i>
              </button>
              <button
                onClick={handleGalleryNext}
                className="w-12 h-12 bg-[#fe7300] hover:bg-white hover:text-black transition-colors flex items-center justify-center text-white"
              >
                <i className="fa-solid fa-chevron-right text-lg"></i>
              </button>
            </div>
          </div>

        </div>

        {/* Carousel Track */}
        <div className="w-full relative px-6 md:px-12 lg:px-24 pb-10">
          <motion.div
            className="flex gap-6 relative"
            animate={{ x: `calc(-${galleryIndex * 320}px - ${galleryIndex * 24}px)` }} // 320px column width + 24px gap
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.2 }}
          >
            {extendedGallery.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[320px] flex flex-col gap-6"
              >
                {/* Checkerboard Logic */}
                {i % 2 === 0 ? (
                  <>
                    <GalleryTextBlock item={item} />
                    <GalleryImageBlock item={item} />
                  </>
                ) : (
                  <>
                    <GalleryImageBlock item={item} />
                    <GalleryTextBlock item={item} />
                  </>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Workout Promo Section */}

      {/* Mobile Layout (below lg) */}
      <section className="lg:hidden bg-[#fe7300] overflow-hidden">
        <div className="px-6 pt-12 pb-0">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-[36px] sm:text-[42px] font-black uppercase text-zinc-950 leading-[1.1] tracking-tight">
              Work Out <br />
              3 Steps To <br />
              Losing Weight
            </h2>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact-form')}
              className="mt-6 px-8 py-4 bg-zinc-950 text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-zinc-950 transition-colors duration-300"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
        <div className="flex justify-center mt-6">
          <img
            src={img1}
            alt="Work Out Model"
            className="h-[300px] sm:h-[360px] w-auto object-contain object-bottom select-none"
          />
        </div>
      </section>

      {/* Desktop Layout (lg and above) */}
      <section className="relative bg-white overflow-hidden min-h-[360px] hidden lg:block">

        {/* 3-column layout: white | orange (narrow) | white */}
        <div className="absolute inset-0 flex z-0">
          <div className="w-[36%] bg-white" />
          <div className="w-[28%] bg-[#fe7300]" />
          <div className="w-[36%] bg-white" />
        </div>

        {/* Content layer */}
        <div className="relative z-10 min-h-[360px] py-16">

          {/* Text — straddling the left white/orange boundary */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute top-1/2 -translate-y-1/2 w-[30%]"
            style={{ left: '22%' }}
          >
            <h2 className="text-[50px] font-black uppercase text-zinc-950 leading-[1.1] tracking-tight">
              Work Out <br />
              3 Steps To <br />
              Losing Weight
            </h2>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact-form')}
              className="mt-8 px-8 py-4 bg-[#fe7300] text-white font-black uppercase tracking-widest text-sm hover:bg-zinc-950 transition-colors duration-300"
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Image — straddling the right orange/white boundary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="absolute bottom-0 pointer-events-none"
            style={{ left: '45%', transform: 'translateX(-50%)' }}
          >
            <img
              src={img1}
              alt="Work Out Model"
              className="h-[390px] w-auto object-contain object-bottom select-none"
            />
          </motion.div>

        </div>
      </section>

      {/* World Class Facilities — Video Section */}
      <section className="relative flex flex-col lg:flex-row min-h-[420px] bg-black overflow-hidden">

        {/* Left — Background image with play button */}
        <div className="relative w-full lg:w-1/2 min-h-[420px] overflow-hidden group">
          <img
            src={galWall}
            alt="Gym Facilities"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.button
              onClick={() => setShowVideo(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-[0_0_0_12px_rgba(255,255,255,0.2)] hover:bg-[#fe7300] hover:shadow-[0_0_0_12px_rgba(254,115,0,0.25)] transition-all duration-400 group"
            >
              <i className="fa-solid fa-play text-[#fe7300] text-2xl group-hover:text-white ml-1 transition-colors"></i>
            </motion.button>
          </div>
        </div>

        {/* Right — Dark text content */}
        <div className="relative w-full lg:w-1/2 bg-[#0a0a0a] flex items-center px-10 lg:px-16 py-16">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#fe7300]" />
              <span className="text-[#fe7300] text-xs font-black tracking-[0.25em] uppercase">We Provide</span>
            </div>
            <h2 className="text-[42px] lg:text-[52px] font-black text-white uppercase leading-[1.1] tracking-tight mb-5">
              World Class <br /> Facilities
            </h2>
            <p className="text-white text-base leading-relaxed mb-8 max-w-sm">
              This also meant we needed to provide a learning environment run by experienced and successful coaches. However, our most important goal was to create a welcoming atmosphere.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-[#fe7300] text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-zinc-950 transition-colors duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

      </section>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
            className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl"
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-10 right-0 text-white text-sm font-bold hover:text-[#fe7300] transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-xmark text-xl"></i> Close
              </button>
              <iframe
                src="https://www.youtube.com/embed/ddIJ_w82ffw?autoplay=1"
                title="Gym Video"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timetable Section */}
      <section id="classes" className="bg-white py-24">
        <div className="container mx-auto px-6 lg:px-32 max-w-6xl">

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4 mb-14">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-[#fe7300]" />
              <span className="text-[#fe7300] text-sm font-black tracking-widest uppercase">Our Timetable</span>
              <div className="w-8 h-[2px] bg-[#fe7300]" />
            </div>
            <h2 className="text-4xl lg:text-[55px] font-black text-zinc-950 leading-tight uppercase tracking-tighter">
              Working Hours &amp; <br /> Classes
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">

              {/* Table Head */}
              <thead>
                <tr>
                  <th className="bg-zinc-950 text-white font-black uppercase text-sm tracking-widest px-4 py-4 text-center w-[120px]">Routine</th>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                    <th key={day} className="bg-[#fe7300] text-white font-black uppercase text-sm tracking-wider px-4 py-4 text-center">{day}</th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {[
                  {
                    time: "06", period: "am",
                    cells: [
                      { day: "mon", name: "Cardio", time: "06 am - 07 am" },
                      { day: "tue", name: "", time: "" },
                      { day: "wed", name: "Yoga", time: "06 am - 07 am" },
                      { day: "thu", name: "Cardio", time: "06 am - 07 am" },
                      { day: "fri", name: "", time: "" },
                      { day: "sat", name: "", time: "" },
                      { day: "sun", name: "Yoga", time: "06 am - 07 am" },
                    ]
                  },
                  {
                    time: "07", period: "am",
                    cells: [
                      { day: "mon", name: "", time: "" },
                      { day: "tue", name: "Cycling", time: "07 am - 08 am" },
                      { day: "wed", name: "Boxing", time: "07 am - 08 am" },
                      { day: "thu", name: "", time: "" },
                      { day: "fri", name: "Power Lifting", time: "07 am - 08 am" },
                      { day: "sat", name: "Cycling", time: "07 am - 08 am" },
                      { day: "sun", name: "", time: "" },
                    ]
                  },
                  {
                    time: "08", period: "am",
                    cells: [
                      { day: "mon", name: "Power Lifting", time: "08 am - 09 am" },
                      { day: "tue", name: "", time: "" },
                      { day: "wed", name: "", time: "" },
                      { day: "thu", name: "Cycling", time: "08 am - 09 am" },
                      { day: "fri", name: "", time: "" },
                      { day: "sat", name: "", time: "" },
                      { day: "sun", name: "Power Lifting", time: "08 am - 09 am" },
                    ]
                  },
                  {
                    time: "05", period: "pm",
                    cells: [
                      { day: "mon", name: "Dumbbelling", time: "05 pm - 06 pm" },
                      { day: "tue", name: "Yoga", time: "05 pm - 06 pm" },
                      { day: "wed", name: "Cycling", time: "05 pm - 06 pm" },
                      { day: "thu", name: "", time: "" },
                      { day: "fri", name: "Jumping", time: "05 pm - 06 pm" },
                      { day: "sat", name: "", time: "" },
                      { day: "sun", name: "Cardio", time: "05 pm - 06 pm" },
                    ]
                  },
                  {
                    time: "06", period: "pm",
                    cells: [
                      { day: "mon", name: "", time: "" },
                      { day: "tue", name: "", time: "" },
                      { day: "wed", name: "", time: "" },
                      { day: "thu", name: "Power Lifting", time: "06 pm - 07 pm" },
                      { day: "fri", name: "", time: "" },
                      { day: "sat", name: "Dumbbelling", time: "06 pm - 07 pm" },
                      { day: "sun", name: "", time: "" },
                    ]
                  },
                  {
                    time: "07", period: "pm",
                    cells: [
                      { day: "mon", name: "Cardio", time: "07 pm - 08 pm" },
                      { day: "tue", name: "Power Lifting", time: "07 pm - 08 pm" },
                      { day: "wed", name: "Dumbbelling", time: "07 pm - 08 pm" },
                      { day: "thu", name: "", time: "" },
                      { day: "fri", name: "Jumping", time: "07 pm - 08 pm" },
                      { day: "sat", name: "", time: "" },
                      { day: "sun", name: "Weight Loss", time: "07 pm - 08 pm" },
                    ]
                  },
                ].map((row, ri) => (
                  <tr key={ri} className="border-b border-zinc-800">
                    {/* Time Cell */}
                    <td className="bg-zinc-950 px-4 py-5 text-center">
                      <span className="text-[#fe7300] font-black text-[38px] leading-none">{row.time}</span>
                      <span className="text-zinc-400 font-bold text-sm ml-1">{row.period}</span>
                    </td>
                    {/* Class Cells */}
                    {row.cells.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-3 py-5 text-center align-middle border border-zinc-800 transition-colors duration-300 cursor-pointer group ${cell.name ? 'bg-zinc-950 hover:bg-[#fe7300]' : 'bg-zinc-900'}`}
                      >
                        {cell.name && (
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-white font-black text-xs uppercase tracking-wider group-hover:text-white">{cell.name}</span>
                            <span className="text-zinc-400 text-[11px] group-hover:text-white/80 transition-colors">{cell.time}</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* Google Reviews Widget Section */}
      <section className="bg-zinc-950 py-20 px-4 lg:px-24">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-[#fe7300]" />
              <span className="text-[#fe7300] text-sm font-black tracking-widest uppercase">Google Reviews</span>
              <div className="w-8 h-[2px] bg-[#fe7300]" />
            </div>
            <h2 className="text-4xl lg:text-[55px] font-black text-white leading-tight uppercase tracking-tighter">
              What Our Clients Say
            </h2>
          </div>

          {/* Elfsight Google Reviews Widget */}
          <div className="elfsight-app-313f6547-4f4e-42be-b28b-a72f60157b5d" data-elfsight-app-lazy></div>
        </div>
      </section>


      {/* Contact Form & Map Section */}
      <section id="contact-form" className="relative bg-zinc-50 py-24 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24">

          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-[#fe7300]" />
              <span className="text-[#fe7300] text-sm font-black tracking-widest uppercase">Get In Touch</span>
              <div className="w-8 h-[2px] bg-[#fe7300]" />
            </div>
            <h2 className="text-4xl lg:text-[55px] font-black text-zinc-950 leading-tight uppercase tracking-tighter">
              Contact Us
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

            {/* Left — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="bg-white p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] rounded-xl flex flex-col"
            >
              <h3 className="text-2xl font-black text-zinc-950 uppercase tracking-tight mb-2">Send Us a Message</h3>
              <p className="text-zinc-400 text-sm mb-8">We'd love to hear from you! Fill out the form below and we'll get back to you shortly.</p>

              <form className="flex flex-col gap-5 flex-1" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-zinc-950 font-bold text-xs uppercase tracking-widest">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full border border-zinc-200 bg-zinc-50 py-3.5 px-4 text-sm rounded-lg focus:border-[#fe7300] focus:bg-white outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-zinc-950 font-bold text-xs uppercase tracking-widest">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full border border-zinc-200 bg-zinc-50 py-3.5 px-4 text-sm rounded-lg focus:border-[#fe7300] focus:bg-white outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-zinc-950 font-bold text-xs uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full border border-zinc-200 bg-zinc-50 py-3.5 px-4 text-sm rounded-lg focus:border-[#fe7300] focus:bg-white outline-none transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-zinc-950 font-bold text-xs uppercase tracking-widest">Select Plan</label>
                  <select className="w-full border border-zinc-200 bg-zinc-50 py-3.5 px-4 text-sm rounded-lg focus:border-[#fe7300] focus:bg-white outline-none transition-all duration-300 text-zinc-500">
                    <option value="">Choose a plan...</option>
                    <option value="basic">Basic Plan</option>
                    <option value="standard">Standard Plan</option>
                    <option value="premium">Premium Plan</option>
                    <option value="personal">Personal Training</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-zinc-950 font-bold text-xs uppercase tracking-widest">Message</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us about your fitness goals..."
                    className="w-full border border-zinc-200 bg-zinc-50 py-3.5 px-4 text-sm rounded-lg focus:border-[#fe7300] focus:bg-white outline-none transition-all duration-300 resize-none flex-1 min-h-[100px]"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-[#fe7300] text-white font-black uppercase tracking-widest text-sm hover:bg-zinc-950 transition-colors duration-300 rounded-lg shadow-xl shadow-[#fe7300]/20 mt-2"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Right — Google Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] min-h-[400px] lg:min-h-0"
            >
              <iframe
                src="https://www.google.com/maps?q=CORE+FITNESS,+11.6679854,78.1314772&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Core Fitness Location - Salem"
                className="w-full h-full"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contact" className="bg-black text-white pt-24 pb-8 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24">

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

            {/* About Us */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[#fe7300] font-black text-xl uppercase tracking-widest">About Us</h4>
              <p className="text-white text-sm leading-relaxed max-w-xs">
                Salem's premier fitness center located in Ram Complex, opp. Meyannur Roads. Expert coaching, certified trainers, and a welcoming community since day one.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {[
                  { icon: 'fa-facebook-f', link: '#' },
                  { icon: 'fa-twitter', link: '#' },
                  { icon: 'fa-linkedin-in', link: '#' },
                  { icon: 'fa-instagram', link: '#' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-sm hover:bg-[#fe7300] hover:border-[#fe7300] transition-all duration-300"
                  >
                    <i className={`fa-brands ${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Get In Touch */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[#fe7300] font-black text-xl uppercase tracking-widest">Get In Touch</h4>
              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-4">
                  <i className="fa-solid fa-location-dot text-[#fe7300] mt-1 text-lg"></i>
                  <span className="text-white text-sm leading-relaxed">
                    Ramalingam Hospital, Ram Complex, <br /> No12, opp. Meyannur Roads, <br /> Salem, Tamil Nadu 636004
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <i className="fa-solid fa-clock text-[#fe7300] text-lg"></i>
                  <span className="text-white text-sm">Mon - Sat : Open · Closes 9:30 PM</span>
                </li>
                <li className="flex items-center gap-4">
                  <i className="fa-solid fa-phone text-[#fe7300] text-lg"></i>
                  <a href="tel:+919626233310" className="text-white text-sm hover:text-[#fe7300] transition-colors">+91 96262 33310</a>
                </li>
              </ul>
            </div>

            {/* Useful Links */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[#fe7300] font-black text-xl uppercase tracking-widest">Useful Links</h4>
              <ul className="flex flex-col gap-4">
                {[
                  { label: 'About', id: 'about' },
                  { label: 'Classes', id: 'classes' },
                  { label: 'Contact Us', id: 'contact' },
                ].map(({ label, id }, i) => (
                  <li key={i}>
                    <button onClick={() => scrollToSection(id)} className="text-white text-sm hover:text-[#fe7300] flex items-center gap-2 group transition-colors bg-transparent border-none cursor-pointer">
                      <i className="fa-solid fa-chevron-right text-[10px] text-zinc-700 group-hover:text-[#fe7300] transition-colors"></i>
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[#fe7300] font-black text-xl uppercase tracking-widest">Newsletter</h4>
              <p className="text-white text-sm leading-relaxed">
                Our newsletters contain useful blog posts, case studies, "how to"s, and ways to help you grow your business.
              </p>
              <div className="relative mt-2">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full bg-transparent border border-zinc-800 py-4 px-5 pr-12 text-sm focus:border-[#fe7300] outline-none transition-colors"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#fe7300] transition-colors">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src="/corefitness-removebg-preview.png" alt="Core Fitness" className="h-44 w-auto object-contain brightness-0 invert" />
            </div>

            <p className="text-white/70 text-xs text-center md:text-left">
              © 2025 Core Fitness, Salem. All Rights Reserved.
            </p>

            <div className="flex items-center gap-4 text-white/70 text-xs">
              <a href="#" className="hover:text-[#fe7300] transition-colors">Terms & Condition</a>
              <span className="opacity-30">/</span>
              <a href="#" className="hover:text-[#fe7300] transition-colors">Privacy Policy</a>
              <span className="opacity-30">/</span>
              <a href="#" className="hover:text-[#fe7300] transition-colors">Help</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
