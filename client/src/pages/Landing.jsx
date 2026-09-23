import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { api } from '../lib/api';

import LenisProvider from '../components/LenisProvider';
import ScrollProgress from '../components/ScrollProgress';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

import Hero from '../sections/Hero';
import WhoWeAre from '../sections/WhoWeAre';
import VisionMission from '../sections/VisionMission';
import Values from '../sections/Values';
import WhyUs from '../sections/WhyUs';
import Process from '../sections/Process';
import Departments from '../sections/Departments';
import Services from '../sections/Services';
import TrustStrip from '../sections/TrustStrip';
import CaseStudies from '../sections/CaseStudies';
import WhoWeServe from '../sections/WhoWeServe';
import Location from '../sections/Location';
import Credentials from '../sections/Credentials';
import Reviews from '../sections/Reviews';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';

export default function Landing() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/content')
      .then(setContent)
      .catch(() => setError('Could not load site content. Please make sure the API server is running.'));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream text-navy px-6 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold mb-2">Unable to load content</h1>
          <p className="text-mid">{error}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream text-navy">
        <div className="flex items-center gap-2 text-navy/60">
          <Loader2 className="animate-spin" size={20} /> Loading…
        </div>
      </div>
    );
  }

  return (
    <LenisProvider>
      <div className="relative w-full min-h-screen bg-cream overflow-x-clip">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero hero={content.hero} whoWeAre={content.whoWeAre} />
          <WhoWeAre data={content.whoWeAre} />
          <VisionMission data={content.visionMission} />
          <Values data={content.values} />
          <WhyUs data={content.whyUs} />
          <Process data={content.process} />
          <Departments data={content.departments} />
          <Services data={content.services} />
          <TrustStrip sectors={content.services?.sectors} />
          <CaseStudies data={content.caseStudies} />
          <WhoWeServe data={content.whoWeServe} />
          <Location data={content.location} />
          <Credentials data={content.credentials} />
          <Reviews />
          <FAQ data={content.faq} />
          <Contact data={content.contact} />
        </main>
        <Footer contact={content.contact} siteMeta={content.siteMeta} />
        <WhatsAppButton number={content.contact?.whatsapp} />
      </div>
    </LenisProvider>
  );
}
