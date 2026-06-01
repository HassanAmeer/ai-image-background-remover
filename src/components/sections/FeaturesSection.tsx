import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, ShieldCheck, Target, MousePointer2 } from 'lucide-react';
const features = [
  {
    title: 'AI-Powered Precision',
    description: 'Our neural networks are trained on millions of images to handle hair, fur, and complex edges perfectly.',
    icon: Target,
    color: 'text-cf-cyan-500',
    bg: 'bg-cf-cyan-500/10'
  },
  {
    title: 'High-Quality Results',
    description: 'Get clean, transparent PNGs up to 4K resolution without losing any fine detail from your originals.',
    icon: ShieldCheck,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    title: 'Blazing Fast',
    description: 'Process your images in under 3 seconds. Our edge computing ensures lightning-fast removal speeds.',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  {
    title: 'Intuitive Interface',
    description: 'Zero learning curve. Just drag, drop, and download. Background removal has never been this simple.',
    icon: MousePointer2,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10'
  }
];
export function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ChromaCleanse?</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          We combine cutting-edge artificial intelligence with a focus on simplicity and user experience.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="h-full border-none shadow-soft hover:shadow-glow transition-all duration-300 group">
              <CardContent className="p-8">
                <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}