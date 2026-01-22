"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef,useState,useEffect } from "react";

// Icons
import pythonIcon from "@/assets/icons/python.svg";
import tensorflowIcon from "@/assets/icons/tensorflow.svg";
import reactIcon from "@/assets/icons/react.svg";
import htmlIcon from "@/assets/icons/html5.svg";
import cssIcon from "@/assets/icons/css.svg";
import jsIcon from "@/assets/icons/javascript.svg";
import mysqlIcon from "@/assets/icons/mysql.svg";
import gitIcon from "@/assets/icons/git.svg";
import numpyIcon from "@/assets/icons/numpy.svg";
import pandasIcon from "@/assets/icons/pandas.svg";
import scikitIcon from "@/assets/icons/scikitlearn.svg";
import javaIcon from "@/assets/icons/java.svg";
import figmaIcon from "@/assets/icons/figma.svg";
import firebaseIcon from "@/assets/icons/firebase.svg";
import flaskIcon from "@/assets/icons/flask.svg";
import linkedinIcon from "@/assets/icons/linkedin.svg";
import githubIcon from "@/assets/icons/github.svg";

// Skills distributed in a Fan Out / Arc from Left to Right
// Center is (0,0).
// Skills distributed in a Wide Symmetric Fan Out
// Center is (0,0).
// Skills distributed in a Fan Out / Arc from Left to Right
// Center is (0,0).
const SKILLS = [
  // --- Left Wing (Fanning out from top-left to bottom-left) ---
  // Inner Arc (Radius ~350-450)
  { name: "Python", icon: pythonIcon, x: -350, y: -200, mobileX: -80, mobileY: -280 },
  { name: "Java", icon: javaIcon, x: -450, y: -100, mobileX: 80, mobileY: -280 },
  { name: "React", icon: reactIcon, x: -450, y: 100, mobileX: -40, mobileY: -200 },
  { name: "HTML", icon: htmlIcon, x: -350, y: 200, mobileX: 40, mobileY: -200 },

  // Outer Arc (Radius ~550-650)
  { name: "TensorFlow", icon: tensorflowIcon, x: -550, y: -250, mobileX: -120, mobileY: -360 },
  { name: "scikitlearn", icon: scikitIcon, x: -650, y: -80, mobileX: 0, mobileY: -340 },
  { name: "Flask", icon: flaskIcon, x: -650, y: 80, mobileX: 120, mobileY: -360 },
  { name: "pandas", icon: pandasIcon, x: -550, y: 250, mobileX: 0, mobileY: -140 },

  // --- Right Wing (Mirrored Positive X) ---
  // Inner Arc
  { name: "JavaScript", icon: jsIcon, x: 350, y: -200, mobileX: -80, mobileY: 280 },
  { name: "MySQL", icon: mysqlIcon, x: 450, y: 0, mobileX: 80, mobileY: 280 },
  { name: "CSS", icon: cssIcon, x: 350, y: 200, mobileX: -40, mobileY: 200 },

  // Outer Arc
  { name: "Figma", icon: figmaIcon, x: 550, y: -250, mobileX: 40, mobileY: 200 },
  { name: "Git", icon: gitIcon, x: 650, y: -80, mobileX: -120, mobileY: 360 },
  { name: "numpy", icon: numpyIcon, x: 650, y: 80, mobileX: 0, mobileY: 340 },
  { name: "Firebase", icon: firebaseIcon, x: 550, y: 250, mobileX: 120, mobileY: 360 },
];

// --- Sub-component to handle individual transforms (Hook Rules Fix) ---
function SkillItem({ 
    skill, 
    spreadProgress, 
    skillsOpacity,
    isMobile
}: { 
    skill: typeof SKILLS[0], 
    spreadProgress: any, // MotionValue<number>
    skillsOpacity: any,   // MotionValue<number>
    isMobile: boolean
}) {
    // Hooks must be called at top level of component
    
    // Desktop: Use standard X/Y
    // Mobile: Use mobileX/mobileY (VERTICAL fan above/below center)
    const targetX = isMobile ? skill.mobileX : skill.x;
    const targetY = isMobile ? skill.mobileY : skill.y;

    const x = useTransform(spreadProgress, [0, 1], [0, targetX]);
    const y = useTransform(spreadProgress, [0, 1], [0, targetY]);
    
    return (
        <motion.div
            style={{
                x,
                y,
                opacity: skillsOpacity,
                scale: spreadProgress
            }}
            className="absolute z-0 flex flex-col items-center justify-center gap-2"
        >
             {/* BIMODAL INCREASE: w-20 h-20 (from w-12/14) - Smaller on mobile */}
             <div className="w-14 h-14 md:w-24 md:h-24 p-3 md:p-4 rounded-full border border-[rgba(204,255,0,0.15)] bg-black/90 backdrop-blur-sm shadow-[0_0_25px_rgba(204,255,0,0.1)] flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <img src={skill.icon.src} alt={skill.name} className="w-full h-full object-contain opacity-90" />
            </div>
        </motion.div>
    );
}

export function TransformationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- Animation Phases ---
  // 0.0 - 0.1 : Fade in Text "SO...WHAT DO I ACTUALLY KNOW?" (Very fast)
  // 0.1 - 0.7 : Text Stays, Skills Spread Out (Filling more of the scroll)
  // 0.5 - 0.8 : Social Links Fade In

  // 1. Fade in content from black (seamless transition from previous section)
  // Text appears almost immediately
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  
  // 2. Skills Spread Animation
  // Starts after text
  // 0 -> centered (behind text), 1 -> spread out
  const spreadProgress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const skillsOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]); // Fade in as they start spreading

  // 3. Social Links
  const linksOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Main Content Container */}
        <div className="relative flex items-center justify-center w-full h-full">
            
            {/* SKILLS LAYER (Spreading from Center) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {SKILLS.map((skill, i) => (
                    <SkillItem 
                        key={i} 
                        skill={skill} 
                        spreadProgress={spreadProgress} 
                        skillsOpacity={skillsOpacity} 
                        isMobile={isMobile}
                    />
                ))}
            </div>

            {/* CENTER TEXT */}
            <motion.div 
                style={{ opacity: textOpacity }}
                className="relative z-10 max-w-[600px] text-center px-4"
            >
                 <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter leading-tight pointer-events-none">
                    SO... <br/>
                    <span className="text-gray-500">WHAT DO I</span> <br/>
                    <span className="text-[#ccff00]">ACTUALLY KNOW?</span>
                 </h2>
            </motion.div>

            {/* SOCIAL LINKS (Moved closer to center) */}
            <motion.div 
                style={{ opacity: linksOpacity }}
                className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[600px] flex justify-between px-8 md:px-0 z-50 pointer-events-none"
            >
                {/* Left Link: LinkedIn */}
                <a 
                    href="https://linkedin.com/in/rohitrn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pointer-events-auto transition-transform hover:scale-105 flex items-center gap-4 group"
                >
                    <div className="w-10 h-10 rounded-full border border-gray-700 bg-black flex items-center justify-center group-hover:border-[#ccff00] transition-colors">
                       <img src={linkedinIcon.src} alt="LinkedIn" className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100" />
                    </div>
                    <span className="text-gray-400 text-sm md:text-lg font-mono font-bold tracking-widest group-hover:text-[#ccff00] transition-colors">
                        LINKEDIN
                    </span>
                </a>

                {/* Right Link: GitHub */}
                <a 
                    href="https://github.com/s2kOp/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pointer-events-auto transition-transform hover:scale-105 flex items-center gap-4 group flex-row-reverse"
                >
                     <div className="w-10 h-10 rounded-full border border-gray-700 bg-black flex items-center justify-center group-hover:border-[#ccff00] transition-colors">
                         <img src={githubIcon.src} alt="GitHub" className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100" />
                     </div>
                     <span className="text-gray-400 text-sm md:text-lg font-mono font-bold tracking-widest group-hover:text-[#ccff00] transition-colors">
                        GITHUB
                    </span>
                </a>

            </motion.div>

        </div>

      </div>
    </section>
  );
}
