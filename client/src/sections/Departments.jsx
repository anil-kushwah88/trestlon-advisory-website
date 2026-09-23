import { useState } from 'react';
import Reveal from '../components/Reveal';
import { Users, Wrench, FileText, MapPinned, Handshake, Package, Cog, FlaskConical, ChevronDown, UserRound } from 'lucide-react';

const ICONS = [Users, Wrench, FileText, MapPinned, Handshake, Package, Cog, FlaskConical];

function Departments({ data }) {
  const [openIndex, setOpenIndex] = useState(-1);
  if (!data) return null;

  return (
    <section id="departments" className="py-20 md:py-28 bg-cream">
      <div className="max-w-page mx-auto px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-3">{data.eyebrow}</p>
          <h2 className="section-title text-3xl md:text-5xl mb-4">{data.title}</h2>
          <div className="divider-gold mb-5" />
          <p className="text-ink/65 leading-relaxed max-w-2xl text-[15px]">{data.intro}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {data.items?.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const hasTeam = item.team?.length > 0;
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.title} delay={i * 70}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="card p-6 h-full w-full text-left cursor-pointer transition-shadow hover:shadow-card"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="text-gold mb-3" size={24} />
                    <ChevronDown
                      size={16}
                      className={`text-gold/70 transition-transform mt-1 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                  <h3 className="font-display font-bold text-navy text-[16px] mb-2">{item.title}</h3>
                  <p className="text-ink/60 text-[13.5px] leading-relaxed">{item.text}</p>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-line">
                      {hasTeam ? (
                        <div className="space-y-3">
                          {item.team.map((member) => (
                            <div key={member.name} className="flex items-center gap-2.5">
                              <span className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center shrink-0 overflow-hidden">
                                {member.photo ? (
                                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                  <UserRound size={15} className="text-navy/40" />
                                )}
                              </span>
                              <div>
                                <div className="text-navy text-[13px] font-semibold leading-tight">{member.name}</div>
                                {member.role && <div className="text-ink/50 text-[11.5px] leading-tight">{member.role}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-ink/40 text-[12.5px] italic">Team details to be added.</p>
                      )}
                    </div>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <p className="text-center text-ink/50 text-[13.5px] italic mt-10 max-w-2xl mx-auto">{data.footer}</p>
        </Reveal>
      </div>
    </section>
  );
}

export default Departments;
