import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Eye, Download } from 'lucide-react';
const steps = [
  {
    icon: Upload,
    title: 'Upload Your Photo',
    description: 'Drag and drop any JPG or PNG image into the studio to begin the magic.',
    color: 'text-cf-cyan-500'
  },
  {
    icon: Eye,
    title: 'Preview the Magic',
    description: 'Our AI processes your image instantly. Review the high-precision cutout.',
    color: 'text-cf-cyan-500'
  },
  {
    icon: Download,
    title: 'Download Your Creation',
    description: 'Save your clean, transparent image and use it in any design or app.',
    color: 'text-cf-cyan-500'
  }
];
export function HowItWorksSection() {
  return (
    <section className="bg-muted/50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Three Steps to Perfection</h2>
          <p className="text-muted-foreground text-lg">It's as simple as it sounds. No registration required.</p>
        </div>
        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-cf-cyan-500/10 -translate-y-1/2 z-0" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-background border-4 border-cf-cyan-500/20 shadow-soft flex items-center justify-center mb-8 relative group-hover:border-cf-cyan-500 transition-colors">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cf-cyan-500 text-white flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </span>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-base max-w-xs leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}