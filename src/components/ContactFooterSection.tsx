import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { LUXURY_PROPERTIES } from '../data/properties';
import { RahmLogo } from './RahmLogo';

interface ContactFooterSectionProps {
  preselectedProperty: string;
}

export function ContactFooterSection({ preselectedProperty }: ContactFooterSectionProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [residence, setResidence] = useState(preselectedProperty || LUXURY_PROPERTIES[0].name);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedProperty) {
      setResidence(preselectedProperty);
      setSubmitted(false);
    }
  }, [preselectedProperty]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your name or family office representative.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="relative z-20">
      <section
        id="contact"
        className="bg-[#F7F5F0] text-[#171918] py-24 md:py-32 border-t border-[#DCD4C6]"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium mb-4">
                Private Advisory
              </p>
              <h2 className="font-serif text-[clamp(2.25rem,3.6vw,3.35rem)] leading-[1.06] font-normal text-[#171918] mb-5">
                Arrange a Private Viewing
              </h2>
              <p className="text-[15px] text-[#77756F] leading-relaxed max-w-md mb-10">
                Coordinate discreet estate inspections and private architectural dossiers with our senior partners.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[#DCD4C6] text-xs">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#B69A69] mb-1.5">
                  Geneva Desk
                </p>
                <p className="text-[#171918]">Rue du Rhône 42, 1204</p>
                <p className="text-[#77756F] mt-0.5 tabular-nums">+41 22 518 09 40</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#B69A69] mb-1.5">
                  New York Desk
                </p>
                <p className="text-[#171918]">725 Fifth Avenue, Suite 2400</p>
                <p className="text-[#77756F] mt-0.5 tabular-nums">+1 212 555 0194</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="border border-[#B69A69]/50 bg-[#FFFFFF] p-8 md:p-12">
                <CheckCircle2 className="w-8 h-8 text-[#B69A69] mb-4" strokeWidth={1.5} />
                <h3 className="font-serif text-3xl text-[#171918] mb-3">
                  Private Inquiry Received
                </h3>
                <p className="text-sm text-[#77756F] leading-relaxed max-w-lg mb-6">
                  Thank you, {fullName}. A senior RAHM LUXURY advisor will contact{' '}
                  <span className="text-[#171918] underline underline-offset-4">{email}</span>{' '}
                  regarding <span className="text-[#B69A69] font-medium">{residence}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-5 py-2.5 border border-[#171918] text-xs uppercase tracking-[0.16em] text-[#171918] hover:bg-[#171918] hover:text-[#F7F5F0] transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="border border-[#DCD4C6] bg-[#FFFFFF] p-7 md:p-10 space-y-6"
              >
                {error && (
                  <div
                    role="alert"
                    className="p-3.5 border border-[#B69A69] bg-[#B69A69]/10 text-xs text-[#171918]"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="client-name"
                      className="block text-[11px] uppercase tracking-[0.16em] text-[#77756F] mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alexandre Vance"
                      className="w-full bg-transparent border-b border-[#DCD4C6] py-2.5 text-sm text-[#171918] placeholder:text-[#77756F]/60 focus:outline-none focus:border-[#B69A69]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="client-email"
                      className="block text-[11px] uppercase tracking-[0.16em] text-[#77756F] mb-2"
                    >
                      Private Email
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="office@vance-holdings.ch"
                      className="w-full bg-transparent border-b border-[#DCD4C6] py-2.5 text-sm text-[#171918] placeholder:text-[#77756F]/60 focus:outline-none focus:border-[#B69A69]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="residence-select"
                    className="block text-[11px] uppercase tracking-[0.16em] text-[#77756F] mb-2"
                  >
                    Residence of Interest
                  </label>
                  <select
                    id="residence-select"
                    value={residence}
                    onChange={(e) => setResidence(e.target.value)}
                    className="w-full bg-[#FFFFFF] border-b border-[#DCD4C6] py-2.5 text-sm text-[#171918] focus:outline-none focus:border-[#B69A69] cursor-pointer"
                  >
                    {LUXURY_PROPERTIES.map((prop) => (
                      <option key={prop.id} value={prop.name}>
                        {prop.name} — {prop.location} ({prop.priceDisplay})
                      </option>
                    ))}
                    <option value="Off-Market Portfolio Briefing">
                      Off-Market Portfolio Briefing
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="client-notes"
                    className="block text-[11px] uppercase tracking-[0.16em] text-[#77756F] mb-2"
                  >
                    Preferred Dates or Notes
                  </label>
                  <textarea
                    id="client-notes"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Private viewing dates or bespoke inquiry..."
                    className="w-full bg-transparent border-b border-[#DCD4C6] py-2.5 text-sm text-[#171918] placeholder:text-[#77756F]/60 focus:outline-none focus:border-[#B69A69] resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[11px] text-[#77756F]">
                    Held in strict confidence.
                  </span>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#171918] text-[#F7F5F0] text-xs font-medium uppercase tracking-[0.16em] hover:bg-[#B69A69] hover:text-[#171918] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Request Consultation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#171918] text-[#77756F] py-12 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <RahmLogo tone="light" compact />
            <p className="font-serif italic text-sm text-[#DCD4C6]/80">
              Where Luxury Finds Its Home.
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-7 text-xs uppercase tracking-[0.14em]">
            <a href="#hero" className="hover:text-[#F7F5F0] transition-colors">
              Home
            </a>
            <a href="#journey" className="hover:text-[#F7F5F0] transition-colors">
              Journey
            </a>
            <a href="#about" className="hover:text-[#F7F5F0] transition-colors">
              About
            </a>
            <a href="#properties" className="hover:text-[#F7F5F0] transition-colors">
              Properties
            </a>
            <a href="#contact" className="hover:text-[#F7F5F0] transition-colors">
              Contact
            </a>
          </nav>

          <p className="text-[11px] tracking-[0.08em]">
            © {new Date().getFullYear()} RAHM LUXURY Real Estate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
