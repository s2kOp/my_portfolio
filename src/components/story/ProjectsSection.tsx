"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

// --- DATA: 3 Projects, Sarcastic/Confident Tone ---
const PROJECTS = [
  {
    id: "project-1",
    label: "LinkUp",
    description: "A real-time chat platform with custom rooms and near-instant messaging, built to stay smooth even when conversations get busy.",
    aside: "Surprisingly stable. Don't ask how.",
    image: "https://ik.imagekit.io/s2kOp/linkUp.png?updatedAt=1769189979124", // Placeholder
    linkLive: "https://link-up-beta-nine.vercel.app/",
    linkRepo: "https://github.com/s2kOp/linkUp",
  },
  {
    id: "project-2",
    label: "Cinehub",
    description: "A movie browsing and recommendation site that pulls data from TMDB and suggests similar films when you find something you like.",
    aside: "Your next watch is probably here.",
    image: "https://ik.imagekit.io/s2kOp/Cinehub.png?updatedAt=1769188565007", // Placeholder
    linkLive: "https://cinehub-eta.vercel.app/",
    linkRepo: "https://github.com/s2kOp/cinehub",
  },
];

export function ProjectsSection() {
  return (
    <section className="relative w-full bg-black py-20 overflow-hidden">
      <div className="flex flex-col gap-32 md:gap-40 px-6 max-w-7xl mx-auto">
        {PROJECTS.map((project, index) => {
          const isEven = index % 2 === 0; // True for 0 (1st), 2 (3rd) -> Image Left
          
          return (
            <div 
              key={project.id}
              className={clsx(
                "flex flex-col md:items-center gap-8 md:gap-16",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              {/* --- IMAGE SIDE --- */}
              <motion.div 
                className="w-full md:w-1/2 flex justify-center"
                initial={{ opacity: 0, x: isEven ? -100 : 100, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                 <a href={project.linkLive} target="_blank" rel="noopener noreferrer" className="block w-full max-w-[480px] group relative overflow-hidden rounded-2xl border border-white/10 aspect-[16/10]">
                    {/* Placeholder Glow */}
                    <div className="absolute inset-0 bg-transparent group-hover:bg-[#ccff00]/5 transition-colors duration-500 z-10" />
                    
                    <img 
                      src={project.image} 
                      alt={project.label} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    
                    {/* Neon Border on Hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ccff00] rounded-2xl transition-colors duration-500 pointer-events-none z-20" />
                 </a>
              </motion.div>

              {/* --- TEXT SIDE --- */}
              <motion.div 
                className="w-full md:w-2/5 flex flex-col gap-4"
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                  {/* Case File Header */}
                  <div className="flex items-center gap-3 opacity-50">
                     <span className="w-8 h-[1px] bg-white"></span>
                     <p className="text-xs font-mono uppercase tracking-widest text-[#ccff00]">PROJECT 0{index + 1}</p>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                      {project.label}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-gray-400 leading-relaxed">
                      {project.description}
                  </p>
                  
                  {/* Sarcastic Aside */}
                  <p className="text-sm text-gray-500 italic border-l-2 border-[#ccff00]/50 pl-3">
                      {project.aside}
                  </p>

                  {/* Links */}
                  <div className="flex items-center gap-6 mt-4">
                      <a href={project.linkLive} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ccff00] font-bold tracking-wider text-sm border-b border-transparent hover:border-[#ccff00] transition-all">
                          LIVE DEPLOY
                      </a>
                      <a href={project.linkRepo} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white font-bold tracking-wider text-sm transition-colors">
                          GITHUB REPO
                      </a>
                  </div>

              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
