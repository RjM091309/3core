import React from 'react';
import { motion } from 'motion/react';
import { Code2, BarChart3, Users, Zap, ShieldCheck } from 'lucide-react';

export default function SoftwareEcosystems() {
  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Solutions / Software</span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 sm:mb-8 gradient-text">
            Software Ecosystems
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 mb-10 sm:mb-12 leading-relaxed max-w-3xl">
            Custom-built algorithmic solutions that automate complex business logic and drive efficiency. We build software that works for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 sm:mb-24">
          <div className="overflow-hidden shadow-2xl rounded-3xl border border-white/5">
            <img 
             src="/company/development.jpg"  
              alt="Software Development" 
              className="w-full aspect-video object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-bold text-white">Intelligent Automation</h2>
            <p className="text-slate-400 leading-relaxed">
              Our software solutions are designed to be more than just tools; they are intelligent ecosystems that adapt to your business processes. From custom ERPs to specialized AI-driven analytics, we deliver excellence.
            </p>
            <ul className="space-y-4">
              {[
                "Custom ERP and CRM solutions",
                "AI-driven predictive analytics",
                "Microservices architecture",
                "Seamless API integrations"
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
              icon: BarChart3,
              title: "Data Visualization",
              desc: "Turn raw data into actionable insights with our custom dashboards and visualization tools."
            },
            {
              icon: Users,
              title: "User-Centric Design",
              desc: "Software that your team will love to use, with intuitive interfaces and efficient workflows."
            },
            {
              icon: ShieldCheck,
              title: "Secure by Design",
              desc: "We prioritize security at every stage of the development lifecycle, ensuring your data is always protected."
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
