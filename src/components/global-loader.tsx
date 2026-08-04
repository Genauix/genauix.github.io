'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useLoader } from './loader-context';

export function GlobalLoader() {
  const { isReady } = useLoader();

  useEffect(() => {
    // Prevent scrolling while loading
    if (!isReady) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isReady]);

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="global-loader"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'var(--canvas)' }}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative flex items-center justify-center"
            >
              <Image
                src="/genauix-logo.png"
                alt="Genauix logo"
                width={48}
                height={48}
                priority
                className="opacity-80"
              />
              <div 
                className="absolute inset-0 rounded-full border border-t-transparent" 
                style={{ borderColor: 'var(--signal) transparent var(--signal) transparent', borderWidth: '1px', opacity: 0.5, scale: 1.5 }}
              />
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono-genauix)',
                  fontSize: '11px',
                  color: 'var(--ink-muted)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Initializing Systems
              </span>
              
              <div className="w-32 h-1 overflow-hidden" style={{ background: 'var(--surface-raised)', borderRadius: '9999px' }}>
                <motion.div
                  className="h-full"
                  style={{ background: 'var(--signal)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
