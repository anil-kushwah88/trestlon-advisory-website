import Reveal from '../components/Reveal';
import { Eye, Target } from 'lucide-react';

function VisionMission({ data }) {
  if (!data) return null;

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-page mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-8">
        <Reveal variant="left">
          <div className="card p-8 h-full">
            <Eye className="text-gold mb-4" size={28} />
            <h3 className="section-title text-2xl mb-3">{data.vision.title}</h3>
            <div className="divider-gold mb-4" />
            <p className="text-ink/70 leading-relaxed text-[15px]">{data.vision.text}</p>
          </div>
        </Reveal>
        <Reveal variant="right">
          <div className="card p-8 h-full">
            <Target className="text-gold mb-4" size={28} />
            <h3 className="section-title text-2xl mb-3">{data.mission.title}</h3>
            <div className="divider-gold mb-4" />
            <p className="text-ink/70 leading-relaxed text-[15px]">{data.mission.text}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default VisionMission;
