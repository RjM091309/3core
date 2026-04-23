import React from 'react';
import { motion } from 'motion/react';
import { Network, ShieldCheck, Zap, Globe, ArrowRight } from 'lucide-react';

export default function NetworkInfrastructure() {
  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Solutions / Infrastructure</span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 sm:mb-8 gradient-text">
            Network Infrastructure
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 mb-10 sm:mb-12 leading-relaxed max-w-3xl">
            High-performance architectures designed for zero-latency operations and global connectivity. We build the backbone of your digital enterprise.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 sm:mb-24">
          <div className="overflow-hidden shadow-2xl rounded-3xl border border-white/5">
            <img 
              src="/company/network.png" 
              alt="3CORE Office" 
              className="w-full aspect-video object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-white">Enterprise-Grade Connectivity</h2>
            <p className="text-slate-400 leading-relaxed">
              Our network solutions are engineered for maximum reliability and scalability. From multi-region SD-WAN to high-density data center fabrics, we ensure your data moves at the speed of business.
            </p>
            <ul className="space-y-4">
              {[
                "Zero-trust network architecture",
                "Software-defined networking (SDN)",
                "Global content delivery networks",
                "Redundant fiber backbones"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                  <Zap size={20} className="text-indigo-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: ShieldCheck,
              title: "Security Integrated",
              desc: "Security isn't an afterthought; it's baked into every switch and router configuration we deploy."
            },
            {
              icon: Globe,
              title: "Global Reach",
              desc: "Connect your global offices with a unified, high-performance network that feels like a local LAN."
            },
            {
              icon: Network,
              title: "Adaptive Scaling",
              desc: "Infrastructure that grows with you, automatically adjusting to traffic demands and new workloads."
            }
          ].map((item, i) => (
            <div key={i} className="corporate-card p-6 sm:p-8 lg:p-10">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
