"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const documents = [
  { id: "L-883", title: "USPA License", type: "Class D", status: "Verified" },
  { id: "M-102", title: "Medical Clearance", type: "FAA Class 1", status: "Active" },
  { id: "I-992", title: "Liability Bond", type: "Global Coverage", status: "Verified" },
];

export function VerificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 pl-4 pr-2 py-2 rounded-full hover:bg-white/10 transition-colors group"
      >
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors">Verify Credentials</span>
        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
           <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
           </svg>
        </div>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl"
            >
               {/* Header */}
               <div className="bg-zinc-800 p-4 flex justify-between items-center border-b border-white/10">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="font-mono text-sm text-zinc-300 tracking-widest uppercase">Verified Personnel</span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </button>
               </div>

               {/* Content */}
               <div className="p-8 space-y-4 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-100">
                  {documents.map((doc, i) => (
                    <div key={i} className="flex justify-between items-center p-4 border border-white/5 bg-white/5 rounded hover:bg-white/10 transition-colors cursor-pointer group">
                       <div>
                          <div className="text-xs font-mono text-zinc-500 mb-1">{doc.id}</div>
                          <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{doc.title}</div>
                          <div className="text-xs text-zinc-400">{doc.type}</div>
                       </div>
                       <div className="px-2 py-1 bg-green-900/30 border border-green-500/30 rounded text-[10px] text-green-400 font-mono uppercase tracking-wider">
                          {doc.status}
                       </div>
                    </div>
                  ))}
                  
                  <div className="mt-8 pt-6 border-t border-white/10 text-center">
                     <p className="text-xs text-zinc-500">
                        All documents are cryptographically signed and verified by the International Air Sports Federation.
                     </p>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
