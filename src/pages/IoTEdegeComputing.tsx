import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';

export default function IoTEdegeComputing() {
  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Solutions / IoT</span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 sm:mb-8 gradient-text">
            IoT & Edge Computing
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 mb-10 sm:mb-12 leading-relaxed max-w-3xl">
            End-to-end sensor networks providing granular visibility and predictive maintenance. We bring intelligence to the edge.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 sm:mb-24">
          <div className="overflow-hidden shadow-2xl rounded-3xl border border-white/5">
            <img 
               src="/company/iot.png" 
              alt="IoT Sensors" 
              className="w-full aspect-video object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-white">Real-Time Intelligence</h2>
            <p className="text-slate-400 leading-relaxed">
              Our IoT solutions are built for the most demanding industrial environments. We provide the hardware and software needed to collect, process, and act on data in real-time.
            </p>
            <ul className="space-y-4">
              {[
                "Industrial sensor integration",
                "Edge processing and analytics",
                "Predictive maintenance models",
                "Real-time asset tracking"
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
              icon: Cpu,
              title: "Edge Hardware",
              desc: "Deploy robust edge devices that process data locally, reducing latency and bandwidth costs."
            },
            {
              icon: BarChart3,
              title: "Predictive Insights",
              desc: "Identify potential failures before they happen with our advanced predictive maintenance algorithms."
            },
            {
              icon: ShieldCheck,
              title: "Secure Endpoints",
              desc: "Every sensor and edge device is secured with enterprise-grade encryption and authentication."
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
