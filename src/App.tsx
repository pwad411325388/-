import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Flower } from './components/Flower';
import { BentoCard } from './components/BentoCard';
import { ArrowRight, Mail, MessageCircle, Sparkles } from 'lucide-react';
import oldPic from './assets/images/regenerated_image_1778866863230.jpg';
import newVividPic2 from './assets/images/regenerated_image_1779001666477.jpg';
import bRollPicExpanded from './assets/images/regenerated_image_1779002110340.png';
import heroPic from './assets/images/regenerated_image_1779127883748.png';
import cardConceptPic from './assets/images/skincare_layout_concept_1779029324851.png';
import healthMockupPic from './assets/images/regenerated_image_1779127181594.png';
import structuredCardPic from './assets/images/regenerated_image_1779024099727.jpg';

function smoothScrollTo(targetY: number, duration = 1000) {
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const difference = targetY - startY;
  const startTime = performance.now();

  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime: number) {
    const timeProgress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = easeInOutCubic(timeProgress);
    
    window.scrollTo(0, startY + difference * easedProgress);

    if (timeProgress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

const scrollToElementId = (id: string, duration = 1000) => {
  const element = document.getElementById(id);
  if (element) {
    const rect = element.getBoundingClientRect();
    const targetY = window.scrollY + rect.top;
    smoothScrollTo(targetY, duration);
  }
};

const bRollPic = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop";

const MY_SKILLS = [
  {
    title: "产品思维",
    desc: "用户洞察、需求分析、MVP 定义与取舍、PRD 撰写、低保真原型设计、多轮用户测试迭代等",
    color: "bg-gradient-to-br from-orange-200/90 via-orange-100/60 to-white/40",
    icon: "🧠"
  },
  {
    title: "AI 工作流",
    desc: "提示词工程 (Prompt Engineering)、用户意图识别、RAG、工作流搭建、AI 逻辑自测与修复、交互逻辑及AI边界与容错设计等",
    color: "bg-gradient-to-br from-teal-200/90 via-teal-100/60 to-white/40",
    icon: "⚡"
  },
  {
    title: "活动执行",
    desc: "全案策划、项目进度把控、跨团队沟通、资源协调、多任务并行、vibe coding、demo原型快速验证等",
    color: "bg-gradient-to-br from-sky-200/90 via-sky-100/60 to-white/40",
    icon: "🎯"
  },
  {
    title: "人机协作",
    desc: "Claude +Gemini (战略顾问)、Perplexity+Notion AI（信息检索及加工）、Coze (低代码开发)、ChatGPT (视觉创意)、trae+Claude code（工作agent）等",
    color: "bg-gradient-to-br from-rose-200/90 via-rose-100/60 to-white/40",
    icon: "🤝"
  }
];

const PortraitImage = ({ src }: { src: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div className="relative w-full flex flex-col items-end">
      {/* Editorial caption block outside the image */}
      <div className="w-full max-w-[400px] mb-4 flex justify-between items-end border-b border-brand-text/10 pb-2">
        <span className="font-serif italic text-brand-text/40 text-xs tracking-wider">01.</span>
        <span className="text-[9px] uppercase tracking-[0.3em] text-brand-text/50">Grow Gently</span>
      </div>
      
      <div 
        ref={ref}
        className="w-full max-w-[400px] aspect-[4/5] overflow-hidden bg-[#EBE9E4] relative"
      >
        <motion.div 
          style={{ y }} 
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <img 
            src={src} 
            alt="Xiao He Portrait" 
            className="w-full h-full object-cover saturate-[0.95] contrast-[1.05] brightness-[1.02] transition-all duration-1000 hover:saturate-[1.15] hover:contrast-[1.1] hover:scale-105"
          />
        </motion.div>
      </div>
    </div>
  );
};

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const aboutSectionRef = React.useRef<HTMLElement>(null);
  const textTriggerRef = React.useRef<HTMLDivElement>(null);
  const imageTriggerRef = React.useRef<HTMLDivElement>(null);
  const [showSubText, setShowSubText] = React.useState(false);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const handleTransitionToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    
    // Play a smooth premium multi-stage transition:
    // Stage 1: Instantly snap to '#about' when the screen is fully masked at 1250ms (preventing dizzying scrolling motion under the mask)
    setTimeout(() => {
      const element = document.getElementById('about');
      if (element) {
        const rect = element.getBoundingClientRect();
        const targetY = window.scrollY + rect.top;
        window.scrollTo(0, targetY);
      }
      window.history.pushState(null, '', '#about');
    }, 1250);

    // Stage 2: Gracefully complete the transition and dissolve the overlay after 3200ms (1.2s enter + premium hold + 1.2s exit)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 3200);
  };

  const [bRollExpanded, setBRollExpanded] = React.useState(false);
  const [canExpand, setCanExpand] = React.useState(true);

  const bRollStateRef = React.useRef({ bRollExpanded, canExpand });
  React.useEffect(() => {
    bRollStateRef.current = { bRollExpanded, canExpand };
  }, [bRollExpanded, canExpand]);

  const handleToggleBRoll = () => {
    if (bRollExpanded) {
      setBRollExpanded(false);
      setCanExpand(false);
      setTimeout(() => setCanExpand(true), 500);
    } else if (canExpand) {
      setBRollExpanded(true);
    }
  };

  const { scrollY } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollY.on("change", () => {
      if (!aboutSectionRef.current || !textTriggerRef.current) return;
      
      const aboutRect = aboutSectionRef.current.getBoundingClientRect();
      const triggerRect = textTriggerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Reveal when the trigger element crosses the middle of the screen
      if (triggerRect.top < windowHeight / 2) {
        setShowSubText(true);
      }
      
      // Reset when scrolling back up near the bottom of the trigger section
      if (triggerRect.top > windowHeight * 0.75) {
        setShowSubText(false);
      }

      if (imageTriggerRef.current) {
        const imgRect = imageTriggerRef.current.getBoundingClientRect();
        const { bRollExpanded, canExpand } = bRollStateRef.current;
        
        // Auto-expand when scrolling into view
        if (canExpand && !bRollExpanded && imgRect.top < windowHeight / 2.5 && imgRect.bottom > 0) {
          setBRollExpanded(true);
        }
        
        // Collapse when scrolling out of view
        if (bRollExpanded && imgRect.top > windowHeight * 0.8) {
          setBRollExpanded(false);
          // Briefly disable expand to avoid stutter
          setCanExpand(false);
          setTimeout(() => setCanExpand(true), 500);
        }
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    window.history.pushState(null, '', `#${id}`);
    scrollToElementId(id, 1000);
  };

  React.useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      setTimeout(() => {
        scrollToElementId(elementId, 1000);
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans overflow-x-hidden selection:bg-brand-secondary selection:text-brand-text">
      
      {/* Premium Ambient Full-Screen Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1A1A1A] text-[#FAF9F6] backdrop-blur-md px-6 pointer-events-auto"
          >
            {/* Organic ambient light inside transition screen */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              <motion.div 
                initial={{ scale: 0.8, x: -50, y: 50 }}
                animate={{ scale: [0.8, 1.2, 0.8], x: [-50, 0, -50], y: [50, -20, 50] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-[10%] bottom-[10%] w-[50%] h-[50%] rounded-full bg-[#FF4D30] blur-[120px]"
              />
              <motion.div 
                initial={{ scale: 0.9, x: 50, y: -50 }}
                animate={{ scale: [0.9, 1.3, 0.9], x: [50, -30, 50], y: [-50, 20, -50] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-[10%] -top-[10%] w-[60%] h-[60%] rounded-full bg-[#FFD541] blur-[150px]"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
              <motion.div
                initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.2 }}
                className="mb-8"
              >
                <Flower petals={5} color="#FF4D30" centerColor="#FAF9F6" className="w-[100px] h-[100px]" />
              </motion.div>

              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2"
              >
                <p className="font-serif italic text-2xl tracking-wide text-[#FAF9F6]">
                  在真实的生长中，遇见彼此
                </p>
                <div className="h-[1px] w-8 bg-[#FAF9F6]/20 mx-auto my-3"></div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#FAF9F6]/50">
                  Xiao He Creative Studio
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
        <div className="font-serif italic text-xl font-bold tracking-wider cursor-pointer animate-fade-in" onClick={() => navigate('/')}>Xiao He</div>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:opacity-70 transition-opacity">About</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="hover:opacity-70 transition-opacity">Projects</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:opacity-70 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-6 text-center overflow-x-visible">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 flex flex-col items-center max-w-5xl mx-auto"
        >
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-surface text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            Hi, I'm Xiao He (小盒)
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[1.1] tracking-tight mb-8">
            践行派<span className="text-brand-primary">创意人</span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-brand-text/80 leading-relaxed mb-10 mx-auto text-center">
            在 AI 时代持续生长，让 AI 贴合每一个真实的个体。<br className="hidden md:block" />
            我兼具活动策划的执行韧性与产品经理的逻辑思维。
          </p>

          <a 
            href="#about"
            onClick={handleTransitionToAbout}
            className="group relative inline-flex items-center justify-center gap-2 bg-brand-text text-brand-bg px-8 py-4 rounded-full font-medium text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Let's chat <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>

        {/* Decorative Flowers */}
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="absolute -left-32 md:-left-[20vw] top-1/4 z-0 opacity-80 md:opacity-100"
        >
          <Flower petals={5} color="#F32E20" centerColor="var(--color-brand-bg)" className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]" />
        </motion.div>
        
        <motion.div 
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring" }}
          className="absolute -right-32 md:-right-[20vw] top-[30%] md:top-1/4 z-0 opacity-80 md:opacity-100"
        >
          <Flower petals={5} color="#7DD4FF" centerColor="#0020DD" className="w-[300px] h-[360px] md:w-[500px] md:h-[600px]" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutSectionRef} className="py-24 md:py-48 w-full overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 relative">
          
          {/* 1. Editoral Grid: Title, Intro & Portrait */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-[15vh] md:mb-[25vh]">
            
            {/* Left Column: Title & Intro Text */}
            <div className="md:col-span-7 flex flex-col justify-start relative z-20 md:pr-8 lg:pr-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-[3.5rem] md:text-[5rem] lg:text-[7rem] leading-[0.9] font-serif tracking-tighter text-brand-text mb-12 md:mb-24"
              >
                About <br/><span className="text-brand-text/40 italic">me.</span>
              </motion.h2>

              <div 
                ref={textTriggerRef}
                className="max-w-[450px]"
              >
                <p className="text-xl md:text-3xl lg:text-[2.2rem] font-serif leading-snug">
                  你好，我是小盒。<br/>
                  <span 
                    className={`text-brand-text/50 block mt-8 transition-all duration-[1.2s] ease-out ${
                      showSubText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    我是一名拥有活动策划基因的 AI 时代探索者。
                  </span>
                </p>
              </div>
            </div>

            {/* Right Column: Portrait */}
            <div className="md:col-span-5 mt-16 md:mt-0 flex flex-col justify-start items-end">
              <PortraitImage src={newVividPic2} />
              
              <div className="w-full max-w-[400px] mt-8">
                <p className="text-sm font-light text-brand-text/60 leading-relaxed text-justify">
                  “对我而言，AI是与人共同生长的『第二大脑』。”
                </p>
                <div className="w-8 h-[1px] bg-brand-text/30 mt-6 mb-2"></div>
                <p className="text-xs tracking-widest text-brand-text/40 uppercase font-serif">
                  Second Brain . Growth
                </p>
              </div>
            </div>
            
          </div>

          {/* 3. 空镜 (B-roll/Space) & 小段文字 (Text) with Image Blend */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 mb-[15vh] relative cursor-default">
            
            {/* Designed Image Section */}
            <div className="w-full md:w-[45%] lg:w-[40%] flex justify-center md:justify-end mb-20 md:mb-0 relative px-6 md:px-0 lg:pr-12">
              <div 
                ref={imageTriggerRef}
                className="relative w-full max-w-[350px] aspect-square"
              >
                
                {/* Base Image Component (Visible intially and when collapsed) */}
                <div 
                  className="absolute left-0 top-0 w-[55%] h-[75%] bg-[#EBE9E4] z-20 overflow-hidden shadow-md shadow-brand-text/5 rounded-2xl border border-brand-text/5 cursor-pointer flex items-center justify-center group/base"
                  onClick={handleToggleBRoll}
                >
                  <img src={oldPic} alt="Base Placeholder" className="w-[105%] h-[105%] object-cover opacity-80 mix-blend-multiply grayscale group-hover/base:grayscale-0 group-hover/base:scale-100 transition-all duration-700" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
                  <div className="absolute inset-0 bg-brand-bg/10 mix-blend-overlay pointer-events-none transition-opacity duration-700 group-hover/base:opacity-0"></div>
                  <div className="absolute bottom-4 left-4 text-[10px] font-serif tracking-widest text-brand-text/50 uppercase bg-brand-bg/80 backdrop-blur-sm px-2 py-1 rounded-md">think about world</div>
                </div>

                {/* Expanded Image Container */}
                <motion.div 
                  initial={false}
                  animate={{
                    width: bRollExpanded ? '85%' : '55%',
                    height: bRollExpanded ? '85%' : '75%',
                    left: bRollExpanded ? '15%' : '0%',
                    top: bRollExpanded ? '15%' : '0%',
                    opacity: bRollExpanded ? 1 : 0,
                    scale: bRollExpanded ? 1 : 0.95,
                    zIndex: bRollExpanded ? 30 : 10
                  }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute overflow-hidden cursor-pointer shadow-2xl shadow-brand-text/10 rounded-2xl border border-brand-text/5"
                  onClick={handleToggleBRoll}
                >
                  {/* The Image */}
                  <img 
                    src={bRollPicExpanded} 
                    alt="Serene moment" 
                    className="w-[105%] h-[105%] object-cover object-center saturate-[0.8] contrast-[1.05]"
                    style={{
                      marginLeft: '-0.3875px',
                      marginTop: '-14.3875px',
                      marginBottom: '5px',
                      marginRight: '3px',
                      paddingRight: '-3px'
                    }}
                  />
                  
                  {/* Inner shadow/ring for a polished embedded look */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl pointer-events-none z-10"></div>
                  
                  {/* Subtle fade overlay to blend edges nicely */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-bg/50 via-transparent to-brand-bg/10 z-10 pointer-events-none mix-blend-multiply opacity-60"></div>
                  
                  {/* Subtle caption */}
                  <motion.div 
                    initial={false}
                    animate={{ opacity: bRollExpanded ? 1 : 0 }}
                    transition={{ delay: bRollExpanded ? 0.3 : 0, duration: 0.5 }}
                    className="absolute bottom-5 right-5 z-20 font-serif italic text-[10px] tracking-[0.3em] text-white/90 drop-shadow-md uppercase bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10"
                  >
                    think about world
                  </motion.div>
                </motion.div>

              </div>
            </div>

            {/* 小段文字 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full md:w-[45%] lg:w-[40%] md:pl-8 lg:pl-12 relative z-20"
            >
              <div className="space-y-8 text-base lg:text-lg leading-relaxed text-brand-text/70 font-light max-w-lg">
                <p>
                  在过去的一年里，我从传统活动策划跨越到 AI 产品构建。与其停留在对技术崇拜的空谈中，我更愿意把自己定位为真正的“践行派”——用具体的代码和设计，去化解生活与工作里那些微小却真实的烦恼。
                </p>
                <p>
                  我目前正在寻找 AI 产品经理或相关创新岗位。<br/>期待与同样追求独特理念的团队，一起开启下一段安静而有力量的探索之旅。
                </p>
                <div className="block w-12 h-[1px] bg-brand-text/20 mt-12"></div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">My Toolkit & Skills.</h2>
        
        {/* Mobile/Tablet View (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
          {MY_SKILLS.map((skill, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-[2rem] ${skill.color} border-[1.5px] border-white/80 border-b-white/30 border-r-white/30 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05),0_0_40px_rgba(255,255,255,0.6)_inset] backdrop-blur-2xl flex flex-col relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-white/10 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_3px_6px_rgba(255,255,255,0.9),inset_0_-3px_6px_rgba(255,255,255,0.3)] pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/90 rounded-full blur-[60px] -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-[60px] translate-x-1/3 translate-y-1/3 pointer-events-none mix-blend-overlay"></div>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-6">{skill.icon}</div>
                <h3 className="text-2xl font-bold mb-4 font-serif">{skill.title}</h3>
                <p className="text-base leading-relaxed text-brand-text/80">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop View (Interactive Deck) */}
        <div className="hidden lg:flex relative w-full h-[400px] items-center justify-center group mb-10">
          {MY_SKILLS.map((skill, i) => {
            const offset = i - 1.5;
            return (
              <div
                key={i}
                className={`absolute w-[320px] h-[290px] p-6 rounded-[2rem] ${skill.color} border-[1.5px] border-white/80 border-b-white/30 border-r-white/30 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05),0_0_40px_rgba(255,255,255,0.6)_inset] backdrop-blur-2xl flex flex-col transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15),0_0_50px_rgba(255,255,255,0.8)_inset] hover:!z-50 overflow-hidden`}
                style={{
                  zIndex: i,
                  transform: `translateX(${offset * 15}px) rotate(${offset * 4}deg)`,
                  ...( {
                    '--tx-hover': `${offset * 270}px`,
                    '--ty-hover': `${Math.abs(offset) * 20}px`,
                    '--rot-hover': `${offset * 10}deg`
                  } as React.CSSProperties )
                }}
              >
                {/* We use group-hover on the parent container to apply the spread transform */}
                <style>{`
                  .group:hover > div:nth-child(${i + 1}) {
                    transform: translateX(var(--tx-hover)) translateY(var(--ty-hover)) rotate(var(--rot-hover)) !important;
                  }
                  .group > div:nth-child(${i + 1}):hover {
                    transform: translateX(var(--tx-hover)) translateY(calc(var(--ty-hover) - 20px)) rotate(var(--rot-hover)) scale(1.05) !important;
                  }
                `}</style>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-white/10 pointer-events-none"></div>
                <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_3px_6px_rgba(255,255,255,0.9),inset_0_-3px_6px_rgba(255,255,255,0.3)] pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/90 rounded-full blur-[60px] -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-[60px] translate-x-1/3 translate-y-1/3 pointer-events-none mix-blend-overlay"></div>
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none"></div>
                
                {/* Animated shine line */}
                <div className="absolute -inset-[100%] rotate-45 translate-x-[-150%] bg-gradient-to-r from-transparent via-white/70 to-transparent w-[50%] h-[300%] group-hover:translate-x-[250%] transition-transform duration-[1.5s] ease-in-out pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 font-serif">{skill.title}</h3>
                  <p className="text-base leading-relaxed text-brand-text/80">{skill.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Selected Projects.</h2>
          <p className="text-xl text-brand-text/70">A fraction of my recent explorations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Project 1 */}
          <BentoCard 
            onClick={() => navigate('/project/skincare')}
            className="lg:col-span-8 bg-[#F5F2F0] relative group cursor-pointer border border-black/5 hover:border-black/10 transition-colors"
          >
            <div className="flex flex-col h-full relative z-10">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-medium mb-4 shadow-sm">AI Product / 0 to 1</span>
                <h3 className="text-3xl font-serif font-bold mb-2 group-hover:text-brand-primary transition-colors">小白护肤AI小程序</h3>
                <p className="text-brand-text/70">解决护肤小白信息过载、广告混杂、缺乏个性化入门指引的问题。</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                  <strong className="block text-sm mb-1">MVP 聚焦</strong>
                  <span className="text-sm text-brand-text/80">问答 + 方案生成核心场景</span>
                </div>
                <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                  <strong className="block text-sm mb-1">技术路径</strong>
                  <span className="text-sm text-brand-text/80">Coze 工作流 + Claude Code</span>
                </div>
              </div>
            </div>
            {/* Decorative blob */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#FFD541]/30 rounded-full blur-3xl group-hover:bg-[#FFD541]/50 transition-colors"></div>
          </BentoCard>

          {/* Spacer/Decorative Bento */}
          <BentoCard className="lg:col-span-4 bg-brand-primary text-white flex items-center justify-center p-0 relative overflow-hidden group">
            <div className="flex items-center justify-center w-full h-full">
              <Flower color="white" centerColor="#FFD541" className="w-48 h-48 drop-shadow-xl" />
            </div>
          </BentoCard>

          {/* Project 2 */}
          <BentoCard 
            onClick={() => navigate('/project/health')}
            className="lg:col-span-12 bg-white border border-black/5 relative group overflow-hidden cursor-pointer hover:border-black/10 transition-colors"
          >
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2 relative z-10">
                <span className="inline-block px-3 py-1 bg-brand-surface rounded-full text-xs font-medium mb-4">Vibe Coding / Mini App</span>
                <h3 className="text-3xl font-serif font-bold mb-4 group-hover:text-brand-accent transition-colors">健康打卡小程序</h3>
                <p className="text-brand-text/70 mb-6 italic">
                  用轻松的方式做严肃的健康管理。
                </p>
                <ul className="space-y-3 text-sm text-brand-text/80">
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-secondary"/> 全栈小程序开发实战验证</li>
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-secondary"/> 趣味性打卡机制</li>
                  <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-secondary"/> 数据可视化图表直观展示</li>
                </ul>
              </div>
              
              <div className="lg:w-1/2 w-full h-full min-h-[300px] flex items-center justify-center relative overflow-hidden group-hover:opacity-90 transition-opacity">
                 <img src={healthMockupPic} alt="Health App Mockup" className="absolute w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-transparent to-blue-500/5 pointer-events-none"></div>
          </BentoCard>

        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <Flower color="var(--color-brand-pink)" centerColor="white" className="w-16 h-16 mx-auto mb-8 opacity-50" />
        <blockquote className="text-3xl md:text-5xl font-serif leading-tight">
          "AI 的价值不在于强大，<br className="hidden md:block"/>
          <span className="not-italic font-normal text-brand-primary">而在于真正贴合每个人的真实需求。</span>"
        </blockquote>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-brand-primary rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-[6rem] font-serif font-bold tracking-tight leading-[1] mb-8">
              Let's create <br/> something real.
            </h2>
            <p className="text-lg md:text-xl md:max-w-2xl mx-auto mb-12 text-white/90">
              如果你正在寻找一位既懂用户需求、又能快速上手 AI 工具、且极具执行力的伙伴，欢迎随时联系我。
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:411325388@qq.com" className="bg-white text-brand-primary hover:bg-brand-secondary hover:text-brand-text transition-colors px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2">
                <Mail className="w-5 h-5" />
                411325388@qq.com
              </a>
              <div className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                WeChat: Pwad411325388
              </div>
            </div>
          </div>
          
          {/* Big background flower */}
          <Flower color="white" centerColor="transparent" className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] opacity-10 animate-spin-slow" style={{ animationDuration: '60s' }} />
        </div>
      </section>

      {/* Footer Motif Pattern */}
      <footer className="w-full relative py-12 md:py-24 bg-brand-surface overflow-hidden flex flex-col gap-2 md:gap-4 lg:gap-6 items-center justify-center">
        
        {/* Row 1: 10 flowers */}
        <div className="flex justify-center gap-2 md:gap-4 lg:gap-6 w-full flex-nowrap">
           <Flower petals={5} color="#FF66A3" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#0020DD" centerColor="#FFC83D" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#7DD4FF" centerColor="#0020DD" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#F32E20" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#FFC83D" centerColor="#FF66A3" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#7DD4FF" centerColor="#F32E20" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#FF66A3" centerColor="#0020DD" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#F32E20" centerColor="#7DD4FF" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#0020DD" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#FFC83D" centerColor="#F32E20" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
        </div>

        {/* Row 2: 9 flowers */}
        <div className="flex justify-center gap-2 md:gap-4 lg:gap-6 w-full flex-nowrap">
           <Flower petals={6} color="#F32E20" centerColor="#7DD4FF" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#FF66A3" centerColor="#0020DD" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#FFC83D" centerColor="#FF66A3" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#0020DD" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#7DD4FF" centerColor="#0020DD" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#F32E20" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#FFC83D" centerColor="#F32E20" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#0020DD" centerColor="#FFC83D" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#FF66A3" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
        </div>

        {/* Row 3: 4 flowers + Text + 4 flowers (8 flowers total) */}
        <div className="flex justify-center gap-2 md:gap-4 lg:gap-6 w-full flex-nowrap items-center">
           <Flower petals={6} color="#0020DD" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#F32E20" centerColor="#7DD4FF" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#7DD4FF" centerColor="#0020DD" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#FFC83D" centerColor="#F32E20" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           
           <div className="flex flex-col justify-center items-center flex-shrink-0 text-center w-[calc(2*2.5rem+0.5rem)] sm:w-[calc(2*4rem+1rem)] md:w-[calc(2*5rem+1rem)] lg:w-[calc(2*6rem+1.5rem)] xl:w-[calc(2*7rem+1.5rem)]">
              <p className="font-serif text-[10px] leading-tight sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-brand-text/90 w-[203px]">
                Great trait is always<br/>
                hidden in the plain sight.
              </p>
           </div>

           <Flower petals={6} color="#FF66A3" centerColor="#0020DD" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#0020DD" centerColor="#FFC83D" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#F32E20" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#7DD4FF" centerColor="#F32E20" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
        </div>

        {/* Row 4: 9 flowers */}
        <div className="flex justify-center gap-2 md:gap-4 lg:gap-6 w-full flex-nowrap">
           <Flower petals={6} color="#FF66A3" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#7DD4FF" centerColor="#0020DD" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#FFC83D" centerColor="#F32E20" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#F32E20" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#FFC83D" centerColor="#FF66A3" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#7DD4FF" centerColor="#F32E20" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#0020DD" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#F32E20" centerColor="#7DD4FF" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#FF66A3" centerColor="#0020DD" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
        </div>

        {/* Row 5: 10 flowers */}
        <div className="flex justify-center gap-2 md:gap-4 lg:gap-6 w-full flex-nowrap">
           <Flower petals={5} color="#0020DD" centerColor="#FFC83D" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#FF66A3" centerColor="#0020DD" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#7DD4FF" centerColor="#F32E20" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#FFC83D" centerColor="#FF66A3" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#FF66A3" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#0020DD" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#F32E20" centerColor="#7DD4FF" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#FFC83D" centerColor="#F32E20" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={5} color="#7DD4FF" centerColor="#0020DD" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
           <Flower petals={6} color="#F32E20" centerColor="white" className="flex-shrink-0 w-10 sm:w-16 md:w-20 lg:w-24 xl:w-28" />
        </div>
      </footer>

    </div>
  );
}

function ProjectDetail() {
  const navigate = useNavigate();
  const [uploadedImage1, setUploadedImage1] = React.useState<string | null>(null);
  const [uploadedImage2, setUploadedImage2] = React.useState<string | null>(null);
  const [uploadedHeroImage, setUploadedHeroImage] = React.useState<string | null>(null);

  const handleUploadImage1 = (url: string) => {
    setUploadedImage1(url);
    saveImageToDB("skincare_uploaded_image_1", url).catch(console.error);
    try {
      localStorage.setItem("skincare_uploaded_image_1", url);
    } catch (e) {
      // expected failure on large images, handled gracefully by IndexedDB
    }
  };

  const handleResetImage1 = () => {
    setUploadedImage1(null);
    deleteImageFromDB("skincare_uploaded_image_1").catch(console.error);
    localStorage.removeItem("skincare_uploaded_image_1");
  };

  const handleUploadImage2 = (url: string) => {
    setUploadedImage2(url);
    saveImageToDB("skincare_uploaded_image_2", url).catch(console.error);
    try {
      localStorage.setItem("skincare_uploaded_image_2", url);
    } catch (e) {
      // expected failure on large images, handled gracefully by IndexedDB
    }
  };

  const handleResetImage2 = () => {
    setUploadedImage2(null);
    deleteImageFromDB("skincare_uploaded_image_2").catch(console.error);
    localStorage.removeItem("skincare_uploaded_image_2");
  };

  const handleUploadHeroImage = (url: string) => {
    setUploadedHeroImage(url);
    saveImageToDB("skincare_uploaded_hero_image", url).catch(console.error);
    try {
      localStorage.setItem("skincare_uploaded_hero_image", url);
    } catch (e) {
      // expected failure on large images, handled gracefully by IndexedDB
    }
  };

  const handleResetHeroImage = () => {
    setUploadedHeroImage(null);
    deleteImageFromDB("skincare_uploaded_hero_image").catch(console.error);
    localStorage.removeItem("skincare_uploaded_hero_image");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadImages = async () => {
      try {
        const hero = await getImageFromDB("skincare_uploaded_hero_image");
        if (hero) {
          setUploadedHeroImage(hero);
        } else {
          const legacyHero = localStorage.getItem("skincare_uploaded_hero_image");
          if (legacyHero) {
            setUploadedHeroImage(legacyHero);
            await saveImageToDB("skincare_uploaded_hero_image", legacyHero);
          }
        }
      } catch (e) {
        console.error("Failed to load hero image from IndexedDB", e);
        const legacyHero = localStorage.getItem("skincare_uploaded_hero_image");
        if (legacyHero) setUploadedHeroImage(legacyHero);
      }

      try {
        const img1 = await getImageFromDB("skincare_uploaded_image_1");
        if (img1) {
          setUploadedImage1(img1);
        } else {
          const legacyImg1 = localStorage.getItem("skincare_uploaded_image_1");
          if (legacyImg1) {
            setUploadedImage1(legacyImg1);
            await saveImageToDB("skincare_uploaded_image_1", legacyImg1);
          }
        }
      } catch (e) {
        console.error("Failed to load img1 from IndexedDB", e);
        const legacyImg1 = localStorage.getItem("skincare_uploaded_image_1");
        if (legacyImg1) setUploadedImage1(legacyImg1);
      }

      try {
        const img2 = await getImageFromDB("skincare_uploaded_image_2");
        if (img2) {
          setUploadedImage2(img2);
        } else {
          const legacyImg2 = localStorage.getItem("skincare_uploaded_image_2");
          if (legacyImg2) {
            setUploadedImage2(legacyImg2);
            await saveImageToDB("skincare_uploaded_image_2", legacyImg2);
          }
        }
      } catch (e) {
        console.error("Failed to load img2 from IndexedDB", e);
        const legacyImg2 = localStorage.getItem("skincare_uploaded_image_2");
        if (legacyImg2) setUploadedImage2(legacyImg2);
      }
    };

    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F7F5] text-brand-text font-sans pb-0 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Simple Navigation Rail */}
      <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-[#F6F7F5]/90 backdrop-blur-md border-b border-b-black/[0.03]">
        <button 
          onClick={() => navigate('/#projects')} 
          className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity tracking-tight"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="m15 18-6-6 6-6"/></svg>
          返回作品
        </button>
        <div 
          className="font-serif italic text-xl font-bold tracking-wider opacity-40 cursor-pointer hover:opacity-100 transition-opacity" 
          onClick={() => navigate('/')}
        >
          Xiao He
        </div>
        <div className="w-24 text-right text-[10px] uppercase tracking-widest opacity-45 font-bold hidden md:block text-emerald-700">
          Independent Build • Case
        </div>
      </nav>

      {/* Hero Section (首屏) */}
      <header className="max-w-[1240px] mx-auto px-6 pt-36 pb-20 md:pt-48 md:pb-28">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-full text-xs font-bold tracking-widest text-[#1B4332] uppercase mb-6 border border-emerald-500/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            0 to 1 AI Product / WORKFLOW
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-sans font-black text-brand-text tracking-tight leading-[1.05]"
          >
            小白护肤AI小程序
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg md:text-2xl text-brand-text/75 font-light max-w-3xl lg:max-w-4xl leading-relaxed tracking-tight"
          >
            解决护肤小白信息过载、广告混杂、缺乏个性化入门指引的问题。
          </motion.p>
        </div>

        {/* Refined Metadata Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 p-8 md:p-10 bg-white/75 backdrop-blur-sm rounded-[2rem] border border-black/[0.04] max-w-[1100px] mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.01)] mb-20 md:mb-28"
        >
          <div>
            <span className="block text-[11px] uppercase tracking-widest text-emerald-700/60 font-bold mb-2">My Role / 角色</span>
            <div className="text-base font-semibold text-brand-text tracking-tight leading-snug">
              <div>Product Designer</div>
              <div className="text-sm opacity-85 mt-0.5">独立产品设计师/产品负责人</div>
            </div>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-widest text-emerald-700/60 font-bold mb-2">PRODUCT DESIGN / 产品设计</span>
            <span className="text-base font-semibold text-brand-text tracking-tight">PRD、低保真原型设计</span>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-widest text-emerald-700/60 font-bold mb-2">AI CORE LOGIC / AI 核心逻辑</span>
            <div className="text-base font-semibold text-brand-text tracking-tight leading-snug">
              <div>Workflow • Prompt Engineering</div>
            </div>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-widest text-emerald-700/60 font-bold mb-2">Timeline / 研发周期</span>
            <span className="text-base font-semibold text-brand-text tracking-tight">10小时极速MVP验证</span>
          </div>
        </motion.div>

        {/* Mockup Large Visual Container (Clean borderless presentation) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <CustomImageUploader
            defaultImage={heroPic}
            customImage={uploadedHeroImage}
            isHero={true}
          />
        </motion.div>
      </header>

      {/* Context & Impact (背景与成果) */}
      <section className="bg-white/80 border-y border-black/[0.02] py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Painpoints/Challenges */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">Background & Painpoints</span>
            <h2 className="text-3xl font-sans font-extrabold text-brand-text tracking-tight leading-tight pt-2">
              信息鸿沟与碎片决策：<br />护肤小白的真实痛点
            </h2>
            <div className="text-brand-text/70 text-sm md:text-base font-light leading-relaxed space-y-4">
              <p>
                新手想要学习护肤面临着巨大的信息鸿沟。社交媒体上充斥着碎片化的营销广告种草，而每个人的肤质又千差万别，缺乏个性化的入门指引体系。
              </p>
              <p>
                现有的护肤类APP大多走向重度社区化或货架化，对刚入门的小白而言门槛过高。他们不需要庞杂成分分析和海量推荐，而是一个简单、温柔、客观真挚并真正能实际执行的“护肤向导”。
              </p>
            </div>
          </div>

          {/* Right Column - Large Contrast Highlight Metrics */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 lg:pl-10">
            <div className="py-4">
              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] text-black/35 uppercase mb-2">
                <span>01</span>
                <span className="w-1.5 h-[1.5px] bg-[#1B4332]/30"></span>
                <span>STRUCTURED FRAMEWORK // 模块化架构</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#1B4332] whitespace-nowrap leading-tight">
                结构化分析输出
              </h3>
              <p className="mt-4 text-xs sm:text-sm md:text-base text-brand-text/60 font-light tracking-wide leading-relaxed">
                凝练核心：通用信息、特殊解析、开放式输入兜底，让AI分析具体充满针对性。
              </p>
            </div>

            <div className="border-t border-black/[0.06] pt-8 pb-4">
              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] text-black/35 uppercase mb-2">
                <span>02</span>
                <span className="w-1.5 h-[1.5px] bg-[#C85A32]/30"></span>
                <span>EMPATHETIC DESIGN // 情感化 Prompt</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#C85A32] whitespace-nowrap leading-tight">
                温柔对话语调
              </h3>
              <p className="mt-4 text-xs sm:text-sm md:text-base text-brand-text/60 font-light tracking-wide leading-relaxed">
                精心调试专属 AI 人设，语气客观诚恳，消除未知产生的容貌与成分焦虑。
              </p>
            </div>

            <div className="border-t border-black/[0.06] pt-8 pb-4">
              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] text-black/35 uppercase mb-2">
                <span>03</span>
                <span className="w-1.5 h-[1.5px] bg-[#2C3539]/30"></span>
                <span>MVP VERIFICATION // 核心敏捷链</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#2C3539] whitespace-nowrap leading-tight">
                从 0 到 1 敏捷闭环
              </h3>
              <p className="mt-4 text-xs sm:text-sm md:text-base text-brand-text/60 font-light tracking-wide leading-relaxed">
                自主设计并开发，基于 Coze 工作流联动跑通完整逻辑包。
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Core Features (核心功能展示 - 交错式破格布局) */}
      <section className="py-28 md:py-36 max-w-[1200px] mx-auto px-6 space-y-32 md:space-y-48">
        
        {/* Block 1: Left Text, Right Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase tracking-widest text-[#2E8B57] font-extrabold">Feature One / 科学维度深度定制</span>
            <h3 className="text-3xl md:text-4xl font-sans font-black text-brand-text tracking-tight leading-tight">
              多维问题框架设计<br />定制针对性专属化方案
            </h3>
            <div className="text-brand-text/75 text-sm md:text-base font-light leading-relaxed space-y-4">
              <p>
                精心梳理多维度护肤评估指标，围绕皮肤类型、核心痛点、特殊生活场景及环境气候差异进行合理框架设计。通过科学严谨的评估路径，引导用户精准定位自身肌肤状况。
              </p>
              <p>
                拒绝千人一面的宽泛说辞，基于严密科学的问题框架，AI 能够敏锐捕捉个体特质，智能输出极具定制性、针对性的专属护肤方案，使每一项指导都契合个人真实诉求。
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <CustomImageUploader
              defaultImage={cardConceptPic}
              customImage={uploadedImage1}
              bgColorClass="bg-gradient-to-tr from-emerald-100 to-emerald-50 border border-emerald-500/10"
              tiltClass="transform rotate-1 group-hover:rotate-0"
              cropClass="absolute w-[200%] max-w-none left-0 bottom-0 scale-125 object-cover"
              aspectClass="aspect-[4/3] md:aspect-[3/2]"
            />
          </div>
        </div>

        {/* Block 2: Right Text, Left Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-last lg:order-first">
            <CustomImageUploader
              defaultImage={structuredCardPic}
              customImage={uploadedImage2}
              bgColorClass="bg-gradient-to-tr from-orange-100 to-orange-50 border border-orange-500/10"
              tiltClass="transform rotate-[-1deg] group-hover:rotate-0"
              cropClass="absolute w-[200%] max-w-none right-0 top-0 scale-110 object-cover"
              aspectClass="aspect-[4/3] md:aspect-[3/2]"
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase tracking-widest text-[#C85A32] font-extrabold">Feature Two / 信息结构化</span>
            <h3 className="text-3xl md:text-4xl font-sans font-black text-brand-text tracking-tight leading-tight">
              输出内容结构化<br />每条建议附带对应理由
            </h3>
            <div className="text-brand-text/75 text-sm md:text-base font-light leading-relaxed space-y-4">
              <p>
                得到的方案结构清晰、主次分明、一目了然。先说总体结论再分别按细项阐述原因，护肤具体步骤一步到位，解决多余纠结；分析建议科学释疑，化解未知担忧困扰。额外生活贴心建议，周全考虑用户隐性影响因素，真正为每一次温和呵护奠定科学而明朗的基石。
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* Decorative Final Quote Section */}
      <section className="py-24 max-w-[1240px] mx-auto px-6">
        <div className="w-full aspect-[5/3] md:aspect-[21/9] bg-[#E5E3DC] rounded-[2.5rem] overflow-hidden relative shadow-[0_32px_64px_-16px_rgba(0,0,0,0.04)] border border-black/5">
          {/* Natural organic breathing background elements */}
          <div className="absolute inset-0 bg-[#E5E3DC] overflow-hidden pointer-events-none">
            {/* Soft Ambient Blur Orbs with micro-displacement */}
            <motion.div
              animate={{
                scale: [1, 1.15, 0.9, 1],
                x: [0, 20, -15, 0],
                y: [0, -30, 20, 0],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -left-[10%] -bottom-[20%] w-[65%] h-[110%] rounded-full bg-[#B8C8B5]/40 blur-[100px]"
            />
            <motion.div
              animate={{
                scale: [1, 0.88, 1.12, 1],
                x: [0, -25, 20, 0],
                y: [0, 30, -20, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -right-[15%] -top-[30%] w-[75%] h-[130%] rounded-full bg-[#EADCC8]/50 blur-[110px]"
            />
            <motion.div
              animate={{
                scale: [0.92, 1.08, 0.95, 0.92],
                x: [0, 15, -20, 0],
                y: [0, -15, 25, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute left-[25%] top-[10%] w-[50%] h-[90%] rounded-full bg-[#F5ECE2]/60 blur-[90px]"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12 z-10">
            <div className="max-w-2xl text-center">
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-emerald-950 opacity-80 mb-6 md:mb-10 tracking-tight leading-snug">
                “让护肤回归本质，感受每一天真实的生长。”
              </h3>
              <div className="w-12 h-[2px] bg-emerald-950/20 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <footer className="border-t border-black/5 py-14 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center bg-[#F6F7F5] gap-6">
        <div>
          <button 
            onClick={() => navigate('/#projects')} 
            className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity text-brand-text"
          >
            <span className="transform group-hover:-translate-x-1.5 transition-transform text-emerald-600 font-extrabold">←</span>
            回到我的主页项目
          </button>
        </div>
        <div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity text-brand-text"
          >
            返回顶部
            <span className="transform group-hover:-translate-y-1.5 transition-transform text-emerald-600 font-extrabold">↑</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

interface CustomImageUploaderProps {
  defaultImage: string;
  customImage: string | null;
  onUpload?: (url: string) => void;
  onReset?: () => void;
  bgColorClass?: string;
  tiltClass?: string;
  cropClass?: string;
  aspectClass?: string;
  isHero?: boolean;
}

function CustomImageUploader({
  defaultImage,
  customImage,
  onUpload,
  onReset,
  bgColorClass = "",
  tiltClass = "",
  cropClass = "w-full h-full object-cover",
  aspectClass = "aspect-[4/3]",
  isHero = false
}: CustomImageUploaderProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const canEdit = typeof onUpload === "function";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canEdit) return;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onUpload?.(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!canEdit) return;
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    if (!canEdit) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!canEdit) return;
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onUpload?.(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    if (canEdit) {
      fileInputRef.current?.click();
    }
  };

  if (isHero) {
    return (
      <div 
        onDragOver={canEdit ? handleDragOver : undefined}
        onDragLeave={canEdit ? handleDragLeave : undefined}
        onDrop={canEdit ? handleDrop : undefined}
        onClick={canEdit ? triggerUpload : undefined}
        className={`relative w-full aspect-[4/3] md:aspect-[2.2/1] rounded-[2rem] overflow-hidden border border-black/5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.06)] bg-white/50 group select-none transition-all duration-700 ${
          canEdit ? "cursor-pointer" : ""
        } ${
          isDragOver ? "scale-[1.01] border-emerald-500/40 ring-4 ring-emerald-500/10" : ""
        }`}
      >
        {canEdit && (
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        )}
        
        <img 
          src={customImage || defaultImage} 
          className="w-full h-full object-cover select-none saturate-[0.85] group-hover:saturate-100 transition-all duration-700" 
          alt="Health App Landscape View" 
        />

        {/* Premium Overlay on Hover / Drag */}
        {canEdit && (
          <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition-all duration-300 gap-2 opacity-0 group-hover:opacity-100 ${
            isDragOver ? "opacity-100 bg-black/50" : ""
          }`}>
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            </div>
            <span className="text-sm font-bold tracking-widest uppercase text-center px-4">
              {customImage ? "更换自定义主图" : "点击或拖拽上传自定义主图"}
            </span>
            <span className="text-xs text-white/60 tracking-wider text-center">
              支持 JPG, PNG, WEBP 等格式
            </span>
          </div>
        )}

        {/* Floating original reset button if custom image exists */}
        {canEdit && customImage && onReset && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
            className="absolute top-6 right-6 z-10 bg-white/90 hover:bg-white text-black/70 hover:text-black py-1.5 px-3.5 rounded-full text-xs font-medium border border-black/10 transition-all shadow-md flex items-center gap-1.5"
            title="恢复默认图片"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M16 3h5v5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 21H3v-5"/></svg>
            恢复默认
          </button>
        )}
      </div>
    );
  }

  return (
    <div 
      onDragOver={canEdit ? handleDragOver : undefined}
      onDragLeave={canEdit ? handleDragLeave : undefined}
      onDrop={canEdit ? handleDrop : undefined}
      onClick={canEdit ? triggerUpload : undefined}
      className={`relative w-full max-w-[550px] ${aspectClass} rounded-[1.5rem] border border-black/5 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.06)] overflow-hidden group select-none bg-white ${tiltClass} ${
        canEdit ? "cursor-pointer" : ""
      } ${
        isDragOver ? "scale-105 border-emerald-500/40 ring-4 ring-emerald-500/10" : ""
      }`}
    >
      {canEdit && (
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      )}
      
      <img 
        src={customImage || defaultImage} 
        className={
          customImage 
            ? "w-full h-full object-cover saturate-100 transition-all duration-700"
            : `saturate-[0.85] group-hover:saturate-100 transition-all duration-700 ${cropClass}`
        } 
        alt="Uploadable design mockup" 
      />

      {/* Premium Overlay on Hover / Drag */}
      {canEdit && (
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition-all duration-300 gap-2 opacity-0 group-hover:opacity-100 ${
          isDragOver ? "opacity-100 bg-black/50" : ""
        }`}>
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-center px-4">
            {customImage ? "更换自定义图片" : "点击或拖拽上传图片"}
          </span>
          <span className="text-[9px] text-white/60 tracking-wider text-center">
            支持 JPG, PNG, WEBP 等格式
          </span>
        </div>
      )}

      {/* Floating original reset button if custom image exists */}
      {canEdit && customImage && onReset && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
          className="absolute top-6 right-6 z-10 bg-white/90 hover:bg-white text-black/70 hover:text-black py-1.5 px-3.5 rounded-full text-xs font-medium border border-black/10 transition-all shadow-md flex items-center gap-1.5"
          title="恢复默认图片"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M16 3h5v5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 21H3v-5"/></svg>
          恢复默认
        </button>
      )}
    </div>
  );
}

// IndexedDB Utility for Large Image Storage
const DB_NAME = "ImageStorageDB";
const STORE_NAME = "images";

function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function saveImageToDB(key: string, dataUrl: string): Promise<void> {
  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(dataUrl, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
}

function getImageFromDB(key: string): Promise<string | null> {
  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  });
}

function deleteImageFromDB(key: string): Promise<void> {
  return initDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
}

function HealthProjectDetail() {
  const navigate = useNavigate();
  const [uploadedImage1, setUploadedImage1] = React.useState<string | null>(null);
  const [uploadedImage2, setUploadedImage2] = React.useState<string | null>(null);
  const [uploadedHeroImage, setUploadedHeroImage] = React.useState<string | null>(null);

  const handleUploadImage1 = (url: string) => {
    setUploadedImage1(url);
    saveImageToDB("health_uploaded_image_1", url).catch(console.error);
    try {
      localStorage.setItem("health_uploaded_image_1", url);
    } catch (e) {
      // expected failure on large images, handled gracefully by IndexedDB
    }
  };

  const handleResetImage1 = () => {
    setUploadedImage1(null);
    deleteImageFromDB("health_uploaded_image_1").catch(console.error);
    localStorage.removeItem("health_uploaded_image_1");
  };

  const handleUploadImage2 = (url: string) => {
    setUploadedImage2(url);
    saveImageToDB("health_uploaded_image_2", url).catch(console.error);
    try {
      localStorage.setItem("health_uploaded_image_2", url);
    } catch (e) {
      // expected failure on large images, handled gracefully by IndexedDB
    }
  };

  const handleResetImage2 = () => {
    setUploadedImage2(null);
    deleteImageFromDB("health_uploaded_image_2").catch(console.error);
    localStorage.removeItem("health_uploaded_image_2");
  };

  const handleUploadHeroImage = (url: string) => {
    setUploadedHeroImage(url);
    saveImageToDB("health_uploaded_hero_image", url).catch(console.error);
    try {
      localStorage.setItem("health_uploaded_hero_image", url);
    } catch (e) {
      // expected failure on large images, handled gracefully by IndexedDB
    }
  };

  const handleResetHeroImage = () => {
    setUploadedHeroImage(null);
    deleteImageFromDB("health_uploaded_hero_image").catch(console.error);
    localStorage.removeItem("health_uploaded_hero_image");
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);

    const loadImages = async () => {
      try {
        const hero = await getImageFromDB("health_uploaded_hero_image");
        if (hero) {
          setUploadedHeroImage(hero);
        } else {
          const legacyHero = localStorage.getItem("health_uploaded_hero_image");
          if (legacyHero) {
            setUploadedHeroImage(legacyHero);
            await saveImageToDB("health_uploaded_hero_image", legacyHero);
          }
        }
      } catch (e) {
        console.error("Failed to load hero image from IndexedDB", e);
        const legacyHero = localStorage.getItem("health_uploaded_hero_image");
        if (legacyHero) setUploadedHeroImage(legacyHero);
      }

      try {
        const img1 = await getImageFromDB("health_uploaded_image_1");
        if (img1) {
          setUploadedImage1(img1);
        } else {
          const legacyImg1 = localStorage.getItem("health_uploaded_image_1");
          if (legacyImg1) {
            setUploadedImage1(legacyImg1);
            await saveImageToDB("health_uploaded_image_1", legacyImg1);
          }
        }
      } catch (e) {
        console.error("Failed to load img1 from IndexedDB", e);
        const legacyImg1 = localStorage.getItem("health_uploaded_image_1");
        if (legacyImg1) setUploadedImage1(legacyImg1);
      }

      try {
        const img2 = await getImageFromDB("health_uploaded_image_2");
        if (img2) {
          setUploadedImage2(img2);
        } else {
          const legacyImg2 = localStorage.getItem("health_uploaded_image_2");
          if (legacyImg2) {
            setUploadedImage2(legacyImg2);
            await saveImageToDB("health_uploaded_image_2", legacyImg2);
          }
        }
      } catch (e) {
        console.error("Failed to load img2 from IndexedDB", e);
        const legacyImg2 = localStorage.getItem("health_uploaded_image_2");
        if (legacyImg2) setUploadedImage2(legacyImg2);
      }
    };

    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F7F5] text-brand-text font-sans pb-0 selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">
      {/* Simple Navigation Rail */}
      <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-[#F6F7F5]/90 backdrop-blur-md border-b border-black/[0.03]">
        <button 
          onClick={() => navigate('/#projects')} 
          className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity tracking-tight"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="m15 18-6-6 6-6"/></svg>
          返回作品
        </button>
        <div 
          className="font-serif italic text-xl font-bold tracking-wider opacity-40 cursor-pointer hover:opacity-100 transition-opacity" 
          onClick={() => navigate('/')}
        >
          Xiao He
        </div>
        <div className="w-24 text-right text-[10px] uppercase tracking-widest opacity-45 font-bold hidden md:block text-emerald-700">
          Independent Build • Case
        </div>
      </nav>

      {/* Hero Section (首屏) */}
      <header className="max-w-[1240px] mx-auto px-6 pt-36 pb-20 md:pt-48 md:pb-28">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-full text-xs font-bold tracking-widest text-emerald-800 uppercase mb-6 border border-emerald-500/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Vibe Coding / 独立开发
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-sans font-black text-brand-text tracking-tight leading-[1.05]"
          >
            健康打卡小程序
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg md:text-2xl text-brand-text/75 font-light max-w-2xl leading-relaxed tracking-tight"
          >
            用轻松、治愈的方式，做最尊重个体生长节奏的健康自律管理。
          </motion.p>
        </div>

        {/* Refined Metadata Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 p-8 md:p-10 bg-white/75 backdrop-blur-sm rounded-[2rem] border border-black/[0.04] max-w-[1100px] mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.01)] mb-20 md:mb-28"
        >
          <div>
            <span className="block text-[11px] uppercase tracking-widest text-emerald-700/60 font-bold mb-2">My Role / 角色</span>
            <span className="text-base font-semibold text-brand-text tracking-tight">Independent Developer 独立开发者</span>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-widest text-emerald-700/60 font-bold mb-2">Method / 开发范式</span>
            <span className="text-base font-semibold text-brand-text tracking-tight">AI-Assisted Vibe Coding</span>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-widest text-emerald-700/60 font-bold mb-2">Architecture / 架构范式</span>
            <div className="text-base font-semibold text-brand-text tracking-tight leading-snug">
              <div className="sm:whitespace-nowrap whitespace-normal">Serverless BaaS •</div>
              <div className="sm:whitespace-nowrap whitespace-normal">Local-to-Cloud Migration</div>
            </div>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-widest text-emerald-700/60 font-bold mb-2">Tech Stack / 技术栈</span>
            <span className="text-base font-semibold text-brand-text tracking-tight">原生架构 • Serverless • CSS Variables</span>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-widest text-emerald-700/60 font-bold mb-2">Timeline / 研发周期</span>
            <span className="text-base font-semibold text-brand-text tracking-tight">2天全链路跑通</span>
          </div>
        </motion.div>

        {/* Mockup Large Visual Container (Clean borderless presentation) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <CustomImageUploader
            defaultImage={healthMockupPic}
            customImage={uploadedHeroImage}
            isHero={true}
          />
        </motion.div>
      </header>

      {/* Context & Impact (背景与成果) */}
      <section className="bg-white/80 border-y border-black/[0.02] py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Painpoints/Challenges (Elegant small font) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">Background & Painpoints</span>
            <h2 className="text-3xl font-sans font-extrabold text-brand-text tracking-tight leading-tight pt-2">
              让每日习惯<br />从“任务负担”回归“生活乐趣”
            </h2>
            <div className="text-brand-text/70 text-sm md:text-base font-light leading-relaxed space-y-4">
              <p>
                市面上的健康日志与自律应用，常常带有极强的“说教感”与“分数焦虑”。过度的打卡PK、刺眼的未完成警告、以及不胜其烦的手动表单，正悄然消磨掉原本积极的好习惯。
              </p>
              <p>
                「健康打卡小程序」的设计初心是探索极度回归自我的、克制而温暖的交互范式。不追求用户的高强度留存和复杂的大盘互动，仅仅在喝水、运动、冥想、甚至排便等日常琐碎中，赋予一点趣味的、微小的治愈感瞬间。
              </p>
            </div>
          </div>

          {/* Right Column - Large Contrast Highlight Metrics */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 lg:pl-10">
            <div className="py-4">
              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] text-black/35 uppercase mb-2">
                <span>01</span>
                <span className="w-1.5 h-[1.5px] bg-[#1B4332]/30"></span>
                <span>INTERACTIVE EXPERIENCE // 治愈体验</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#1B4332] sm:whitespace-nowrap whitespace-normal leading-tight">
                趣味式微打卡
              </h3>
              <p className="mt-4 text-xs sm:text-sm md:text-base text-brand-text/60 font-light tracking-wide sm:whitespace-nowrap whitespace-normal leading-relaxed">
                将喝水、排便转化为具象卡通治愈图标交互，赋予琐事日常仪式感。
              </p>
            </div>

            <div className="border-t border-black/[0.06] pt-8 pb-4">
              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] text-black/35 uppercase mb-2">
                <span>02</span>
                <span className="w-1.5 h-[1.5px] bg-[#C85A32]/30"></span>
                <span>MINDFUL GROWTH // 自我律动</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#C85A32] sm:whitespace-nowrap whitespace-normal leading-tight">
                100% 无压成长
              </h3>
              <p className="mt-4 text-xs sm:text-sm md:text-base text-brand-text/60 font-light tracking-wide sm:whitespace-nowrap whitespace-normal leading-relaxed">
                拒绝数据焦虑与积分排名，极简日历轻盈记录，属于个体的秘密健康营地。
              </p>
            </div>

            <div className="border-t border-black/[0.06] pt-8 pb-4">
              <div className="flex items-center gap-3 text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] text-black/35 uppercase mb-2">
                <span>03</span>
                <span className="w-1.5 h-[1.5px] bg-[#2C3539]/30"></span>
                <span>FULL-STACK VALIDATION // 模拟验证</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#2C3539] sm:whitespace-nowrap whitespace-normal leading-tight">
                AI全链路跑通
              </h3>
              <p className="mt-4 text-xs sm:text-sm md:text-base text-brand-text/60 font-light tracking-wide sm:whitespace-nowrap whitespace-normal leading-relaxed">
                从创意、功能到交互实现全程 AI 参与，48小时高完成度的全栈模拟验证。
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Core Features (核心功能展示 - 交错式破格布局) */}
      <section className="py-28 md:py-36 max-w-[1200px] mx-auto px-6 space-y-32 md:space-y-48">
        
        {/* Block 1: Left Text, Right Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-extrabold">Feature One / 多维健康统计</span>
            <h3 className="text-3xl md:text-4xl font-sans font-black text-brand-text tracking-tight leading-tight">
              温暖直观的数据看板<br /><span className="sm:whitespace-nowrap whitespace-normal">用温度记录身体的自主律动</span>
            </h3>
            <p className="text-brand-text/70 text-base font-light leading-relaxed">
              科学而温暖的个人健康统计中心。在这个多维看板中，通过极简、柔和的直观图表呈现你的每日水分走势、睡眠质量指标以及排便健康状况分布。拒绝冷冰冰的数字强迫，只用温和的流向记录，帮助你慢慢找回属于自我的健康韵律。
            </p>
          </div>
          
          {/* Out of bounds break image with slight tilt */}
          <div className="lg:col-span-7 overflow-visible relative flex justify-center group">
            <CustomImageUploader
              defaultImage={healthMockupPic}
              customImage={uploadedImage1}
              bgColorClass="bg-gradient-to-tr from-emerald-100 to-emerald-50 border border-emerald-500/10"
              tiltClass="transform rotate-1 group-hover:rotate-0"
              cropClass="absolute w-[200%] max-w-none left-0 bottom-0 scale-125 object-cover"
            />
          </div>
        </div>

        {/* Block 2: Right Text, Left Image (Interlocking Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center lg:flex-row-reverse">
          <div className="lg:col-span-5 lg:order-2 space-y-6">
            <span className="text-[10px] uppercase tracking-widest text-orange-500 font-extrabold">Feature Two / 趣味习惯激励</span>
            <h3 className="text-3xl md:text-4xl font-sans font-black text-brand-text tracking-tight leading-tight">
              游戏化趣味成就中心<br /><span className="sm:whitespace-nowrap whitespace-normal">给平淡琐事一点可爱的仪式感</span>
            </h3>
            <p className="text-brand-text/70 text-base font-light leading-relaxed">
              打破教条而枯燥的自律规训。将你的便便规律、喝水目标、以及提肛运动等一并转换为充满童话色彩的治愈图标，并累计打卡以解锁设计精致的成就墙徽章。没有功利性的积分与排名，只需专注于探索点亮属于你个体的治愈健康营地。
            </p>
          </div>

          {/* Left angled image breakdown */}
          <div className="lg:col-span-7 lg:order-1 overflow-visible relative flex justify-center group">
            <CustomImageUploader
              defaultImage={healthMockupPic}
              customImage={uploadedImage2}
              bgColorClass="bg-gradient-to-tr from-orange-100 to-orange-50 border border-orange-500/10"
              tiltClass="transform rotate-[-1deg] group-hover:rotate-0"
              cropClass="absolute w-[200%] max-w-none right-0 top-0 scale-110 object-cover"
            />
          </div>
        </div>

      </section>

      {/* Design & Code Highlights (设计与开发亮点) */}
      <section className="bg-white/40 border-t border-black/[0.03] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="text-[11px] uppercase tracking-widest text-[#2E8B57] font-black bg-[#E8F5E9] px-3.5 py-1.5 rounded-full inline-block">Craft & Features</span>
            <h2 className="text-4xl font-sans font-black text-brand-text tracking-tight leading-tight mt-6">
               设计要点与快速开发亮点
            </h2>
            <p className="text-brand-text/60 mt-4 text-base font-light leading-relaxed">
               轻体量的小程序中蕴藏着严苛的细节，完美融入 AI 时代微工程。
            </p>
          </div>

          {/* 3 Column Clean Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-[1100px] mx-auto">
            
            {/* Card 1 */}
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-black/[0.03] shadow-[0_4px_24px_rgba(0,0,0,0.01)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(16,185,129,0.04)] hover:border-emerald-500/10 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                🌱
              </div>
              <h4 className="text-lg font-bold text-brand-text mb-3 tracking-tight">AI-Vibe 放松氛围</h4>
              <p className="text-brand-text/60 text-sm leading-relaxed font-light">
                摒弃常规纯白和刺眼强对比，采用温暖、极具自然生机和呼吸的浅淡护眼配色，从视觉直观传递解压信号。
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-black/[0.03] shadow-[0_4px_24px_rgba(0,0,0,0.01)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(249,115,22,0.04)] hover:border-orange-500/10 group">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                🎈
              </div>
              <h4 className="text-lg font-bold text-brand-text mb-3 tracking-tight">轻盈趣味化形态</h4>
              <p className="text-brand-text/60 text-sm leading-relaxed font-light">
                将原本枯燥沉重的健康指标，趣味性地解构成轻松生动的卡通意象与打卡轻互动。不施加任何自律压力，让使用过程充满童话般的治愈体验。
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-black/[0.03] shadow-[0_4px_24px_rgba(0,0,0,0.01)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.04)] hover:border-black/5 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-text/5 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                💅
              </div>
              <h4 className="text-lg font-bold text-brand-text mb-3 tracking-tight">顺滑细腻微交互</h4>
              <p className="text-brand-text/60 text-sm leading-relaxed font-light">
                在卡片弹窗、选项卡切换以及按钮按下时均融入定制的 1s 渐近贝塞尔曲线过渡动画，让每次点击都呈现舒适回弹。
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <footer className="border-t border-black/5 py-14 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center bg-[#F6F7F5] gap-6">
        <div>
          <button 
            onClick={() => navigate('/#projects')} 
            className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity text-brand-text"
          >
            <span className="transform group-hover:-translate-x-1.5 transition-transform text-emerald-600 font-extrabold">←</span>
            回到我的主页项目
          </button>
        </div>
        <div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity text-brand-text"
          >
            返回顶部
            <span className="transform group-hover:-translate-y-1.5 transition-transform text-emerald-600 font-extrabold">↑</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/skincare" element={<ProjectDetail />} />
        <Route path="/project/health" element={<HealthProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
