import React from 'react';
import { motion } from 'motion/react';
import GlassButton from '../components/GlassButton';

export default function OurStory() {
  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-24">
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Company / Our Story</span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 sm:mb-8 gradient-text">
            Our Story
          </h1>

          <div className="text-base sm:text-lg text-slate-300 leading-relaxed space-y-6">
            <p>
              With over 20 years of experience in the IT industry by our founder, 3CORE LeadersTech was established as a corporation in 2018, located in Clark,
              Pampanga. Since then, we have successfully completed or are currently managing over 100 projects for more than 50 clients across a diverse range of
              sectors including government agencies, SMEs, educational institutions, resorts and hotels, and BPO companies.
            </p>

            <p>
              While specialized vendors in individual domains are readily available, finding a supplier who can develop customized software tailored to client needs,
              deliver optimized hardware solutions, and build smoothly operating network infrastructures is limited.
            </p>

            <p>
              3CORE&apos;s comprehensive capabilities enable us to meet any customer demand, ensuring not only outstanding performance in our assigned areas but also the
              smooth progress of entire projects as a whole.
            </p>

            <p>
              Furthermore, we provide accountable, end-to-end maintenance and support across all fields even after project completion.
            </p>

            <p className="text-slate-200 font-medium">
              3CORE LeadersTech is your trusted partner for integrated IT solutions that bring reliability, expertise, and continuity throughout your entire IT journey.
            </p>
          </div>

          <div className="mt-10 flex justify-center sm:justify-start">
            <GlassButton to="/#contact" className="py-4 px-8">
              Contact Us
            </GlassButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

