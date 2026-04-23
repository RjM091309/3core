import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type ClientLogo = { name: string; src: string };

const SLIDE_INTERVAL_MS = 5000;

const MAJOR_CLIENTS_PH_IMAGE = '/clients/majorclientPH/majorPH.png';

const MAJOR_CLIENTS_GLOBAL_IMAGE = '/clients/majorclientsGLOBAL/majorGlobal.png';

const MAJOR_PARTNERS_IMAGE = '/clients/majorPartners/majorpartners.png';

const CLIENT_SLIDES: {
  title: string;
  titleId: string;
  clients: ClientLogo[];
  imageSrc?: string;
  imageAlt?: string;
}[] = [
  {
    title: 'Our Major Clients Philippines',
    titleId: 'clients-ph-heading',
    clients: [],
    imageSrc: MAJOR_CLIENTS_PH_IMAGE,
    imageAlt: 'Our Major Clients Philippines',
  },
  {
    title: 'Our Major Global Clients',
    titleId: 'clients-global-heading',
    clients: [],
    imageSrc: MAJOR_CLIENTS_GLOBAL_IMAGE,
    imageAlt: 'Our Major Global Clients',
  },
  {
    title: 'Our Major Partners',
    titleId: 'clients-partners-heading',
    clients: [],
    imageSrc: MAJOR_PARTNERS_IMAGE,
    imageAlt: 'Our Major Partners',
  },
];

function ClientSlide({
  title,
  titleId,
  clients,
  imageSrc,
  imageAlt,
}: {
  title: string;
  titleId: string;
  clients: ClientLogo[];
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col">
      <h3
        id={titleId}
        className="text-center text-2xl sm:text-3xl font-display font-semibold text-slate-900 mb-6 sm:mb-8 px-4 tracking-tight"
      >
        {title}
      </h3>
      {imageSrc ? (
        <div className="flex flex-1 items-center justify-center">
          <img
            src={imageSrc}
            alt={imageAlt ?? title}
            className="w-full max-w-6xl h-auto max-h-[220px] sm:max-h-[260px] md:max-h-[320px] lg:max-h-[360px] object-contain mx-auto"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 list-none p-0 m-0 justify-items-center"
          aria-label={title}
        >
          {clients.map((client) => (
            <li
              key={`${titleId}-${client.name}`}
              className="flex w-full max-w-[220px] items-center justify-center"
            >
              <img
                src={client.src}
                alt={client.name}
                className="h-12 sm:h-14 md:h-16 w-full max-h-16 object-contain object-center opacity-90 transition-opacity hover:opacity-100"
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const OurClients = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setSlideIndex((i) => (i + 1) % CLIENT_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [slideIndex]);

  const active = CLIENT_SLIDES[slideIndex];

  return (
    <section
      id="clients"
      className="py-20 lg:py-28 bg-white border-y border-slate-200"
      aria-labelledby="clients-section-heading"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="section-label text-indigo-600 mb-3">Clients</span>
        <h2
          id="clients-section-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 tracking-tight"
        >
          Clients &amp; Partners
        </h2>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Organizations we serve and strategic partners we work with worldwide.
        </p>
      </div>

      <div
        className="max-w-[100vw] mt-10 sm:mt-12"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client and partner logos"
      >
        <div className="relative overflow-hidden min-h-[280px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[460px]">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={active.titleId}
              className="absolute inset-0 flex"
              style={{ willChange: 'opacity, transform, filter' }}
              initial={{ opacity: 0, filter: 'blur(6px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <ClientSlide
                title={active.title}
                titleId={active.titleId}
                clients={active.clients}
                imageSrc={active.imageSrc}
                imageAlt={active.imageAlt}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default OurClients;
